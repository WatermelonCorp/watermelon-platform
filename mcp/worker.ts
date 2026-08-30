import { createMcpHandler } from '@modelcontextprotocol/server';
import { catalog } from './catalog.generated';
import { createCatalogServer } from './catalog';

const mcpHandler = createMcpHandler(() => createCatalogServer(catalog), {
  legacy: 'reject',
});

const corsHeaders = {
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id, Last-Event-ID',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
  Vary: 'Origin',
};

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders,
      ...init?.headers,
    },
  });
}

function text(body: string, init?: ResponseInit) {
  return new Response(body, {
    ...init,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      ...corsHeaders,
      ...init?.headers,
    },
  });
}

function getCatalogStats() {
  const counts = Object.fromEntries(
    Object.entries(catalog).map(([kind, entries]) => [kind, entries.length]),
  );

  return {
    totalEntries: Object.values(catalog).reduce((sum, entries) => sum + entries.length, 0),
    counts,
  };
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === '/health' || url.pathname === '/mcp/health') {
      return json({
        ok: true,
        service: 'watermelon-mcp',
        endpoint: '/mcp',
        ...getCatalogStats(),
      });
    }

    if (url.pathname === '/llms.txt') {
      return text(
        [
          '# Watermelon MCP',
          '',
          'Watermelon MCP exposes the public Watermelon catalog to AI clients over Streamable HTTP.',
          'Use the /mcp endpoint to connect.',
          '',
          'Available tools:',
          '- catalog_summary',
          '- list_catalog_entries',
          '- get_catalog_entry',
          '',
          'Related properties:',
          '- Website: https://ui.watermelon.sh',
          '- Developers: https://ui.watermelon.sh/developers',
          '- Source: https://github.com/WatermelonCorp/watermelon-platform',
        ].join('\n'),
      );
    }

    if (url.pathname === '/' || url.pathname === '') {
      return json({
        name: 'watermelon-mcp',
        description: 'Hosted MCP endpoint for the Watermelon public catalog.',
        transport: 'streamable-http',
        endpoint: '/mcp',
        website: 'https://ui.watermelon.sh',
        developers: 'https://ui.watermelon.sh/developers',
        source: 'https://github.com/WatermelonCorp/watermelon-platform',
        ...getCatalogStats(),
      });
    }

    if (url.pathname === '/mcp') {
      return mcpHandler(request);
    }

    return json(
      {
        error: 'not_found',
        message: 'Use /mcp for the MCP endpoint.',
        hint: 'Try /, /health, /llms.txt, or /mcp depending on whether you need discovery metadata or the Streamable HTTP MCP transport.',
      },
      { status: 404 },
    );
  },
};
