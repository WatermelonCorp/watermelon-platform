import { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';

export const catalogKinds = [
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
}

export type CatalogData = Record<CatalogKind, CatalogEntry[]>;

export function createCatalogServer(catalog: CatalogData) {
  const server = new McpServer({
    name: 'watermelon-mcp',
    version: '1.1.0',
    description: 'Watermelon catalog tools for components, blocks, dashboards, templates, and showcases.',
  });

  server.registerTool(
    'catalog_summary',
    {
      description: 'Return top-level Watermelon catalog counts across content types.',
      inputSchema: z.object({}),
    },
    async () => {
      const summary = catalogKinds.map((kind) => `${kind}: ${catalog[kind].length}`).join('\n');

      return {
        content: [
          {
            type: 'text',
            text: `Watermelon catalog summary\n${summary}`,
          },
        ],
        structuredContent: Object.fromEntries(catalogKinds.map((kind) => [kind, catalog[kind].length])),
      };
    },
  );

  server.registerTool(
    'list_catalog_entries',
    {
      description: 'List Watermelon catalog entries by kind, optionally filtered by category or a search query.',
      inputSchema: z.object({
        kind: z.enum(catalogKinds),
        category: z.string().optional(),
        query: z.string().optional(),
        limit: z.number().int().min(1).max(50).optional(),
      }),
    },
    async ({ kind, category, query, limit }) => {
      const normalizedQuery = query?.trim().toLowerCase();
      const filtered = catalog[kind]
        .filter((entry) => (category ? entry.category === category : true))
        .filter((entry) => {
          if (!normalizedQuery) return true;

          return [entry.title, entry.slug, entry.description, entry.category]
            .filter(Boolean)
            .some((value) => value!.toLowerCase().includes(normalizedQuery));
        })
        .slice(0, limit ?? 12);

      return {
        content: [
          {
            type: 'text',
            text:
              filtered.length === 0
                ? `No ${kind} entries matched.`
                : filtered.map((entry) => `- ${entry.title} (${entry.slug})`).join('\n'),
          },
        ],
        structuredContent: {
          kind,
          count: filtered.length,
          entries: filtered,
        },
      };
    },
  );

  server.registerTool(
    'get_catalog_entry',
    {
      description: 'Get one Watermelon catalog entry by kind and slug.',
      inputSchema: z.object({
        kind: z.enum(catalogKinds),
        slug: z.string().min(1),
      }),
    },
    async ({ kind, slug }) => {
      const entry = catalog[kind].find((item) => item.slug === slug);

      if (!entry) {
        return {
          content: [
            {
              type: 'text',
              text: `No ${kind} entry found for slug "${slug}".`,
            },
          ],
          structuredContent: {
            found: false,
            kind,
            slug,
          },
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: `${entry.title}\n${entry.description}\nSource: ${entry.path}`,
          },
        ],
        structuredContent: {
          found: true,
          entry,
        },
      };
    },
  );

  return server;
}
