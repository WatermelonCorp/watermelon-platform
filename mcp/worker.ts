import { createMcpHandler } from '@modelcontextprotocol/server';
import { catalog } from './catalog.generated';
import { createCatalogServer } from './catalog';
import { opsMetadata } from '../src/data/ops.generated';

// Keep the default stateless legacy path so established MCP clients can still
// negotiate the 2025 protocol revision while newer clients use the current one.
const mcpHandler = createMcpHandler(() => createCatalogServer(catalog));
const knownToolNames = new Set([
  'search',
  'get_component',
  'get_inspiration',
  'compose_page',
  'list_categories',
  'catalog_summary',
  'list_catalog_entries',
  'get_catalog_entry',
]);

type AnalyticsDataset = {
  writeDataPoint(dataPoint: {
    blobs: string[];
    doubles: number[];
    indexes: string[];
  }): void;
};

type Env = {
  MCP_ANALYTICS?: AnalyticsDataset;
};

type McpTelemetryEvent = {
  event: 'initialize' | 'tool_call';
  clientType: string;
  detail: string;
};

const corsHeaders = {
  'Access-Control-Allow-Headers':
    'Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id, Last-Event-ID',
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
    totalEntries: Object.values(catalog).reduce(
      (sum, entries) => sum + entries.length,
      0,
    ),
    counts,
  };
}

function getRuntimeMetadata() {
  return {
    packageVersion: opsMetadata.packageVersion,
    branch: opsMetadata.branch,
    commitSha: opsMetadata.commitSha,
    shortSha: opsMetadata.shortSha,
    committedAt: opsMetadata.committedAt,
    generatedAt: opsMetadata.generatedAt,
  };
}

function normalizeClientType(clientName: unknown) {
  const name = typeof clientName === 'string' ? clientName.toLowerCase() : '';

  if (name.includes('chatgpt')) return 'chatgpt';
  if (name.includes('claude')) return 'claude';
  if (name.includes('cursor')) return 'cursor';
  if (name.includes('codex')) return 'codex';
  if (name) return 'other';

  return 'unknown';
}

async function readMcpTelemetry(request: Request): Promise<McpTelemetryEvent | null> {
  if (request.method !== 'POST') return null;

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (!Number.isFinite(contentLength) || contentLength <= 0 || contentLength > 65_536) {
    return null;
  }

  try {
    const payload = (await request.clone().json()) as {
      method?: unknown;
      params?: { name?: unknown; clientInfo?: { name?: unknown } };
    };

    if (payload.method === 'initialize') {
      return {
        event: 'initialize',
        clientType: normalizeClientType(payload.params?.clientInfo?.name),
        detail: 'handshake',
      };
    }

    if (payload.method === 'tools/call' && typeof payload.params?.name === 'string') {
      return {
        event: 'tool_call',
        clientType: 'unknown',
        detail: knownToolNames.has(payload.params.name)
          ? payload.params.name
          : 'other',
      };
    }
  } catch {
    // Invalid MCP payloads are handled by the MCP transport, not analytics.
  }

  return null;
}

function recordMcpTelemetry(dataset: AnalyticsDataset | undefined, event: McpTelemetryEvent | null) {
  if (!dataset || !event) return;

  // No IP, session ID, prompt, arguments, or client-provided version is retained.
  dataset.writeDataPoint({
    blobs: [event.event, event.clientType, event.detail],
    doubles: [1],
    indexes: [event.event],
  });
}

export default {
  async fetch(request: Request, env: Env = {}): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === '/health' || url.pathname === '/mcp/health') {
      return json({
        ok: true,
        service: 'watermelon-mcp',
        endpoint: '/mcp',
        transport: 'streamable-http',
        docs: 'https://ui.watermelon.sh/developers/mcp',
        status: 'https://ui.watermelon.sh/developers/status',
        analytics: {
          enabled: Boolean(env.MCP_ANALYTICS),
          privacy: 'Aggregate event counts only. No IP addresses, session IDs, prompts, or tool arguments are stored.',
        },
        build: getRuntimeMetadata(),
        tools: [...knownToolNames],
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
          'Preferred tools:',
          '- search',
          '- get_component',
          '- get_inspiration',
          '- compose_page',
          '- list_categories',
          '',
          'Compatibility tools:',
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
        description: 'Hosted MCP endpoint for discovering, comparing, composing, and installing source-backed Watermelon UI.',
        transport: 'streamable-http',
        endpoint: '/mcp',
        website: 'https://ui.watermelon.sh',
        developers: 'https://ui.watermelon.sh/developers',
        status: 'https://ui.watermelon.sh/developers/status',
        source: 'https://github.com/WatermelonCorp/watermelon-platform',
        build: getRuntimeMetadata(),
        tools: [...knownToolNames],
        ...getCatalogStats(),
      });
    }

    if (url.pathname === '/mcp') {
      recordMcpTelemetry(env.MCP_ANALYTICS, await readMcpTelemetry(request));
      return mcpHandler.fetch(request);
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
