import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'bun:test';
import {
  seoIndexPages,
  seoPagePath,
  seoPages,
  seoPagesByPath,
  seoPagesOfKind,
} from '../src/data/seo';
import { inlineHrefs } from '../src/data/seo/inline';
import { seoPageSchemas } from '../src/data/seo/schema';
import { ogImageRoutes } from '../src/data/seo/og-images.generated';
import { ogImageForPath, socialImageFor } from '../src/data/seo/og';
import { knownRoutes } from './routes.generated';
import { resolveRouteSeo } from './seo-html';
import siteWorker from './site';

const shell = `<!doctype html><html><head>
<link rel="canonical" href="https://ui.watermelon.sh/" />
<title>Watermelon UI — Premium React Components, Dashboards & Blocks</title>
<meta name="description" content="Base description" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ui.watermelon.sh/" />
<meta
  property="og:title"
  content="Base title"
/>
<meta name="twitter:title" content="Base title" />
<meta property="og:image" content="https://ui.watermelon.sh/og-image.avif" />
<meta
  name="twitter:image"
  content="https://ui.watermelon.sh/og-image.avif"
/>
</head><body><noscript><main class="agent-preload" id="agent-preload"><h1>Default</h1></main></noscript></body></html>`;

const mockEnv = {
  ASSETS: {
    fetch() {
      return Promise.resolve(new Response(shell, { headers: { 'Content-Type': 'text/html' } }));
    },
  },
};

const knownRouteSet = new Set<string>(knownRoutes);

function allText(page: (typeof seoPages)[number]) {
  return [
    page.title,
    page.description,
    page.h1,
    ...page.intro,
    ...page.sections.flatMap((s) => [
      s.heading,
      ...(s.paragraphs ?? []),
      ...(s.bullets ?? []),
      ...(s.table ? [...s.table.columns, ...s.table.rows.flat()] : []),
    ]),
    ...(page.faqs ?? []).flatMap((f) => [f.question, f.answer]),
  ];
}

describe('programmatic SEO content', () => {
  it('has unique titles, descriptions, H1s, and paths', () => {
    for (const key of ['title', 'description', 'h1'] as const) {
      const values = seoPages.map((p) => p[key].toLowerCase());
      expect(new Set(values).size).toBe(values.length);
    }
    const paths = seoPages.map(seoPagePath);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('keeps meta descriptions between 120 and 170 characters', () => {
    for (const page of [...seoPages, ...seoIndexPages]) {
      expect({ path: 'path' in page ? page.path : seoPagePath(page), length: page.description.length }).toEqual({
        path: 'path' in page ? page.path : seoPagePath(page),
        length: expect.any(Number),
      });
      expect(page.description.length).toBeGreaterThanOrEqual(120);
      expect(page.description.length).toBeLessThanOrEqual(170);
    }
  });

  it('keeps titles short enough to show in search results', () => {
    for (const page of seoPages) {
      expect(`${page.title} | Watermelon UI`.length).toBeLessThanOrEqual(80);
    }
  });

  it('never uses em dashes in page copy', () => {
    for (const page of seoPages) {
      for (const text of allText(page)) expect(text).not.toContain('—');
    }
  });

  it('only links to routes that exist', () => {
    for (const page of seoPages) {
      const hrefs = allText(page).flatMap(inlineHrefs).filter((h) => h.startsWith('/'));
      for (const href of [...hrefs, ...page.related]) {
        expect({ page: seoPagePath(page), href, exists: knownRouteSet.has(href) }).toEqual({
          page: seoPagePath(page),
          href,
          exists: true,
        });
      }
    }
  });

  it('has no orphan pages: every page is on a hub and linked from a sibling', () => {
    const hubKinds = new Set(seoIndexPages.flatMap((i) => i.groups.map((g) => g.kind)));
    const inbound = new Map<string, number>();
    for (const page of seoPages) {
      const targets = [...page.related, ...allText(page).flatMap(inlineHrefs)];
      for (const target of new Set(targets)) inbound.set(target, (inbound.get(target) ?? 0) + 1);
    }
    for (const page of seoPages) {
      expect(hubKinds.has(page.kind)).toBe(true);
      expect(seoPagesOfKind(page.kind)).toContain(page);
      expect({ page: seoPagePath(page), inbound: (inbound.get(seoPagePath(page)) ?? 0) > 0 }).toEqual({
        page: seoPagePath(page),
        inbound: true,
      });
    }
  });

  it('links each page to 3 to 6 related pages', () => {
    for (const page of seoPages) {
      expect(page.related.length).toBeGreaterThanOrEqual(3);
      expect(page.related.length).toBeLessThanOrEqual(6);
      for (const path of page.related) expect(seoPagesByPath[path]).toBeDefined();
    }
  });

  it('builds serializable JSON-LD with breadcrumbs and no ratings', () => {
    for (const page of seoPages) {
      const json = JSON.stringify(seoPageSchemas(page));
      const parsed = JSON.parse(json) as { '@type': string }[];
      expect(parsed[0]['@type']).toBe('BreadcrumbList');
      expect(json).not.toContain('AggregateRating');
      expect(json).not.toContain('"Review"');
      if (page.faqs?.length) expect(parsed.some((s) => s['@type'] === 'FAQPage')).toBe(true);
    }
  });
});

describe('share images', () => {
  it('has a PNG card for every SEO page and hub', () => {
    const routes = new Set<string>(ogImageRoutes);
    for (const page of seoPages) expect(routes.has(seoPagePath(page))).toBe(true);
    for (const index of seoIndexPages) expect(routes.has(index.path)).toBe(true);
  });

  it('gives every sitemap route its own PNG card, never an external preview', () => {
    const cards = new Set<string>(ogImageRoutes);
    const missing = knownRoutes.filter((route) => !cards.has(route));
    expect(missing).toEqual([]);
    for (const route of knownRoutes) {
      const image = resolveRouteSeo(route)?.ogImage ?? `https://ui.watermelon.sh${ogImageForPath(route)}`;
      expect({ route, image }).toEqual({ route, image: expect.stringMatching(/^https:\/\/ui\.watermelon\.sh\/og\/[a-z0-9-]+\.png$/) });
      expect(image).not.toBe('https://ui.watermelon.sh/og/default.png');
    }
  });

  it('never uses AVIF, which social networks do not show', () => {
    expect(socialImageFor('/template/landing-01', 'https://assets.watermelon.sh/templates/landing-01.avif')).toBe('/og/template-landing-01.png');
    expect(socialImageFor('/no-such-page', 'https://example.com/x.avif')).toBe('/og/default.png');
    for (const route of knownRoutes) {
      expect(resolveRouteSeo(route)?.ogImage ?? '').not.toMatch(/\.avif/);
    }
  });
});

describe('route SEO in the Worker', () => {
  it('resolves metadata for every sitemap route except hand-written pages', () => {
    const handWritten = new Set(['/', '/about', '/contact', '/privacy', '/terms', '/developers', '/developers/auth', '/developers/mcp', '/developers/status']);
    const missing = knownRoutes.filter((route) => !handWritten.has(route) && !resolveRouteSeo(route));
    expect(missing).toEqual([]);
  });

  it('gives every route a unique title', () => {
    const titles = new Map<string, string>();
    const duplicates: string[] = [];
    for (const route of knownRoutes) {
      const seo = resolveRouteSeo(route);
      if (!seo) continue;
      const existing = titles.get(seo.title);
      if (existing) duplicates.push(`${existing} and ${route}: ${seo.title}`);
      titles.set(seo.title, route);
    }
    expect(duplicates).toEqual([]);
  });

  it('gives every route a unique description', () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    for (const route of knownRoutes) {
      const seo = resolveRouteSeo(route);
      if (!seo) continue;
      const existing = seen.get(seo.description);
      if (existing) duplicates.push(`${existing} and ${route}`);
      seen.set(seo.description, route);
    }
    expect(duplicates).toEqual([]);
  });

  it('serves SEO pages with their own title, canonical, JSON-LD, and body', async () => {
    const response = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/alternatives/shadcn-ui'),
      mockEnv,
    );
    expect(response.status).toBe(200);
    const html = await response.text();
    const page = seoPagesByPath['/alternatives/shadcn-ui'];
    expect(html).toContain(`<title>${page.title} | Watermelon UI</title>`);
    expect(html).toContain('<link rel="canonical" href="https://ui.watermelon.sh/alternatives/shadcn-ui" />');
    expect(html).toContain('<meta property="og:url" content="https://ui.watermelon.sh/alternatives/shadcn-ui" />');
    expect(html).toContain('<meta property="og:type" content="article" />');
    expect(html).not.toContain('content="Base title"');
    expect(html).toContain('application/ld+json');
    expect(html).toContain(`<h1>${page.h1}</h1>`);
    expect(html).toContain('href="/free/react-components"');
    expect(html).toContain('content="https://ui.watermelon.sh/og/alternatives-shadcn-ui.png"');
    expect(html).not.toContain('og-image.avif');
  });

  it('uses its own PNG card and a specific title on block pages', async () => {
    const response = await siteWorker.fetch(new Request('https://ui.watermelon.sh/block/hero-3'), mockEnv);
    const html = await response.text();
    expect(html).toContain('<title>Hero Section 3: Free React &amp; Tailwind Hero Section Block | Watermelon UI</title>');
    expect(html).not.toContain('Widgets are modular');
    expect(html).toContain('property="og:image" content="https://ui.watermelon.sh/og/block-hero-3.png"');
  });

  it('fixes the canonical on existing catalog pages', async () => {
    const response = await siteWorker.fetch(
      new Request('https://ui.watermelon.sh/components/accordion'),
      mockEnv,
    );
    const html = await response.text();
    expect(html).toContain('<link rel="canonical" href="https://ui.watermelon.sh/components/accordion" />');
    expect(html).toContain('<title>React Accordion Component, Free shadcn Accordion | Watermelon UI</title>');
    expect(html).not.toContain('href="https://ui.watermelon.sh/" />');
  });

  it('rewrites the real index.html shell, including data-seo marked tags', async () => {
    const realShell = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
    const realEnv = {
      ASSETS: { fetch: () => Promise.resolve(new Response(realShell, { headers: { 'Content-Type': 'text/html' } })) },
    };
    const html = await (await siteWorker.fetch(new Request('https://ui.watermelon.sh/components/tabs'), realEnv)).text();
    const seo = resolveRouteSeo('/components/tabs')!;
    expect(html).toContain('<link rel="canonical" href="https://ui.watermelon.sh/components/tabs" data-seo />');
    expect(html).toContain('<meta property="og:url" content="https://ui.watermelon.sh/components/tabs" data-seo />');
    expect(html).toContain(`<title data-seo>${seo.title}</title>`);
    expect(html).toContain(`content="${seo.description}" data-seo />`);
    expect(html).not.toContain('Premium React Components, Dashboards');
    // Social cards: X and others read these from the raw HTML.
    expect(html).toMatch(/name="twitter:card"\s+content="summary_large_image"/);
    expect(html).toMatch(/name="twitter:site"\s+content="@watermelonui"/);
    expect(html).toMatch(/name="twitter:image"\s+content="https:\/\/ui\.watermelon\.sh\/og\/components-tabs\.png"/);
    expect(html).toMatch(/property="og:image"\s+content="https:\/\/ui\.watermelon\.sh\/og\/components-tabs\.png"/);
    expect(html).toMatch(new RegExp(`name="twitter:title"\\s+content="${seo.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
    expect(html).not.toContain('href="https://ui.watermelon.sh/" data-seo');
  });

  it('keeps hand-written agent pages but gives them their own canonical', async () => {
    const response = await siteWorker.fetch(new Request('https://ui.watermelon.sh/about'), mockEnv);
    const html = await response.text();
    expect(html).toContain('<title>About the Open-Source React UI Library | Watermelon UI</title>');
    expect(html).toContain('<link rel="canonical" href="https://ui.watermelon.sh/about" />');
  });

  it('serves the SEO hub pages', async () => {
    for (const index of seoIndexPages) {
      const response = await siteWorker.fetch(new Request(`https://ui.watermelon.sh${index.path}`), mockEnv);
      expect(response.status).toBe(200);
      expect(await response.text()).toContain(`<h1>${index.h1}</h1>`);
    }
  });
});
