import type { SeoPage } from '../types';

/**
 * Head-to-head comparisons for queries people actually search ("shadcn vs mui").
 * Facts checked 2026-09-29 against official sites, GitHub, and npm. No ratings,
 * no invented benchmarks. Each page links to the alternatives it mentions.
 */
const updated = '2026-09-29';

export const comparePages: SeoPage[] = [
  {
    kind: 'compare',
    slug: 'shadcn-vs-aceternity-ui',
    title: 'shadcn/ui vs Aceternity UI: Which Should You Use?',
    description:
      'shadcn/ui vs Aceternity UI compared: shadcn gives you accessible building blocks, Aceternity gives you animated effects. See licensing, pricing, and when to use each.',
    h1: 'shadcn/ui vs Aceternity UI',
    primaryKeyword: 'aceternity vs shadcn',
    secondaryKeywords: ['shadcn vs aceternity', 'aceternity ui vs shadcn', 'aceternity vs'],
    intro: [
      'shadcn/ui and Aceternity UI are not really competitors. shadcn/ui gives you accessible building blocks like buttons, dialogs, forms, and menus. Aceternity UI gives you animated visual effects for landing pages. Most projects that use Aceternity also use shadcn/ui underneath.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'shadcn/ui', 'Aceternity UI'],
          rows: [
            ['Purpose', 'App building blocks', 'Animated marketing effects'],
            ['Price', 'Free, MIT', 'Free components plus paid Pro'],
            ['License', 'MIT', 'Custom Pro license, free component terms on its site'],
            ['Install', 'shadcn CLI and registries', 'Copy-paste'],
            ['Animation', 'Minimal', 'Core focus, uses Motion'],
            ['Primitives', 'Base UI by default, Radix or React Aria optional', 'Not a primitives library'],
          ],
        },
      },
      {
        heading: 'When to use which',
        bullets: [
          'Building an app or dashboard: use shadcn/ui.',
          'Building a flashy landing page: add Aceternity effects on top.',
          'Want both styles under one MIT license: [Watermelon UI](/alternatives/aceternity-ui) has shadcn-compatible components plus 130+ animations.',
        ],
      },
    ],
    related: ['/alternatives/aceternity-ui', '/alternatives/shadcn-ui', '/compare/aceternity-ui-vs-magic-ui', '/free/animated-react-components'],
    updated,
  },
  {
    kind: 'compare',
    slug: 'aceternity-ui-vs-magic-ui',
    title: 'Aceternity UI vs Magic UI: Animated Libraries',
    description:
      'Aceternity UI vs Magic UI: two popular animated React component libraries compared on licensing, pricing, install method, and style, plus a free MIT alternative.',
    h1: 'Aceternity UI vs Magic UI',
    primaryKeyword: 'aceternity vs magic ui',
    secondaryKeywords: ['magic ui vs aceternity', 'aceternity ui vs magic ui', 'best animated component library'],
    intro: [
      'Aceternity UI and Magic UI are both animated React component libraries built on Tailwind CSS and Motion. The biggest difference is licensing. Magic UI is MIT licensed and installs natively through the shadcn CLI. Aceternity UI has its own license terms and a larger paid Pro catalog.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'Aceternity UI', 'Magic UI'],
          rows: [
            ['License', 'Custom terms, Pro license restricts redistribution', 'MIT'],
            ['Paid tier', 'Pro: yearly, lifetime, and team plans', 'Magic UI Pro, one-time'],
            ['Install', 'Copy-paste', 'shadcn CLI with the @magicui namespace'],
            ['Styling', 'Tailwind CSS v4 and v3', 'Tailwind CSS v4'],
            ['Style', 'Bold, dramatic effects', 'Clean landing page motion'],
          ],
        },
      },
      {
        heading: 'Which to pick',
        bullets: [
          'You want MIT and a shadcn-native install: Magic UI.',
          'You want the most dramatic effects and do not mind the license terms: Aceternity UI.',
          'You want MIT animations plus blocks and dashboards in one place: [Watermelon UI](/free/animated-react-components).',
        ],
      },
    ],
    related: ['/alternatives/aceternity-ui', '/alternatives/magic-ui', '/compare/shadcn-vs-aceternity-ui', '/alternatives/cult-ui'],
    updated,
  },
  {
    kind: 'compare',
    slug: 'shadcn-vs-material-ui',
    title: 'shadcn/ui vs Material UI (MUI): Copy-Paste vs Package',
    description:
      'shadcn/ui vs Material UI (MUI) compared: copy-paste Tailwind components versus a mature npm package with Material Design, paid MUI X, and a data grid.',
    h1: 'shadcn/ui vs Material UI (MUI)',
    primaryKeyword: 'shadcn vs material ui',
    secondaryKeywords: ['shadcn vs mui', 'mui vs shadcn', 'material ui alternative tailwind'],
    intro: [
      'Choose shadcn/ui when you want full control over design and code, and you are fine maintaining components yourself. Choose Material UI (MUI) when you want a mature, all-in-one npm package with Material Design out of the box and advanced paid widgets like the MUI X Data Grid.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'shadcn/ui', 'Material UI'],
          rows: [
            ['Model', 'Copy-paste source', 'npm package (@mui/material)'],
            ['Styling', 'Tailwind CSS', 'Emotion CSS-in-JS, Pigment CSS option'],
            ['Design', 'Neutral, yours to theme', 'Material Design'],
            ['Price', 'Free, MIT', 'Core free (MIT), MUI X Pro and Premium paid'],
            ['Advanced widgets', 'Build or copy them', 'Data Grid, Charts, Scheduler in MUI X'],
          ],
        },
      },
      {
        heading: 'Rules of thumb',
        bullets: [
          'Internal tools with heavy data grids: MUI X is hard to beat.',
          'Product and marketing sites with a custom look: shadcn/ui plus [blocks](/free/tailwind-blocks).',
          'Moving off MUI to Tailwind: start with [free React components](/free/react-components) and replace screens one at a time.',
        ],
      },
    ],
    related: ['/guides/copy-paste-vs-component-library', '/compare/shadcn-vs-mantine', '/compare/shadcn-vs-ant-design', '/compare/shadcn-vs-bootstrap', '/free/react-components'],
    updated,
  },
  {
    kind: 'compare',
    slug: 'shadcn-vs-daisyui',
    title: 'shadcn/ui vs daisyUI: React Components vs Tailwind Classes',
    description:
      'shadcn/ui vs daisyUI compared: shadcn gives you React component source, daisyUI gives you semantic Tailwind class names that work in any framework.',
    h1: 'shadcn/ui vs daisyUI',
    primaryKeyword: 'shadcn vs daisyui',
    secondaryKeywords: ['daisyui vs shadcn', 'daisyui alternative react'],
    intro: [
      'shadcn/ui gives you React components with behavior, like focus management, keyboard navigation, and state, as source code in your project. daisyUI is a Tailwind CSS plugin that adds class names like `btn` and `modal`, so it works in any framework but leaves behavior to you.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'shadcn/ui', 'daisyUI'],
          rows: [
            ['What you get', 'React component source', 'CSS class names'],
            ['Frameworks', 'React', 'Any, including plain HTML'],
            ['Interactivity', 'Built in through primitives', 'Bring your own JavaScript'],
            ['Theming', 'CSS variables', 'Built-in themes'],
            ['License', 'MIT', 'MIT'],
          ],
        },
      },
      {
        heading: 'Which to pick',
        bullets: [
          'React app with dialogs, menus, and comboboxes: shadcn/ui.',
          'Server-rendered HTML, Vue, Svelte, or mixed stacks: daisyUI.',
          'React plus ready-made page sections: shadcn/ui with [Watermelon blocks](/free/tailwind-blocks).',
        ],
      },
    ],
    related: ['/alternatives/daisyui', '/alternatives/shadcn-ui', '/guides/best-free-shadcn-alternatives', '/compare/shadcn-vs-heroui'],
    updated,
  },
  {
    kind: 'compare',
    slug: 'shadcn-vs-heroui',
    title: 'shadcn/ui vs HeroUI: Own the Code or Install a Package',
    description:
      'shadcn/ui vs HeroUI (formerly NextUI) compared: copy-paste components you own versus a React Aria based npm package with Tailwind CSS v4 styling.',
    h1: 'shadcn/ui vs HeroUI',
    primaryKeyword: 'shadcn vs heroui',
    secondaryKeywords: ['heroui vs shadcn', 'nextui vs shadcn', 'heroui alternative'],
    intro: [
      'Both use Tailwind CSS, but they are delivered differently. shadcn/ui copies component source into your project. HeroUI, formerly NextUI, is an npm package built on React Aria that you install and configure. Pick shadcn/ui for control, and HeroUI for a maintained package with a polished default look.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'shadcn/ui', 'HeroUI'],
          rows: [
            ['Model', 'Copy-paste source', 'npm package (@heroui/react)'],
            ['Primitives', 'Base UI by default, Radix or React Aria optional', 'React Aria'],
            ['Requirements', 'Tailwind CSS v4', 'Tailwind CSS v4, React 19'],
            ['Paid tier', 'None', 'HeroUI Pro'],
            ['Mobile', 'Web only', 'HeroUI Native for React Native'],
          ],
        },
      },
      {
        heading: 'Which to pick',
        bullets: [
          'You want to change markup freely: shadcn/ui.',
          'You want upstream updates and a consistent API: HeroUI.',
          'You want free page sections and dashboards on the shadcn side: [Watermelon UI](/alternatives/heroui).',
        ],
      },
    ],
    related: ['/alternatives/heroui', '/guides/copy-paste-vs-component-library', '/compare/shadcn-vs-daisyui', '/alternatives/shadcn-ui'],
    updated,
  },
  {
    kind: 'compare',
    slug: 'shadcn-vs-radix-ui',
    title: 'shadcn/ui vs Radix UI: What Is the Difference?',
    description:
      'shadcn/ui vs Radix UI explained: Radix provides unstyled accessible primitives, and shadcn/ui styles primitives with Tailwind CSS. It now defaults to Base UI.',
    h1: 'shadcn/ui vs Radix UI',
    primaryKeyword: 'shadcn vs radix ui',
    secondaryKeywords: ['shadcn vs radix', 'radix ui vs shadcn', 'is shadcn built on radix'],
    intro: [
      'Radix UI is a set of unstyled, accessible React primitives. shadcn/ui is a collection of styled components you copy into your project, built on top of primitives like these. Radix handles behavior, and shadcn/ui adds Tailwind styling and structure. New shadcn/ui projects now default to Base UI, with Radix UI and React Aria as options.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'shadcn/ui', 'Radix UI'],
          rows: [
            ['Layer', 'Styled components', 'Unstyled primitives, plus Radix Themes'],
            ['Delivery', 'Copy-paste source', 'npm package (radix-ui)'],
            ['Styling', 'Tailwind CSS', 'None, or Radix Themes'],
            ['License', 'MIT', 'MIT'],
          ],
        },
      },
      {
        heading: 'Do you need both?',
        paragraphs: [
          'If you use shadcn/ui with the Radix option, Radix is installed for you as a dependency. Use Radix directly only when you want to write all the styling yourself. Watermelon UI components follow the same shadcn conventions, so they sit next to either setup. Browse [free React components](/free/react-components).',
        ],
      },
    ],
    related: ['/alternatives/shadcn-ui', '/alternatives/origin-ui', '/compare/shadcn-vs-heroui', '/free/react-components'],
    updated,
  },
  {
    kind: 'compare',
    slug: 'shadcn-vs-mantine',
    title: 'shadcn/ui vs Mantine: Tailwind or No Tailwind',
    description:
      'shadcn/ui vs Mantine compared: Tailwind copy-paste components versus a full React library with 120+ components and 70 hooks that needs no Tailwind at all.',
    h1: 'shadcn/ui vs Mantine',
    primaryKeyword: 'shadcn vs mantine',
    secondaryKeywords: ['mantine vs shadcn', 'shadcn alternative without tailwind'],
    intro: [
      'Choose shadcn/ui if your project uses Tailwind CSS and you want to own the component code. Choose Mantine if you want a complete React library that needs no Tailwind, with 120+ components, 70 hooks, and built-in form and date utilities, installed from npm.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'shadcn/ui', 'Mantine'],
          rows: [
            ['Model', 'Copy-paste source', 'npm packages (@mantine/core and more)'],
            ['Styling', 'Tailwind CSS', 'Native CSS with a PostCSS preset'],
            ['Scope', 'Core components', '120+ components and 70 hooks'],
            ['License', 'MIT', 'MIT'],
            ['Paid tier', 'None', 'None for the core library'],
          ],
        },
      },
      {
        heading: 'Which to pick',
        bullets: [
          'Tailwind project with a custom design: shadcn/ui plus [Watermelon blocks](/free/tailwind-blocks).',
          'No Tailwind, many forms and dates, small team: Mantine.',
        ],
      },
    ],
    related: ['/compare/shadcn-vs-material-ui', '/guides/best-free-shadcn-alternatives', '/guides/copy-paste-vs-component-library', '/alternatives/shadcn-ui'],
    updated,
  },
];
