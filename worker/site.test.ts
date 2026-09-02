import { describe, expect, it } from 'bun:test';
import { readFileSync } from 'node:fs';
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

  it('keeps injected agent preload content hidden for visual browsers', () => {
    const shell = readFileSync(
      new URL('../index.html', import.meta.url),
      'utf8',
    );

    expect(shell).toContain('#agent-preload {\n        display: none;');
    expect(shell).toContain('noscript .agent-preload {');
    expect(shell).not.toContain(
      '#agent-preload[data-agent-path] .agent-preload',
    );
  });

  it('publishes named agent pages for auth and MCP docs', () => {
    expect(agentPages['/developers/auth']?.title).toBe(
      'Watermelon UI Auth Docs',
    );
    expect(agentPages['/developers/auth']?.markdown).toContain(
      'do not require authentication',
    );
    expect(agentPages['/developers/mcp']?.title).toBe('Watermelon UI MCP Docs');
    expect(agentPages['/developers/mcp']?.markdown).toContain(
      'https://mcp.watermelon.sh/mcp',
    );
    expect(agentPages['/developers/status']?.title).toBe(
      'Watermelon UI Status & Integrations',
    );
    expect(agentPages['/developers/status']?.markdown).toContain(
      '/api/v1/status',
    );
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

  it('serves generated embedded preview routes without weakening 404s', async () => {
    const previewResponse = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/preview/dashboard/agndex-dashboard'),
      mockEnv,
    );
    const missingPreviewResponse = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/preview/dashboard/does-not-exist'),
      mockEnv,
    );

    expect(previewResponse.status).toBe(200);
    expect(await previewResponse.text()).toContain('agent-preload');
    expect(missingPreviewResponse.status).toBe(404);
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

  it('returns typed API docs metadata with auth and MCP resources', async () => {
    const response = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/api/docs'),
      mockEnv,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('Deprecation')).toBe('true');
    expect(response.headers.get('RateLimit-Limit')).toBeTruthy();

    const body = await response.json();
    expect(body.version).toBe('v1');
    expect(body.auth.required).toBe(false);
    expect(body.auth.docs).toBe('https://ui.watermelon.sh/developers/auth');
    expect(body.resources.mcpDocs).toBe(
      'https://ui.watermelon.sh/developers/mcp',
    );
    expect(body.resources.statusDocs).toBe(
      'https://ui.watermelon.sh/developers/status',
    );
    expect(body.endpoints).not.toContain('/api/og?title=Watermelon%20UI');
  });

  it('returns machine-readable platform status metadata', async () => {
    const response = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/api/v1/status'),
      mockEnv,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('X-API-Version')).toBe('v1');

    const body = await response.json();
    expect(body.product).toBe('Watermelon UI');
    expect(body.api.version).toBe('v1');
    expect(body.mcp.endpoint).toBe('https://mcp.watermelon.sh/mcp');
    expect(body.platformEndpoints.status).toBe(
      'https://ui.watermelon.sh/developers/status',
    );
    expect(body.build.shortSha).toBeTruthy();
  });

  it('supports the versioned API docs alias without deprecation headers', async () => {
    const response = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/api/v1/docs'),
      mockEnv,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('X-API-Version')).toBe('v1');
    expect(response.headers.get('Deprecation')).toBeNull();
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
