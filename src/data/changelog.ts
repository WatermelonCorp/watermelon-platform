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
    version: "1.2.3",
    date: "Feb 21, 2026",
    stats: [
      { label: "Total Components", count: 123, href: "/components" },
      { label: "New Dashboards", count: 8, href: "/dashboards" },
      { label: "New Blocks", count: 5, href: "/blocks" },
    ],
    sections: [
      {
        title: "Added Dashboards and Blocks",
        items: [
          {
            text: "Added 8 new dashboards to the registry with polished previews and copy-ready install commands."
          },
          {
            text: "Added 5 new blocks to the registry with polished previews and copy-ready install commands."
          },
          {
            text: "Added 38 new components to the registry with polished previews and copy-ready install commands."
          }
        ]
      }
    ]
  },
  {
    version: "1.2.2",
    date: "Feb 15, 2026",
    stats: [
      { label: "Total Components", count: 85, href: "/components" },
    ],
    sections: [
      {
        title: "Launch",
        items: [
          {
            text: "Watermelon UI is now live with a comprehensive collection of React components."
          },
          {
            text: "launched with 85+ components in the initial release."
          }
        ]
      }
    ]
  },
  {
    version: "1.2.1",
    date: "Feb 12, 2026",
    stats: [
      { label: "Components Added", count: 24, href: "/components" },
      { label: "New Categories", count: 6, href: "/components" },
    ],
    sections: [
      {
        title: "Components",
        items: [
          {
            text: "Added 24 new components to the registry with polished previews and copy-ready install commands."
          },
          {
            text: "Published full documentation and usage examples for all new additions."
          }
        ]
      }
    ]
  },
  {
    version: "1.2.0",
    date: "Feb 11, 2026",
    sections: [
      {
        title: "Changelog",
        items: [
          {
            text: "Redesigned Changelog page with a modern vertical timeline visualization."
          },
          {
            text: "Integrated Changelog with DocPage components for design consistency."
          }
        ]
      }
    ]
  },
  {
    version: "1.1.5",
    date: "Feb 10, 2026",
    sections: [
      {
        title: "UX & SEO",
        items: [
          {
            text: "Improved SEO with standardized head components and canonical links.",
          },
          {
            text: "Added mobile preview restrictions for dashboards and blocks to ensure optimal viewing experience."
          },
          {
            text: "Configured SPA routing for Cloudflare compatibility to fix direct link 404 errors."
          }
        ]
      },
      {
        title: "Fixes",
        items: [
          {
            text: "Fixed SVG namespace errors in logo components."
          },
          {
            text: "Converted onboarding components to use NativeWind for better consistency."
          }
        ]
      }
    ]
  },
  {
    version: "1.1.0",
    date: "Feb 08, 2026",
    sections: [
      {
        title: "Performance",
        items: [
          {
            text: "Optimized build performance by switching to PrismLight for syntax highlighting.",
            tags: ["performance", "build"]
          },
          {
            text: "Refined Vite manualChunks configuration to reduce main bundle size."
          }
        ]
      },
      {
        title: "Components",
        items: [
          {
            text: "Added responsive viewer to desktop modals for device preview simulation."
          }
        ]
      }
    ]
  },
  {
    version: "1.0.0",
    date: "Feb 05, 2026",
    sections: [
      {
        title: "Initial Launch",
        items: [
          {
            text: "Watermelon UI is now live with a comprehensive collection of React components, dashboards, and blocks."
          }
        ]
      }
    ]
  }
];
