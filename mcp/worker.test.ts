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
    expect(body.status).toBe('https://ui.watermelon.sh/developers/status');
    expect(body.totalEntries).toBe(850);
    expect(body.tools).toContain('compose_page');
    expect(body.build.shortSha).toBeTruthy();
  });

  it('returns health details from both health endpoints', async () => {
    const response = await mcpWorker.fetch(
      new Request('https://mcp.watermelon.sh/mcp/health'),
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.service).toBe('watermelon-mcp');
    expect(body.transport).toBe('streamable-http');
    expect(body.tools).toContain('get_component');
    expect(body.build.generatedAt).toBeTruthy();
  });

  it('accepts an MCP initialize handshake without a Worker crash', async () => {
    const response = await mcpWorker.fetch(
      new Request('https://mcp.watermelon.sh/mcp', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/event-stream',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'initialize',
          params: {
            protocolVersion: '2025-03-26',
            capabilities: {},
            clientInfo: { name: 'watermelon-test-client', version: '1.0.0' },
          },
        }),
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toContain('text/event-stream');
    const body = await response.text();
    expect(body).toContain('"name":"watermelon-mcp"');
    expect(body).toContain('Search Watermelon before writing UI from scratch');
  });

  it('advertises the purpose-built tools and compatibility aliases', async () => {
    const response = await mcpWorker.fetch(
      new Request('https://mcp.watermelon.sh/mcp', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/event-stream',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list' }),
      }),
    );

    expect(response.status).toBe(200);
    const body = await response.text();
    for (const tool of [
      'search',
      'get_component',
      'get_inspiration',
      'compose_page',
      'list_categories',
      'catalog_summary',
    ]) {
      expect(body).toContain(`"name":"${tool}"`);
    }
  });

  it('records aggregate MCP telemetry without storing client identifiers', async () => {
    const points: Array<{ blobs: string[]; doubles: number[]; indexes: string[] }> = [];
    const response = await mcpWorker.fetch(
      new Request('https://mcp.watermelon.sh/mcp', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/event-stream',
          'Content-Type': 'application/json',
          'Content-Length': '160',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'initialize',
          params: {
            protocolVersion: '2025-03-26',
            capabilities: {},
            clientInfo: { name: 'ChatGPT Desktop', version: '1.0.0' },
          },
        }),
      }),
      { MCP_ANALYTICS: { writeDataPoint: (point) => points.push(point) } },
    );

    expect(response.status).toBe(200);
    expect(points).toEqual([
      {
        blobs: ['initialize', 'chatgpt', 'handshake'],
        doubles: [1],
        indexes: ['initialize'],
      },
    ]);
  });

  it('records only allowlisted tool names in aggregate telemetry', async () => {
    const points: Array<{ blobs: string[]; doubles: number[]; indexes: string[] }> = [];
    const response = await mcpWorker.fetch(
      new Request('https://mcp.watermelon.sh/mcp', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/event-stream',
          'Content-Type': 'application/json',
          'Content-Length': '100',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'tools/call',
          params: { name: 'list_catalog_entries', arguments: {} },
        }),
      }),
      { MCP_ANALYTICS: { writeDataPoint: (point) => points.push(point) } },
    );

    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(points).toEqual([
      {
        blobs: ['tool_call', 'unknown', 'list_catalog_entries'],
        doubles: [1],
        indexes: ['tool_call'],
      },
    ]);
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
