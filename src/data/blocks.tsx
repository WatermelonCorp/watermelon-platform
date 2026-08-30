import React from "react";
import { getBlockPreviewImageUrl } from "@/data/block-preview-images";

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
const mdxFiles = import.meta.glob("./contents/blocks/**/*.mdx", { eager: true });

// Load all Block Demos (eager) - from subfolders
const demoComponents = import.meta.glob("./contents/blocks/**/demo.tsx", { eager: true });

// Load all Block source files (raw) - all tsx files in block folders
const blockSources = import.meta.glob("./contents/blocks/**/*.tsx", {
  query: "?raw",
  import: "default",
});

// Helper to get all source files for a block
function getBlockFiles(slug: string): BlockFile[] {
  const files: BlockFile[] = [];
  const slugSegment = `/${slug}/`;

  Object.entries(blockSources).forEach(([path, loader]) => {
    if (path.includes(slugSegment)) {
      const fileName = path.split("/").pop()!;
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
      console.warn("Skipping block MDX file with missing frontmatter:", path);
      return null;
    }

    const slug = frontmatter.slug;
    const demoKey = Object.keys(demoComponents).find((key) => key.includes(`/${slug}/demo.tsx`));
    const demoMod = demoKey ? (demoComponents[demoKey] as any) : null;
    const DemoComponent = demoMod?.default || (() => <div>Missing Block</div>);

    return {
      ...frontmatter,
      name: frontmatter.title,
      component: frontmatter.comingSoon
        ? () => <div className="text-muted-foreground text-center py-20">Coming Soon</div>
        : DemoComponent,
      files: getBlockFiles(slug),
      category: frontmatter.category || "Uncategorized",
      description: frontmatter.description || "",
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
    return (a.name || "").localeCompare(b.name || "");
  });

export const allBlockCategories = Array.from(
  new Set(blocks.map((item) => item.category))
).sort();

// ─── Category System ────────────────────────────────────────────────────────

export interface BlockCategory {
  /** URL-safe slug, e.g. "bento", "inputs" */
  slug: string;
  /** Human-readable label, e.g. "Bento", "AI Inputs" */
  label: string;
  /** Short description shown on the category card */
  description: string;
  /** Number of blocks in this category */
  count: number;
  /** Thumbnail image (from the first block that has one) */
  image?: string;
}

function toCategorySlug(category: string): string {
  return category.trim().toLowerCase();
}

function formatCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

/**
 * Display labels & descriptions for known categories.
 * If a category slug isn't listed here it auto-capitalizes from the slug.
 * Adding an entry here is OPTIONAL — categories are still auto-detected from MDX.
 */
const categoryLabels: Record<string, { label: string; description: string }> = {
  bento: {
    label: "Bento",
    description: "Beautiful bento grid layouts for modern landing pages.",
  },
  inputs: {
    label: "AI Inputs",
    description: "Premium AI chat inputs with model switching and smart modes.",
  },
};

/** Dynamically derived block categories from all blocks */
export const blockCategories: BlockCategory[] = (() => {
  const map = new Map<string, BlockItem[]>();

  for (const block of blocks) {
    const rawCategory = block.category || "uncategorized";
    const categorySlug = toCategorySlug(rawCategory);
    if (!map.has(categorySlug)) map.set(categorySlug, []);
    map.get(categorySlug)!.push(block);
  }


  return Array.from(map.entries())
    .map(([slug, items]) => {
      const meta = categoryLabels[slug];
      const previewBlock = items.find((item) => getBlockPreviewImageUrl(slug, item.slug) || item.image);
      const rawCategory = items[0]?.category ?? slug;
      return {
        slug,
        label: meta?.label ?? formatCategoryLabel(rawCategory),
        description:
          meta?.description ?? `${formatCategoryLabel(rawCategory)} block variants.`,
        count: items.length,
        image: previewBlock
          ? getBlockPreviewImageUrl(slug, previewBlock.slug) ?? previewBlock.image
          : undefined,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
})();

/** Get all blocks for a given category slug */
export function getBlocksByCategory(category: string): BlockItem[] {
  const normalizedCategory = toCategorySlug(category);
  return blocks.filter((b) => toCategorySlug(b.category) === normalizedCategory);
}

/** Check if a block category exists */
export function hasBlockCategory(category: string): boolean {
  const normalizedCategory = toCategorySlug(category);
  return blockCategories.some((c) => c.slug === normalizedCategory);
}
