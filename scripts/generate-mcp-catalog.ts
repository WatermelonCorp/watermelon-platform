import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { CatalogData, CatalogEntry, CatalogKind } from '../mcp/catalog';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const CONTENTS_DIR = path.join(REPO_ROOT, 'src', 'data', 'contents');
const COMPONENTS_DIR = path.join(CONTENTS_DIR, 'components');
const OUTPUT_PATH = path.join(REPO_ROOT, 'mcp', 'catalog.generated.ts');
const SITE_URL = 'https://ui.watermelon.sh';
const REGISTRY_URL = 'https://registry.watermelon.sh/r';

const kindDirectories: Record<Exclude<CatalogKind, 'components'>, string> = {
  'animated-components': 'registry',
  blocks: 'blocks',
  dashboards: 'dashboards',
  templates: 'templates',
  showcases: 'showcases',
};

function readFiles(dir: string, extension: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return readFiles(fullPath, extension);
    return entry.name.endsWith(extension) ? [fullPath] : [];
  }).sort((left, right) => left.localeCompare(right));
}

function packageName(importSource: string) {
  return importSource.startsWith('@')
    ? importSource.split('/').slice(0, 2).join('/')
    : importSource.split('/')[0];
}

function dependenciesFromSource(source: string) {
  const dependencies = new Set<string>();
  for (const match of source.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
    const importSource = match[1];
    if (
      importSource.startsWith('.') || importSource.startsWith('@/') ||
      importSource === 'react' || importSource === 'react-dom'
    ) continue;
    dependencies.add(packageName(importSource));
  }
  return [...dependencies].sort();
}

function routeFor(kind: Exclude<CatalogKind, 'components'>, slug: string, category?: string) {
  if (kind === 'animated-components') return `${SITE_URL}/animated-components/${slug}`;
  if (kind === 'blocks') return `${SITE_URL}/block/${slug}`;
  if (kind === 'dashboards') return `${SITE_URL}/dashboard/${slug}`;
  if (kind === 'templates') return `${SITE_URL}/template/${slug}`;
  if (kind === 'showcases') return `${SITE_URL}/showcase/${slug}`;
  return category ? `${SITE_URL}/${kind}/${category}` : `${SITE_URL}/${kind}`;
}

function buildMdxEntries(
  kind: Exclude<CatalogKind, 'components'>,
  directory: string,
): CatalogEntry[] {
  return readFiles(path.join(CONTENTS_DIR, directory), '.mdx')
    .map((filePath) => {
      const frontmatter = matter.read(filePath).data as Record<string, unknown>;
      const slug = typeof frontmatter.slug === 'string' ? frontmatter.slug : '';
      const title = typeof frontmatter.title === 'string' ? frontmatter.title : '';
      if (!slug || !title) return null;

      const category = typeof frontmatter.category === 'string' ? frontmatter.category : undefined;
      const install = Array.isArray(frontmatter.install) && typeof frontmatter.install[0] === 'string'
        ? frontmatter.install[0]
        : undefined;
      const registryUrl = install?.match(/https:\/\/registry\.watermelon\.sh\/r\/[^\s]+\.json/)?.[0]
        ?? (kind === 'animated-components' ? `${REGISTRY_URL}/${slug}.json` : undefined);

      return {
        kind,
        slug,
        title,
        description: typeof frontmatter.description === 'string' ? frontmatter.description : '',
        category,
        image: typeof frontmatter.image === 'string' ? frontmatter.image : undefined,
        path: path.relative(REPO_ROOT, filePath).replaceAll(path.sep, '/'),
        previewUrl: routeFor(kind, slug, category),
        registryUrl,
        installCommand: install,
        dependencies: Array.isArray(frontmatter.dependencies)
          ? frontmatter.dependencies.filter((value): value is string => typeof value === 'string')
          : undefined,
      } satisfies CatalogEntry;
    })
    .filter((entry): entry is CatalogEntry => entry !== null);
}

function quotedValue(source: string, name: string) {
  return source.match(new RegExp(`${name}:\\s*['"]([^'"]+)['"]`))?.[1];
}

function buildComponentEntries(): CatalogEntry[] {
  return fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((directory) => {
      const categoryDir = path.join(COMPONENTS_DIR, directory.name);
      const configSource = fs.readFileSync(path.join(categoryDir, 'config.ts'), 'utf8');
      const indexSource = fs.readFileSync(path.join(categoryDir, 'index.ts'), 'utf8');
      const category = quotedValue(configSource, 'slug') ?? directory.name;
      const categoryDescription = quotedValue(configSource, 'description')
        ?? `${category} component variants.`;
      const entries: CatalogEntry[] = [];
      const variantPattern = /id:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?cli:\s*['"]([^'"]+)['"]/g;

      for (const match of indexSource.matchAll(variantPattern)) {
        const [, id, title, installCommand] = match;
        const registryUrl = installCommand.match(/https:\/\/registry\.watermelon\.sh\/r\/([^\s]+\.json)/)?.[0];
        const registrySlug = registryUrl?.split('/').at(-1)?.replace(/\.json$/, '') ?? id;
        const variantNumber = Number(id.match(/(\d+)$/)?.[1]);
        const sourcePath = path.join(categoryDir, `variant-${variantNumber}.tsx`);
        const source = fs.readFileSync(sourcePath, 'utf8');

        entries.push({
          kind: 'components',
          slug: registrySlug,
          title,
          description: `${title}. ${categoryDescription}`,
          category,
          path: path.relative(REPO_ROOT, sourcePath).replaceAll(path.sep, '/'),
          previewUrl: `${SITE_URL}/components/${category}`,
          registryUrl,
          installCommand,
          dependencies: dependenciesFromSource(source),
        });
      }

      return entries;
    });
}

const catalog = {
  components: buildComponentEntries(),
  ...Object.fromEntries(
    Object.entries(kindDirectories).map(([kind, directory]) => [
      kind,
      buildMdxEntries(kind as Exclude<CatalogKind, 'components'>, directory),
    ]),
  ),
} as CatalogData;

const banner = `// This file is auto-generated by scripts/generate-mcp-catalog.ts
// Do not edit by hand.

import type { CatalogData } from './catalog';

export const catalog: CatalogData = `;

fs.writeFileSync(OUTPUT_PATH, `${banner}${JSON.stringify(catalog, null, 2)} as CatalogData;\n`);
console.log(`Generated ${path.relative(REPO_ROOT, OUTPUT_PATH)} with ${Object.values(catalog).flat().length} entries.`);
