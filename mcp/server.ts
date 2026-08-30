import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';

type CatalogKind = 'animated-components' | 'blocks' | 'dashboards' | 'templates' | 'showcases';

interface CatalogEntry {
  kind: CatalogKind;
  title: string;
  slug: string;
  description: string;
  category?: string;
  image?: string;
  path: string;
}

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const CONTENTS_DIR = path.join(REPO_ROOT, 'src', 'data', 'contents');

function readMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const output: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      output.push(...readMdxFiles(fullPath));
      continue;
    }

    if (entry.name.endsWith('.mdx')) {
      output.push(fullPath);
    }
  }

  return output;
}

function buildEntries(kind: CatalogKind, dir: string): CatalogEntry[] {
  return readMdxFiles(dir)
    .map((filePath) => {
      const frontmatter = matter.read(filePath).data as Record<string, unknown>;
      const slug = typeof frontmatter.slug === 'string' ? frontmatter.slug : '';
      const title = typeof frontmatter.title === 'string' ? frontmatter.title : '';

      if (!slug || !title) {
        return null;
      }

      return {
        kind,
        slug,
        title,
        description: typeof frontmatter.description === 'string' ? frontmatter.description : '',
        category: typeof frontmatter.category === 'string' ? frontmatter.category : undefined,
        image: typeof frontmatter.image === 'string' ? frontmatter.image : undefined,
        path: path.relative(REPO_ROOT, filePath),
      } satisfies CatalogEntry;
    })
    .filter((item): item is CatalogEntry => item !== null);
}

const catalog = {
  'animated-components': buildEntries('animated-components', path.join(CONTENTS_DIR, 'registry')),
  blocks: buildEntries('blocks', path.join(CONTENTS_DIR, 'blocks')),
  dashboards: buildEntries('dashboards', path.join(CONTENTS_DIR, 'dashboards')),
  templates: buildEntries('templates', path.join(CONTENTS_DIR, 'templates')),
  showcases: buildEntries('showcases', path.join(CONTENTS_DIR, 'showcases')),
} satisfies Record<CatalogKind, CatalogEntry[]>;

const kinds = Object.keys(catalog) as CatalogKind[];

serveStdio(() => {
  const server = new McpServer({
    name: 'watermelon-mcp',
    version: '1.0.0',
  });

  server.registerTool(
    'catalog_summary',
    {
      description: 'Return top-level Watermelon catalog counts across content types.',
      inputSchema: z.object({}),
    },
    async () => {
      const summary = kinds.map((kind) => `${kind}: ${catalog[kind].length}`).join('\n');

      return {
        content: [
          {
            type: 'text',
            text: `Watermelon catalog summary\n${summary}`,
          },
        ],
        structuredContent: Object.fromEntries(kinds.map((kind) => [kind, catalog[kind].length])),
      };
    },
  );

  server.registerTool(
    'list_catalog_entries',
    {
      description: 'List Watermelon catalog entries by kind, optionally filtered by category or a search query.',
      inputSchema: z.object({
        kind: z.enum(kinds),
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
            text: filtered.length === 0
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
        kind: z.enum(kinds),
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
});
