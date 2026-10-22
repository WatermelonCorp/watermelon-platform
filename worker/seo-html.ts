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
import { changelogData } from '../src/data/changelog';
import { frameworks, requirements } from '../src/data/framework-support';
import { withSiteSuffix } from '../src/data/seo/fit';
import { parseInline } from '../src/data/seo/inline';
import { socialImageFor } from '../src/data/seo/og';
import { breadcrumbSchema, seoIndexSchemas, seoPageSchemas } from '../src/data/seo/schema';
import { seoPageReferences } from '../src/data/seo/references';

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

function shareImage(pathname: string, image?: string | null) {
  const src = socialImageFor(pathname, image);
  return src.startsWith('http') ? src : `${SITE_URL}${src}`;
}

const fullTitle = withSiteSuffix;

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

type ListItem = { title: string; href?: string; description?: string };

const sentences = (text: string) =>
  text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);

/**
 * Keeps only what is specific to each item. A sentence shared by two or more
 * items (a category blurb, a "Preview it live…" tail) or one that just repeats
 * the item's own name says nothing new, and repeated across a list it makes
 * the page read as one template stamped many times.
 */
export function distinctDescriptions(items: ListItem[]): ListItem[] {
  const seen = new Map<string, number>();
  for (const item of items) {
    for (const s of new Set(sentences(item.description ?? ''))) seen.set(s, (seen.get(s) ?? 0) + 1);
  }
  return items.map((item) => {
    const own = sentences(item.description ?? '').filter(
      (s) => (seen.get(s) ?? 0) < 2 && s.replace(/[.!?]$/, '') !== item.title,
    );
    return { ...item, description: own.length ? own.join(' ') : undefined };
  });
}

/** Links (or plain names) with an optional one-line description each. */
function list(items: ListItem[]) {
  return `<ul>${distinctDescriptions(items)
    .map((item) => {
      const name = item.href
        ? `<a href="${escapeHtml(item.href)}">${escapeHtml(item.title)}</a>`
        : `<strong>${escapeHtml(item.title)}</strong>`;
      return `<li>${name}${item.description ? `: ${escapeHtml(item.description)}` : ''}</li>`;
    })
    .join('')}</ul>`;
}

// The last crumb is the current page: plain text, not a link to itself.
function breadcrumbHtml(items: { name: string; path: string }[]) {
  return `<nav aria-label="Breadcrumb"><ol>${items
    .map((item, i) =>
      i === items.length - 1
        ? `<li><span aria-current="page">${escapeHtml(item.name)}</span></li>`
        : `<li><a href="${escapeHtml(item.path)}">${escapeHtml(item.name)}</a></li>`,
    )
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
    parts.push(`<table><caption>${escapeHtml(section.heading)}</caption><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`);
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
    page.kind !== 'free' ? `<h2>References</h2>${list(seoPageReferences(page))}` : '',
    related.length
      ? `<h2>Related</h2>${list(related.map((r) => ({ title: r.h1, href: seoPagePath(r), description: r.description })))}`
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
              seoPagesOfKind(group.kind).map((p) => ({ title: p.h1, href: seoPagePath(p), description: p.description })),
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

/**
 * An entry's description as its own page shows it. Many blocks reuse one
 * category-wide description (some the wrong category's), so blocks get the
 * specific one from blockDetailSeo instead.
 */
function entryDescription(entry: CatalogEntry) {
  if (entry.kind !== 'blocks') return entry.description;
  return blockDetailSeo({
    slug: entry.slug,
    title: entry.title,
    category: entry.category ?? '',
    description: entry.description,
    sharedDescription: sharedBlockDescriptionSlugs.includes(entry.slug),
  }).description;
}

/** Catalog entries as list items linking to their own pages. */
function entryItems(entries: CatalogEntry[]): ListItem[] {
  return entries.map((entry) => ({
    title: entry.title,
    href: entry.previewUrl.replace(SITE_URL, ''),
    description: entryDescription(entry),
  }));
}

function usageHtml(name: string, install?: string, dependencies?: string[]) {
  const deps = dependencies?.filter(Boolean) ?? [];
  return [
    `<h2>How to use ${escapeHtml(name)}</h2>`,
    '<ol>',
    '<li>Start from a React project with Tailwind CSS and shadcn/ui set up. Next.js, Vite, Remix, and Astro all work.</li>',
    install
      ? `<li>Run <code>${escapeHtml(install)}</code> to add the source files to your project.</li>`
      : '<li>Install it with the shadcn CLI, or copy the source from the preview page.</li>',
    '<li>Import it where you need it, then edit the Tailwind classes and design tokens to match your product.</li>',
    '</ol>',
    deps.length
      ? `<p>Dependencies installed with it: ${deps.map((d) => `<code>${escapeHtml(d)}</code>`).join(', ')}.</p>`
      : '',
    '<p>The code is yours: it lives in your repository, so there is no runtime package to keep updated. Watermelon UI is free and open source under the MIT license.</p>',
  ].join('');
}

function catalogPage(options: {
  pathname: string;
  kind: CatalogKind;
  title: string;
  h1: string;
  description: string;
  crumbs: { name: string; path: string }[];
  entries?: ListItem[];
  install?: string;
  dependencies?: string[];
  /** Other entries to link, with their descriptions. */
  related?: { heading: string; items: ListItem[] };
  /** Neighbours in the whole section, so every entry has at least two inbound links. */
  pager?: { prev: CatalogEntry; next: CatalogEntry };
  image?: string | null;
}): RouteSeo {
  const hub = hubFor[options.kind];
  const body = [
    breadcrumbHtml(options.crumbs),
    `<h1>${escapeHtml(options.h1)}</h1>`,
    `<p>${escapeHtml(options.description)}</p>`,
    options.entries?.length ? list(options.entries) : '',
    usageHtml(options.h1, options.install, options.dependencies),
    options.related?.items.length
      ? `<h2>${escapeHtml(options.related.heading)}</h2>${list(options.related.items)}`
      : '',
    options.pager
      ? `<nav aria-label="Previous and next"><a rel="prev" href="${escapeHtml(entryItems([options.pager.prev])[0].href!)}">Previous: ${escapeHtml(options.pager.prev.title)}</a> · <a rel="next" href="${escapeHtml(entryItems([options.pager.next])[0].href!)}">Next: ${escapeHtml(options.pager.next.title)}</a></nav>`
      : '',
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

// Each catalog page's own description, keyed by its path.
const descriptionByPath = new Map(
  Object.values(catalog)
    .flat()
    .map((entry) => [entry.previewUrl.replace(SITE_URL, ''), entryDescription(entry)] as const),
);

function withDescriptions(items: ListItem[]): ListItem[] {
  return items.map((item) => ({
    ...item,
    description: item.description ?? (item.href ? descriptionByPath.get(item.href) : undefined),
  }));
}

function neighbours(entries: CatalogEntry[], entry: CatalogEntry) {
  const at = entries.findIndex((other) => other.slug === entry.slug);
  if (at < 0 || entries.length < 2) return undefined;
  return {
    prev: entries[(at - 1 + entries.length) % entries.length],
    next: entries[(at + 1) % entries.length],
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
      entries: variants.map((v) => ({ title: v.title, description: v.description })),
      install: variants[0].installCommand,
      dependencies: [...new Set(variants.flatMap((v) => v.dependencies ?? []))],
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
      entries: withDescriptions(blocks),
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
      entries: withDescriptions(items),
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
    if (match.kind === 'animated-components' && entry.category) {
      crumbs.push({
        name: animatedCategorySeo(entry.category).h1,
        path: `/animated-components/category/${encodeURIComponent(entry.category)}`,
      });
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
    // The next entries in the same category, wrapping around, so every entry
    // is linked from several siblings rather than all pages linking the first few.
    // Small categories are topped up from the rest of the section.
    const rotate = (list: CatalogEntry[]) => {
      const at = list.findIndex((other) => other.slug === entry.slug);
      return [...list.slice(at + 1), ...list.slice(0, Math.max(at, 0))];
    };
    const sameCategory = rotate(
      catalog[match.kind].filter((other) => !entry.category || other.category === entry.category),
    );
    const restOfKind = rotate(catalog[match.kind]).filter((other) => !sameCategory.includes(other));
    const siblings = [...sameCategory, ...restOfKind].filter((other) => other.slug !== entry.slug);
    return catalogPage({
      pathname,
      kind: match.kind,
      title: seo.title,
      h1: seo.h1,
      description: seo.description || `${entry.title} for React and Tailwind CSS.`,
      crumbs,
      install: entry.installCommand,
      dependencies: entry.dependencies,
      related: { heading: `More like ${seo.h1}`, items: entryItems(siblings.slice(0, 8)) },
      pager: neighbours(catalog[match.kind], entry),
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

const installStep = (cmd: string) => `<pre><code>${escapeHtml(cmd)}</code></pre>`;

// Crawlable copy for listing pages without a catalog kind. Each mirrors what
// its React page shows; without it they all shipped the homepage's copy.
const staticBodies: Record<string, (h1: string, description: string) => string> = {
  '/home': (h1, description) =>
    [
      `<h1>${escapeHtml(h1)}</h1>`,
      `<p>${escapeHtml(description)}</p>`,
      '<h2>Browse the catalog</h2>',
      list(
        (['components', 'animated-components', 'blocks', 'dashboards', 'templates'] as const).map((kind) => {
          const path = `/${kind}`;
          return {
            title: `${staticPages[path].title} (${catalog[kind].length})`,
            href: path,
            description: staticPages[path].description,
          };
        }),
      ),
      '<h2>Get started</h2>',
      list([
        { title: 'Installation', href: '/installation', description: staticPages['/installation'].description },
        { title: 'Framework support', href: '/framework-support', description: 'Next.js and Vite are fully supported; any React 18+ project with Tailwind CSS v4 works.' },
        { title: 'Guides', href: '/guides', description: 'How-tos for building interfaces with Watermelon UI and shadcn/ui.' },
        { title: 'Changelog', href: '/changelog', description: 'New components, blocks, and fixes in each release.' },
      ]),
    ].join(''),
  '/installation': (h1, description) =>
    [
      `<h1>${escapeHtml(h1)}</h1>`,
      `<p>${escapeHtml(description)}</p>`,
      '<h2>Start a new project</h2>',
      '<p>Initialize a new project with the shadcn CLI, choosing the Next.js or Vite template, then add Watermelon components.</p>',
      installStep('npx shadcn@latest init --template next'),
      installStep('npx shadcn@latest init --template vite'),
      '<h2>Add a Watermelon component</h2>',
      '<p>Use the CLI to pull any component straight into your project from the Watermelon registry:</p>',
      installStep('npx shadcn@latest add https://registry.watermelon.sh/r/card-split-accordian.json'),
      '<p>pnpm, yarn, and bun work too: <code>pnpm dlx</code>, <code>yarn dlx</code>, or <code>bunx --bun</code> in place of <code>npx</code>.</p>',
      '<h2>Add to an existing project</h2>',
      '<p>Make sure shadcn/ui is initialized in the project, then add any component with the same command. Once installed, import and use it like any other shadcn component.</p>',
      '<h2>Manual installation</h2>',
      '<ol><li>Install the dependencies the component lists, for example <code>npm install motion</code>.</li><li>Paste the component source into your <code>components/ui</code> directory.</li></ol>',
      '<p>See <a href="/framework-support">framework support</a> for requirements, then browse <a href="/components">components</a>, <a href="/animated-components">animated components</a>, and <a href="/blocks">blocks</a>.</p>',
    ].join(''),
  '/framework-support': (h1) =>
    [
      `<h1>${escapeHtml(h1)}</h1>`,
      '<p>Watermelon UI components work with any React-based framework that supports Tailwind CSS v4.</p>',
      '<h2>Supported frameworks</h2>',
      `<table><thead><tr><th>Framework</th><th>Version</th><th>Status</th><th>Notes</th></tr></thead><tbody>${frameworks
        .map(
          (f) =>
            `<tr><td>${escapeHtml(f.name)}</td><td>${escapeHtml(f.version)}</td><td>${f.status === 'full' ? 'Full support' : f.status === 'partial' ? 'Partial' : 'Coming soon'}</td><td>${escapeHtml(f.notes)}</td></tr>`,
        )
        .join('')}</tbody></table>`,
      '<h2>Requirements</h2>',
      `<ul>${requirements.map((r) => `<li><strong>${escapeHtml(r.label)}</strong>: ${escapeHtml(r.value)}. ${escapeHtml(r.desc)}.</li>`).join('')}</ul>`,
      '<p>All components are client-side React components and work with any React 18+ project. If your framework uses SSR, wrap animation-heavy components in a <code>&lt;ClientOnly&gt;</code> boundary or use dynamic imports with <code>ssr: false</code>.</p>',
      '<p>Next: <a href="/installation">installation guide</a>.</p>',
    ].join(''),
  '/changelog': (h1, description) =>
    [
      `<h1>${escapeHtml(h1)}</h1>`,
      `<p>${escapeHtml(description)}</p>`,
      ...changelogData.slice(0, 6).map((release) =>
        [
          `<h2>${escapeHtml(release.version)}${release.title ? `: ${escapeHtml(release.title)}` : ''} (${escapeHtml(release.date)})</h2>`,
          ...release.sections.map(
            (section) =>
              `<h3>${escapeHtml(section.title)}</h3><ul>${section.items.map((item) => `<li>${escapeHtml(item.text)}</li>`).join('')}</ul>`,
          ),
        ].join(''),
      ),
    ].join(''),
  '/copyright': (h1) =>
    [
      `<h1>${escapeHtml(h1)}</h1>`,
      '<p>Our policy for inspiration, credit, and ownership claims.</p>',
      '<h2>Our policy</h2>',
      '<p>We do not intentionally take proprietary source code from other creators. We may reference visuals as inspiration and implement from scratch.</p>',
      '<p>When a source is known, we add explicit credit under “Inspired By”.</p>',
      '<h2>If you own a design featured here</h2>',
      '<p>If you believe a design shown on this site is yours and is used without proper permission or attribution, email us at <a href="mailto:watermeloncorpui@gmail.com">watermeloncorpui@gmail.com</a> with proof. Please include direct source links, publication dates, repository or file history, and any other evidence that helps verify ownership.</p>',
      '<h2>Review timeline</h2>',
      '<p>We aim to resolve valid reports within 7-15 days. Actions may include adding credit, updating implementation, or removing content.</p>',
    ].join(''),
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
      bodyHtml: staticBodies[pathname]
        ? breadcrumbHtml(crumbs) + staticBodies[pathname](page.title, page.description)
        : null,
    };
  }
  // Listing pages link to every category or item so crawlers can reach them.
  const kind = page.kind;
  const entries =
    kind === 'blocks'
      ? [...new Set(catalogLinks.blocks.map((b) => b.category).filter(Boolean) as string[])]
          .sort()
          .map((c) => ({ title: blockCategorySeo(c)?.h1 ?? titleCase(c), href: `/blocks/${c}`, description: blockCategorySeo(c)?.description }))
      : kind === 'animated-components'
        ? [...new Set(catalogLinks['animated-components'].map((a) => a.category).filter(Boolean) as string[])]
            .sort()
            .map((c) => ({ title: animatedCategorySeo(c).h1, href: `/animated-components/category/${encodeURIComponent(c)}`, description: animatedCategorySeo(c).description }))
        : kind === 'components'
          ? catalogLinks.components.map((c) => ({ ...c, description: componentCategorySeo(c.href.split('/').pop() ?? '')?.description }))
          : withDescriptions(catalogLinks[kind]);
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
