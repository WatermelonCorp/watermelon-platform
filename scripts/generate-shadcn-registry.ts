import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(import.meta.dirname, '..');
const REGISTRY_CONTENT_DIRECTORY = path.join(
  ROOT,
  'src/data/contents/registry',
);
const COMPONENT_DIRECTORY = path.join(
  ROOT,
  'src/data/contents/animated-components',
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
    path.join(COMPONENT_DIRECTORY, slug, `${variant}.tsx`),
    'utf8',
  );
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

  return items;
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
