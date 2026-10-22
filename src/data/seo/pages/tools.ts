import type { SeoPage } from '../types';

/**
 * Tooling pages: CLI, registry, and MCP. Keyword demand from Google autocomplete
 * ("shadcn cli install", "shadcn registry list", "shadcn mcp claude code").
 *
 * Watermelon installs through the shadcn CLI (there is no separate
 * Watermelon CLI package), so the CLI page documents that path.
 */
const updated = '2026-09-29';

export const toolPages: SeoPage[] = [
  {
    kind: 'guide',
    slug: 'cli',
    path: '/cli',
    title: 'Install Components with the shadcn CLI',
    description:
      'Install any Watermelon UI component, block, or dashboard with the shadcn CLI in one command. Setup, install commands, the base variant, and common fixes.',
    h1: 'Install Watermelon UI with the CLI',
    primaryKeyword: 'shadcn cli install',
    secondaryKeywords: ['shadcn cli', 'shadcn add component', 'watermelon ui cli', 'install shadcn components'],
    intro: [
      'Every Watermelon UI component, block, and dashboard installs with the shadcn CLI in one command: `npx shadcn@latest add https://registry.watermelon.sh/r/<name>.json`. The CLI copies the source into your project and installs its dependencies, so the code is yours to edit.',
    ],
    sections: [
      {
        heading: '1. Set up shadcn in your project',
        paragraphs: [
          'If your React project does not use shadcn yet, run `npx shadcn@latest init` once. It sets up Tailwind CSS variables, the `cn` helper, and a `components.json` file that tells the CLI where to put files. See [installation](/installation) for Next.js and Vite.',
        ],
      },
      {
        heading: '2. Add a component',
        paragraphs: [
          'Copy the install command from any component page, or build it from the component name:',
          '`npx shadcn@latest add https://registry.watermelon.sh/r/card-split-accordian.json`',
          'The files land in your components folder, and any npm packages the component needs are installed for you.',
        ],
      },
      {
        heading: 'Theme-token variants',
        paragraphs: [
          'Many animated components also ship a base variant that uses your theme tokens instead of fixed colors. Add `-base` to the name: `https://registry.watermelon.sh/r/card-split-accordian-base.json`.',
        ],
      },
      {
        heading: 'What you can install',
        table: {
          columns: ['Type', 'Example name', 'Browse'],
          rows: [
            ['Components', '`accordion-1`', '[Components](/components)'],
            ['Animated components', '`card-split-accordian`', '[Animated components](/animated-components)'],
            ['Blocks', '`hero-3`', '[Blocks](/blocks)'],
            ['Dashboards', '`agndex-dashboard`', '[Dashboards](/dashboards)'],
          ],
        },
      },
      {
        heading: 'Let your AI agent install for you',
        paragraphs: [
          'Connect the free [Watermelon MCP server](/guides/react-component-mcp-server) to Claude Code, Cursor, or Codex, and the agent can search the catalog and run these install commands itself.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need shadcn/ui to use Watermelon components?',
        answer:
          'You need the shadcn CLI and a `components.json` file, which `npx shadcn@latest init` creates. You do not need to install any shadcn components first.',
      },
      {
        question: 'What if a component file already exists?',
        answer: 'The shadcn CLI asks before overwriting. Pass `--overwrite` to replace files without asking.',
      },
    ],
    related: ['/guides/shadcn-registry', '/guides/shadcn-mcp-server', '/free/react-components', '/guides/copy-paste-vs-component-library'],
    updated,
  },
  {
    kind: 'guide',
    slug: 'shadcn-registry',
    title: 'shadcn Registry Guide: Install From Any Registry',
    description:
      'What a shadcn registry is, how to install from a registry URL or @namespace, how the registry directory works, and a list of popular registries including Watermelon.',
    h1: 'shadcn Registries: How They Work, and Which to Use',
    primaryKeyword: 'shadcn registry',
    secondaryKeywords: [
      'shadcn registry list',
      'shadcn registry directory',
      'shadcn registry url',
      'shadcn registry json',
      'shadcn registry namespace',
    ],
    intro: [
      'A shadcn registry is a set of JSON files that describe components, so the shadcn CLI can install them into your project. You install from a registry either by URL (`npx shadcn@latest add https://.../hero.json`) or by namespace (`npx shadcn@latest add @watermelon/hero-3`). Registries listed in the official shadcn directory, Watermelon UI included, need no setup for the namespace to work.',
    ],
    sections: [
      {
        heading: 'How a registry is structured',
        bullets: [
          'A `registry.json` file lists every item. Schema: `https://ui.shadcn.com/schema/registry.json`.',
          'Each item has its own `<name>.json` file with its source files and dependencies. Schema: `https://ui.shadcn.com/schema/registry-item.json`.',
          'Registry authors generate these with `npx shadcn@latest build`.',
        ],
      },
      {
        heading: 'Install by URL',
        paragraphs: [
          'Any registry item URL works with `add`. For example: `npx shadcn@latest add https://registry.watermelon.sh/r/hero-3.json`. This needs no configuration, which makes it the easiest way to try a component.',
        ],
      },
      {
        heading: 'Install by namespace',
        paragraphs: [
          'Registries in the official shadcn directory, including `@watermelon`, work with no setup: the CLI looks the namespace up and configures it. To pin a registry yourself (or use one that is not listed), add it to the `registries` field in `components.json`, using `{name}` as the placeholder for the item name:',
          '`"registries": { "@watermelon": "https://registry.watermelon.sh/r/{name}.json" }`',
          'Then install with `npx shadcn@latest add @watermelon/hero-3`, or search with `npx shadcn@latest search @watermelon --query hero`. Private registries can add auth headers in the same config, with tokens read from environment variables.',
        ],
      },
      {
        heading: 'The shadcn registry directory',
        paragraphs: [
          'shadcn keeps an official registry directory at `ui.shadcn.com/docs/directory`. When you use an `@namespace` that is not in your `components.json`, the CLI looks it up in that directory and configures it for you. Registries get listed by opening a pull request to the shadcn/ui repository.',
        ],
      },
      {
        heading: 'Popular registries',
        table: {
          columns: ['Registry', 'Namespace', 'Best for'],
          rows: [
            ['Watermelon UI', '`@watermelon`', 'Free blocks, dashboards, and 130+ animated components'],
            ['Magic UI', '`@magicui`', 'Animated landing page components'],
            ['Aceternity UI', '`@aceternity`', 'Animated visual effects'],
            ['Kibo UI', '`@kibo-ui`', 'Advanced app components'],
            ['Supabase UI', '`@supabase`', 'Auth, storage, and realtime components for Supabase'],
            ['AI Elements', '`@ai-elements`', 'Chat and AI interface components'],
          ],
        },
        paragraphs: [
          'Compare options in [best free shadcn alternatives](/guides/best-free-shadcn-alternatives).',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the Watermelon UI registry URL?',
        answer:
          'Items live at `https://registry.watermelon.sh/r/<name>.json`, and the full catalog is at `https://registry.watermelon.sh/r/registry.json`.',
      },
      {
        question: 'Can my AI agent use a registry?',
        answer:
          'Yes. The shadcn MCP server reads the registries in your `components.json`. See the [shadcn MCP server guide](/guides/shadcn-mcp-server).',
      },
    ],
    related: ['/cli', '/guides/shadcn-mcp-server', '/guides/best-free-shadcn-alternatives', '/alternatives/shadcn-ui'],
    updated,
  },
  {
    kind: 'guide',
    slug: 'shadcn-mcp-server',
    title: 'shadcn MCP Server for Claude Code and Cursor: Setup Guide',
    description:
      'Set up the official shadcn MCP server in Claude Code or Cursor, add registries it can search, and when to use a hosted catalog MCP like Watermelon alongside it.',
    h1: 'shadcn MCP Server for Claude Code and Cursor',
    primaryKeyword: 'shadcn mcp claude code',
    secondaryKeywords: ['shadcn mcp', 'shadcn mcp server', 'shadcn mcp cursor', 'shadcn mcp github'],
    intro: [
      'shadcn/ui ships an official MCP server inside its CLI. Run `npx shadcn@latest mcp init --client claude` for Claude Code or `--client cursor` for Cursor, and your agent can browse, search, and install components from the registries in your `components.json`.',
    ],
    sections: [
      {
        heading: 'Set it up',
        table: {
          columns: ['Editor', 'Command', 'Writes'],
          rows: [
            ['Claude Code', '`npx shadcn@latest mcp init --client claude`', '`.mcp.json`'],
            ['Cursor', '`npx shadcn@latest mcp init --client cursor`', '`.cursor/mcp.json`'],
            ['VS Code', '`npx shadcn@latest mcp init --client vscode`', '`.vscode/mcp.json`'],
          ],
        },
        paragraphs: [
          'The server runs locally through the CLI (`npx shadcn@latest mcp`), so there is no URL or API key. Restart your editor after running the command.',
        ],
      },
      {
        heading: 'Give it more components to work with',
        paragraphs: [
          'The shadcn MCP server searches whatever registries your project has configured. Add Watermelon to `components.json` so your agent can find its blocks, dashboards, and animated components too:',
          '`"registries": { "@watermelon": "https://registry.watermelon.sh/r/{name}.json" }`',
          'Then ask your agent for something like "add a pricing section from @watermelon". More on this in the [shadcn registry guide](/guides/shadcn-registry).',
        ],
      },
      {
        heading: 'shadcn MCP vs Watermelon MCP',
        table: {
          columns: ['', 'shadcn MCP', 'Watermelon MCP'],
          rows: [
            ['Runs', 'Locally, through the shadcn CLI', 'Hosted at `https://mcp.watermelon.sh/mcp`'],
            ['Catalog', 'Registries in your components.json', 'The full Watermelon catalog, no setup'],
            ['Good at', 'Installing from any registry you configure', 'Searching and comparing options, composing multi-section pages'],
            ['Cost', 'Free', 'Free, no API key'],
          ],
        },
        paragraphs: [
          'They work well together: use Watermelon MCP to find the right block, and the shadcn MCP server or CLI to install it.',
        ],
      },
      {
        heading: 'Add Watermelon MCP to Claude Code or Cursor',
        bullets: [
          'Claude Code: `claude mcp add --transport http watermelon https://mcp.watermelon.sh/mcp` (add `--scope project` to share it through `.mcp.json`).',
          'Cursor: add `"watermelon": { "url": "https://mcp.watermelon.sh/mcp" }` under `mcpServers` in `.cursor/mcp.json`.',
        ],
        paragraphs: ['Full details are in the [React component MCP server guide](/guides/react-component-mcp-server).'],
      },
    ],
    faqs: [
      {
        question: 'Is the shadcn MCP server free?',
        answer: 'Yes. It is part of the MIT licensed shadcn CLI and runs on your machine.',
      },
      {
        question: 'Does the shadcn MCP server work with third-party registries?',
        answer:
          'Yes. It reads the `registries` field in `components.json`, including private registries with auth headers.',
      },
    ],
    related: ['/guides/react-component-mcp-server', '/guides/shadcn-registry', '/cli', '/guides/ui-components-for-vibe-coding'],
    updated,
  },
];
