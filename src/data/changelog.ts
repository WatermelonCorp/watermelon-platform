export interface ChangelogEntry {
  version: string;
  date: string;
  title?: string;
  stats?: {
    label: string;
    count: number;
    href: string;
  }[];
  sections: {
    title: string;
    items: {
      text: string;
      author?: {
        name: string;
        username?: string;
        link?: string;
      };
      tags?: string[];
    }[];
  }[];
}

export const changelogData: ChangelogEntry[] = [
   {
    version: '1.2.7',
    date: 'Apr 14, 2026',
    stats: [
      {
        label: 'New Shadcn Variants',
        count: 180,
        href: '/components',
      },
    ],
    sections: [
      {
        title: 'Shadcn Variants (Non-Animated)',
        items: [
          {
            text: 'Added 180 more non-animated shadcn component variants to significantly expand the component library.',
          },
          {
            text: 'Focused on performance-friendly, static UI patterns for better usability and faster rendering.',
          },
          {
            text: 'Maintained consistent styling and structure across all new variants for seamless integration.',
          },
        ],
      },
      {
        title: 'Consistency & Scalability',
        items: [
          {
            text: 'Improved scalability of the design system with a larger set of reusable component variations.',
          },
          {
            text: 'Ensured alignment with existing bento layouts and component ecosystem.',
          },
          {
            text: 'Enhanced developer experience with more ready-to-use UI building blocks.',
          },
        ],
      },
    ],
  },
  {
    version: '1.2.6',
    date: 'Apr 03, 2026',
    stats: [
      { label: 'New Bento Layouts', count: 17, href: '/blocks' },
      {
        label: 'Non-Animated Variants',
        count: 170,
        href: '/components/accordion',
      },
    ],
    sections: [
      {
        title: 'Bento Layouts',
        items: [
          {
            text: 'Introduced modern bento-style layout components for visually rich and structured UI sections.',
          },
          {
            text: 'Added multiple responsive bento grid variations optimized for dashboards and landing pages.',
          },
          {
            text: 'Added ready-to-use bento layouts designed for clean structure and modern UI presentation.',
          },
        ],
      },
      {
        title: 'Shadcn Variants (Non-Animated)',
        items: [
          {
            text: 'Added non-animated variants for shadcn components to improve performance and accessibility.',
          },
          {
            text: 'Provided simplified static variants of components for cleaner and distraction-free interfaces.',
          },
          {
            text: 'Ensured consistent design language across animated and non-animated component sets.',
          },
        ],
      },
    ],
  },
  {
    version: '1.2.5',
    date: 'Mar 25, 2026',
    sections: [
      {
        title: 'Custom Theme Support',
        items: [
          {
            text: 'Added support for custom theme CSS variables, allowing users to define their own design system colors.',
          },
          {
            text: 'Introduced a dedicated theme input panel to apply and preview custom styles in real-time.',
          },
          {
            text: 'Enabled seamless integration of user-defined themes with base components for consistent UI rendering.',
          },
          {
            text: 'Improved flexibility for developers to match components with their brand identity using custom variables.',
          },
        ],
      },
    ],
  },
  {
    version: '1.2.4',
    date: 'Mar 7, 2026',
    stats: [
      { label: 'Total Components', count: 128, href: '/components' },
      { label: 'Total Dashboards', count: 17, href: '/dashboards' },
    ],
    sections: [
      {
        title: 'New Version: Improvements and New Dashboards',
        items: [
          {
            text: 'Fixed bugs and errors across existing components to improve stability and usability.',
          },
          {
            text: 'Added 5 new components to the registry with polished previews and copy-ready install commands.',
          },
          {
            text: 'Added 2 new dashboards to the registry with improved functionality and better integration.',
          },
          {
            text: 'Enhanced functionality across all dashboards for a smoother and more consistent experience.',
          },
        ],
      },
    ],
  },
  {
    version: '1.2.3',
    date: 'Feb 22, 2026',
    stats: [
      { label: 'Total Components', count: 123, href: '/components' },
      { label: 'New Dashboards', count: 15, href: '/dashboards' },
      { label: 'New Blocks', count: 5, href: '/blocks' },
    ],
    sections: [
      {
        title: 'New Version: Added Dashboards and Blocks',
        items: [
          {
            text: 'Added 15 new dashboards to the registry with polished previews and copy-ready install commands.',
          },
          {
            text: 'Added 5 new blocks to the registry with polished previews and copy-ready install commands.',
          },
          {
            text: 'Added 38 new components to the registry with polished previews and copy-ready install commands.',
          },
        ],
      },
    ],
  },
  {
    version: '1.2.2',
    date: 'Feb 15, 2026',
    stats: [{ label: 'Total Components', count: 85, href: '/components' }],
    sections: [
      {
        title: 'Launch',
        items: [
          {
            text: 'Watermelon UI is now live with a comprehensive collection of React components.',
          },
          {
            text: 'launched with 85+ components in the initial release.',
          },
        ],
      },
    ],
  },
  {
    version: '1.2.1',
    date: 'Feb 12, 2026',
    stats: [
      { label: 'Components Added', count: 24, href: '/components' },
      { label: 'New Categories', count: 6, href: '/components' },
    ],
    sections: [
      {
        title: 'Components',
        items: [
          {
            text: 'Added 24 new components to the registry with polished previews and copy-ready install commands.',
          },
          {
            text: 'Published full documentation and usage examples for all new additions.',
          },
        ],
      },
    ],
  },
  {
    version: '1.2.0',
    date: 'Feb 11, 2026',
    sections: [
      {
        title: 'Changelog',
        items: [
          {
            text: 'Redesigned Changelog page with a modern vertical timeline visualization.',
          },
          {
            text: 'Integrated Changelog with DocPage components for design consistency.',
          },
        ],
      },
    ],
  },
  {
    version: '1.1.5',
    date: 'Feb 10, 2026',
    sections: [
      {
        title: 'UX & SEO',
        items: [
          {
            text: 'Improved SEO with standardized head components and canonical links.',
          },
          {
            text: 'Added mobile preview restrictions for dashboards and blocks to ensure optimal viewing experience.',
          },
          {
            text: 'Configured SPA routing for Cloudflare compatibility to fix direct link 404 errors.',
          },
        ],
      },
      {
        title: 'Fixes',
        items: [
          {
            text: 'Fixed SVG namespace errors in logo components.',
          },
          {
            text: 'Converted onboarding components to use NativeWind for better consistency.',
          },
        ],
      },
    ],
  },
  {
    version: '1.1.0',
    date: 'Feb 08, 2026',
    sections: [
      {
        title: 'Performance',
        items: [
          {
            text: 'Optimized build performance by switching to PrismLight for syntax highlighting.',
            tags: ['performance', 'build'],
          },
          {
            text: 'Refined Vite manualChunks configuration to reduce main bundle size.',
          },
        ],
      },
      {
        title: 'Components',
        items: [
          {
            text: 'Added responsive viewer to desktop modals for device preview simulation.',
          },
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    date: 'Feb 05, 2026',
    sections: [
      {
        title: 'Initial Launch',
        items: [
          {
            text: 'Watermelon UI is now live with a comprehensive collection of React components, dashboards, and blocks.',
          },
        ],
      },
    ],
  },
];
