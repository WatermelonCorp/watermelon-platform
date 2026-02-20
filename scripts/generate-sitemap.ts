import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://ui.watermelon.sh';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const SRC_DIR = path.resolve(process.cwd(), 'src');

function getMdxSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir, { recursive: true }) as string[];
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8');
      const slugMatch = content.match(/slug:\s*["']?([^"'\s]+)["']?/);
      return slugMatch ? slugMatch[1] : null;
    })
    .filter((slug): slug is string => !!slug);
}

function getCategories(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir, { recursive: true }) as string[];
  const categories = new Set<string>();
  files.filter(file => file.endsWith('.mdx')).forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const categoryMatch = content.match(/category:\s*["']?([^"'\n]+)["']?/);
    if (categoryMatch) categories.add(categoryMatch[1].trim());
  });
  return Array.from(categories);
}

const staticRoutes = [
  '',
  '/components',
  '/dashboards',
  '/blocks',
  '/installation',
  '/changelog',
  '/basic-usage',
  '/framework-support',
  '/privacy',
  '/terms',
  '/cli',
];

const componentSlugs = getMdxSlugs(path.join(SRC_DIR, 'data/contents/registry'));
const dashboardSlugs = getMdxSlugs(path.join(SRC_DIR, 'data/contents/dashboards'));
const blockSlugs = getMdxSlugs(path.join(SRC_DIR, 'data/contents/blocks'));
const categories = getCategories(path.join(SRC_DIR, 'data/contents/registry'));

const allRoutes = [
  ...staticRoutes,
  ...componentSlugs.map(slug => `/components/${slug}`),
  ...dashboardSlugs.map(slug => `/dashboards/${slug}`),
  ...blockSlugs.map(slug => `/blocks/${slug}`),
  ...categories.map(cat => `/categories/${cat.toLowerCase().replace(/\s+/g, '-')}`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
    .map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`)
    .join('\n')}
</urlset>`;

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
console.log(`Sitemap generated with ${allRoutes.length} routes.`);
