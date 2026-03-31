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

// Load all Component Demos (eager) - from subfolders
const demoBaseComponents = import.meta.glob("./contents/components/*/demo-base.tsx", { eager: true });
const demoOriginalComponents = import.meta.glob("./contents/components/*/demo-original.tsx", { eager: true });
const demoOldComponents = import.meta.glob("./contents/components/*/demo.tsx", { eager: true });

// Load all Component Source Code (eager) - from subfolders
const componentBaseSource = import.meta.glob("./contents/components/*/base.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

const componentOriginalSource = import.meta.glob("./contents/components/*/original.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

const componentOldSource = import.meta.glob("./contents/components/*/index.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Load all Component Demo Source Code (eager) - from subfolders
const demoBaseSource = import.meta.glob("./contents/components/*/demo-base.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});
const demoOriginalSource = import.meta.glob("./contents/components/*/demo-original.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});
const demoOldSource = import.meta.glob("./contents/components/*/demo.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const registry: RegistryItem[] = Object.values(mdxFiles)
  .map((mod: any) => {
    const frontmatter = mod.frontmatter;

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

    const demoBaseModule = demoBaseComponents[demoBaseKey] || demoOldComponents[demoOldKey];
    const demoOriginalModule = demoOriginalComponents[demoOriginalKey] || demoOldComponents[demoOldKey];
    
    const baseCode = componentBaseSource[baseKey];
    const originalCode = componentOriginalSource[originalKey] || componentOldSource[indexKey];
    
    const demoCodeBase = demoBaseSource[demoBaseKey] || demoOldSource[demoOldKey];
    const demoCodeOriginal = demoOriginalSource[demoOriginalKey] || demoOldSource[demoOldKey];

    return {
      ...frontmatter,
      name: frontmatter.title,
      component: {
        base: (demoBaseModule as any)?.default || (() => <div>Missing Base Component</div>),
        original: (demoOriginalModule as any)?.default || (() => <div>Missing Original Component</div>)
      },
      code: {
        base: async () => (baseCode as string) || `// Missing base code for ${slug}`,
        original: async () => (originalCode as string) || `// Missing original code for ${slug}`
      },
      demoCode: {
        base: async () => (demoCodeBase as string) || `// Missing demo base code for ${slug}`,
        original: async () => (demoCodeOriginal as string) || `// Missing demo original code for ${slug}`
      },
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
