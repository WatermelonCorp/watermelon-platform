import { SEOHead } from '@/components/seo-head';
import { CodeBlock } from '@/components/mdx';
import { Tick01Icon } from '@/lib/hugeicons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  DocCard,
  DocHeader,
  DocPage,
  DocSection,
  DocTable,
  DocText,
} from '@/components/docs';

const frameworks = [
  {
    name: 'Next.js',
    version: '14+',
    status: 'full',
    notes: 'Full support including App Router and Server Components',
  },
  {
    name: 'Vite + React',
    version: '5+',
    status: 'full',
    notes: 'Recommended setup — this is what Watermelon UI is built with',
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === 'full') {
    return (
      <span className="inline-flex h-fit w-fit items-center gap-1 rounded-md bg-emerald-500/10 px-1 py-0.5 text-[10px] font-medium text-emerald-500 md:px-2.5 md:py-1">
        <HugeiconsIcon icon={Tick01Icon} className="size-3" />
        Full Support
      </span>
    );
  }
  if (status === 'partial') {
    return (
      <span className="inline-flex h-fit w-fit items-center gap-1 rounded-md bg-amber-500/10 px-1 py-0.5 text-[10px] font-medium text-amber-500 md:px-2.5 md:py-1">
        Partial
      </span>
    );
  }
  return (
    <span className="inline-flex h-fit w-fit items-center gap-1 rounded-md bg-blue-500/10 px-1 py-0.5 text-[10px] font-medium text-blue-500 md:px-2.5 md:py-1">
      Coming Soon
    </span>
  );
}

export default function FrameworkSupportPage() {
  return (
    <>
      <SEOHead
        title="Framework Support"
        description="Watermelon UI works with all major React frameworks including Next.js, Vite, Remix, and Astro. Check compatibility and setup guides."
        keywords="Next.js, React, Vite, Remix, Astro, frameworks, compatibility"
      />

      <DocPage>
        <DocHeader
          title="Framework Support"
          description="Watermelon UI components work with any React-based framework that supports Tailwind CSS v4."
        />

        <DocSection>
          <DocTable>
            {/* table header */}
            <div className="bg-background hidden grid-cols-[1.2fr_0.6fr_0.8fr_2fr] gap-4 border-b px-6 py-2.5 text-sm font-medium md:grid">
              <div>Framework</div>
              <div>Version</div>
              <div>Status</div>
              <div>Notes</div>
            </div>

            <div className="divide-border divide-y">
              {frameworks.map((f, i) => (
                <div
                  key={f.name}
                  className={`grid grid-cols-1 gap-4 px-6 py-2 text-sm md:grid-cols-[1.2fr_0.6fr_0.8fr_2fr] ${
                    i % 2 !== 0 ? 'bg-background' : 'bg-muted/20'
                  }`}
                >
                  <div className="font-medium">{f.name}</div>
                  <div className="text-muted-foreground hidden md:block">
                    {f.version}
                  </div>
                  <StatusBadge status={f.status} />
                  <div className="text-muted-foreground">{f.notes}</div>
                </div>
              ))}
            </div>
          </DocTable>
        </DocSection>
      </DocPage>
    </>
  );
}
