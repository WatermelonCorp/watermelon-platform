import React from "react";

export interface BentoFile {
  name: string;
  path: string;
  code: () => Promise<string>;
}

export interface BentoItem {
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  video?: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  preload?: () => Promise<void>;
  files: BentoFile[];
  dependencies?: string[];
  install?: string[];
  featured?: boolean;
  comingSoon?: boolean;
  componentNumber?: number;
}

// Load all bento MDX files (metadata)
const mdxFiles = import.meta.glob("./contents/bentos/*/*.mdx", { eager: true });

// Load all Bento Demos (lazy) - from subfolders
const demoComponents = import.meta.glob("./contents/bentos/*/demo.tsx");

// Load all Bento source files (raw) - all tsx files in bento folders
const bentoSources = import.meta.glob("./contents/bentos/*/*.tsx", {
  query: "?raw",
  import: "default",
});

// Helper to get all source files for a bento
function getBentoFiles(slug: string): BentoFile[] {
  const files: BentoFile[] = [];
  const prefix = `./contents/bentos/${slug}/`;

  Object.entries(bentoSources).forEach(([path, loader]) => {
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

export const bentos: BentoItem[] = Object.entries(mdxFiles)
  .map(([path, mod]: [string, any]) => {
    const frontmatter = mod.frontmatter;

    if (!frontmatter || !frontmatter.slug || !frontmatter.title) {
      console.warn("Skipping bento MDX file with missing frontmatter:", path);
      return null;
    }

    const slug = frontmatter.slug;
    const demoKey = `./contents/bentos/${slug}/demo.tsx`;
    const demoLoader = demoComponents[demoKey];
    const resolvedLoader = (demoLoader as (() => Promise<unknown>) | undefined);

    if (!demoLoader && !frontmatter.comingSoon) {
      console.warn(`Missing demo component for bento: ${slug}`);
    }

    return {
      ...frontmatter,
      name: frontmatter.title,
      component: frontmatter.comingSoon
        ? React.lazy(() => Promise.resolve({ default: () => <div className="text-muted-foreground text-center py-20">Coming Soon</div> }))
        : React.lazy(
          (demoLoader as any) ||
          (() => Promise.resolve({ default: () => <div>Missing Bento</div> }))
        ),
      preload: resolvedLoader ? async () => { await resolvedLoader(); } : undefined,
      files: getBentoFiles(slug),
      category: frontmatter.category || "Uncategorized",
      description: frontmatter.description || "",
      install: frontmatter.install || [],
    };
  })
  .filter((item): item is BentoItem => item !== null)
  .sort((a, b) => {
    // Featured first, then alphabetically
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Coming soon last
    if (a.comingSoon && !b.comingSoon) return 1;
    if (!a.comingSoon && b.comingSoon) return -1;
    return (a.name || "").localeCompare(b.name || "");
  });

export const allBentoCategories = Array.from(
  new Set(bentos.map((item) => item.category))
).sort();
