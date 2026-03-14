import React from "react";

export interface RegistryItem {
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  video: string;
  component: {
    base: React.LazyExoticComponent<React.ComponentType<any>>;
    original: React.LazyExoticComponent<React.ComponentType<any>>;
  };
  code: {
    base: () => Promise<string>;
    original: () => Promise<string>;
  };
  demoCode: {
    base: () => Promise<string>;
    original: () => Promise<string>;
  };
  install: string[];
  installBase?: string[];
  dependencies?: string[];
  hasVariants?: boolean;
  featured?: boolean;
  featuredOrder?: number;
  componentNumber?: number;
  inspiredByName?: string;
  inspiredByLink?: string;
}

// Load all MDX files (metadata)
const mdxFiles = import.meta.glob("./contents/registry/*.mdx", { eager: true });

// Load all Component Demos (lazy) - from subfolders
const demoBaseComponents = import.meta.glob("./contents/components/*/demo-base.tsx");
const demoOriginalComponents = import.meta.glob("./contents/components/*/demo-original.tsx");
const demoOldComponents = import.meta.glob("./contents/components/*/demo.tsx");

// Load all Component Source Code (lazy) - from subfolders
const componentBaseSource = import.meta.glob("./contents/components/*/base.tsx", {
  query: "?raw",
  import: "default",
});

const componentOriginalSource = import.meta.glob("./contents/components/*/original.tsx", {
  query: "?raw",
  import: "default",
});

const componentOldSource = import.meta.glob("./contents/components/*/index.tsx", {
  query: "?raw",
  import: "default",
});

// Load all Component Demo Source Code (lazy) - from subfolders
const demoBaseSource = import.meta.glob("./contents/components/*/demo-base.tsx", {
  query: "?raw",
  import: "default",
});
const demoOriginalSource = import.meta.glob("./contents/components/*/demo-original.tsx", {
  query: "?raw",
  import: "default",
});
const demoOldSource = import.meta.glob("./contents/components/*/demo.tsx", {
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

    const demoBaseKey = `./contents/components/${slug}/demo-base.tsx`;
    const demoOriginalKey = `./contents/components/${slug}/demo-original.tsx`;
    const demoOldKey = `./contents/components/${slug}/demo.tsx`;
    
    const baseKey = `./contents/components/${slug}/base.tsx`;
    const originalKey = `./contents/components/${slug}/original.tsx`;
    const indexKey = `./contents/components/${slug}/index.tsx`;

    const demoBaseLoader = demoBaseComponents[demoBaseKey] || demoOldComponents[demoOldKey];
    const demoOriginalLoader = demoOriginalComponents[demoOriginalKey] || demoOldComponents[demoOldKey];
    
    const baseLoader = componentBaseSource[baseKey];
    const originalLoader = componentOriginalSource[originalKey] || componentOldSource[indexKey];
    
    const demoCodeBaseLoader = demoBaseSource[demoBaseKey] || demoOldSource[demoOldKey];
    const demoCodeOriginalLoader = demoOriginalSource[demoOriginalKey] || demoOldSource[demoOldKey];

    if (!demoBaseLoader || !demoOriginalLoader) {
      console.warn(`Missing demo component variations for slug: ${slug}`);
    }

    return {
      ...frontmatter,
      name: frontmatter.title, // Map MDX title to RegistryItem name
      component: {
        base: React.lazy(
          (demoBaseLoader as any) ||
          (() => Promise.resolve({ default: () => <div>Missing Base Component</div> }))
        ),
        original: React.lazy(
          (demoOriginalLoader as any) ||
          (() => Promise.resolve({ default: () => <div>Missing Original Component</div> }))
        )
      },
      code: {
        base: async () => {
          if (!baseLoader) return `// Missing base code for ${slug}`;
          const source = await baseLoader();
          return source as string;
        },
        original: async () => {
          if (!originalLoader) return `// Missing original code for ${slug}`;
          const source = await originalLoader();
          return source as string;
        }
      },
      demoCode: {
        base: async () => {
          if (!demoCodeBaseLoader) return `// Missing demo base code for ${slug}`;
          const source = await demoCodeBaseLoader();
          return source as string;
        },
        original: async () => {
          if (!demoCodeOriginalLoader) return `// Missing demo original code for ${slug}`;
          const source = await demoCodeOriginalLoader();
          return source as string;
        }
      },
      // Ensure defaults
      category: frontmatter.category || "Uncategorized",
      description: frontmatter.description || "",
      installBase: frontmatter.installBase || [],
      hasVariants: !!(demoBaseComponents[demoBaseKey] && demoOriginalComponents[demoOriginalKey]),
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
