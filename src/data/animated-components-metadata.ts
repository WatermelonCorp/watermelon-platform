type AnimatedComponentMetadata = {
  name: string;
  slug: string;
  category: string;
};

const mdxFiles = import.meta.glob('./contents/registry/*.mdx', { eager: true });

export const animatedComponentMetadata: AnimatedComponentMetadata[] =
  Object.values(mdxFiles)
    .map((mod: any) => {
      const frontmatter = mod.frontmatter;

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
