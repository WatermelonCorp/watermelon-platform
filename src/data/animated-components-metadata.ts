type AnimatedComponentMetadata = {
  name: string;
  slug: string;
  category: string;
};

const mdxFiles = import.meta.glob('./contents/registry/*.mdx', {
  eager: true,
  // Frontmatter only (see mdxFrontmatter in vite.config.ts), so the compiled
  // MDX bodies stay out of the main bundle.
  query: '?frontmatter=title,slug,category',
  import: 'frontmatter',
});

export const animatedComponentMetadata: AnimatedComponentMetadata[] =
  Object.values(mdxFiles)
    .map((frontmatter: any) => {
      if (!frontmatter?.slug || !frontmatter?.title) {
        return null;
      }

      return {
        name: frontmatter.title,
        slug: frontmatter.slug,
        category: frontmatter.category || 'Uncategorized',
      } satisfies AnimatedComponentMetadata;
    })
    .filter((item): item is AnimatedComponentMetadata => item !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

export const allAnimatedCategories = Array.from(
  new Set(animatedComponentMetadata.map((item) => item.category)),
).sort();
