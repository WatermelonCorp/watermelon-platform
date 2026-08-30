import { describe, expect, it } from 'bun:test';
import mcpWorker from './worker';

describe('mcp worker', () => {
  it('returns discovery metadata at the root', async () => {
    const response = await mcpWorker.fetch(
      new Request('https://mcp.watermelon.sh/'),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toContain('application/json');

    const body = await response.json();
    expect(body.name).toBe('watermelon-mcp');
    expect(body.endpoint).toBe('/mcp');
  });

  it('returns health details from both health endpoints', async () => {
    const response = await mcpWorker.fetch(
      new Request('https://mcp.watermelon.sh/mcp/health'),
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.service).toBe('watermelon-mcp');
  });

  it('returns a structured not-found response for unknown routes', async () => {
    const response = await mcpWorker.fetch(
      new Request('https://mcp.watermelon.sh/nope'),
    );

    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.error).toBe('not_found');
    expect(body.hint).toContain('/mcp');
  });
});
