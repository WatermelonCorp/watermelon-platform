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
    overridden: React.LazyExoticComponent<React.ComponentType<any>>;
  };
  code: {
    base: () => Promise<string>;
    overridden: () => Promise<string>;
  };
  demoCode: {
    base: () => Promise<string>;
    overridden: () => Promise<string>;
  };
  install: string[];
  dependencies?: string[];
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
const demoOverriddenComponents = import.meta.glob("./contents/components/*/demo-overridden.tsx");
const demoOldComponents = import.meta.glob("./contents/components/*/demo.tsx");

// Load all Component Source Code (lazy) - from subfolders
const componentBaseSource = import.meta.glob("./contents/components/*/base.tsx", {
  query: "?raw",
  import: "default",
});

const componentOverriddenSource = import.meta.glob("./contents/components/*/overridden.tsx", {
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
const demoOverriddenSource = import.meta.glob("./contents/components/*/demo-overridden.tsx", {
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
    const demoOverriddenKey = `./contents/components/${slug}/demo-overridden.tsx`;
    const demoOldKey = `./contents/components/${slug}/demo.tsx`;
    
    const baseKey = `./contents/components/${slug}/base.tsx`;
    const overriddenKey = `./contents/components/${slug}/overridden.tsx`;
    const indexKey = `./contents/components/${slug}/index.tsx`;

    const demoBaseLoader = demoBaseComponents[demoBaseKey] || demoOldComponents[demoOldKey];
    const demoOverriddenLoader = demoOverriddenComponents[demoOverriddenKey] || demoOldComponents[demoOldKey];
    
    const baseLoader = componentBaseSource[baseKey];
    const overriddenLoader = componentOverriddenSource[overriddenKey] || componentOldSource[indexKey];
    
    const demoCodeBaseLoader = demoBaseSource[demoBaseKey] || demoOldSource[demoOldKey];
    const demoCodeOverriddenLoader = demoOverriddenSource[demoOverriddenKey] || demoOldSource[demoOldKey];

    if (!demoBaseLoader || !demoOverriddenLoader) {
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
        overridden: React.lazy(
          (demoOverriddenLoader as any) ||
          (() => Promise.resolve({ default: () => <div>Missing Overridden Component</div> }))
        )
      },
      code: {
        base: async () => {
          if (!baseLoader) return `// Missing base code for ${slug}`;
          const source = await baseLoader();
          return source as string;
        },
        overridden: async () => {
          if (!overriddenLoader) return `// Missing overridden code for ${slug}`;
          const source = await overriddenLoader();
          return source as string;
        }
      },
      demoCode: {
        base: async () => {
          if (!demoCodeBaseLoader) return `// Missing demo base code for ${slug}`;
          const source = await demoCodeBaseLoader();
          return source as string;
        },
        overridden: async () => {
          if (!demoCodeOverriddenLoader) return `// Missing demo overridden code for ${slug}`;
          const source = await demoCodeOverriddenLoader();
          return source as string;
        }
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
