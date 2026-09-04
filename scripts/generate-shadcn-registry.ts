import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(import.meta.dirname, '..');
const REGISTRY_CONTENT_DIRECTORY = path.join(
  ROOT,
  'src/data/contents/registry',
);
const ANIMATED_COMPONENT_DIRECTORY = path.join(
  ROOT,
  'src/data/contents/animated-components',
);
const BASE_COMPONENT_DIRECTORY = path.join(
  ROOT,
  'src/data/contents/components',
);
const OUTPUT_DIRECTORY = path.join(ROOT, 'public/r');
const REGISTRY_MANIFEST_PATH = path.join(ROOT, 'public/registry.json');

type RegistryItem = {
  $schema: string;
  name: string;
  type: 'registry:component';
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies?: string[];
  files: Array<{
    path: string;
    type: 'registry:component';
    content: string;
  }>;
};

function packageName(importSource: string) {
  if (importSource.startsWith('@')) {
    return importSource.split('/').slice(0, 2).join('/');
  }

  return importSource.split('/')[0];
}

function dependenciesFromSource(source: string) {
  const imports = source.matchAll(/from\s+['"]([^'"]+)['"]/g);
  const dependencies = new Set<string>();

  for (const match of imports) {
    const importSource = match[1];

    if (
      importSource.startsWith('.') ||
      importSource.startsWith('@/') ||
      importSource === 'react' ||
      importSource === 'react-dom'
    ) {
      continue;
    }

    dependencies.add(packageName(importSource));
  }

  return [...dependencies].sort();
}

async function readComponentVariant(slug: string, variant: 'original' | 'base') {
  return readFile(
    path.join(ANIMATED_COMPONENT_DIRECTORY, slug, `${variant}.tsx`),
    'utf8',
  );
}

function quotedValue(source: string, name: string) {
  return source.match(new RegExp(`${name}:\\s*['"]([^'"]+)['"]`))?.[1];
}

function registryDependenciesFromSource(source: string) {
  return [...source.matchAll(/@\/components\/(?:ui|base-ui)\/([a-z0-9-]+)/g)]
    .map((match) => match[1])
    .filter((value, index, values) => values.indexOf(value) === index)
    .sort();
}

async function buildBaseComponentItems() {
  const directories = await readdir(BASE_COMPONENT_DIRECTORY, { withFileTypes: true });
  const items: RegistryItem[] = [];

  for (const directory of directories.filter((entry) => entry.isDirectory()).sort((left, right) => left.name.localeCompare(right.name))) {
    const componentDirectory = path.join(BASE_COMPONENT_DIRECTORY, directory.name);
    const indexSource = await readFile(path.join(componentDirectory, 'index.ts'), 'utf8');
    const configSource = await readFile(path.join(componentDirectory, 'config.ts'), 'utf8');
    const categoryDescription = quotedValue(configSource, 'description') ?? `${directory.name} component variants.`;
    const variantPattern = /id:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?cli:\s*['"]([^'"]+)['"]/g;

    for (const match of indexSource.matchAll(variantPattern)) {
      const [, id, title, installCommand] = match;
      const name = installCommand.match(/\/r\/([^\s]+)\.json/)?.[1] ?? id;
      const variantNumber = Number(id.match(/(\d+)$/)?.[1]);
      const source = await readFile(path.join(componentDirectory, `variant-${variantNumber}.tsx`), 'utf8');
      const registryDependencies = registryDependenciesFromSource(source);

      items.push({
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name,
        type: 'registry:component',
        title,
        description: `${title}. ${categoryDescription}`,
        dependencies: dependenciesFromSource(source),
        ...(registryDependencies.length ? { registryDependencies } : {}),
        files: [{
          path: `components/watermelon/${name}.tsx`,
          type: 'registry:component',
          content: source,
        }],
      });
    }
  }

  return items;
}

export async function buildRegistryItems() {
  const files = await readdir(REGISTRY_CONTENT_DIRECTORY);
  const items: RegistryItem[] = [];

  for (const filename of files.filter((file) => file.endsWith('.mdx')).sort()) {
    const metadata = matter(
      await readFile(path.join(REGISTRY_CONTENT_DIRECTORY, filename), 'utf8'),
    ).data as { title?: string; slug?: string; description?: string };
    const slug = metadata.slug;

    if (!slug) continue;

    try {
      const original = await readComponentVariant(slug, 'original');
      const base = await readComponentVariant(slug, 'base');
      const dependencies = dependenciesFromSource(`${original}\n${base}`);
      const registryDependencies = original.includes("@/lib/utils") || base.includes("@/lib/utils")
        ? ['utils']
        : undefined;

      items.push({
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name: slug,
        type: 'registry:component',
        title: metadata.title ?? slug,
        description: metadata.description ?? `Watermelon UI component: ${slug}.`,
        dependencies,
        ...(registryDependencies ? { registryDependencies } : {}),
        files: [
          {
            path: `components/watermelon/${slug}.tsx`,
            type: 'registry:component',
            content: original,
          },
        ],
      });

      items.push({
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name: `${slug}-base`,
        type: 'registry:component',
        title: `${metadata.title ?? slug} (base)`,
        description: `Theme-ready base variant of ${metadata.description ?? slug}.`,
        dependencies,
        ...(registryDependencies ? { registryDependencies } : {}),
        files: [
          {
            path: `components/watermelon/${slug}.tsx`,
            type: 'registry:component',
            content: base,
          },
        ],
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
  }

  return [...items, ...(await buildBaseComponentItems())];
}

export async function generateShadcnRegistry(
  outputDirectory = OUTPUT_DIRECTORY,
  manifestPath = REGISTRY_MANIFEST_PATH,
) {
  const items = await buildRegistryItems();

  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });

  await Promise.all(
    items.map((item) =>
      writeFile(
        path.join(outputDirectory, `${item.name}.json`),
        `${JSON.stringify(item, null, 2)}\n`,
      ),
    ),
  );

  const manifest = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'watermelon',
    homepage: 'https://ui.watermelon.sh',
    items,
  };

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  return { items, manifest };
}

if (import.meta.main) {
  const { items } = await generateShadcnRegistry();
  console.log(`Generated ${items.length} Watermelon shadcn registry items.`);
}
