import React from "react";

export interface RegistryItem {
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  video: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  code: () => Promise<string>;
  demoCode: () => Promise<string>;
  install: string[];
  dependencies?: string[];
  featured?: boolean;
  featuredOrder?: number;
}

// Load all MDX files (metadata)
const mdxFiles = import.meta.glob("./contents/registry/*.mdx", { eager: true });

// NEW STRUCTURE: ./contents/components/[component-name]/index.tsx and demo.tsx
// Load all Component Demos (lazy) - from subfolders
const demoComponents = import.meta.glob("./contents/components/*/demo.tsx");

// Load all Component Source Code (lazy) - from subfolders
const componentSource = import.meta.glob("./contents/components/*/index.tsx", {
  query: "?raw",
  import: "default",
});

// Load all Component Demo Source Code (lazy) - from subfolders
const demoSource = import.meta.glob("./contents/components/*/demo.tsx", {
  query: "?raw",
  import: "default",
});

export const registry: RegistryItem[] = Object.values(mdxFiles)
  .map((mod: any) => {
    const frontmatter = mod.frontmatter;

    // Skip if frontmatter is missing or invalid
    // Check for title since MDX uses title, map it to name later
    if (!frontmatter || !frontmatter.slug || !frontmatter.title) {
      console.warn("Skipping MDX file with missing frontmatter:", mod);
      return null;
    }

    const slug = frontmatter.slug;

    // NEW STRUCTURE: ./contents/components/[slug]/index.tsx and demo.tsx
    const demoKey = `./contents/components/${slug}/demo.tsx`;
    const codeKey = `./contents/components/${slug}/index.tsx`;

    const demoLoader = demoComponents[demoKey];
    const codeLoader = componentSource[codeKey];
    const demoCodeLoader = demoSource[demoKey];

    if (!demoLoader) {
      console.warn(`Missing demo component for slug: ${slug}`);
    }

    return {
      ...frontmatter,
      name: frontmatter.title, // Map MDX title to RegistryItem name
      component: React.lazy(
        (demoLoader as any) ||
        (() => Promise.resolve({ default: () => <div>Missing Component</div> }))
      ),
      code: async () => {
        if (!codeLoader) return `// Missing code for ${slug}`;
        const source = await codeLoader();
        return source as string;
      },
      demoCode: async () => {
        if (!demoCodeLoader) return `// Missing demo code for ${slug}`;
        const source = await demoCodeLoader();
        return source as string;
      },
      // Ensure defaults
      category: frontmatter.category || "Uncategorized",
      description: frontmatter.description || "",
    };
  })
  .filter((item): item is RegistryItem => item !== null) // Remove null entries
  .sort((a, b) => {
    // Sort by featuredOrder if both featured, then by name
    if (a.featured && b.featured) {
      return (a.featuredOrder || 99) - (b.featuredOrder || 99);
    }
    if (a.featured) return -1;
    if (b.featured) return 1;
    return (a.name || "").localeCompare(b.name || "");
  });

export const allCategories = Array.from(
  new Set(registry.map((item) => item.category))
).sort();
