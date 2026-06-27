import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TemplateFile {
  name: string;
  path: string;
  code: () => Promise<string>;
}

export interface TemplateItem {
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  video?: string;
  component: React.ComponentType<any>;
  preload?: () => Promise<void>;
  files: TemplateFile[];
  dependencies?: string[];
  install?: string[];
  featured?: boolean;
  comingSoon?: boolean;
  componentNumber?: number;
  inspiredBy?: {
    name: string;
    url?: string;
  };
}

// ─── Glob loaders ─────────────────────────────────────────────────────────────

/** Load all template MDX files (metadata via frontmatter) */
const mdxFiles = import.meta.glob("./contents/templates/*/*.mdx", {
  eager: true,
});

/** Load all template demo components (eager) */
const demoComponents = import.meta.glob(
  "./contents/templates/*/demo.tsx",
  { eager: true },
);

/** Load all template source files as raw strings (lazy) */
const templateSources = import.meta.glob("./contents/templates/**/*.tsx", {
  query: "?raw",
  import: "default",
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Collect every .tsx source file that belongs to a given template slug. */
function getTemplateFiles(slug: string): TemplateFile[] {
  const files: TemplateFile[] = [];
  const prefix = `./contents/templates/${slug}/`;

  Object.entries(templateSources).forEach(([path, loader]) => {
    if (path.startsWith(prefix)) {
      const fileName = path.replace(prefix, "");

      // Skip UI primitives shipped inside the template
      if (fileName.includes("components/ui/")) return;

      files.push({
        name: fileName,
        path: path,
        code: async () => {
          const source = await (loader as () => Promise<string>)();
          return source;
        },
      });
    }
  });

  return files;
}

// ─── Build the registry ───────────────────────────────────────────────────────

export const templates: TemplateItem[] = Object.entries(mdxFiles)
  .map(([path, mod]: [string, any]) => {
    const frontmatter = mod.frontmatter;

    if (!frontmatter || !frontmatter.slug || !frontmatter.title) {
      console.warn(
        "Skipping template MDX file with missing frontmatter:",
        path,
      );
      return null;
    }

    const slug: string = frontmatter.slug;
    const demoKey = `./contents/templates/${slug}/demo.tsx`;
    const demoLoader = demoComponents[demoKey];
    const resolvedLoader = demoLoader as
      | (() => Promise<unknown>)
      | undefined;

    if (!demoLoader && !frontmatter.comingSoon) {
      console.warn(`Missing demo component for template: ${slug}`);
    }

    return {
      ...frontmatter,
      name: frontmatter.title,
      component: frontmatter.comingSoon
        ? () => (
            <div className="text-muted-foreground text-center py-20">
              Coming Soon
            </div>
          )
        : (demoLoader as any)?.default ||
          (() => <div>Missing Template</div>),
      preload: resolvedLoader
        ? async () => {
            await resolvedLoader();
          }
        : undefined,
      files: getTemplateFiles(slug),
      category: frontmatter.category || "Uncategorized",
      description: frontmatter.description || "",
      install: frontmatter.install || [],
    } as TemplateItem;
  })
  .filter((item): item is TemplateItem => item !== null)
  .sort((a, b) => {
    // Featured first, then alphabetically
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Coming soon last
    if (a.comingSoon && !b.comingSoon) return 1;
    if (!a.comingSoon && b.comingSoon) return -1;
    return (a.name || "").localeCompare(b.name || "");
  });

export const allTemplateCategories = Array.from(
  new Set(templates.map((item) => item.category)),
).sort();
