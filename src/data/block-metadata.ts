import { getBlockPreviewImageUrl } from '@/data/block-preview-images';

export interface BlockCategory {
  slug: string;
  label: string;
  description: string;
  count: number;
  image?: string;
}

type BlockMetadata = {
  name: string;
  slug: string;
  category: string;
  image?: string;
};

const mdxFiles = import.meta.glob('./contents/blocks/**/*.mdx', {
  eager: true,
});

function toCategorySlug(category: string) {
  return category.trim().toLowerCase();
}

function formatCategoryLabel(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

const categoryLabels: Record<string, { label: string; description: string }> = {
  bento: {
    label: 'Bento',
    description: 'Beautiful bento grid layouts for modern landing pages.',
  },
  inputs: {
    label: 'AI Inputs',
    description: 'Premium AI chat inputs with model switching and smart modes.',
  },
};

export const blockMetadata: BlockMetadata[] = Object.values(mdxFiles)
  .map<BlockMetadata | null>((mod: any) => {
    const frontmatter = mod.frontmatter;

    if (!frontmatter?.slug || !frontmatter?.title) {
      return null;
    }

    return {
      name: frontmatter.title,
      slug: frontmatter.slug,
      category: frontmatter.category || 'Uncategorized',
      image: frontmatter.image || undefined,
    } satisfies BlockMetadata;
  })
  .filter((item): item is BlockMetadata => item !== null)
  .sort((a, b) => a.name.localeCompare(b.name));

export const blockCategories: BlockCategory[] = (() => {
  const categories = new Map<string, BlockMetadata[]>();

  for (const block of blockMetadata) {
    const categorySlug = toCategorySlug(block.category || 'uncategorized');
    const items = categories.get(categorySlug) ?? [];
    items.push(block);
    categories.set(categorySlug, items);
  }

  return Array.from(categories.entries())
    .map(([slug, items]) => {
      const meta = categoryLabels[slug];
      const previewBlock = items.find(
        (item) => getBlockPreviewImageUrl(slug, item.slug) || item.image,
      );
      const rawCategory = items[0]?.category ?? slug;

      return {
        slug,
        label: meta?.label ?? formatCategoryLabel(rawCategory),
        description:
          meta?.description ??
          `${formatCategoryLabel(rawCategory)} block variants.`,
        count: items.length,
        image: previewBlock
          ? (getBlockPreviewImageUrl(slug, previewBlock.slug) ??
            previewBlock.image)
          : undefined,
      } satisfies BlockCategory;
    })
    .sort((a, b) => a.label.localeCompare(b.label));
})();
