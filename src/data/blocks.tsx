import React from 'react';
import { blockCategories } from '@/data/block-metadata';

export interface BlockFile {
  name: string;
  path: string;
  code: () => Promise<string>;
}

export interface BlockItem {
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  video?: string;
  component: React.ComponentType<any>;
  files: BlockFile[];
  dependencies?: string[];
  install?: string[];
  featured?: boolean;
  comingSoon?: boolean;
  componentNumber?: number;
  inspiredBy?: {
    name: string;
    url?: string;
  };
}

// Load all block MDX files (metadata)
const mdxFiles = import.meta.glob('./contents/blocks/**/*.mdx', {
  eager: true,
});

// Load all Block Demos (eager) - from subfolders
const demoComponents = import.meta.glob('./contents/blocks/**/demo.tsx', {
  eager: true,
});

// Load all Block source files (raw) - all tsx files in block folders
const blockSources = import.meta.glob('./contents/blocks/**/*.tsx', {
  query: '?raw',
  import: 'default',
});

// Helper to get all source files for a block
function getBlockFiles(slug: string): BlockFile[] {
  const files: BlockFile[] = [];
  const slugSegment = `/${slug}/`;

  Object.entries(blockSources).forEach(([path, loader]) => {
    if (path.includes(slugSegment)) {
      const fileName = path.split('/').pop()!;
      files.push({
        name: fileName,
        path: path,
        code: async () => {
          const source = await loader();
          return source as string;
        },
      });
    }
  });

  return files;
}

export const blocks: BlockItem[] = Object.entries(mdxFiles)
  .map(([path, mod]: [string, any]) => {
    const frontmatter = mod.frontmatter;

    if (!frontmatter || !frontmatter.slug || !frontmatter.title) {
      console.warn('Skipping block MDX file with missing frontmatter:', path);
      return null;
    }

    const slug = frontmatter.slug;
    const demoKey = Object.keys(demoComponents).find((key) =>
      key.includes(`/${slug}/demo.tsx`),
    );
    const demoMod = demoKey ? (demoComponents[demoKey] as any) : null;
    const DemoComponent = demoMod?.default || (() => <div>Missing Block</div>);

    return {
      ...frontmatter,
      name: frontmatter.title,
      component: frontmatter.comingSoon
        ? () => (
            <div className="text-muted-foreground py-20 text-center">
              Coming Soon
            </div>
          )
        : DemoComponent,
      files: getBlockFiles(slug),
      category: frontmatter.category || 'Uncategorized',
      description: frontmatter.description || '',
      install: frontmatter.install || [],
    };
  })
  .filter((item): item is BlockItem => item !== null)
  .sort((a, b) => {
    // Featured first, then alphabetically
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Coming soon last
    if (a.comingSoon && !b.comingSoon) return 1;
    if (!a.comingSoon && b.comingSoon) return -1;
    return (a.name || '').localeCompare(b.name || '');
  });

export const allBlockCategories = Array.from(
  new Set(blocks.map((item) => item.category)),
).sort();

// ─── Category System ────────────────────────────────────────────────────────

function toCategorySlug(category: string): string {
  return category.trim().toLowerCase();
}

/** Get all blocks for a given category slug */
export function getBlocksByCategory(category: string): BlockItem[] {
  const normalizedCategory = toCategorySlug(category);
  return blocks.filter(
    (b) => toCategorySlug(b.category) === normalizedCategory,
  );
}

/** Check if a block category exists */
export function hasBlockCategory(category: string): boolean {
  const normalizedCategory = toCategorySlug(category);
  return blockCategories.some((c) => c.slug === normalizedCategory);
}
