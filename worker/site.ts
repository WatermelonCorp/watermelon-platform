import { catalog, type CatalogKind } from '../mcp/catalog.generated';
import { opsMetadata } from '../src/data/ops.generated';
import { agentPages, renderMarkdownAsHtml } from './agent-pages';
import { knownRoutes } from './routes.generated';

type Env = {
  ASSETS: Fetcher;
};

const knownRouteSet = new Set(knownRoutes);
const catalogKinds = Object.keys(catalog) as CatalogKind[];
const canonicalApiVersion = 'v1';
const legacyApiSunset = 'Thu, 31 Dec 2026 23:59:59 GMT';
const rateLimitPolicy = '120;w=60';
const rateLimitHeaders = {
  'RateLimit-Limit': '120',
  'RateLimit-Remaining': '119',
  'RateLimit-Reset': '60',
  'RateLimit-Policy': rateLimitPolicy,
};
const aiAgentPatterns = [
  'gptbot',
  'chatgpt-user',
  'claudebot',
  'perplexitybot',
  'google-extended',
  'deepseekbot',
  'ora-agent',
];

interface ApiErrorShape {
  error: string;
  message: string;
  hint: string;
  status: number;
}

function acceptsMarkdown(request: Request) {
  return request.headers.get('accept')?.includes('text/markdown') ?? false;
}

function isKnownAiAgent(request: Request) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() ?? '';
  return aiAgentPatterns.some((pattern) => userAgent.includes(pattern));
}

function shouldReturnMarkdown(request: Request) {
  return acceptsMarkdown(request) || isKnownAiAgent(request);
}

function withApiHeaders(init: ResponseInit = {}, versioned = false) {
  const legacyHeaders = versioned
    ? {}
    : {
        Deprecation: 'true',
        Sunset: legacyApiSunset,
        Link: '</openapi.json>; rel="describedby"',
      };

  return {
    ...rateLimitHeaders,
    'X-API-Version': canonicalApiVersion,
    'X-API-Version-Policy': 'path',
    'Access-Control-Expose-Headers':
      'RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset, RateLimit-Policy, Retry-After, Deprecation, Sunset, X-API-Version, X-API-Version-Policy',
    ...legacyHeaders,
    ...init.headers,
  };
}

function jsonResponse(
  data: unknown,
  init: ResponseInit = {},
  versioned = false,
) {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      ...withApiHeaders(init, versioned),
    },
  });
}

function markdownResponse(body: string, init: ResponseInit = {}) {
  return new Response(body, {
    ...init,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=300',
      ...init.headers,
    },
  });
}

function apiError(
  status: number,
  error: string,
  message: string,
  hint: string,
  versioned = false,
) {
  return jsonResponse(
    {
      error,
      message,
      hint,
      status,
    } satisfies ApiErrorShape,
    { status },
    versioned,
  );
}

function isAssetPath(pathname: string) {
  const lastSegment = pathname.split('/').pop() ?? '';
  const hasFileExtension = /\.[a-z0-9]+$/i.test(lastSegment);

  return (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/brand/') ||
    pathname.startsWith('/content/') ||
    pathname.startsWith('/previews/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/apple-touch-icon') ||
    pathname.startsWith('/site.webmanifest') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/llms.txt' ||
    pathname === '/openapi.json' ||
    pathname === '/404.html' ||
    hasFileExtension
  );
}

function buildCatalogSummary() {
  return {
    product: 'Watermelon UI',
    totalEntries: Object.values(catalog).reduce(
      (sum, entries) => sum + entries.length,
      0,
    ),
    counts: Object.fromEntries(
      catalogKinds.map((kind) => [kind, catalog[kind].length]),
    ),
  };
}

function buildStatusPayload() {
  return {
    product: 'Watermelon UI',
    website: 'https://ui.watermelon.sh',
    developers: 'https://ui.watermelon.sh/developers',
    build: {
      packageVersion: opsMetadata.packageVersion,
      branch: opsMetadata.branch,
      commitSha: opsMetadata.commitSha,
      shortSha: opsMetadata.shortSha,
      committedAt: opsMetadata.committedAt,
      generatedAt: opsMetadata.generatedAt,
    },
    api: {
      version: canonicalApiVersion,
      versionPolicy: 'path',
      docs: 'https://ui.watermelon.sh/api/docs',
      openapi: 'https://ui.watermelon.sh/openapi.json',
      rateLimitPolicy,
      compatibilityAliases: true,
      deprecationPolicy:
        'Unversioned /api/* routes are compatibility aliases. Watermelon signals retirement windows with Deprecation and Sunset headers before removal.',
    },
    platformEndpoints: {
      home: 'https://ui.watermelon.sh/home',
      developers: 'https://ui.watermelon.sh/developers',
      status: 'https://ui.watermelon.sh/developers/status',
      llms: 'https://ui.watermelon.sh/llms.txt',
      sitemap: 'https://ui.watermelon.sh/sitemap.xml',
    },
    mcp: {
      discovery: 'https://mcp.watermelon.sh/',
      health: 'https://mcp.watermelon.sh/health',
      llms: 'https://mcp.watermelon.sh/llms.txt',
      endpoint: 'https://mcp.watermelon.sh/mcp',
      transport: 'streamable-http',
      auth: 'public read-only',
      docs: 'https://ui.watermelon.sh/developers/mcp',
    },
    source: {
      repository: 'https://github.com/WatermelonCorp/watermelon-platform',
      commit: `https://github.com/WatermelonCorp/watermelon-platform/commit/${opsMetadata.commitSha}`,
    },
    catalog: buildCatalogSummary(),
  };
}

function filterEntries(
  kind: CatalogKind,
  category?: string | null,
  query?: string | null,
  limit?: number,
) {
  const normalizedQuery = query?.trim().toLowerCase();

  return catalog[kind]
    .filter((entry) => (category ? entry.category === category : true))
    .filter((entry) => {
      if (!normalizedQuery) return true;

      return [entry.title, entry.slug, entry.description, entry.category]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery));
    })
    .slice(0, limit ?? 20);
}

async function injectAgentHtml(env: Env, pathname: string) {
  const response = await env.ASSETS.fetch('https://assets.local/index.html');
  const html = await response.text();
  const agentPage = agentPages[pathname] ?? agentPages['/'];

  const injected = html
    .replace(
      '<title>Watermelon UI — Premium React Components, Dashboards & Blocks</title>',
      `<title>${agentPage.title}</title>`,
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeAttribute(agentPage.description)}" />`,
    )
    .replace(
      '<div id="agent-preload"></div>',
      `<div id="agent-preload" data-agent-path="${pathname}"><main class="agent-preload">${renderMarkdownAsHtml(agentPage.markdown)}</main></div>`,
    );

  return new Response(injected, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}

function notFoundMarkdown() {
  return `# 404 Not Found

The requested Watermelon UI page does not exist.

Useful entry points:
- [Sitemap](https://ui.watermelon.sh/sitemap.xml)
- [llms.txt](https://ui.watermelon.sh/llms.txt)
- [Developers](https://ui.watermelon.sh/developers)
- [OpenAPI](https://ui.watermelon.sh/openapi.json)`;
}

function notFoundHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 Not Found | Watermelon UI</title>
    <meta name="robots" content="noindex, follow" />
  </head>
  <body>
    <main>
      <h1>404 Not Found</h1>
      <p>The requested Watermelon UI page does not exist.</p>
      <p>Useful entry points:</p>
      <ul>
        <li><a href="/sitemap.xml">Sitemap</a></li>
        <li><a href="/llms.txt">llms.txt</a></li>
        <li><a href="/developers">Developers</a></li>
        <li><a href="/openapi.json">OpenAPI</a></li>
      </ul>
    </main>
  </body>
</html>`;
}

function isKnownDocumentRoute(pathname: string) {
  return knownRouteSet.has(pathname);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const rawPathname = url.pathname.replace(/\/+$/, '') || '/';
    const versionedApiMatch = rawPathname.match(/^\/api\/(v\d+)(\/.*)?$/);
    const requestedApiVersion = versionedApiMatch?.[1] ?? null;
    const versionedApiPath =
      versionedApiMatch && requestedApiVersion === canonicalApiVersion
        ? `/api${versionedApiMatch[2] ?? ''}`
        : null;
    const pathname = versionedApiPath ?? rawPathname;
    const isVersionedApiRequest = requestedApiVersion === canonicalApiVersion;

    if (request.method === 'OPTIONS' && pathname.startsWith('/api/')) {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          ...withApiHeaders({}, isVersionedApiRequest),
        },
      });
    }

    if (requestedApiVersion && requestedApiVersion !== canonicalApiVersion) {
      return apiError(
        400,
        'invalid_version',
        `API version "${requestedApiVersion}" is not supported.`,
        `Use /api/${canonicalApiVersion}/... or the documented compatibility aliases in /openapi.json.`,
        false,
      );
    }

    if (pathname === '/api/catalog/summary') {
      return jsonResponse(
        buildCatalogSummary(),
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        },
        isVersionedApiRequest,
      );
    }

    if (pathname === '/api/catalog/entries') {
      const kind = url.searchParams.get('kind');
      const category = url.searchParams.get('category');
      const query = url.searchParams.get('query');
      const limitValue = Number(url.searchParams.get('limit') ?? '20');
      const limit = Number.isFinite(limitValue)
        ? Math.min(Math.max(limitValue, 1), 50)
        : 20;

      if (!kind || !catalogKinds.includes(kind as CatalogKind)) {
        return apiError(
          400,
          'invalid_kind',
          'Query parameter "kind" is required and must be one of the supported catalog kinds.',
          `Use one of: ${catalogKinds.join(', ')}`,
          isVersionedApiRequest,
        );
      }

      return jsonResponse(
        {
          kind,
          category,
          query,
          limit,
          count: filterEntries(kind as CatalogKind, category, query, limit)
            .length,
          entries: filterEntries(kind as CatalogKind, category, query, limit),
        },
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        },
        isVersionedApiRequest,
      );
    }

    if (pathname.startsWith('/api/catalog/entries/')) {
      const parts = pathname.split('/').filter(Boolean);
      const kind = parts[3];
      const slug = parts[4];

      if (!kind || !catalogKinds.includes(kind as CatalogKind)) {
        return apiError(
          400,
          'invalid_kind',
          'The requested catalog kind is not supported.',
          `Use one of: ${catalogKinds.join(', ')}`,
          isVersionedApiRequest,
        );
      }

      if (!slug) {
        return apiError(
          400,
          'missing_slug',
          'The catalog entry slug is required.',
          'Use /api/catalog/entries/{kind}/{slug}.',
          isVersionedApiRequest,
        );
      }

      const entry = catalog[kind as CatalogKind].find(
        (item) => item.slug === slug,
      );

      if (!entry) {
        return apiError(
          404,
          'entry_not_found',
          `No ${kind} entry exists for slug "${slug}".`,
          'Check /api/catalog/entries for available slugs.',
          isVersionedApiRequest,
        );
      }

      return jsonResponse(
        {
          found: true,
          entry,
        },
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        },
        isVersionedApiRequest,
      );
    }

    if (pathname === '/api/docs') {
      return jsonResponse(
        {
          name: 'Watermelon UI Public API',
          version: canonicalApiVersion,
          canonicalBase: `https://ui.watermelon.sh/api/${canonicalApiVersion}`,
          compatibilityAliases: true,
          deprecationPolicy:
            'Unversioned /api/* routes are compatibility aliases. When they are retired, Watermelon will signal deprecation with Deprecation and Sunset headers before removal.',
          auth: {
            required: false,
            mode: 'none',
            docs: 'https://ui.watermelon.sh/developers/auth',
          },
          resources: {
            developers: 'https://ui.watermelon.sh/developers',
            authDocs: 'https://ui.watermelon.sh/developers/auth',
            mcpDocs: 'https://ui.watermelon.sh/developers/mcp',
            statusDocs: 'https://ui.watermelon.sh/developers/status',
            mcpServer: 'https://mcp.watermelon.sh/',
          },
          openapi: 'https://ui.watermelon.sh/openapi.json',
          endpoints: [
            `/api/${canonicalApiVersion}/status`,
            `/api/${canonicalApiVersion}/catalog/summary`,
            `/api/${canonicalApiVersion}/catalog/entries?kind=blocks`,
            `/api/${canonicalApiVersion}/catalog/entries/{kind}/{slug}`,
          ],
        },
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        },
        isVersionedApiRequest,
      );
    }

    if (pathname === '/api/status') {
      return jsonResponse(
        buildStatusPayload(),
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        },
        isVersionedApiRequest,
      );
    }

    if (pathname.startsWith('/api/') && pathname !== '/api/og') {
      return apiError(
        404,
        'api_not_found',
        'The requested API endpoint does not exist.',
        'Use /openapi.json or /api/docs to discover available endpoints.',
        isVersionedApiRequest,
      );
    }

    if (shouldReturnMarkdown(request) && agentPages[pathname]) {
      return markdownResponse(agentPages[pathname].markdown);
    }

    if (isAssetPath(pathname)) {
      return env.ASSETS.fetch(request);
    }

    if (isKnownDocumentRoute(pathname)) {
      return injectAgentHtml(env, pathname);
    }

    if (shouldReturnMarkdown(request)) {
      return markdownResponse(notFoundMarkdown(), { status: 404 });
    }

    return new Response(notFoundHtml(), {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    });
  },
};

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}
