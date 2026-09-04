import React from "react";

type ComponentModule = {
  default: React.ComponentType<any>;
};

type ComponentLoader = () => Promise<ComponentModule>;
type SourceLoader = () => Promise<string>;

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

// Keep demos and source files out of the initial bundle. They are fetched only
// when a user opens a component preview or requests its source.
const demoBaseComponents = import.meta.glob<ComponentModule>(
  "./contents/animated-components/*/demo-base.tsx",
);
const demoOriginalComponents = import.meta.glob<ComponentModule>(
  "./contents/animated-components/*/demo-original.tsx",
);
const demoOldComponents = import.meta.glob<ComponentModule>(
  "./contents/animated-components/*/demo.tsx",
);

// Load all Component Source Code (eager) - from subfolders
const componentBaseSource = import.meta.glob<string>("./contents/animated-components/*/base.tsx", {
  query: "?raw",
  import: "default",
});

const componentOriginalSource = import.meta.glob<string>("./contents/animated-components/*/original.tsx", {
  query: "?raw",
  import: "default",
});

const componentOldSource = import.meta.glob<string>("./contents/animated-components/*/index.tsx", {
  query: "?raw",
  import: "default",
});

// Load all Component Demo Source Code (eager) - from subfolders
const demoBaseSource = import.meta.glob<string>("./contents/animated-components/*/demo-base.tsx", {
  query: "?raw",
  import: "default",
});
const demoOriginalSource = import.meta.glob<string>("./contents/animated-components/*/demo-original.tsx", {
  query: "?raw",
  import: "default",
});
const demoOldSource = import.meta.glob<string>("./contents/animated-components/*/demo.tsx", {
  query: "?raw",
  import: "default",
});

const MissingComponent = () => <div>Component preview unavailable</div>;

function lazyComponent(loader?: ComponentLoader) {
  return React.lazy(
    loader ?? (async () => ({ default: MissingComponent })),
  );
}

function lazySource(loader: SourceLoader | undefined, fallback: string) {
  return loader ?? (async () => fallback);
}

export const registry: RegistryItem[] = Object.values(mdxFiles)
  .map((mod: any) => {
    const frontmatter = mod.frontmatter;

    if (!frontmatter || !frontmatter.slug || !frontmatter.title) {
      console.warn("Skipping MDX file with missing frontmatter:", mod);
      return null;
    }

    const slug = frontmatter.slug;

    const demoBaseKey = `./contents/animated-components/${slug}/demo-base.tsx`;
    const demoOriginalKey = `./contents/animated-components/${slug}/demo-original.tsx`;
    const demoOldKey = `./contents/animated-components/${slug}/demo.tsx`;
    
    const baseKey = `./contents/animated-components/${slug}/base.tsx`;
    const originalKey = `./contents/animated-components/${slug}/original.tsx`;
    const indexKey = `./contents/animated-components/${slug}/index.tsx`;

    const demoBaseLoader = demoBaseComponents[demoBaseKey] || demoOldComponents[demoOldKey];
    const demoOriginalLoader = demoOriginalComponents[demoOriginalKey] || demoOldComponents[demoOldKey];
    
    const baseCode = componentBaseSource[baseKey];
    const originalCode = componentOriginalSource[originalKey] || componentOldSource[indexKey];
    
    const demoCodeBase = demoBaseSource[demoBaseKey] || demoOldSource[demoOldKey];
    const demoCodeOriginal = demoOriginalSource[demoOriginalKey] || demoOldSource[demoOldKey];

    return {
      ...frontmatter,
      name: frontmatter.title,
      component: {
        base: lazyComponent(demoBaseLoader),
        original: lazyComponent(demoOriginalLoader),
      },
      code: {
        base: lazySource(baseCode, `// Missing base code for ${slug}`),
        original: lazySource(originalCode, `// Missing original code for ${slug}`),
      },
      demoCode: {
        base: lazySource(demoCodeBase, `// Missing demo base code for ${slug}`),
        original: lazySource(demoCodeOriginal, `// Missing demo original code for ${slug}`),
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
