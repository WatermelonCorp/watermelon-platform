import { describe, expect, it } from 'bun:test';
import { catalog } from './catalog.generated';
import {
  composePagePlan,
  findCatalogEntry,
  listCatalogCategories,
  searchCatalog,
} from './catalog';

describe('Watermelon MCP catalog', () => {
  it('indexes the complete 850-example catalog', () => {
    expect(catalog.components).toHaveLength(516);
    expect(Object.values(catalog).flat()).toHaveLength(850);
  });

  it('searches across catalog kinds by natural-language terms', () => {
    const results = searchCatalog(catalog, 'pricing', { limit: 10 });

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((entry) =>
      `${entry.title} ${entry.category}`.toLowerCase().includes('pricing'),
    )).toBe(true);
  });

  it('finds installable base components without requiring a kind', () => {
    const entry = findCatalogEntry(catalog, 'accordion-1');

    expect(entry?.kind).toBe('components');
    expect(entry?.registryUrl).toBe(
      'https://registry.watermelon.sh/r/accordion-1.json',
    );
  });

  it('reports accurate category counts', () => {
    const categories = listCatalogCategories(catalog, 'components');
    const accordion = categories.find((item) => item.category === 'accordion');

    expect(accordion?.count).toBe(16);
  });

  it('composes a SaaS page from real block entries', () => {
    const plan = composePagePlan(catalog, 'Build a SaaS landing page');

    expect(plan.map((item) => item.section)).toContain('pricing');
    expect(plan.every((item) => item.selected?.kind === 'blocks')).toBe(true);
  });
});
