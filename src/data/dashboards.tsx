import React from "react";

export interface DashboardFile {
  name: string;
  path: string;
  code: () => Promise<string>;
}

export interface DashboardItem {
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  video?: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  files: DashboardFile[];
  dependencies?: string[];
  install?: string[];
  featured?: boolean;
  comingSoon?: boolean;
  componentNumber?: number;
}

// Load all dashboard MDX files (metadata)
const mdxFiles = import.meta.glob("./contents/dashboards/*/*.mdx", { eager: true });

// Load all Dashboard Demos (lazy) - from subfolders
const demoComponents = import.meta.glob("./contents/dashboards/*/demo.tsx");

// Load all Dashboard source files (raw) - all tsx files in dashboard folders
const dashboardSources = import.meta.glob("./contents/dashboards/*/*.tsx", {
  query: "?raw",
  import: "default",
});

// Helper to get all source files for a dashboard
function getDashboardFiles(slug: string): DashboardFile[] {
  const files: DashboardFile[] = [];
  const prefix = `./contents/dashboards/${slug}/`;

  Object.entries(dashboardSources).forEach(([path, loader]) => {
    if (path.startsWith(prefix)) {
      const fileName = path.replace(prefix, "");
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

export const dashboards: DashboardItem[] = Object.entries(mdxFiles)
  .map(([path, mod]: [string, any]) => {
    const frontmatter = mod.frontmatter;

    if (!frontmatter || !frontmatter.slug || !frontmatter.title) {
      console.warn("Skipping dashboard MDX file with missing frontmatter:", path);
      return null;
    }

    const slug = frontmatter.slug;
    const demoKey = `./contents/dashboards/${slug}/demo.tsx`;
    const demoLoader = demoComponents[demoKey];

    if (!demoLoader && !frontmatter.comingSoon) {
      console.warn(`Missing demo component for dashboard: ${slug}`);
    }

    return {
      ...frontmatter,
      name: frontmatter.title,
      component: frontmatter.comingSoon
        ? React.lazy(() => Promise.resolve({ default: () => <div className="text-muted-foreground text-center py-20">Coming Soon</div> }))
        : React.lazy(
          (demoLoader as any) ||
          (() => Promise.resolve({ default: () => <div>Missing Dashboard</div> }))
        ),
      files: getDashboardFiles(slug),
      category: frontmatter.category || "Uncategorized",
      description: frontmatter.description || "",
      install: frontmatter.install || [],
    };
  })
  .filter((item): item is DashboardItem => item !== null)
  .sort((a, b) => {
    // Featured first, then alphabetically
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Coming soon last
    if (a.comingSoon && !b.comingSoon) return 1;
    if (!a.comingSoon && b.comingSoon) return -1;
    return (a.name || "").localeCompare(b.name || "");
  });

export const allDashboardCategories = Array.from(
  new Set(dashboards.map((item) => item.category))
).sort();
