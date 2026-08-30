import { catalog, type CatalogEntry, type CatalogKind } from '../mcp/catalog.generated';
import { agentPages, renderMarkdownAsHtml } from './agent-pages';
import { knownRoutes } from './routes.generated';

type Env = {
  ASSETS: Fetcher;
};

const knownRouteSet = new Set(knownRoutes);
const catalogKinds = Object.keys(catalog) as CatalogKind[];

interface ApiErrorShape {
  error: string;
  message: string;
  hint: string;
  status: number;
}

function acceptsMarkdown(request: Request) {
  return request.headers.get('accept')?.includes('text/markdown') ?? false;
}

function jsonResponse(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      ...init.headers,
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

function apiError(status: number, error: string, message: string, hint: string) {
  return jsonResponse(
    {
      error,
      message,
      hint,
      status,
    } satisfies ApiErrorShape,
    { status },
  );
}

function isAssetPath(pathname: string) {
  return (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/apple-touch-icon') ||
    pathname.startsWith('/site.webmanifest') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/llms.txt' ||
    pathname === '/openapi.json' ||
    pathname === '/404.html'
  );
}

function buildCatalogSummary() {
  return {
    product: 'Watermelon UI',
    totalEntries: Object.values(catalog).reduce((sum, entries) => sum + entries.length, 0),
    counts: Object.fromEntries(
      catalogKinds.map((kind) => [kind, catalog[kind].length]),
    ),
  };
}

function filterEntries(kind: CatalogKind, category?: string | null, query?: string | null, limit?: number) {
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
    const pathname = url.pathname.replace(/\/+$/, '') || '/';

    if (request.method === 'OPTIONS' && pathname.startsWith('/api/')) {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
        },
      });
    }

    if (pathname === '/api/catalog/summary') {
      return jsonResponse(buildCatalogSummary(), {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    if (pathname === '/api/catalog/entries') {
      const kind = url.searchParams.get('kind');
      const category = url.searchParams.get('category');
      const query = url.searchParams.get('query');
      const limitValue = Number(url.searchParams.get('limit') ?? '20');
      const limit = Number.isFinite(limitValue) ? Math.min(Math.max(limitValue, 1), 50) : 20;

      if (!kind || !catalogKinds.includes(kind as CatalogKind)) {
        return apiError(
          400,
          'invalid_kind',
          'Query parameter "kind" is required and must be one of the supported catalog kinds.',
          `Use one of: ${catalogKinds.join(', ')}`,
        );
      }

      return jsonResponse(
        {
          kind,
          category,
          query,
          limit,
          count: filterEntries(kind as CatalogKind, category, query, limit).length,
          entries: filterEntries(kind as CatalogKind, category, query, limit),
        },
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        },
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
        );
      }

      if (!slug) {
        return apiError(
          400,
          'missing_slug',
          'The catalog entry slug is required.',
          'Use /api/catalog/entries/{kind}/{slug}.',
        );
      }

      const entry = catalog[kind as CatalogKind].find((item) => item.slug === slug);

      if (!entry) {
        return apiError(
          404,
          'entry_not_found',
          `No ${kind} entry exists for slug "${slug}".`,
          'Check /api/catalog/entries for available slugs.',
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
      );
    }

    if (pathname === '/api/docs') {
      return jsonResponse(
        {
          name: 'Watermelon UI Public API',
          openapi: 'https://ui.watermelon.sh/openapi.json',
          endpoints: [
            '/api/catalog/summary',
            '/api/catalog/entries?kind=blocks',
            '/api/catalog/entries/{kind}/{slug}',
            '/api/og?title=Watermelon%20UI',
          ],
        },
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        },
      );
    }

    if (pathname.startsWith('/api/') && pathname !== '/api/og') {
      return apiError(
        404,
        'api_not_found',
        'The requested API endpoint does not exist.',
        'Use /openapi.json or /api/docs to discover available endpoints.',
      );
    }

    if (acceptsMarkdown(request) && agentPages[pathname]) {
      return markdownResponse(agentPages[pathname].markdown);
    }

    if (isAssetPath(pathname)) {
      return env.ASSETS.fetch(request);
    }

    if (isKnownDocumentRoute(pathname)) {
      return injectAgentHtml(env, pathname);
    }

    if (acceptsMarkdown(request)) {
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
