type DashboardMetadata = {
  name: string;
  slug: string;
  category: string;
};

const mdxFiles = import.meta.glob('./contents/dashboards/*/*.mdx', {
  eager: true,
});

export const dashboardMetadata: DashboardMetadata[] = Object.values(mdxFiles)
  .map((mod: any) => {
    const frontmatter = mod.frontmatter;

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
