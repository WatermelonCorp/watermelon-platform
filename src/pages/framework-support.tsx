import { SEOHead } from "@/components/seo-head";
import { CodeBlock } from "@/components/mdx";
import { Tick01Icon } from "@/lib/hugeicons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DocCard, DocHeader, DocPage, DocSection, DocTable, DocText } from "@/components/docs";

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
      <span className="inline-flex items-center gap-1 px-1 md:px-2.5 py-0.5 md:py-1 rounded-md text-[10px] h-fit w-fit font-medium bg-emerald-500/10 text-emerald-500">
        <HugeiconsIcon icon={Tick01Icon} className="size-3" />
        Full Support
      </span>
    );
  }
  if (status === "partial") {
    return (
      <span className="inline-flex items-center gap-1 px-1 md:px-2.5 py-0.5 md:py-1 rounded-md text-[10px] h-fit w-fit font-medium bg-amber-500/10 text-amber-500">
        Partial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-1 md:px-2.5 py-0.5 md:py-1 rounded-md text-[10px] h-fit w-fit font-medium bg-blue-500/10 text-blue-500">
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

      <DocPage>
        <DocHeader
          title="Framework Support"
          description="Watermelon UI components work with all major React frameworks."
        />

        <DocSection>
          <DocTable>
            {/* table header */}
            <div className="hidden md:grid grid-cols-[1.2fr_0.6fr_0.8fr_2fr] gap-4 px-6 py-4 border-b bg-muted/40 text-sm font-medium">
              <div>Framework</div>
              <div>Version</div>
              <div>Status</div>
              <div>Notes</div>
            </div>

            <div className="divide-y divide-border">
              {frameworks.map((f, i) => (
                <div
                  key={f.name}
                  className={`grid grid-cols-1 md:grid-cols-[1.2fr_0.6fr_0.8fr_2fr] gap-4 px-6 py-5 text-sm ${i % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }`}
                >
                  <div className="font-medium">{f.name}</div>
                  <div className="hidden md:block text-muted-foreground">
                    {f.version}
                  </div>
                  <StatusBadge status={f.status} />
                  <div className="text-muted-foreground">{f.notes}</div>
                </div>
              ))}
            </div>
          </DocTable>
        </DocSection>

        <DocSection title="Next.js Setup">
          <DocText>
            Recommended setup for Next.js 13+ with App Router.
          </DocText>
          <CodeBlock language="tsx">{`// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['motion'],
  },
}`}</CodeBlock>
        </DocSection>

        <DocSection title="Requirements">
          <div className="grid sm:grid-cols-2 gap-4">
            <DocCard>
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <HugeiconsIcon
                  icon={Tick01Icon}
                  className="size-4 text-emerald-500"
                />
                Required
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>React 18+</li>
                <li>Tailwind CSS 3.4+</li>
              </ul>
            </DocCard>

            <DocCard>
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <HugeiconsIcon
                  icon={Tick01Icon}
                  className="size-4 text-blue-500"
                />
                Optional
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Motion</li>
                <li>next-themes</li>
              </ul>
            </DocCard>
          </div>
        </DocSection>
      </DocPage>
    </>
  );
}
