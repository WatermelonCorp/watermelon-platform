import { SEOHead } from '@/components/seo-head';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tick01Icon } from '@/lib/hugeicons';
import {
  DocHeader,
  DocPage,
  DocSection,
  DocTable,
} from '@/components/docs';

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'full' | 'partial' | 'coming';

interface Framework {
  name: string;
  version: string;
  status: Status;
  notes: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const frameworks: Framework[] = [
  {
    name: 'Next.js',
    version: '14+',
    status: 'full',
    notes: 'Full support including App Router and Server Components.',
  },
  {
    name: 'Vite + React',
    version: '5+',
    status: 'full',
    notes: 'Recommended setup — this is what Watermelon UI is built with.',
  },
];

const requirements = [
  { label: 'React', value: '18 or 19', desc: 'Hooks & Suspense required' },
  { label: 'Tailwind CSS', value: 'v4', desc: 'CSS-first config via @import' },
  { label: 'shadcn/ui', value: 'Latest', desc: 'Component primitives layer' },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  if (status === 'partial') {
    return (
      <span className="inline-flex h-fit w-fit items-center gap-1 rounded-md bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20">
        Partial
      </span>
    );
  }
  if (status === 'coming') {
    return (
      <span className="inline-flex h-fit w-fit items-center gap-1 rounded-md bg-blue-500/10 px-2.5 py-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20">
        Coming Soon
      </span>
    );
  }
  return (
    <span className="inline-flex h-fit w-fit items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20">
      <HugeiconsIcon icon={Tick01Icon} className="size-3" />
      Full Support
    </span>
  );
}


// ─── Page ─────────────────────────────────────────────────────────────────────

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

        {/* ── Frameworks table ── */}
        <DocSection title="Supported Frameworks">
          <DocTable>
            {/* Header row */}
            <div className="hidden grid-cols-[1.4fr_0.6fr_1fr_2fr] gap-4 border-b border-border bg-muted/30 px-6 py-3 text-xs font-medium uppercase tracking-widest text-muted-foreground md:grid">
              <div>Framework</div>
              <div>Version</div>
              <div>Status</div>
              <div>Notes</div>
            </div>

            {/* Data rows */}
            <div className="divide-y divide-border">
              {frameworks.map((f, i) => (
                <div
                  key={f.name}
                  className={`grid grid-cols-1 gap-3 px-6 py-4 text-sm md:grid-cols-[1.4fr_0.6fr_1fr_2fr] md:items-center ${
                    i % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                  }`}
                >
                  <div className="font-medium text-foreground">{f.name}</div>
                  <div className="font-mono text-xs text-muted-foreground hidden md:block">{f.version}</div>
                  <StatusBadge status={f.status} />
                  <div className="text-muted-foreground text-xs leading-relaxed">{f.notes}</div>
                </div>
              ))}
            </div>
          </DocTable>
        </DocSection>

        {/* ── Requirements ── */}
        <DocSection title="Requirements">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {requirements.map((req) => (
              <div
                key={req.label}
                className="rounded-xl border border-border bg-muted/20 p-4"
              >
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
                  {req.label}
                </p>
                <p className="text-base font-semibold text-foreground">{req.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{req.desc}</p>
              </div>
            ))}
          </div>
        </DocSection>

        {/* ── Note ── */}
        <DocSection>
          <div className="rounded-xl border border-border bg-muted/20 px-5 py-4 text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Note: </span>
            All components are client-side React components and work with any React 18+ project.
            If your framework uses SSR, wrap animation-heavy components in a{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              {'<ClientOnly>'}
            </code>{' '}
            boundary or use dynamic imports with{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              ssr: false
            </code>
            .
          </div>
        </DocSection>
      </DocPage>
    </>
  );
}
