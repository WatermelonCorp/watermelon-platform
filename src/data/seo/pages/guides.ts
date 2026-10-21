import type { SeoPage } from '../types';

const updated = '2026-09-29';

export const guidePages: SeoPage[] = [
  {
    kind: 'guide',
    slug: 'react-component-mcp-server',
    title: 'React Component MCP Server for Claude, Cursor, and Codex',
    description:
      'Connect a free React component MCP server to Claude, Cursor, or Codex. Watermelon MCP lets agents search 800+ components and pull installable source.',
    h1: 'React Component MCP Server',
    primaryKeyword: 'react component mcp server',
    secondaryKeywords: [
      'react component library mcp',
      'react components mcp',
      'tailwind components mcp',
      'ui components mcp',
      'shadcn mcp alternative',
    ],
    intro: [
      'Watermelon MCP is a free, hosted Model Context Protocol server that lets AI coding agents search the Watermelon UI catalog and pull installable React component source. Add `https://mcp.watermelon.sh/mcp` as a remote MCP server in Claude, Cursor, Codex, or any client that supports Streamable HTTP. No API key is needed.',
      'Instead of the agent guessing at UI from memory, it can search real components, compare options, and install one with the shadcn CLI.',
    ],
    sections: [
      {
        heading: 'Connect it',
        bullets: [
          'Server URL: `https://mcp.watermelon.sh/mcp`',
          'Transport: Streamable HTTP',
          'Auth: none, read-only and public',
        ],
        paragraphs: [
          'In Claude Code, run `claude mcp add --transport http watermelon https://mcp.watermelon.sh/mcp`. In Cursor, add the URL under MCP servers in settings. Full setup notes are on the [MCP docs page](/developers/mcp).',
        ],
      },
      {
        heading: 'Tools the server exposes',
        table: {
          columns: ['Tool', 'What it does'],
          rows: [
            ['search', 'Finds components, blocks, and dashboards that match a request'],
            ['get_inspiration', 'Returns several source-backed options to compare'],
            ['get_component', 'Returns installable source and dependencies'],
            ['compose_page', 'Suggests blocks for a multi-section page'],
            ['list_categories', 'Lists categories with accurate counts'],
          ],
        },
      },
      {
        heading: 'Why an MCP server beats pasting docs into a prompt',
        paragraphs: [
          'Agents write better UI when they start from working code. An MCP server gives the agent a structured, always current catalog, so it can pick a real [hero section](/blocks/hero) or [data table](/components/data-table) and install it instead of inventing markup. It also keeps your context window small, because the agent fetches only the component it needs.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the Watermelon MCP server free?',
        answer: 'Yes. It is public, read-only, and needs no account or API key.',
      },
      {
        question: 'Which clients are supported?',
        answer:
          'Any MCP client that supports remote Streamable HTTP servers, including Claude, Claude Code, Cursor, and Codex.',
      },
    ],
    related: [
      '/guides/ui-components-for-vibe-coding',
      '/guides/shadcn-mcp-server',
      '/cli',
      '/alternatives/shadcn-ui',
      '/free/react-components',
    ],
    updated,
  },
  {
    kind: 'guide',
    slug: 'best-free-shadcn-alternatives',
    title: 'Best Free shadcn/ui Alternatives in 2026',
    description:
      'The best free shadcn/ui alternatives in 2026, compared honestly: Watermelon UI, Aceternity UI, Magic UI, daisyUI, HeroUI, Flowbite, and more.',
    h1: 'Best Free shadcn/ui Alternatives in 2026',
    primaryKeyword: 'best free shadcn alternatives',
    secondaryKeywords: [
      'shadcn alternatives 2026',
      'shadcn alternative free',
      'shadcn alternatives reddit',
      'shadcn alternative without tailwind',
    ],
    intro: [
      'The best free shadcn/ui alternative depends on what you are missing. For more animated components and full page blocks in the same copy-paste style, use Watermelon UI, Aceternity UI, or Magic UI. For a classic npm package, use HeroUI or Mantine. For CSS-only styling that works outside React, use daisyUI.',
      'shadcn/ui itself is excellent and free. Most people looking for an alternative actually want something alongside it: more sections, more motion, or less setup.',
    ],
    sections: [
      {
        heading: 'Quick comparison',
        table: {
          columns: ['Library', 'Best for', 'Model', 'Free'],
          rows: [
            ['[Watermelon UI](/alternatives/shadcn-ui)', 'Blocks, dashboards, and animated components in shadcn style', 'Copy-paste, shadcn registry', 'Yes, MIT'],
            ['[Aceternity UI](/alternatives/aceternity-ui)', 'Eye-catching animated effects', 'Copy-paste', 'Free tier plus paid Pro'],
            ['[Magic UI](/alternatives/magic-ui)', 'Animated landing page components', 'Copy-paste, shadcn registry', 'Free tier plus paid Pro'],
            ['[daisyUI](/alternatives/daisyui)', 'Semantic Tailwind classes, any framework', 'Tailwind plugin', 'Yes, MIT'],
            ['[HeroUI](/alternatives/heroui)', 'A full npm component package', 'npm package', 'Free tier plus paid Pro'],
            ['[Flowbite](/alternatives/flowbite)', 'Tailwind components with many framework ports', 'npm package', 'Free tier plus paid Pro'],
          ],
        },
      },
      {
        heading: 'Without Tailwind',
        paragraphs: [
          'If you want a shadcn alternative without Tailwind, look at component libraries that ship their own styling, such as Mantine or MUI. See [shadcn vs Mantine](/compare/shadcn-vs-mantine) and [shadcn vs Material UI](/compare/shadcn-vs-material-ui).',
        ],
      },
      {
        heading: 'How to choose',
        bullets: [
          'You like shadcn but need page sections: use a block library alongside it, such as [Watermelon blocks](/blocks).',
          'You want motion: start with [free animated React components](/free/animated-react-components).',
          'You want less code in your repo: pick an npm package like HeroUI or Mantine.',
          'You need non-React support: pick daisyUI or Flowbite.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is there a free alternative to shadcn/ui?',
        answer:
          'Yes. Watermelon UI, daisyUI, and Mantine are free with no paid tier for their core components. Aceternity UI, Magic UI, HeroUI, and Flowbite have free libraries with paid upgrades.',
      },
      {
        question: 'Can I use Watermelon UI together with shadcn/ui?',
        answer:
          'Yes. Watermelon publishes a shadcn registry, so its components install into an existing shadcn project with the same CLI.',
      },
    ],
    related: [
      '/alternatives/shadcn-ui',
      '/compare/shadcn-vs-aceternity-ui',
      '/compare/shadcn-vs-daisyui',
      '/compare/shadcn-vs-heroui',
      '/guides/shadcn-for-vue-svelte-angular',
    ],
    updated,
  },
  {
    kind: 'guide',
    slug: 'copy-paste-vs-component-library',
    title: 'Copy-Paste Components vs an Installed Component Library',
    description:
      'Copy-paste React components vs an npm component library: ownership, upgrades, bundle size, and customization compared, with guidance on when to use each.',
    h1: 'Copy-Paste Components vs an Installed Component Library',
    primaryKeyword: 'copy paste components vs component library',
    secondaryKeywords: [
      'copy paste components react',
      'copy paste ui components',
      'copy paste component library',
      'tailwind copy paste components',
    ],
    intro: [
      'Copy-paste components put the source code in your repository, so you own and edit it directly. An installed component library ships as an npm package, so you get updates for free but customize through its API. Choose copy-paste when design control matters most, and a package when you want someone else to maintain the components.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'Copy-paste (shadcn, Watermelon)', 'Installed package (MUI, Mantine, HeroUI)'],
          rows: [
            ['Ownership', 'Code lives in your repo', 'Code lives in node_modules'],
            ['Customization', 'Edit anything', 'Props, themes, and overrides'],
            ['Updates', 'Manual, you pull changes', 'Automatic through version bumps'],
            ['Breaking changes', 'Only when you choose', 'On major releases'],
            ['Bundle', 'Only what you copied', 'Tree-shaken package'],
            ['Consistency', 'Up to your team', 'Enforced by the library'],
          ],
        },
      },
      {
        heading: 'When copy-paste wins',
        bullets: [
          'Marketing sites and landing pages where each section is custom.',
          'Products with a strong visual identity.',
          'AI-assisted coding, where agents edit real source instead of fighting a library API.',
        ],
      },
      {
        heading: 'When a package wins',
        bullets: [
          'Large internal tools where consistency beats customization.',
          'Teams without time to maintain component code.',
          'Complex widgets you never want to touch, like a full data grid.',
        ],
      },
      {
        heading: 'The hybrid most teams use',
        paragraphs: [
          'Use a shadcn-style base for primitives, then copy in finished [blocks](/blocks) and [dashboards](/dashboards) for the parts that take longest to build. Watermelon UI is designed for that workflow: every item installs through the shadcn CLI.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is shadcn/ui a component library?',
        answer:
          'Not in the npm package sense. shadcn/ui is a collection of components you copy into your project with a CLI, so you own the code.',
      },
    ],
    related: [
      '/free/react-components',
      '/alternatives/shadcn-ui',
      '/guides/best-free-shadcn-alternatives',
      '/compare/shadcn-vs-material-ui',
    ],
    updated,
  },
  {
    kind: 'guide',
    slug: 'ui-components-for-vibe-coding',
    title: 'Best UI Library for Vibe Coding with Cursor, v0, and Claude',
    description:
      'The best UI library for vibe coding: use copy-paste React components with an MCP server so Cursor, v0, Claude, and Codex build from real source, not guesses.',
    h1: 'The Best UI Library for Vibe Coding',
    primaryKeyword: 'best ui library for vibe coding',
    secondaryKeywords: [
      'ui components for cursor',
      'v0 components',
      'ui library for vibe coding',
      'react component library for ai',
    ],
    intro: [
      'For vibe coding, pick a UI library that AI agents can read and edit as plain source. Copy-paste libraries built on shadcn/ui work best, because the agent sees the actual component code. Watermelon UI adds an MCP server on top, so Cursor, Claude, and Codex can search and install components directly.',
    ],
    sections: [
      {
        heading: 'What makes a library agent friendly',
        bullets: [
          'Source in the repo: the agent can read and modify the component.',
          'Standard conventions: Tailwind CSS and shadcn patterns appear in most training data.',
          'Machine-readable catalog: an MCP server or registry the agent can query.',
          'Full sections, not just primitives: agents compose pages faster from [blocks](/blocks).',
        ],
      },
      {
        heading: 'A workflow that works',
        bullets: [
          'Connect the [Watermelon MCP server](/guides/react-component-mcp-server) to your editor.',
          'Ask the agent for a page, for example "a SaaS landing page with pricing and FAQ".',
          'The agent searches the catalog, picks blocks, and installs them with the shadcn CLI.',
          'You review the diff and adjust copy and colors.',
        ],
      },
      {
        heading: 'Using v0 output',
        paragraphs: [
          'v0 generates shadcn-based React code, so anything it produces sits next to Watermelon components without conflicts. Many people generate a rough layout in v0, then replace sections with polished [free Tailwind blocks](/free/tailwind-blocks).',
        ],
      },
    ],
    related: [
      '/guides/react-component-mcp-server',
      '/guides/copy-paste-vs-component-library',
      '/free/landing-page-components',
      '/alternatives/shadcn-ui',
    ],
    updated,
  },
  {
    kind: 'guide',
    slug: 'is-tailwind-ui-free',
    title: 'Is Tailwind UI Free? What You Get and Free Alternatives',
    description:
      'Is Tailwind UI free? Tailwind CSS is free and open source, but Tailwind UI (now Tailwind Plus) is a paid product. Here is what is free and the best free alternatives.',
    h1: 'Is Tailwind UI Free?',
    primaryKeyword: 'is tailwind ui free',
    secondaryKeywords: [
      'is tailwind css free',
      'is tailwind open source',
      'tailwind ui free alternative',
      'tailwind plus free',
    ],
    intro: [
      'No. Tailwind UI, now sold as Tailwind Plus, is a paid product with a one-time license. Tailwind CSS itself is free and open source under the MIT license. If you want free, ready-made Tailwind components and blocks, use an open source library like Watermelon UI.',
    ],
    sections: [
      {
        heading: 'What is free and what is paid',
        table: {
          columns: ['Product', 'Price', 'What it is'],
          rows: [
            ['Tailwind CSS', 'Free, MIT', 'The utility-first CSS framework'],
            ['Headless UI', 'Free, MIT', 'Unstyled accessible components from the Tailwind team'],
            ['Tailwind Plus (Tailwind UI)', 'Paid license', 'Premium components, blocks, and templates'],
            ['Watermelon UI', 'Free, MIT', 'React components, blocks, and dashboards for Tailwind'],
          ],
        },
        paragraphs: [
          'Tailwind Plus pricing changes over time, so check the official site for the current price.',
        ],
      },
      {
        heading: 'Free Tailwind UI alternatives',
        bullets: [
          '[Watermelon UI](/alternatives/tailwind-ui): free React blocks, dashboards, and animated components.',
          '[Flowbite](/alternatives/flowbite): free tier with Tailwind components across frameworks.',
          '[Preline UI](/alternatives/preline): free Tailwind components and examples.',
          '[daisyUI](/alternatives/daisyui): a free Tailwind plugin with semantic class names.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Tailwind CSS free for commercial use?',
        answer: 'Yes. Tailwind CSS is MIT licensed and free for commercial use.',
      },
      {
        question: 'Is Tailwind open source?',
        answer: 'Tailwind CSS is open source. Tailwind Plus, formerly Tailwind UI, is a separate paid product.',
      },
    ],
    related: [
      '/alternatives/tailwind-ui',
      '/free/tailwind-blocks',
      '/alternatives/flowbite',
      '/alternatives/preline',
    ],
    updated,
  },
  {
    kind: 'guide',
    slug: 'add-animated-components-to-react',
    title: 'How to Add Animated Components to a React App',
    description:
      'How to add animated components to a React app with Motion and Tailwind CSS: install from a shadcn registry or copy the code, then tune timing and reduced motion.',
    h1: 'How to Add Animated Components to a React App',
    primaryKeyword: 'how to add animated components react',
    secondaryKeywords: [
      'react animate component on render',
      'react components animation',
      'animated react components',
      'framer motion components',
    ],
    intro: [
      'The fastest way to add animated components to a React app is to install a ready-made component from a shadcn registry. Run `npx shadcn@latest add` with the component URL, import it, and render it. The component brings its Motion and Tailwind CSS code with it, so you tune the animation in your own files.',
    ],
    sections: [
      {
        heading: 'Step by step',
        bullets: [
          'Set up Tailwind CSS and shadcn in your project. See [installation](/installation).',
          'Pick a component from [animated components](/animated-components).',
          'Copy its install command, for example `npx shadcn@latest add https://registry.watermelon.sh/r/<name>.json`.',
          'Import the component from your components folder and render it.',
          'Adjust durations and easing in the component file to match your product.',
        ],
      },
      {
        heading: 'Animate on mount or on scroll',
        paragraphs: [
          'With Motion, use `initial` and `animate` props to animate a component when it first renders, and `whileInView` to animate when it scrolls into view. Keep entrance animations short, around 200 to 400 milliseconds, so the page never feels slow.',
        ],
      },
      {
        heading: 'Respect reduced motion',
        paragraphs: [
          'Some people turn off animation at the operating system level. Motion exposes a `useReducedMotion` hook, and Tailwind has `motion-safe` and `motion-reduce` variants. Use them to swap large movement for a simple fade.',
        ],
      },
    ],
    related: [
      '/free/animated-react-components',
      '/alternatives/aceternity-ui',
      '/alternatives/magic-ui',
      '/alternatives/cult-ui',
    ],
    updated,
  },
  {
    kind: 'guide',
    slug: 'build-react-dashboard-fast',
    title: 'How to Build a React Dashboard Fast',
    description:
      'How to build a React dashboard fast: start from a free template, reuse data tables, charts, and cards, then connect your data. A practical step-by-step guide.',
    h1: 'How to Build a React Dashboard Fast',
    primaryKeyword: 'how to build a react dashboard fast',
    secondaryKeywords: [
      'build react dashboard',
      'react admin dashboard tutorial',
      'react dashboard layout',
      'react dashboard components',
    ],
    intro: [
      'The fastest way to build a React dashboard is to start from a finished template, keep its layout, and replace the sample data with your own. Building the shell, sidebar, and responsive grid is what takes the longest, and a template gives you all of that on day one.',
    ],
    sections: [
      {
        heading: 'Step 1: pick a template',
        paragraphs: [
          'Browse the [free React dashboard templates](/free/react-dashboard-templates) and pick the one closest to your domain, whether that is finance, health, operations, or developer tools. Copy its files into your app.',
        ],
      },
      {
        heading: 'Step 2: swap in the parts you need',
        bullets: [
          '[Data tables](/components/data-table) for lists with sorting and filters.',
          '[Cards](/components/card) and [stat widgets](/blocks/widget) for KPIs.',
          '[Date pickers](/components/date-picker) for time ranges.',
          '[Tabs](/components/tabs) and [sheets](/components/sheet) for detail views.',
        ],
      },
      {
        heading: 'Step 3: connect real data',
        paragraphs: [
          'Keep the components presentational. Fetch data in a parent component or with a data library like TanStack Query, then pass it down as props. The sample data in each template shows the shape each component expects.',
        ],
      },
      {
        heading: 'Step 4: ship the responsive version',
        paragraphs: [
          'Every Watermelon dashboard is previewed at desktop, tablet, and phone widths, so the responsive layout is already handled. Check that your longer real labels still fit.',
        ],
      },
    ],
    related: [
      '/free/react-dashboard-templates',
      '/free/react-components',
      '/alternatives/untitled-ui',
      '/guides/copy-paste-vs-component-library',
    ],
    updated,
  },
];
