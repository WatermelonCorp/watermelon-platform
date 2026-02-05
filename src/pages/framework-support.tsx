import { SEOHead } from "@/components/seo-head";
import { CodeBlock } from "@/components/mdx";
import { Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const frameworks = [
  {
    name: "Next.js",
    version: "13+",
    status: "full",
    notes: "Full support including App Router and Server Components",
  },
  {
    name: "React",
    version: "18+",
    status: "full",
    notes: "Full support with Vite, CRA, or custom setups",
  },
  {
    name: "Remix",
    version: "2+",
    status: "full",
    notes: "Full support with proper hydration",
  },
  {
    name: "Gatsby",
    version: "5+",
    status: "full",
    notes: "Full support with SSG and SSR",
  },
  {
    name: "Astro",
    version: "3+",
    status: "partial",
    notes: "Supported with React integration",
  },
  {
    name: "Vue",
    version: "3+",
    status: "coming",
    notes: "Coming soon - Vue port in development",
  },
  {
    name: "Svelte",
    version: "4+",
    status: "coming",
    notes: "Coming soon - Svelte port planned",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "full") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
        <HugeiconsIcon icon={Tick01Icon} className="size-3" />
        Full Support
      </span>
    );
  }
  if (status === "partial") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500">
        Partial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
      Coming Soon
    </span>
  );
}

export default function FrameworkSupportPage() {
  return (
    <>
      <SEOHead
        title="Framework Support"
        description="Watermelon UI works with all major React frameworks including Next.js, Remix, Gatsby, Vite, and Astro. Check compatibility and setup guides."
        keywords="Next.js, React, Vite, Remix, Gatsby, Astro, frameworks, compatibility"
      />

      <article className="relative w-full max-w-4xl">
        <header className="pb-8 w-full border-b border-border md:px-16 px-6">
          <h1 className="md:text-3xl text-2xl font-semibold tracking-tight mb-4 font-chivo-mono">
            Framework Support
          </h1>
          <p className="text-muted-foreground text-md tracking-tight leading-relaxed font-geist-mono">
            Watermelon UI components work with all major React frameworks.
          </p>
        </header>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <div className="rounded-2xl border border-border bg-secondary overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 border-b border-border bg-card font-medium text-sm">
              <div>Framework</div>
              <div>Version</div>
              <div>Status</div>
              <div>Notes</div>
            </div>
            {frameworks.map((framework) => (
              <div
                key={framework.name}
                className="grid grid-cols-4 gap-4 p-4 border-b border-border last:border-0 items-center"
              >
                <div className="font-medium">{framework.name}</div>
                <div className="text-muted-foreground">
                  {framework.version}
                </div>
                <div>
                  <StatusBadge status={framework.status} />
                </div>
                <div className="text-sm text-muted-foreground">
                  {framework.notes}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-semibold mb-4">Next.js Setup</h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            Recommended setup for Next.js 13+ with App Router:
          </p>
          <CodeBlock language="tsx">
            {`// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['motion'],
  },
}

// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}
          </CodeBlock>
        </section>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-semibold mb-4">Vite + React Setup</h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            Setup for Vite with React:
          </p>
          <CodeBlock language="bash">
            {`# Install dependencies
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
          </CodeBlock>
          <div className="mt-4">
            <CodeBlock language="js">
              {`// tailwind.config.js
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: { extend: {} },
  plugins: [],
}`}
            </CodeBlock>
          </div>
        </section>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="size-4 text-emerald-500" />
                Required
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground font-geist-mono">
                <li>• React 18+</li>
                <li>• Tailwind CSS 3.4+</li>
                <li>• TypeScript (recommended)</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="size-4 text-blue-500" />
                Optional
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground font-geist-mono">
                <li>• Motion (for animations)</li>
                <li>• next-themes (for dark mode)</li>
                <li>• clsx + tailwind-merge</li>
              </ul>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
