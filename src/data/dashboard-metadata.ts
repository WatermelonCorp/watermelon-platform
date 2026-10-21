type DashboardMetadata = {
  name: string;
  slug: string;
  category: string;
};

const mdxFiles = import.meta.glob('./contents/dashboards/*/*.mdx', {
  eager: true,
  // Frontmatter only (see mdxFrontmatter in vite.config.ts), so the compiled
  // MDX bodies stay out of the main bundle.
  query: '?frontmatter=title,slug,category',
  import: 'frontmatter',
});

export const dashboardMetadata: DashboardMetadata[] = Object.values(mdxFiles)
  .map((frontmatter: any) => {
    if (!frontmatter?.slug || !frontmatter?.title) {
      return null;
    }

    return {
      name: frontmatter.title,
      slug: frontmatter.slug,
      category: frontmatter.category || 'Uncategorized',
    } satisfies DashboardMetadata;
  })
  .filter((item): item is DashboardMetadata => item !== null)
  .sort((a, b) => a.name.localeCompare(b.name));
