import type { SeoPage, SeoTable } from '../types';

/**
 * Competitor facts were checked against official sites, GitHub, and npm on
 * 2026-09-29. Prices we could not confirm are deliberately left out. Re-check
 * before changing any claim, and keep every page fair: say where the other
 * library is stronger.
 */
const updated = '2026-09-29';

const watermelon = {
  price: 'Free, MIT',
  model: 'Copy-paste, installs with the shadcn CLI',
  styling: 'Tailwind CSS v4',
  motion: 'Yes, 130+ Motion-based animated components',
  sections: '180+ blocks, dashboards, templates',
};

function glance(name: string, other: Partial<typeof watermelon>): SeoTable {
  const rows: string[][] = [];
  const labels: Record<keyof typeof watermelon, string> = {
    price: 'Price and license',
    model: 'How you use it',
    styling: 'Styling',
    motion: 'Animated components',
    sections: 'Page sections and dashboards',
  };
  for (const key of Object.keys(labels) as (keyof typeof watermelon)[]) {
    if (other[key]) rows.push([labels[key], watermelon[key], other[key]!]);
  }
  return { columns: ['', 'Watermelon UI', name], rows };
}

export const alternativePages: SeoPage[] = [
  {
    kind: 'alternative',
    slug: 'shadcn-ui',
    title: 'shadcn/ui Alternative with Free Blocks and Animations',
    description:
      'Looking for a shadcn/ui alternative? Watermelon UI keeps the shadcn copy-paste model and adds free blocks, dashboards, and 130+ animated components.',
    h1: 'A shadcn/ui Alternative with Blocks, Dashboards, and Animations',
    primaryKeyword: 'shadcn alternative',
    secondaryKeywords: [
      'shadcn ui alternative',
      'shadcn alternative free',
      'shadcn alternative nextjs',
      'shadcn blocks alternative',
      'best alternative to shadcn ui',
    ],
    intro: [
      'If you like shadcn/ui but need more than primitives, Watermelon UI is a free alternative that works the same way. You copy the code into your project or install it with the shadcn CLI. On top of that it adds 180+ page blocks, full dashboards, and 130+ animated components, all MIT licensed.',
      'You do not have to choose one. Watermelon publishes a shadcn registry, so its components install into an existing shadcn project next to the ones you already have.',
    ],
    sections: [
      {
        heading: 'At a glance',
        table: glance('shadcn/ui', {
          price: 'Free, MIT',
          model: 'Copy-paste with the shadcn CLI and registries',
          styling: 'Tailwind CSS v4',
          motion: 'Not a focus',
          sections: 'Some official blocks, large third-party registry ecosystem',
        }),
      },
      {
        heading: 'Where shadcn/ui is stronger',
        bullets: [
          'It is the standard. Most tutorials, AI tools, and registries assume shadcn/ui.',
          'Primitive choice: new projects default to Base UI, with Radix UI and React Aria as options.',
          'A huge ecosystem of third-party registries built on its CLI.',
        ],
      },
      {
        heading: 'What Watermelon adds',
        bullets: [
          'Finished sections: [hero sections](/blocks/hero), [pricing](/blocks/pricing), [footers](/blocks/footer), [login pages](/blocks/auth), and more.',
          'Complete [dashboard templates](/free/react-dashboard-templates) you can preview and copy.',
          '[Animated components](/free/animated-react-components) for the motion shadcn/ui leaves out.',
          'An [MCP server](/guides/react-component-mcp-server) so AI agents can search and install components.',
        ],
      },
      {
        heading: 'Using both together',
        paragraphs: [
          'Keep shadcn/ui for primitives and pull Watermelon items in by URL: `npx shadcn@latest add https://registry.watermelon.sh/r/<name>.json`. The files follow the same conventions, so there is nothing new to learn.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is there a free shadcn/ui alternative?',
        answer:
          'Yes. Watermelon UI is free, MIT licensed, and uses the same copy-paste model and CLI. See also the [best free shadcn alternatives](/guides/best-free-shadcn-alternatives).',
      },
      {
        question: 'Is there a shadcn alternative for Next.js?',
        answer: 'Watermelon UI works in Next.js and Vite, the same as shadcn/ui.',
      },
      {
        question: 'Is there a shadcn alternative without Tailwind?',
        answer:
          'Watermelon also uses Tailwind. For a library without Tailwind, look at Mantine or MUI. See [shadcn vs Mantine](/compare/shadcn-vs-mantine).',
      },
    ],
    related: [
      '/guides/best-free-shadcn-alternatives',
      '/compare/shadcn-vs-aceternity-ui',
      '/compare/shadcn-vs-radix-ui',
      '/alternatives/origin-ui',
      '/free/react-components',
    ],
    updated,
  },
  {
    kind: 'alternative',
    slug: 'tailwind-ui',
    title: 'Free Tailwind UI Alternative (Tailwind Plus) for React',
    description:
      'A free Tailwind UI alternative for React. Tailwind UI is now the paid Tailwind Plus. Watermelon UI offers free, MIT licensed Tailwind blocks and dashboards.',
    h1: 'A Free Tailwind UI Alternative for React',
    primaryKeyword: 'tailwind ui free alternative',
    secondaryKeywords: [
      'tailwind ui alternatives',
      'free tailwind ui',
      'tailwind plus alternative',
      'best free tailwind ui library',
      'free tailwind ui components',
    ],
    intro: [
      'Tailwind UI was renamed Tailwind Plus in March 2025, and it is a paid product. If you want free Tailwind CSS components and page sections for React, Watermelon UI is an alternative with 180+ MIT licensed blocks, full dashboards, and 500+ component variants, and you do not need a license.',
    ],
    sections: [
      {
        heading: 'At a glance',
        table: glance('Tailwind Plus', {
          price: 'Paid, one-time purchase with lifetime access',
          model: 'Copy-paste blocks and templates, plus the Catalyst UI kit',
          styling: 'Tailwind CSS',
          sections: 'Large catalog of marketing and application blocks, plus templates',
        }),
      },
      {
        heading: 'Where Tailwind Plus is stronger',
        bullets: [
          'It is made by the Tailwind CSS team, so the design quality and Tailwind idioms are consistent.',
          'It has a very large and polished catalog of marketing and application blocks.',
          'It includes both HTML and React versions of the blocks.',
        ],
      },
      {
        heading: 'Why pick Watermelon instead',
        bullets: [
          'It is free for commercial use, with no seats or license terms to track.',
          'Every item installs with the shadcn CLI, so it fits shadcn projects.',
          'It has [animated components](/free/animated-react-components) and [dashboard templates](/free/react-dashboard-templates).',
          'The code is public on GitHub, and you can contribute back.',
        ],
      },
      {
        heading: 'Start here',
        bullets: [
          '[Free Tailwind blocks](/free/tailwind-blocks)',
          '[Free landing page components](/free/landing-page-components)',
          '[Is Tailwind UI free?](/guides/is-tailwind-ui-free)',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Tailwind UI free?',
        answer:
          'No. Tailwind UI, now Tailwind Plus, requires a paid license. Tailwind CSS itself is free. Check the official site for current pricing.',
      },
      {
        question: 'What is the best free alternative to Tailwind UI?',
        answer:
          'For React, Watermelon UI gives you free blocks and dashboards. Flowbite, Preline, and daisyUI are also good free options with different tradeoffs.',
      },
    ],
    related: [
      '/guides/is-tailwind-ui-free',
      '/free/tailwind-blocks',
      '/alternatives/flowbite',
      '/alternatives/preline',
      '/alternatives/untitled-ui',
    ],
    updated,
  },
  {
    kind: 'alternative',
    slug: 'aceternity-ui',
    title: 'Aceternity UI Alternative: Free Animated React Components',
    description:
      'An Aceternity UI alternative with free, MIT licensed animated React components, plus blocks and dashboards. Compare features, licensing, and pricing.',
    h1: 'A Free Aceternity UI Alternative',
    primaryKeyword: 'aceternity ui alternative',
    secondaryKeywords: [
      'aceternity ui free alternative',
      'aceternity ui alternative free',
      'aceternity ui alternative reddit',
      'aceternity vs',
    ],
    intro: [
      'Watermelon UI is a free Aceternity UI alternative for animated React components. It has 130+ Motion-based components, released under the MIT license, that install with the shadcn CLI. It also includes page blocks and full dashboards, so you can build the rest of the app with the same library.',
    ],
    sections: [
      {
        heading: 'At a glance',
        table: glance('Aceternity UI', {
          price: 'Free components plus paid Pro (yearly, lifetime, and team plans)',
          model: 'Copy-paste, Pro blocks are shadcn compatible',
          styling: 'Tailwind CSS v4 and v3',
          motion: 'Yes, animation is the core focus',
          sections: 'Pro templates and blocks',
        }),
      },
      {
        heading: 'Where Aceternity UI is stronger',
        bullets: [
          'It has a large set of bold, eye-catching effects, like backgrounds, spotlights, and 3D cards, made for landing pages.',
          'It offers many paid templates if you want a finished marketing site.',
        ],
      },
      {
        heading: 'Why pick Watermelon',
        bullets: [
          'It uses the MIT license. Aceternity\'s Pro license is custom and restricts redistribution.',
          'The animations focus on product UI, like cards, tabs, docks, and widgets, alongside marketing effects.',
          'It covers [blocks](/free/tailwind-blocks), [dashboards](/free/react-dashboard-templates), and 30 component categories in one place.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Aceternity UI free?',
        answer:
          'Aceternity UI has free components and a paid Pro plan. Check its license page for the terms that apply to the free components.',
      },
      {
        question: 'Is Aceternity UI better than shadcn?',
        answer:
          'They solve different problems. See [shadcn vs Aceternity UI](/compare/shadcn-vs-aceternity-ui).',
      },
    ],
    related: [
      '/compare/shadcn-vs-aceternity-ui',
      '/compare/aceternity-ui-vs-magic-ui',
      '/alternatives/magic-ui',
      '/free/animated-react-components',
      '/guides/add-animated-components-to-react',
    ],
    updated,
  },
  {
    kind: 'alternative',
    slug: 'magic-ui',
    title: 'Magic UI Alternative with Free Blocks and Dashboards',
    description:
      'A Magic UI alternative for animated React components. Watermelon UI is MIT licensed like Magic UI, and adds free blocks, dashboards, and 30 component types.',
    h1: 'A Magic UI Alternative with More Than Animations',
    primaryKeyword: 'magic ui alternative',
    secondaryKeywords: ['magic ui free alternative', 'magic ui alternative reddit', 'magic ui vs aceternity'],
    intro: [
      'Magic UI and Watermelon UI are both free, MIT licensed, and install through the shadcn CLI. Choose Watermelon when you want animated components plus the rest of the app: 180+ page blocks, dashboard templates, and 500+ standard component variants.',
    ],
    sections: [
      {
        heading: 'At a glance',
        table: glance('Magic UI', {
          price: 'Free, MIT, plus paid Magic UI Pro (one-time)',
          model: 'Copy-paste, installs with the shadcn CLI',
          styling: 'Tailwind CSS v4',
          motion: 'Yes, Motion-based animations are the focus',
          sections: 'Pro templates',
        }),
      },
      {
        heading: 'Where Magic UI is stronger',
        bullets: [
          'It is focused and popular, with over 20,000 GitHub stars and a well-known set of landing page effects.',
          'It has a native shadcn registry namespace, `@magicui`.',
        ],
      },
      {
        heading: 'Why pick Watermelon',
        bullets: [
          'You get the whole catalog free, with no Pro tier.',
          'It includes product UI animations, like cards, widgets, tabs, and inputs, alongside marketing effects.',
          'It has standard components like [data tables](/components/data-table) and [date pickers](/components/date-picker), so you need fewer libraries.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Magic UI free?',
        answer: 'The open source library is free and MIT licensed. Magic UI Pro is a paid, one-time purchase.',
      },
    ],
    related: [
      '/compare/aceternity-ui-vs-magic-ui',
      '/alternatives/aceternity-ui',
      '/alternatives/cult-ui',
      '/free/animated-react-components',
    ],
    updated,
  },
  {
    kind: 'alternative',
    slug: 'untitled-ui',
    title: 'Untitled UI React Alternative (Free and Open Source)',
    description:
      'An Untitled UI React alternative that is completely free. Watermelon UI gives you React and Tailwind components, blocks, and dashboards under the MIT license.',
    h1: 'A Free Untitled UI React Alternative',
    primaryKeyword: 'untitled ui react alternative',
    secondaryKeywords: ['untitled ui react', 'untitled ui free alternative', 'untitled ui pro alternative'],
    intro: [
      'Untitled UI React has free open source components and a paid PRO tier. Watermelon UI is an alternative where everything is free, including blocks, dashboards, and animated components. It uses React, Tailwind CSS, and the MIT license.',
    ],
    sections: [
      {
        heading: 'At a glance',
        table: glance('Untitled UI React', {
          price: 'Free MIT components, plus PRO one-time licenses',
          model: 'Copy-paste, its own CLI, and npm packages',
          styling: 'Tailwind CSS v4, built on React Aria',
          sections: 'Large PRO catalog of pages and examples',
        }),
      },
      {
        heading: 'Where Untitled UI is stronger',
        bullets: [
          'It has a matching Figma design system, which is useful when designers and developers share one source of truth.',
          'The PRO catalog is very large.',
          'It is built on React Aria, which gives it a strong accessibility foundation.',
        ],
      },
      {
        heading: 'Why pick Watermelon',
        bullets: [
          'There is nothing to buy. [Dashboards](/free/react-dashboard-templates) and [blocks](/free/tailwind-blocks) are free.',
          'It installs through the shadcn CLI, so it fits projects already on shadcn/ui.',
          'It has an [MCP server](/guides/react-component-mcp-server) for AI coding agents.',
        ],
      },
    ],
    related: [
      '/free/react-dashboard-templates',
      '/alternatives/tailwind-ui',
      '/guides/build-react-dashboard-fast',
      '/alternatives/shadcn-ui',
    ],
    updated,
  },
  {
    kind: 'alternative',
    slug: 'daisyui',
    title: 'daisyUI Alternative for React with Copy-Paste Components',
    description:
      'A daisyUI alternative for React developers who want component source, not CSS classes. Free Tailwind React components, blocks, and dashboards.',
    h1: 'A daisyUI Alternative for React',
    primaryKeyword: 'daisyui alternative react',
    secondaryKeywords: ['daisyui alternative', 'shadcn vs daisyui', 'daisyui react'],
    intro: [
      'daisyUI adds semantic class names like `btn` and `card` to Tailwind CSS and works in any framework. If you build with React and want real components with behavior, like dialogs, comboboxes, and date pickers, Watermelon UI is a free alternative. It gives you React source you own, installed through the shadcn CLI.',
    ],
    sections: [
      {
        heading: 'At a glance',
        table: glance('daisyUI', {
          price: 'Free, MIT',
          model: 'Tailwind CSS plugin with class names',
          styling: 'Tailwind CSS v4 plugin with built-in themes',
          motion: 'Not a focus',
        }),
      },
      {
        heading: 'Where daisyUI is stronger',
        bullets: [
          'It works in any framework, or none. Plain HTML, Vue, and Svelte all work.',
          'There is no JavaScript to ship for styling.',
          'Built-in themes let you switch the whole look with one attribute.',
        ],
      },
      {
        heading: 'Why pick Watermelon',
        bullets: [
          'You get interactive React components, not just styles, for things like [comboboxes](/components/combobox), [dialogs](/components/dialog), and [data tables](/components/data-table).',
          'It includes [animated components](/free/animated-react-components) and full [page blocks](/free/tailwind-blocks).',
          'It follows shadcn/ui conventions, which AI tools and most React tutorials already use.',
        ],
      },
    ],
    related: ['/compare/shadcn-vs-daisyui', '/free/react-components', '/alternatives/flowbite', '/alternatives/preline'],
    updated,
  },
  {
    kind: 'alternative',
    slug: 'flowbite',
    title: 'Flowbite React Alternative: Free Tailwind Blocks',
    description:
      'A Flowbite React alternative with free Tailwind CSS blocks, dashboards, and animated components. Copy the source or install with the shadcn CLI. MIT licensed.',
    h1: 'A Flowbite React Alternative',
    primaryKeyword: 'flowbite react alternative',
    secondaryKeywords: ['flowbite alternative', 'flowbite pro alternative', 'flowbite react free'],
    intro: [
      'Flowbite React is a free, MIT licensed npm package of Tailwind components, with a paid Flowbite Pro tier for more blocks. Watermelon UI is an alternative that gives you the source code instead of a package, and all of its blocks and dashboards are free.',
    ],
    sections: [
      {
        heading: 'At a glance',
        table: glance('Flowbite React', {
          price: 'Free, MIT, plus paid Flowbite Pro',
          model: 'npm package (flowbite-react)',
          styling: 'Tailwind CSS v3 or v4',
          sections: 'Pro blocks and templates',
        }),
      },
      {
        heading: 'Where Flowbite is stronger',
        bullets: [
          'It has one design language across React, Vue, Svelte, Angular, and plain HTML.',
          'It has a Figma design kit.',
          'Because it is an npm package, updates arrive with a version bump.',
        ],
      },
      {
        heading: 'Why pick Watermelon',
        bullets: [
          'You own the code and can change any component directly.',
          'There is no Pro tier: [blocks](/free/tailwind-blocks) and [dashboards](/free/react-dashboard-templates) are free.',
          'It is compatible with shadcn projects and AI agent workflows.',
        ],
      },
    ],
    related: ['/alternatives/preline', '/alternatives/tailwind-ui', '/free/tailwind-blocks', '/guides/copy-paste-vs-component-library'],
    updated,
  },
  {
    kind: 'alternative',
    slug: 'preline',
    title: 'Preline UI Alternative Built for React',
    description:
      'A Preline UI alternative built for React. Get free Tailwind components, blocks, and dashboards written as React source, installable with the shadcn CLI.',
    h1: 'A Preline UI Alternative for React',
    primaryKeyword: 'preline ui alternative',
    secondaryKeywords: ['preline alternative', 'preline react', 'preline pro alternative'],
    intro: [
      'Preline UI is a Tailwind CSS library built on HTML and vanilla JavaScript plugins, with guides for many frameworks. If your app is React, Watermelon UI is an alternative written in React from the start: free components, blocks, and dashboards under the MIT license.',
    ],
    sections: [
      {
        heading: 'At a glance',
        table: glance('Preline UI', {
          price: 'MIT plus a Fair Use license, with paid Preline Pro',
          model: 'HTML with vanilla JavaScript plugins, npm package',
          styling: 'Tailwind CSS v4',
          sections: 'Many free blocks and templates, more in Pro',
        }),
      },
      {
        heading: 'Where Preline is stronger',
        bullets: [
          'It is framework-agnostic, with setup guides for React, Vue, Svelte, Angular, Laravel, and more.',
          'It has a large number of free blocks and templates.',
        ],
      },
      {
        heading: 'Why pick Watermelon',
        bullets: [
          'Components are React from the start, using React state and hooks instead of DOM plugins.',
          'It installs with the shadcn CLI and follows shadcn conventions.',
          'It includes [animated components](/free/animated-react-components) and full [dashboard templates](/free/react-dashboard-templates).',
        ],
      },
    ],
    related: ['/alternatives/flowbite', '/alternatives/tailwind-ui', '/free/tailwind-blocks', '/alternatives/daisyui'],
    updated,
  },
  {
    kind: 'alternative',
    slug: 'heroui',
    title: 'HeroUI Alternative with Copy-Paste Tailwind Components',
    description:
      'A HeroUI (formerly NextUI) alternative for teams that want to own their component code. Watermelon UI offers free copy-paste Tailwind components and blocks.',
    h1: 'A HeroUI Alternative with Copy-Paste Components',
    primaryKeyword: 'heroui alternative',
    secondaryKeywords: ['nextui alternative', 'shadcn vs heroui', 'heroui vs shadcn'],
    intro: [
      'HeroUI, formerly NextUI, is a polished React component package built on React Aria and Tailwind CSS v4. Watermelon UI is an alternative for teams that would rather own the code: you copy components into your repository, edit them freely, and pull in free blocks and dashboards as you need them.',
    ],
    sections: [
      {
        heading: 'At a glance',
        table: glance('HeroUI', {
          price: 'Free, open source, plus paid HeroUI Pro',
          model: 'npm package (@heroui/react)',
          styling: 'Tailwind CSS v4, requires React 19',
          sections: 'Pro components and templates',
        }),
      },
      {
        heading: 'Where HeroUI is stronger',
        bullets: [
          'It is a maintained package with a consistent API, so updates come from upstream.',
          'It is built on React Aria, which gives it strong accessibility behavior.',
          'It offers React Native components through HeroUI Native.',
        ],
      },
      {
        heading: 'Why pick Watermelon',
        bullets: [
          'You can change markup and behavior directly without overriding a package.',
          'It has page [blocks](/free/tailwind-blocks), [dashboards](/free/react-dashboard-templates), and [animations](/free/animated-react-components) for free.',
          'It follows shadcn conventions, which AI coding tools already know well.',
        ],
      },
    ],
    related: ['/compare/shadcn-vs-heroui', '/guides/copy-paste-vs-component-library', '/alternatives/shadcn-ui', '/free/react-components'],
    updated,
  },
  {
    kind: 'alternative',
    slug: 'cult-ui',
    title: 'Cult UI Alternative for Animated shadcn Components',
    description:
      'A Cult UI alternative for animated shadcn-style React components. Watermelon UI is free and MIT licensed, with 130+ animations, blocks, and dashboards.',
    h1: 'A Cult UI Alternative',
    primaryKeyword: 'cult ui alternative',
    secondaryKeywords: ['cult ui', 'cult ui pro alternative', 'animated shadcn components'],
    intro: [
      'Cult UI and Watermelon UI are both MIT licensed, animated, shadcn-style component libraries. Watermelon is the better fit when you want a large free catalog in one place: 130+ animated components, 180+ blocks, and full dashboard templates, with no Pro tier.',
    ],
    sections: [
      {
        heading: 'At a glance',
        table: glance('Cult UI', {
          price: 'Free, MIT, plus paid Cult UI Pro',
          model: 'Copy-paste, installs with the shadcn CLI',
          styling: 'Tailwind CSS v4',
          motion: 'Yes, Motion-based components',
        }),
      },
      {
        heading: 'Where Cult UI is stronger',
        bullets: [
          'It has AI SDK agent patterns and full-stack templates for AI apps.',
          'It has a distinctive, playful visual style.',
        ],
      },
      {
        heading: 'Why pick Watermelon',
        bullets: [
          'The whole catalog is free, including [dashboards](/free/react-dashboard-templates).',
          'It has 30 standard component categories alongside the animated ones.',
          'An [MCP server](/guides/react-component-mcp-server) lets agents search and install components.',
        ],
      },
    ],
    related: ['/alternatives/magic-ui', '/alternatives/aceternity-ui', '/free/animated-react-components', '/guides/add-animated-components-to-react'],
    updated,
  },
  {
    kind: 'alternative',
    slug: 'origin-ui',
    title: 'Origin UI Alternative After the Move to coss ui',
    description:
      'Origin UI now redirects to coss.com/ui, and the original is a legacy snapshot. Watermelon UI is an actively updated shadcn-style alternative, free and MIT.',
    h1: 'An Origin UI Alternative',
    primaryKeyword: 'origin ui alternative',
    secondaryKeywords: ['origin ui', 'originui', 'coss ui', 'origin ui shadcn'],
    intro: [
      'Origin UI now redirects to coss.com/ui. The original Radix-based Origin UI is kept as a legacy snapshot, and new work happens in coss ui, which is built on Base UI. If you liked the Origin UI copy-paste style, Watermelon UI is an actively maintained alternative with the same shadcn conventions and a free MIT license.',
    ],
    sections: [
      {
        heading: 'What changed with Origin UI',
        bullets: [
          'originui.com now points to coss.com/ui, the design system from the Cal.com team.',
          'The original Origin UI components remain available as a legacy, shadcn-style snapshot.',
          'The coss repository is AGPL-3.0 by default, with the Origin and UI apps under MIT.',
        ],
      },
      {
        heading: 'Where coss ui is stronger',
        bullets: [
          'It is backed by the Cal.com team and used in production there.',
          'It has a large set of application UI components built on Base UI.',
        ],
      },
      {
        heading: 'Why pick Watermelon',
        bullets: [
          'It is MIT licensed throughout, with no AGPL parts to track.',
          'It includes page [blocks](/free/tailwind-blocks), [dashboards](/free/react-dashboard-templates), and [animated components](/free/animated-react-components).',
          'It installs with the standard shadcn CLI.',
        ],
      },
    ],
    related: ['/alternatives/shadcn-ui', '/compare/shadcn-vs-radix-ui', '/free/react-components', '/guides/best-free-shadcn-alternatives'],
    updated,
  },
];
