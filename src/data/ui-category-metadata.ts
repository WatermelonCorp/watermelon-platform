export interface UiCategoryMetadata {
  slug: string;
  label: string;
  description: string;
  count: number;
}

type CategoryConfigModule = {
  category?: {
    slug: string;
    label: string;
    description: string;
  };
};

const categoryConfigs = import.meta.glob<CategoryConfigModule>(
  './contents/components/*/config.ts',
  { eager: true },
);

// Vite only records loaders here, so the home page can count variants without
// pulling hundreds of component implementations into its initial bundle.
const variantModules = import.meta.glob(
  './contents/components/*/variant-*.tsx',
);

const variantCounts = Object.keys(variantModules).reduce<Record<string, number>>(
  (counts, path) => {
    const slug = path.split('/').at(-2);
    if (slug) counts[slug] = (counts[slug] ?? 0) + 1;
    return counts;
  },
  {},
);

export const uiCategoryMetadata = Object.values(categoryConfigs)
  .map((module) => module.category)
  .filter((category): category is NonNullable<typeof category> =>
    Boolean(category?.slug && category.label),
  )
  .map((category) => ({
    ...category,
    count: variantCounts[category.slug] ?? 0,
  }))
  .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

export const uiVariantCount = Object.keys(variantModules).length;
