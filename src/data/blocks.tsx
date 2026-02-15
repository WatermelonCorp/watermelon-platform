import React from "react";

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
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  files: BlockFile[];
  dependencies?: string[];
  featured?: boolean;
  comingSoon?: boolean;
}

// Load all block MDX files (metadata)
const mdxFiles = import.meta.glob("./contents/blocks/*/*.mdx", { eager: true });

// Load all Block Demos (lazy) - from subfolders
const demoComponents = import.meta.glob("./contents/blocks/*/demo.tsx");

// Load all Block source files (raw) - all tsx files in block folders
const blockSources = import.meta.glob("./contents/blocks/*/*.tsx", {
  query: "?raw",
  import: "default",
});

// Helper to get all source files for a block
function getBlockFiles(slug: string): BlockFile[] {
  const files: BlockFile[] = [];
  const prefix = `./contents/blocks/${slug}/`;

  Object.entries(blockSources).forEach(([path, loader]) => {
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

export const blocks: BlockItem[] = Object.entries(mdxFiles)
  .map(([path, mod]: [string, any]) => {
    const frontmatter = mod.frontmatter;

    if (!frontmatter || !frontmatter.slug || !frontmatter.title) {
      console.warn("Skipping block MDX file with missing frontmatter:", path);
      return null;
    }

    const slug = frontmatter.slug;
    const demoKey = `./contents/blocks/${slug}/demo.tsx`;
    const demoLoader = demoComponents[demoKey];

    if (!demoLoader && !frontmatter.comingSoon) {
      console.warn(`Missing demo component for block: ${slug}`);
    }

    return {
      ...frontmatter,
      name: frontmatter.title,
      component: frontmatter.comingSoon
        ? React.lazy(() => Promise.resolve({ default: () => <div className="text-muted-foreground text-center py-20">Coming Soon</div> }))
        : React.lazy(
          (demoLoader as any) ||
          (() => Promise.resolve({ default: () => <div>Missing Block</div> }))
        ),
      files: getBlockFiles(slug),
      category: frontmatter.category || "Uncategorized",
      description: frontmatter.description || "",
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
