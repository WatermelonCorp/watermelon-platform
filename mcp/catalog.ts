import { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';

export const catalogKinds = [
  'components',
  'animated-components',
  'blocks',
  'dashboards',
  'templates',
  'showcases',
] as const;

export type CatalogKind = (typeof catalogKinds)[number];

export interface CatalogEntry {
  kind: CatalogKind;
  title: string;
  slug: string;
  description: string;
  category?: string;
  image?: string;
  path: string;
  previewUrl: string;
  registryUrl?: string;
  installCommand?: string;
  dependencies?: string[];
}

export type CatalogData = Record<CatalogKind, CatalogEntry[]>;

type RegistryFile = { path: string; type: string; content: string };
type RegistryItem = {
  name: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
};

export type CatalogServerOptions = { fetchRegistry?: typeof fetch };

const stopWords = new Set([
  'a', 'an', 'and', 'build', 'create', 'for', 'in', 'me', 'of', 'page',
  'section', 'the', 'to', 'with',
]);

function allEntries(catalog: CatalogData) {
  return catalogKinds.flatMap((kind) => catalog[kind]);
}

function tokenize(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function scoreEntry(entry: CatalogEntry, query: string) {
  const terms = tokenize(query);
  if (terms.length === 0) return 1;

  const title = `${entry.title} ${entry.slug}`.toLowerCase();
  const category = entry.category?.toLowerCase() ?? '';
  const description = entry.description.toLowerCase();

  return terms.reduce((score, term) => {
    if (title.includes(term)) return score + 8;
    if (category.includes(term)) return score + 5;
    if (description.includes(term)) return score + 2;
    return score;
  }, 0);
}

export function searchCatalog(
  catalog: CatalogData,
  query: string,
  options: { kinds?: CatalogKind[]; category?: string; limit?: number } = {},
) {
  const normalizedCategory = options.category?.trim().toLowerCase();
  const allowedKinds = new Set(options.kinds ?? catalogKinds);

  return allEntries(catalog)
    .filter((entry) => allowedKinds.has(entry.kind))
    .filter((entry) =>
      normalizedCategory
        ? entry.category?.toLowerCase() === normalizedCategory
        : true,
    )
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) =>
      right.score - left.score || left.entry.title.localeCompare(right.entry.title),
    )
    .slice(0, options.limit ?? 12)
    .map(({ entry }) => entry);
}

export function findCatalogEntry(catalog: CatalogData, slug: string, kind?: CatalogKind) {
  const normalizedSlug = slug.trim().toLowerCase();
  const entries = kind ? catalog[kind] : allEntries(catalog);
  return entries.find((entry) => entry.slug.toLowerCase() === normalizedSlug);
}

export function listCatalogCategories(catalog: CatalogData, kind?: CatalogKind) {
  const kinds = kind ? [kind] : catalogKinds;

  return kinds.flatMap((catalogKind) => {
    const counts = new Map<string, number>();
    for (const entry of catalog[catalogKind]) {
      const category = entry.category?.trim() || 'Uncategorized';
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }

    return [...counts.entries()]
      .map(([category, count]) => ({ kind: catalogKind, category, count }))
      .sort((left, right) =>
        left.kind.localeCompare(right.kind) || left.category.localeCompare(right.category),
      );
  });
}

function compactEntry(entry: CatalogEntry) {
  return {
    kind: entry.kind,
    title: entry.title,
    slug: entry.slug,
    description: entry.description,
    category: entry.category,
    previewUrl: entry.previewUrl,
    registryUrl: entry.registryUrl,
    installCommand: entry.installCommand,
    dependencies: entry.dependencies,
  };
}

function textResult(text: string, structuredContent: Record<string, unknown>) {
  return { content: [{ type: 'text' as const, text }], structuredContent };
}

function inferPageSections(prompt: string, requested?: string[]) {
  if (requested?.length) return requested.slice(0, 8);

  const knownSections = [
    'navigation', 'announcement', 'hero', 'feature', 'integrations', 'stats',
    'testimonials', 'pricing', 'faq', 'cta', 'newsletter', 'contact', 'footer',
  ];
  const normalizedPrompt = prompt.toLowerCase();
  const mentioned = knownSections.filter((section) => normalizedPrompt.includes(section));

  if (mentioned.length) return mentioned;
  if (normalizedPrompt.includes('saas')) {
    return ['navigation', 'hero', 'feature', 'pricing', 'testimonials', 'faq', 'cta', 'footer'];
  }

  return ['navigation', 'hero', 'feature', 'testimonials', 'cta', 'footer'];
}

export function composePagePlan(catalog: CatalogData, prompt: string, requestedSections?: string[]) {
  return inferPageSections(prompt, requestedSections).map((section) => {
    const exactCategory = catalog.blocks.filter(
      (entry) => entry.category?.toLowerCase() === section.toLowerCase(),
    );
    const candidates = exactCategory.length
      ? exactCategory
      : searchCatalog(catalog, `${prompt} ${section}`, { kinds: ['blocks'], limit: 3 });
    const selected = [...candidates].sort((left, right) =>
      left.slug.localeCompare(right.slug),
    )[0];

    return {
      section,
      selected: selected ? compactEntry(selected) : null,
      alternatives: candidates.slice(1, 3).map(compactEntry),
    };
  });
}

export function createCatalogServer(catalog: CatalogData, options: CatalogServerOptions = {}) {
  const fetchRegistry = options.fetchRegistry ?? fetch;
  const server = new McpServer(
    {
      name: 'watermelon-mcp',
      version: '2.0.0',
      description: 'Watermelon UI discovery and installation tools for source-backed UI.',
    },
    {
      instructions: 'Search Watermelon before writing UI from scratch. Use search or get_inspiration to compare source-backed options, then get_component for installable source and dependencies. Use compose_page for multi-section pages. All tools are read-only and require no API key.',
    },
  );

  server.registerTool(
    'search',
    {
      description: 'Search the complete Watermelon UI catalog across components, animated components, blocks, dashboards, templates, and showcases.',
      inputSchema: z.object({
        query: z.string().min(1).describe('Natural-language UI need, such as "animated pricing card".'),
        kinds: z.array(z.enum(catalogKinds)).optional(),
        category: z.string().optional(),
        limit: z.number().int().min(1).max(50).optional(),
      }),
    },
    async ({ query, kinds, category, limit }) => {
      const entries = searchCatalog(catalog, query, { kinds, category, limit });
      return textResult(
        entries.length
          ? entries.map((entry) => `- ${entry.title}: ${entry.previewUrl}`).join('\n')
          : 'No Watermelon entries matched. Try a broader design or category term.',
        { query, count: entries.length, entries: entries.map(compactEntry) },
      );
    },
  );

  server.registerTool(
    'get_component',
    {
      description: 'Get a Watermelon entry with preview, dependencies, install command, and source files when an installable registry item is available.',
      inputSchema: z.object({
        slug: z.string().min(1),
        kind: z.enum(catalogKinds).optional(),
      }),
    },
    async ({ slug, kind }) => {
      const entry = findCatalogEntry(catalog, slug, kind);
      if (!entry) {
        return textResult(`No Watermelon entry found for slug "${slug}".`, { found: false, slug, kind });
      }

      let registryItem: RegistryItem | null = null;
      let registryError: string | undefined;
      if (entry.registryUrl) {
        try {
          const response = await fetchRegistry(entry.registryUrl, { headers: { Accept: 'application/json' } });
          if (response.ok) registryItem = (await response.json()) as RegistryItem;
          else registryError = `Registry returned HTTP ${response.status}.`;
        } catch {
          registryError = 'Registry could not be reached.';
        }
      }

      const details = {
        ...compactEntry(entry),
        sourcePath: entry.path,
        sourceFiles: registryItem?.files ?? [],
        dependencies: registryItem?.dependencies ?? entry.dependencies ?? [],
        registryDependencies: registryItem?.registryDependencies ?? [],
        registryError,
      };

      return textResult(
        [
          entry.title,
          entry.description,
          `Preview: ${entry.previewUrl}`,
          entry.installCommand ? `Install: ${entry.installCommand}` : 'Install: browse the source-backed preview for this composition.',
          registryError ? `Note: ${registryError}` : undefined,
        ].filter(Boolean).join('\n'),
        { found: true, component: details },
      );
    },
  );

  server.registerTool(
    'get_inspiration',
    {
      description: 'Return 3-6 visually relevant Watermelon UI options for a design goal before choosing an implementation.',
      inputSchema: z.object({
        prompt: z.string().min(1),
        kinds: z.array(z.enum(catalogKinds)).optional(),
        limit: z.number().int().min(3).max(6).optional(),
      }),
    },
    async ({ prompt, kinds, limit }) => {
      const entries = searchCatalog(catalog, prompt, { kinds, limit: limit ?? 4 });
      return textResult(
        entries.length
          ? entries.map((entry) => `- ${entry.title} (${entry.kind}): ${entry.previewUrl}`).join('\n')
          : 'No close inspiration matches were found. Try a broader visual description.',
        { prompt, count: entries.length, entries: entries.map(compactEntry) },
      );
    },
  );

  server.registerTool(
    'compose_page',
    {
      description: 'Create a source-backed page plan by selecting compatible Watermelon blocks for each requested section.',
      inputSchema: z.object({
        prompt: z.string().min(1),
        sections: z.array(z.string().min(1)).max(8).optional(),
      }),
    },
    async ({ prompt, sections }) => {
      const plan = composePagePlan(catalog, prompt, sections);
      return textResult(
        plan.map((item) => item.selected
          ? `${item.section}: ${item.selected.title} (${item.selected.previewUrl})`
          : `${item.section}: no matching block yet`).join('\n'),
        { prompt, plan },
      );
    },
  );

  server.registerTool(
    'list_categories',
    {
      description: 'List Watermelon UI categories and accurate entry counts, optionally for one catalog kind.',
      inputSchema: z.object({ kind: z.enum(catalogKinds).optional() }),
    },
    async ({ kind }) => {
      const categories = listCatalogCategories(catalog, kind);
      return textResult(
        categories.map((item) => `${item.kind} / ${item.category}: ${item.count}`).join('\n'),
        { count: categories.length, categories },
      );
    },
  );

  // Compatibility aliases keep established clients working while they migrate.
  server.registerTool(
    'catalog_summary',
    {
      description: 'Return top-level Watermelon catalog counts across content types.',
      inputSchema: z.object({}),
    },
    async () => {
      const counts = Object.fromEntries(catalogKinds.map((kind) => [kind, catalog[kind].length]));
      return textResult(
        catalogKinds.map((kind) => `${kind}: ${catalog[kind].length}`).join('\n'),
        { total: allEntries(catalog).length, counts },
      );
    },
  );

  server.registerTool(
    'list_catalog_entries',
    {
      description: 'Compatibility alias for listing Watermelon entries by kind.',
      inputSchema: z.object({
        kind: z.enum(catalogKinds),
        category: z.string().optional(),
        query: z.string().optional(),
        limit: z.number().int().min(1).max(50).optional(),
      }),
    },
    async ({ kind, category, query, limit }) => {
      const entries = searchCatalog(catalog, query ?? '', { kinds: [kind], category, limit });
      return textResult(
        entries.length ? entries.map((entry) => `- ${entry.title} (${entry.slug})`).join('\n') : `No ${kind} entries matched.`,
        { kind, count: entries.length, entries: entries.map(compactEntry) },
      );
    },
  );

  server.registerTool(
    'get_catalog_entry',
    {
      description: 'Compatibility alias for getting one Watermelon entry by kind and slug.',
      inputSchema: z.object({ kind: z.enum(catalogKinds), slug: z.string().min(1) }),
    },
    async ({ kind, slug }) => {
      const entry = findCatalogEntry(catalog, slug, kind);
      return entry
        ? textResult(`${entry.title}\n${entry.description}\nPreview: ${entry.previewUrl}`, { found: true, entry: compactEntry(entry) })
        : textResult(`No ${kind} entry found for slug "${slug}".`, { found: false, kind, slug });
    },
  );

  return server;
}
