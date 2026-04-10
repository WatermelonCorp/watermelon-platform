import type React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UiVariant {
  /** Unique identifier, e.g. "accordion-01" */
  id: string;
  /** Display title shown above the preview */
  title: string;
  /** Live React component to render */
  component: React.ComponentType;
  /** Base shadcn CLI command (package-manager prefix added at runtime) */
  cli: string;
  /** Full source code shown in the code dialog */
  code: string;
  /** Optional column span for the grid (defaults to 1) */
  colSpan?: number;
}

export interface UiCategory {
  /** URL-safe slug, e.g. "accordion" */
  slug: string;
  /** Human-readable label, e.g. "Accordion" */
  label: string;
  /** Short description shown on the category index card */
  description: string;
  /** Preferred grid columns for this category (defaults to 2) */
  columns?: number;
}

// ─── Dynamic Registry Loader ────────────────────────────────────────────────

// Eagerly load all index.ts files from the components directory
const categoryModules = import.meta.glob("./contents/components/*/index.ts", { eager: true });

export const uiRegistry: Record<string, UiVariant[]> = {};
export const uiCategories: UiCategory[] = [];

Object.entries(categoryModules).forEach(([, module]) => {
  const mod = module as any;
  if (mod.category && mod.variants) {
    uiCategories.push(mod.category);
    uiRegistry[mod.category.slug] = mod.variants;
  }
});

// Sort categories alphabetically
uiCategories.sort((a, b) => a.label.localeCompare(b.label));

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Helper: get all variants for a category slug */
export function getUiVariants(category: string): UiVariant[] {
  return uiRegistry[category] ?? [];
}

/** Helper: check if a category exists in the registry */
export function hasUiCategory(category: string): boolean {
  return category in uiRegistry;
}
