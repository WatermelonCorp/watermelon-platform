import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ─── Configuration ────────────────────────────────────────────────────────────

const BASE_URL = "https://ui.watermelon.sh";
const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const SRC_DIR = path.resolve(process.cwd(), "src");
const CONTENTS_DIR = path.join(SRC_DIR, "data/contents");
const TODAY = new Date().toISOString().split("T")[0];

// ─── Priority Tiers ──────────────────────────────────────────────────────────

const PRIORITY = {
  homepage: "1.0",
  mainSection: "0.8", // /components, /animated-components, /blocks, /dashboards
  subPage: "0.6", // category pages, individual component/block/dashboard pages
  doc: "0.4", // legal, docs, changelog
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface SitemapEntry {
  loc: string;
  priority: string;
  changefreq?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extract `slug` from MDX frontmatter files in a directory.
 * Supports both flat (*.mdx) and nested (* / *.mdx) layouts.
 */
function getSlugsFromMdx(dir: string, recursive = true): string[] {
  if (!fs.existsSync(dir)) return [];

  const slugs: string[] = [];
  const entries = fs.readdirSync(dir, {
    recursive,
    withFileTypes: false,
  }) as string[];

  for (const entry of entries) {
    if (!entry.endsWith(".mdx")) continue;
    const filePath = path.join(dir, entry);
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      if (data.slug) {
        slugs.push(data.slug);
      }
    } catch {
      // skip unreadable files
    }
  }

  return [...new Set(slugs)]; // deduplicate
}

/**
 * Extract unique `category` values from MDX frontmatter.
 */
function getCategoriesFromMdx(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const categories = new Set<string>();
  const entries = fs.readdirSync(dir, {
    recursive: true,
    withFileTypes: false,
  }) as string[];

  for (const entry of entries) {
    if (!entry.endsWith(".mdx")) continue;
    const filePath = path.join(dir, entry);
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      if (data.category) {
        categories.add(data.category.trim());
      }
    } catch {
      // skip unreadable files
    }
  }

  return [...categories].sort();
}

/**
 * Get UI component category slugs from the new component system.
 * Each subdirectory in contents/components/ that has a config.ts is a category.
 */
function getUiComponentCategories(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => {
      if (!entry.isDirectory()) return false;
      // Verify it has a config.ts (valid category)
      const configPath = path.join(dir, entry.name, "config.ts");
      return fs.existsSync(configPath);
    })
    .map((entry) => entry.name)
    .sort();
}

// ─── Route Collection ─────────────────────────────────────────────────────────

function collectAllRoutes(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // ── 1. Static / Core Pages ──────────────────────────────────────────────────

  // Homepage
  entries.push({ loc: "", priority: PRIORITY.homepage });

  // Main section pages
  const mainSections = [
    "/components",
    "/animated-components",
    "/blocks",
    "/dashboards",
  ];
  for (const route of mainSections) {
    entries.push({ loc: route, priority: PRIORITY.mainSection });
  }

  // Documentation / info pages
  const docPages = [
    "/installation",
    "/changelog",
    "/framework-support",
    "/privacy",
    "/terms",
    "/copyright",
  ];
  for (const route of docPages) {
    entries.push({ loc: route, priority: PRIORITY.doc });
  }

  // ── 2. New UI Component Categories (/components/:category) ─────────────────

  const uiCategories = getUiComponentCategories(
    path.join(CONTENTS_DIR, "components")
  );
  for (const slug of uiCategories) {
    entries.push({
      loc: `/components/${slug}`,
      priority: PRIORITY.subPage,
    });
  }

  // ── 3. Animated Components (/animated-components/:slug) ────────────────────

  const animatedSlugs = getSlugsFromMdx(
    path.join(CONTENTS_DIR, "registry"),
    false
  );
  for (const slug of animatedSlugs) {
    entries.push({
      loc: `/animated-components/${slug}`,
      priority: PRIORITY.subPage,
    });
  }

  // ── 4. Animated Component Categories (/animated-components/category/:cat) ─

  const animatedCategories = getCategoriesFromMdx(
    path.join(CONTENTS_DIR, "registry")
  );
  for (const cat of animatedCategories) {
    const slug = cat.toLowerCase().replace(/\s+/g, "-");
    entries.push({
      loc: `/animated-components/category/${slug}`,
      priority: PRIORITY.subPage,
    });
  }

  // ── 5. Blocks (/block/:slug) ───────────────────────────────────────────────

  const blockSlugs = getSlugsFromMdx(path.join(CONTENTS_DIR, "blocks"), true);
  for (const slug of blockSlugs) {
    entries.push({
      loc: `/block/${slug}`,
      priority: PRIORITY.subPage,
    });
  }

  // ── 6. Dashboards (/dashboard/:slug) ───────────────────────────────────────

  const dashboardSlugs = getSlugsFromMdx(
    path.join(CONTENTS_DIR, "dashboards"),
    true
  );
  for (const slug of dashboardSlugs) {
    entries.push({
      loc: `/dashboard/${slug}`,
      priority: PRIORITY.subPage,
    });
  }

  return entries;
}

// ─── XML Generation ───────────────────────────────────────────────────────────

function generateSitemapXml(entries: SitemapEntry[]): string {
  const urlEntries = entries
    .map(
      (entry) => `  <url>
    <loc>${BASE_URL}${entry.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${entry.changefreq ?? "weekly"}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const routes = collectAllRoutes();
const xml = generateSitemapXml(routes);

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml);

// Summary
const sections = {
  "Static pages": routes.filter((r) =>
    ["1.0", "0.8", "0.4"].includes(r.priority) && !r.loc.includes("/")
      ? true
      : r.priority === PRIORITY.homepage ||
        r.priority === PRIORITY.mainSection ||
        r.priority === PRIORITY.doc
  ).length,
  "UI Component categories (/components/*)": routes.filter((r) =>
    r.loc.startsWith("/components/")
  ).length,
  "Animated components (/animated-components/*)": routes.filter(
    (r) =>
      r.loc.startsWith("/animated-components/") &&
      !r.loc.includes("/category/")
  ).length,
  "Animated categories": routes.filter((r) =>
    r.loc.includes("/animated-components/category/")
  ).length,
  "Blocks (/block/*)": routes.filter((r) => r.loc.startsWith("/block/"))
    .length,
  "Dashboards (/dashboard/*)": routes.filter((r) =>
    r.loc.startsWith("/dashboard/")
  ).length,
};

console.log(`\n✅ Sitemap generated with ${routes.length} total routes:\n`);
for (const [label, count] of Object.entries(sections)) {
  console.log(`   ${label}: ${count}`);
}
console.log(`\n📄 Output: public/sitemap.xml\n`);
