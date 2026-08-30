import { describe, expect, it } from 'bun:test';
import { agentPages, renderMarkdownAsHtml } from './agent-pages';
import siteWorker from './site';

const mockEnv = {
  ASSETS: {
    fetch(_request: Request | string) {
      return Promise.resolve(
        new Response(
          '<!doctype html><html><head><title>Watermelon UI — Premium React Components, Dashboards & Blocks</title><meta name="description" content="Base description" /></head><body><div id="agent-preload"></div></body></html>',
          {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          },
        ),
      );
    },
  },
};

describe('agent page content', () => {
  it('keeps homepage markdown substantial enough for no-JS crawlers', () => {
    expect(agentPages['/'].markdown.length).toBeGreaterThan(500);
  });

  it('renders markdown headings and list items into HTML', () => {
    const html = renderMarkdownAsHtml('# Title\n\n## Subtitle\n\n- one\n- two');
    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<h2>Subtitle</h2>');
    expect(html).toContain('<li>one</li>');
    expect(html).toContain('<li>two</li>');
  });
});

describe('site worker', () => {
  it('returns markdown 404s for known AI agents', async () => {
    const response = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/does-not-exist', {
        headers: { 'User-Agent': 'ChatGPT-User' },
      }),
      mockEnv,
    );

    expect(response.status).toBe(404);
    expect(response.headers.get('Content-Type')).toContain('text/markdown');

    const body = await response.text();
    expect(body).toContain('# 404 Not Found');
    expect(body).toContain('/sitemap.xml');
  });

  it('returns real html 404s for browser-style requests', async () => {
    const response = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/does-not-exist', {
        headers: { Accept: 'text/html' },
      }),
      mockEnv,
    );

    expect(response.status).toBe(404);
    expect(response.headers.get('Content-Type')).toContain('text/html');
  });

  it('supports versioned catalog routes with rate-limit headers', async () => {
    const response = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/api/v1/catalog/summary'),
      mockEnv,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('X-API-Version')).toBe('v1');
    expect(response.headers.get('RateLimit-Limit')).toBeTruthy();
    expect(response.headers.get('Deprecation')).toBeNull();
  });

  it('marks legacy unversioned API routes as compatibility aliases', async () => {
    const response = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/api/catalog/summary'),
      mockEnv,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('Deprecation')).toBe('true');
    expect(response.headers.get('Sunset')).toBeTruthy();
  });

  it('rejects unsupported API versions with a machine-readable error', async () => {
    const response = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/api/v2/catalog/summary'),
      mockEnv,
    );

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('invalid_version');
  });
});
