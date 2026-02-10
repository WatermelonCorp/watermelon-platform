export interface ChangelogEntry {
  version: string;
  date: string;
  title?: string;
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
