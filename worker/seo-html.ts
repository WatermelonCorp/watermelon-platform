/**
 * Per-route <head> metadata and crawlable body HTML for the SPA shell.
 *
 * The app is a client-rendered SPA, so without this every URL would ship the
 * homepage title, description, and canonical in its raw HTML. The Worker uses
 * these helpers to inject route-specific values before any JavaScript runs.
 * Titles mirror what each React page sets through SEOHead.
 */
import type { CatalogEntry, CatalogKind } from '../mcp/catalog';
import { catalog } from '../mcp/catalog.generated';
import {
  SITE_URL,
  seoBreadcrumbs,
  seoIndexByPath,
  seoPagePath,
  seoPagesByPath,
  seoPagesOfKind,
  type SeoPage,
  type SeoSection,
} from '../src/data/seo';
import {
  animatedCategorySeo,
  animatedDetailSeo,
  blockCategorySeo,
  blockDetailSeo,
  componentCategorySeo,
  dashboardDetailSeo,
} from '../src/data/seo/catalog-meta';
import { catalogLinks, sharedBlockDescriptionSlugs } from '../src/data/seo/catalog-links.generated';
import { parseInline } from '../src/data/seo/inline';
import { socialImageFor } from '../src/data/seo/og';
import { breadcrumbSchema, seoIndexSchemas, seoPageSchemas } from '../src/data/seo/schema';

export interface RouteSeo {
  /** Full document title, including the site suffix. */
  title: string;
  description: string;
  canonical: string;
  ogType: 'website' | 'article';
  /** Absolute share image URL (PNG card or the page's own preview). */
  ogImage: string;
  schemas: object[];
  /** Crawlable HTML placed in #agent-preload. Null keeps the default content. */
  bodyHtml: string | null;
}

const SUFFIX = ' | Watermelon UI';

function shareImage(pathname: string, image?: string | null) {
  const src = socialImageFor(pathname, image);
  return src.startsWith('http') ? src : `${SITE_URL}${src}`;
}

function fullTitle(title: string) {
  return title.includes('Watermelon UI') ? title : `${title}${SUFFIX}`;
}

export function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function inline(text: string) {
  return parseInline(text)
    .map((segment) => {
      if (segment.type === 'text') return escapeHtml(segment.text);
      if (segment.type === 'code') return `<code>${escapeHtml(segment.text)}</code>`;
      return `<a href="${escapeHtml(segment.href)}">${escapeHtml(segment.text)}</a>`;
    })
    .join('');
}

function list(items: { title: string; href: string }[]) {
  return `<ul>${items
    .map((item) => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.title)}</a></li>`)
    .join('')}</ul>`;
}

function breadcrumbHtml(items: { name: string; path: string }[]) {
  return `<nav aria-label="Breadcrumb"><ol>${items
    .map((item) => `<li><a href="${escapeHtml(item.path)}">${escapeHtml(item.name)}</a></li>`)
    .join('')}</ol></nav>`;
}

// ─── SEO pages ────────────────────────────────────────────────────────────────

function sectionHtml(section: SeoSection) {
  const parts = [`<h2>${escapeHtml(section.heading)}</h2>`];
  for (const paragraph of section.paragraphs ?? []) parts.push(`<p>${inline(paragraph)}</p>`);
  if (section.bullets) {
    parts.push(`<ul>${section.bullets.map((b) => `<li>${inline(b)}</li>`).join('')}</ul>`);
  }
  if (section.table) {
    const head = section.table.columns.map((c) => `<th>${inline(c)}</th>`).join('');
    const rows = section.table.rows
      .map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`)
      .join('');
    parts.push(`<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`);
  }
  if (section.catalog) {
    const spec = section.catalog;
    const items = catalogLinks[spec.kind]
      .filter((item) => !spec.category || item.category === spec.category)
      .slice(0, spec.limit);
    parts.push(list(items));
  }
  return parts.join('');
}

function seoPageHtml(page: SeoPage) {
  const related = page.related.map((p) => seoPagesByPath[p]).filter(Boolean);
  return [
    breadcrumbHtml(seoBreadcrumbs(page)),
    `<h1>${escapeHtml(page.h1)}</h1>`,
    ...page.intro.map((p) => `<p>${inline(p)}</p>`),
    ...page.sections.map(sectionHtml),
    page.faqs?.length
      ? `<h2>Frequently asked questions</h2>${page.faqs
          .map((f) => `<h3>${escapeHtml(f.question)}</h3><p>${inline(f.answer)}</p>`)
          .join('')}`
      : '',
    related.length
      ? `<h2>Related</h2>${list(related.map((r) => ({ title: r.h1, href: seoPagePath(r) })))}`
      : '',
    `<p>Last reviewed <time datetime="${escapeHtml(page.updated)}">${escapeHtml(page.updated)}</time>.</p>`,
  ].join('\n');
}

function seoRoute(pathname: string): RouteSeo | null {
  const index = seoIndexByPath[pathname];
  if (index) {
    const pages = index.groups.flatMap((g) => seoPagesOfKind(g.kind));
    return {
      title: fullTitle(index.title),
      description: index.description,
      canonical: `${SITE_URL}${index.path}`,
      ogType: 'website',
      ogImage: shareImage(index.path),
      schemas: seoIndexSchemas(index, pages),
      bodyHtml: [
        breadcrumbHtml([
          { name: 'Home', path: '/' },
          { name: index.h1, path: index.path },
        ]),
        `<h1>${escapeHtml(index.h1)}</h1>`,
        `<p>${inline(index.intro)}</p>`,
        ...index.groups.map(
          (group) =>
            `<h2>${escapeHtml(group.heading)}</h2>${list(
              seoPagesOfKind(group.kind).map((p) => ({ title: p.h1, href: seoPagePath(p) })),
            )}`,
        ),
      ].join('\n'),
    };
  }

  const page = seoPagesByPath[pathname];
  if (!page) return null;
  return {
    title: fullTitle(page.title),
    description: page.description,
    canonical: `${SITE_URL}${seoPagePath(page)}`,
    ogType: 'article',
    ogImage: shareImage(seoPagePath(page)),
    schemas: seoPageSchemas(page),
    bodyHtml: seoPageHtml(page),
  };
}

// ─── Catalog routes ───────────────────────────────────────────────────────────

const hubFor: Record<CatalogKind, { title: string; href: string }> = {
  components: { title: 'Free React components', href: '/free/react-components' },
  'animated-components': { title: 'Free animated React components', href: '/free/animated-react-components' },
  blocks: { title: 'Free Tailwind blocks', href: '/free/tailwind-blocks' },
  dashboards: { title: 'Free React dashboard templates', href: '/free/react-dashboard-templates' },
  templates: { title: 'Free landing page components', href: '/free/landing-page-components' },
};

const listing: Record<CatalogKind, { name: string; path: string }> = {
  components: { name: 'Components', path: '/components' },
  'animated-components': { name: 'Animated Components', path: '/animated-components' },
  blocks: { name: 'Blocks', path: '/blocks' },
  dashboards: { name: 'Dashboards', path: '/dashboards' },
  templates: { name: 'Templates', path: '/templates' },
};

function titleCase(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function catalogPage(options: {
  pathname: string;
  kind: CatalogKind;
  title: string;
  h1: string;
  description: string;
  crumbs: { name: string; path: string }[];
  entries?: { title: string; href: string }[];
  install?: string;
  image?: string | null;
}): RouteSeo {
  const hub = hubFor[options.kind];
  const body = [
    breadcrumbHtml(options.crumbs),
    `<h1>${escapeHtml(options.h1)}</h1>`,
    `<p>${escapeHtml(options.description)}</p>`,
    options.install ? `<p>Install: <code>${escapeHtml(options.install)}</code></p>` : '',
    options.entries?.length ? list(options.entries) : '',
    `<p>More: <a href="${hub.href}">${escapeHtml(hub.title)}</a>, <a href="/alternatives">UI library alternatives</a>, <a href="/guides">guides</a>.</p>`,
  ];
  return {
    title: fullTitle(options.title),
    description: options.description,
    canonical: `${SITE_URL}${options.pathname}`,
    ogType: 'website',
    ogImage: shareImage(options.pathname, options.image),
    schemas: [breadcrumbSchema(options.crumbs)],
    bodyHtml: body.join('\n'),
  };
}

function findEntry(kind: CatalogKind, slug: string): CatalogEntry | undefined {
  return catalog[kind].find((entry) => entry.slug === slug);
}

function catalogRoute(pathname: string): RouteSeo | null {
  const home = { name: 'Home', path: '/' };
  const segments = pathname.split('/').filter(Boolean);

  // /components/:category
  if (segments[0] === 'components' && segments.length === 2) {
    const category = segments[1];
    const variants = catalog.components.filter((e) => e.category === category);
    if (!variants.length) return null;
    const label = catalogLinks.components.find((c) => c.href === pathname)?.title ?? titleCase(category);
    const seo = componentCategorySeo(category, variants.length);
    return catalogPage({
      pathname,
      kind: 'components',
      title: seo?.title ?? label,
      h1: seo?.h1 ?? label,
      description: seo?.description ?? `${label} component variants for React and Tailwind CSS.`,
      crumbs: [home, listing.components, { name: label, path: pathname }],
      install: variants[0].installCommand,
    });
  }

  // /blocks/:category
  if (segments[0] === 'blocks' && segments.length === 2) {
    const category = segments[1];
    const blocks = catalogLinks.blocks.filter((b) => b.category === category);
    if (!blocks.length) return null;
    const label = titleCase(category);
    const seo = blockCategorySeo(category, blocks.length);
    return catalogPage({
      pathname,
      kind: 'blocks',
      title: seo?.title ?? `${label} - UI Blocks`,
      h1: seo?.h1 ?? label,
      description: seo?.description ?? `${label} blocks for React and Tailwind CSS.`,
      crumbs: [home, listing.blocks, { name: label, path: pathname }],
      entries: blocks,
    });
  }

  // /animated-components/category/:category
  if (segments[0] === 'animated-components' && segments[1] === 'category' && segments.length === 3) {
    const category = decodeURIComponent(segments[2]);
    const items = catalogLinks['animated-components'].filter((i) => i.category === category);
    if (!items.length) return null;
    const label = titleCase(category);
    const seo = animatedCategorySeo(category, items.length);
    return catalogPage({
      pathname,
      kind: 'animated-components',
      title: seo.title,
      h1: seo.h1,
      description: seo.description,
      crumbs: [home, listing['animated-components'], { name: label, path: pathname }],
      entries: items,
    });
  }

  // Detail pages: /animated-components/:slug, /block/:slug, /dashboard/:slug, ...
  const detail: Record<string, { kind: CatalogKind; suffix: string }> = {
    'animated-components': { kind: 'animated-components', suffix: '' },
    block: { kind: 'blocks', suffix: ' - UI Block' },
    dashboard: { kind: 'dashboards', suffix: ' - Dashboard Template' },
    template: { kind: 'templates', suffix: ' - Template' },
  };
  const match = segments.length === 2 ? detail[segments[0]] : undefined;
  if (match) {
    const entry = findEntry(match.kind, segments[1]);
    if (!entry) return null;
    const crumbs = [home, listing[match.kind]];
    if (match.kind === 'blocks' && entry.category) {
      crumbs.push({ name: titleCase(entry.category), path: `/blocks/${entry.category.toLowerCase()}` });
    }
    const seo =
      match.kind === 'blocks'
        ? blockDetailSeo({
            slug: entry.slug,
            title: entry.title,
            category: entry.category ?? '',
            description: entry.description,
            sharedDescription: sharedBlockDescriptionSlugs.includes(entry.slug),
          })
        : match.kind === 'animated-components'
          ? { ...animatedDetailSeo(entry), h1: entry.title, description: entry.description }
          : match.kind === 'dashboards'
            ? { ...dashboardDetailSeo(entry), h1: entry.title, description: entry.description }
            : { title: `${entry.title}${match.suffix}`, h1: entry.title, description: entry.description };
    crumbs.push({ name: seo.h1, path: pathname });
    return catalogPage({
      pathname,
      kind: match.kind,
      title: seo.title,
      h1: seo.h1,
      description: seo.description || `${entry.title} for React and Tailwind CSS.`,
      crumbs,
      install: entry.installCommand,
      image: entry.image,
    });
  }

  return null;
}

// Listing pages. Titles and descriptions mirror each page's SEOHead.
const staticPages: Record<string, { title: string; description: string; kind?: CatalogKind }> = {
  '/home': {
    title: 'React Components, Dashboards & Blocks',
    description:
      'Explore our collection of high-quality, customizable React components, blocks, and dashboards, built with modularity and performance in mind.',
  },
  '/components': {
    title: 'Base React Components for Tailwind CSS',
    description: 'Browse all Watermelon UI base components. Live-rendered, copy-paste ready React components for Tailwind CSS, installable with the shadcn CLI.',
    kind: 'components',
  },
  '/animated-components': {
    title: 'Animated Components',
    description:
      'Browse all Watermelon UI animated components. High-quality, customizable React components with motion, built with Tailwind CSS for modern web apps.',
    kind: 'animated-components',
  },
  '/blocks': {
    title: 'UI Blocks - Pre-built Sections',
    description:
      'Browse our collection of pre-built UI blocks. Copy and paste beautiful hero sections, features, pricing, footers, and more, built with React and Tailwind.',
    kind: 'blocks',
  },
  '/dashboards': {
    title: 'Dashboard Templates',
    description:
      'Explore our collection of pre-built dashboard templates with charts, tables, and analytics components, built with React and Tailwind CSS and free to use.',
    kind: 'dashboards',
  },
  '/templates': {
    title: 'React Templates with Ready-Made Layouts',
    description: 'Explore our collection of pre-built templates with complete layouts and ready-to-use components, built with React and Tailwind CSS for real product pages.',
    kind: 'templates',
  },
  '/installation': {
    title: 'Installation Guide for the shadcn CLI',
    description: 'Get started with Watermelon UI. Build modern, responsive projects with shadcn and Watermelon components, each installed through the shadcn CLI.',
  },
  '/framework-support': {
    title: 'Framework Support',
    description:
      'Watermelon UI works with all major React frameworks including Next.js, Vite, Remix, and Astro. Check compatibility and setup guides.',
  },
  '/changelog': {
    title: 'Changelog: Releases and Updates',
    description: 'Stay updated with the latest changes and improvements to Watermelon UI: new React components, blocks, dashboards, templates, and fixes in each release.',
  },
  '/copyright': {
    title: 'Copyright & Attribution Policy',
    description: 'Watermelon UI copyright, inspiration, and attribution policy: how we credit the designs that inspire our work and how to report a concern about a component.',
  },
};

function staticRoute(pathname: string): RouteSeo | null {
  const page = staticPages[pathname];
  if (!page) return null;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: page.title, path: pathname },
  ];
  if (!page.kind) {
    return {
      title: fullTitle(page.title),
      description: page.description,
      canonical: `${SITE_URL}${pathname}`,
      ogType: 'website',
      ogImage: shareImage(pathname),
      schemas: [breadcrumbSchema(crumbs)],
      bodyHtml: null,
    };
  }
  // Listing pages link to every category or item so crawlers can reach them.
  const kind = page.kind;
  const entries =
    kind === 'blocks'
      ? [...new Set(catalogLinks.blocks.map((b) => b.category).filter(Boolean) as string[])]
          .sort()
          .map((c) => ({ title: blockCategorySeo(c)?.h1 ?? titleCase(c), href: `/blocks/${c}` }))
      : kind === 'animated-components'
        ? [...new Set(catalogLinks['animated-components'].map((a) => a.category).filter(Boolean) as string[])]
            .sort()
            .map((c) => ({ title: animatedCategorySeo(c).h1, href: `/animated-components/category/${encodeURIComponent(c)}` }))
        : catalogLinks[kind];
  return catalogPage({
    pathname,
    kind,
    title: page.title,
    h1: page.title,
    description: page.description,
    crumbs,
    entries,
  });
}

/**
 * Resolve route metadata. Returns null for routes that keep the hand-written
 * agent page content (home, about, developers, legal) or have no match.
 */
export function resolveRouteSeo(pathname: string): RouteSeo | null {
  return seoRoute(pathname) ?? catalogRoute(pathname) ?? staticRoute(pathname);
}
