/**
 * Dynamic sitemap generator.
 *
 * Auto-discovers every public page from the SAME content sources the app uses
 * to build its routes, so adding a new component / block / dashboard / category
 * automatically shows up in the sitemap on the next build — no manual edits here.
 *
 * URL patterns are kept in sync with src/components/layout/app-routes.tsx:
 *   - Animated components: /animated-components/:slug
 *                          /animated-components/category/:category
 *   - UI components:       /components/:category
 *   - Blocks:              /block/:slug
 *                          /blocks/:category
 *
 * Run via `bun run sitemap` (also runs automatically as part of `bun run build`).
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://ui.watermelon.sh';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const CONTENTS_DIR = path.resolve(process.cwd(), 'src/data/contents');

type RouteEntry = { path: string; lastmod: string };

/** Recursively collect every .mdx file under a directory. */
function findMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findMdxFiles(full));
    else if (entry.name.endsWith('.mdx')) out.push(full);
  }
  return out;
}

/** File last-modified date as YYYY-MM-DD (real <lastmod>, not the build date). */
function fileDate(file: string): string {
  return fs.statSync(file).mtime.toISOString().split('T')[0];
}

const today = new Date().toISOString().split('T')[0];

// ── Static pages (must mirror the real routes in app-routes.tsx) ──────────────
const staticRoutes: RouteEntry[] = [
  '',
  '/animated-components',
  '/components',
  '/blocks',
  '/installation',
  '/framework-support',
  '/changelog',
  '/terms',
  '/privacy',
  '/copyright',
].map(p => ({ path: p, lastmod: today }));

const routes: RouteEntry[] = [...staticRoutes];

// ── Animated components — contents/registry/*.mdx ─────────────────────────────
// Mirrors animated-components-registry.tsx: needs slug + title; category drives
// the /animated-components/category/:category pages (slug === raw category).
{
  const animatedCategories = new Set<string>();
  for (const file of findMdxFiles(path.join(CONTENTS_DIR, 'registry'))) {
    const { slug, title, category } = matter(fs.readFileSync(file, 'utf-8')).data;
    if (!slug || !title) continue;
    routes.push({ path: `/animated-components/${slug}`, lastmod: fileDate(file) });
    if (category) animatedCategories.add(String(category));
  }
  for (const category of animatedCategories) {
    routes.push({
      path: `/animated-components/category/${encodeURIComponent(category)}`,
      lastmod: today,
    });
  }
}

// ── Blocks — contents/blocks/**/*.mdx ─────────────────────────────────────────
// Mirrors blocks.tsx: needs slug + title; "bento" blocks are hidden from the
// site, so they are excluded here too. Category slug === raw category.
{
  const blockCategories = new Set<string>();
  for (const file of findMdxFiles(path.join(CONTENTS_DIR, 'blocks'))) {
    const { slug, title, category } = matter(fs.readFileSync(file, 'utf-8')).data;
    if (!slug || !title) continue;
    if (category === 'bento' || String(slug).startsWith('bento')) continue;
    routes.push({ path: `/block/${slug}`, lastmod: fileDate(file) });
    if (category) blockCategories.add(String(category));
  }
  for (const category of blockCategories) {
    routes.push({ path: `/blocks/${encodeURIComponent(category)}`, lastmod: today });
  }
}

// ── UI component categories — contents/components/*/config.ts ─────────────────
// Mirrors components-registry.ts: each category exposes a `slug` used by
// the /components/:category route.
{
  const componentsDir = path.join(CONTENTS_DIR, 'components');
  if (fs.existsSync(componentsDir)) {
    for (const entry of fs.readdirSync(componentsDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const configPath = path.join(componentsDir, entry.name, 'config.ts');
      if (!fs.existsSync(configPath)) continue;
      const match = fs.readFileSync(configPath, 'utf-8').match(/slug:\s*['"]([^'"]+)['"]/);
      if (match) {
        routes.push({ path: `/components/${match[1]}`, lastmod: fileDate(configPath) });
      }
    }
  }
}

// ── Emit XML ──────────────────────────────────────────────────────────────────
// De-dupe by path (defensive) and sort for stable, diff-friendly output.
const seen = new Set<string>();
const unique = routes
  .filter(r => (seen.has(r.path) ? false : (seen.add(r.path), true)))
  .sort((a, b) => a.path.localeCompare(b.path));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map(
    r => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${r.path === '' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
console.log(`Sitemap generated with ${unique.length} routes.`);
