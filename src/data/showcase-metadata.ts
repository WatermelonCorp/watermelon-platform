type ShowcaseMetadata = {
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  tags: string[];
};

const mdxFiles = import.meta.glob('./contents/showcases/*.mdx', {
  eager: true,
});

export const showcaseMetadata: ShowcaseMetadata[] = Object.values(mdxFiles)
  .map((mod: any) => {
    const frontmatter = mod.frontmatter;

    if (!frontmatter?.slug || !frontmatter?.title) {
      return null;
    }

    return {
      name: frontmatter.title,
      slug: frontmatter.slug,
      description: frontmatter.description || '',
      image: frontmatter.image || '/og-image.avif',
      featured: Boolean(frontmatter.featured),
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
    } satisfies ShowcaseMetadata;
  })
  .filter((item): item is ShowcaseMetadata => item !== null)
  .sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });
