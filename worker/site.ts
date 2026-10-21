import { catalog, type CatalogKind } from '../mcp/catalog.generated';
import { opsMetadata } from '../src/data/ops.generated';
import { agentPages, renderMarkdownAsHtml } from './agent-pages';
import { internalRoutes, knownRoutes } from './routes.generated';
import { resolveRouteSeo } from './seo-html';
import { ogImageForPath } from '../src/data/seo/og';
import { fitDescription } from '../src/data/seo/fit';

type Env = {
  ASSETS: Fetcher;
};

const knownRouteSet = new Set(knownRoutes);
const internalRouteSet = new Set(internalRoutes);
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
// HTML documents only. frame-ancestors allows our own subdomains, since the
// registry host and the main site may embed previews; static files get their
// headers from public/_headers. Scripts: our own bundle and public/analytics.js,
// plus the analytics hosts they load (GA4, Clarity, PostHog, and the Cloudflare
// Web Analytics beacon Cloudflare injects). No inline scripts run on the site.
const scriptSources = [
  "'self'",
  'https://*.googletagmanager.com',
  'https://*.google-analytics.com',
  'https://*.clarity.ms',
  'https://*.posthog.com',
  'https://static.cloudflareinsights.com',
];
const documentSecurityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': [
    `script-src ${scriptSources.join(' ')}`,
    "worker-src 'self' blob:",
    "frame-ancestors 'self' https://watermelon.sh https://*.watermelon.sh",
    "base-uri 'self'",
    "object-src 'none'",
  ].join('; '),
  // The build's commit time: HTML only changes when a new build deploys.
  'Last-Modified': new Date(opsMetadata.committedAt).toUTCString(),
};

interface ApiErrorShape {
  error: string;
  message: string;
  hint: string;
  status: number;
}

function acceptsMarkdown(request: Request) {
  return request.headers.get('accept')?.includes('text/markdown') ?? false;
}

// Markdown only when the client asks for it. Choosing by user agent served
// AI crawlers a page a fraction of the browser's size, which reads as a soft
// block; the HTML already carries each page's full crawlable copy.
function shouldReturnMarkdown(request: Request) {
  return acceptsMarkdown(request);
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
  // Route-specific metadata, so no URL ships the homepage title or canonical.
  const routeSeo = agentPages[pathname] ? null : resolveRouteSeo(pathname);
  const title = routeSeo?.title ?? agentPage.title;
  const description = fitDescription(routeSeo?.description ?? agentPage.description);
  const canonical =
    routeSeo?.canonical ??
    `https://ui.watermelon.sh${pathname === '/' ? '/' : pathname}`;
  const bodyHtml = routeSeo?.bodyHtml ?? renderMarkdownAsHtml(agentPage.markdown);
  // Hand-written agent pages have no RouteSeo; they still get their own card.
  const ogImage = routeSeo?.ogImage ?? `https://ui.watermelon.sh${ogImageForPath(pathname)}`;
  const schemaTags = (routeSeo?.schemas ?? [])
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`,
    )
    .join('');

  const injected = html
    .replace(/<title([^>]*)>[^<]*<\/title>/, `<title$1>${escapeText(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=)"[^"]*"/,
      `$1"${escapeAttribute(description)}"`,
    )
    .replace(
      /(<link rel="canonical" href=)"[^"]*"/,
      `$1"${escapeAttribute(canonical)}"`,
    )
    .replace(
      /(<meta property="og:url" content=)"[^"]*"/,
      `$1"${escapeAttribute(canonical)}"`,
    )
    .replace(
      /(<meta property="og:type" content=)"[^"]*"/,
      `$1"${routeSeo?.ogType ?? 'website'}"`,
    )
    .replace(
      /(<meta\s+(?:property="og:title"|name="twitter:title")\s+content=)"[^"]*"/g,
      `$1"${escapeAttribute(title)}"`,
    )
    .replace(
      /(<meta\s+(?:property="og:description"|name="twitter:description")\s+content=)"[^"]*"/g,
      `$1"${escapeAttribute(description)}"`,
    )
    .replace(
      /(<meta\s+(?:property="og:image"|name="twitter:image")\s+content=)"[^"]*"/g,
      `$1"${escapeAttribute(ogImage)}"`,
    )
    .replace(
      /(<meta\s+(?:property="og:image:alt"|name="twitter:image:alt")\s+content=)"[^"]*"/g,
      `$1"${escapeAttribute(title)}"`,
    )
    .replace('</head>', `${schemaTags}</head>`)
    // The route's crawlable copy replaces the shell's default <noscript> copy,
    // so the page ships one <main> and one <h1>, and nothing hidden with CSS.
    .replace(
      /<main class="agent-preload" id="agent-preload">[\s\S]*?<\/main>/,
      () =>
        `<main class="agent-preload" id="agent-preload" data-agent-path="${escapeAttribute(pathname)}">${bodyHtml}</main>`,
    );

  return new Response(injected, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      ...documentSecurityHeaders,
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
  return knownRouteSet.has(pathname) || internalRouteSet.has(pathname);
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

    if (pathname.startsWith('/api/')) {
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
        ...documentSecurityHeaders,
      },
    });
  },
};

function escapeAttribute(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeText(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
