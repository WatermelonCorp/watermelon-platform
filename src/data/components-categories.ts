import type { UiCategory } from "./components-registry";

// Category labels for nav and search. Reads only each category's config.ts,
// so the sidebar does not pull every live variant and its source code into
// the main bundle the way importing components-registry would.
const configModules = import.meta.glob<{ category?: UiCategory }>(
  "./contents/components/*/config.ts",
  { eager: true },
);

export const uiCategories: UiCategory[] = Object.values(configModules)
  .map((mod) => mod.category)
  .filter((category): category is UiCategory => Boolean(category))
  .sort((a, b) => a.label.localeCompare(b.label));
