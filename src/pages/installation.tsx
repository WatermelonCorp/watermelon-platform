import { useState, useId } from 'react';
import { motion } from 'motion/react';
import { SEOHead } from '@/components/seo-head';
import { CodeBlock } from '@/components/mdx';
import { CopyButton } from '@/components/animate-ui/components/buttons/copy';
import { TableOfContents, type TOCItem } from '@/components/docs/table-of-contents';

// ─── Package Manager Command Block ──────────────────────────────────────────

type PM = 'npm' | 'pnpm' | 'yarn' | 'bun';

function CommandBlock({
  commands,
  label,
}: {
  commands: Record<PM, string>;
  label?: boolean;
}) {
  const [active, setActive] = useState<PM>('npm');
  const uid = useId();
  const current = commands[active];

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-white/8 dark:bg-neutral-950 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5 dark:border-white/6">
        <div className="flex items-center gap-0.5">
          {(['npm', 'pnpm', 'yarn', 'bun'] as PM[]).map((pm) => (
            <button
              key={pm}
              onClick={() => setActive(pm)}
              className="relative px-3 py-1 text-xs font-medium z-10 transition-colors duration-150 rounded-md"
            >
              {active === pm && (
                <motion.span
                  layoutId={`${uid}-pm-pill`}
                  className="absolute inset-0 rounded-md bg-primary"
                  initial={{ opacity: 1 }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                />
              )}
              <span className={`relative ${
                active === pm
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-300'
              }`}>
                {pm}
              </span>
            </button>
          ))}
        </div>
        <CopyButton
          content={current}
          variant="ghost"
          size="sm"
          className="size-7 p-0 opacity-0 transition-opacity group-hover:opacity-100 text-gray-500 hover:text-gray-900 dark:text-neutral-500 dark:hover:text-neutral-200"
        />
      </div>
      {/* Command */}
      <div className="px-5 py-4 font-mono text-[13px] text-gray-800 overflow-x-auto whitespace-nowrap dark:text-neutral-300">
        {label && <span className="text-gray-400 select-none mr-2 dark:text-neutral-600">$</span>}
        <code>{current}</code>
      </div>
    </div>
  );
}

// ─── Framework Selector ──────────────────────────────────────────────────────

function FrameworkTabs() {
  const [framework, setFramework] = useState<'nextjs' | 'vite'>('nextjs');
  const uid = useId();

  const commands: Record<'nextjs' | 'vite', Record<PM, string>> = {
    nextjs: {
      npm: 'npx shadcn@latest init --preset [CODE] --template next',
      pnpm: 'pnpm dlx shadcn@latest init --preset [CODE] --template next',
      yarn: 'yarn dlx shadcn@latest init --preset [CODE] --template next',
      bun: 'bunx --bun shadcn@latest init --preset [CODE] --template next',
    },
    vite: {
      npm: 'npx shadcn@latest init --preset [CODE] --template vite',
      pnpm: 'pnpm dlx shadcn@latest init --preset [CODE] --template vite',
      yarn: 'yarn dlx shadcn@latest init --preset [CODE] --template vite',
      bun: 'bunx --bun shadcn@latest init --preset [CODE] --template vite',
    },
  };

  return (
    <div className="space-y-3">
      <div className="relative flex items-center w-fit rounded-md bg-gray-100 border border-gray-200 dark:bg-neutral-900 dark:border-white/6">
        {(['nextjs', 'vite'] as const).map((fw) => (
          <button
            key={fw}
            onClick={() => setFramework(fw)}
            className="relative px-5 py-1.5 text-xs font-medium z-10 transition-colors duration-150 rounded-md"
          >
            {framework === fw && (
              <motion.span
                layoutId={`${uid}-fw-pill`}
                className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-white/10 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                initial={{ opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
              />
            )}
            <span className={`relative ${
              framework === fw
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-300'
            }`}>
              {fw === 'nextjs' ? 'Next.js' : 'Vite'}
            </span>
          </button>
        ))}
      </div>
      <CommandBlock commands={commands[framework]} label />
    </div>
  );
}

// ─── Component Install Block ─────────────────────────────────────────────────

function ComponentInstallTabs() {
  const [mode, setMode] = useState<'cli' | 'manual'>('cli');
  const uid = useId();

  const cliCmds: Record<PM, string> = {
    npm: 'npx shadcn@latest add https://registry.watermelon.sh/r/card-split-accordian.json',
    pnpm: 'pnpm dlx shadcn@latest add https://registry.watermelon.sh/r/card-split-accordian.json',
    yarn: 'yarn dlx shadcn@latest add https://registry.watermelon.sh/r/card-split-accordian.json',
    bun: 'bunx --bun shadcn@latest add https://registry.watermelon.sh/r/card-split-accordian.json',
  };

  const depCmds: Record<PM, string> = {
    npm: 'npm install motion',
    pnpm: 'pnpm add motion',
    yarn: 'yarn add motion',
    bun: 'bun add motion',
  };

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="relative flex items-center w-fit rounded-md bg-gray-100 border border-gray-200 dark:bg-neutral-900 dark:border-white/6">
        {(['cli', 'manual'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="relative px-5 py-1.5 text-xs font-medium uppercase tracking-wide z-10 transition-colors duration-150 rounded-md"
          >
            {mode === m && (
              <motion.span
                layoutId={`${uid}-mode-pill`}
                className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-white/10 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                initial={{ opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
              />
            )}
            <span className={`relative ${
              mode === m
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-300'
            }`}>
              {m}
            </span>
          </button>
        ))}
      </div>

      {mode === 'cli' && <CommandBlock commands={cliCmds} label />}

      {mode === 'manual' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-neutral-500">
              1. Install dependencies
            </p>
            <CommandBlock commands={depCmds} label />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-neutral-500">
              2. Copy component source
            </p>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              Paste the component source into your{' '}
              <code className="rounded bg-gray-200 px-1.5 py-0.5 text-gray-700 dark:bg-white/6 dark:text-neutral-300">components/ui</code> directory.
            </p>
            <CodeBlock language="tsx" title="card-split-accordian.tsx">
              {`import { motion } from "motion/react";
import { useState } from "react";

export function CardSplitAccordian() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      layout 
      onClick={() => setIsOpen(!isOpen)}
      className="p-4 rounded-xl bg-muted overflow-hidden"
    >
      <motion.h3 layout className="text-lg font-medium">Click to Expand</motion.h3>
      {isOpen && (
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mt-2 text-muted-foreground"
        >
          This is a smooth expanding accordion built with Framer Motion.
        </motion.p>
      )}
    </motion.div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step Badge ───────────────────────────────────────────────────────────────

function StepBadge({ n }: { n: number }) {
  return (
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-xs font-semibold text-gray-500 dark:border-white/12 dark:bg-white/4 dark:text-neutral-400">
      {n}
    </div>
  );
}

// ─── TOC items ─────────────────────────────────────────────────────────────

const TOC_ITEMS: TOCItem[] = [
  { id: 'new-project',      title: 'Start a New Project',    level: 1 },
  { id: 'existing-project', title: 'Add to Existing Project', level: 1 },
  { id: 'usage',            title: 'Usage Example',           level: 1 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InstallationPage() {
  const [scrollRoot, setScrollRoot] = useState<Element | null>(null);

  return (
    <>
      <SEOHead
        title="Installation"
        description="Get started with Watermelon UI. Build modern, responsive projects with shadcn and Watermelon components."
        keywords="install, setup, npm, nextjs, vite, tailwind, react components, shadcn cli"
      />

      {/* Two-column wrapper: article left. TOC is fixed-positioned (see TableOfContents). */}
      <div
        className="flex px-4 sm:px-8 relative"
        ref={el => {
          if (!el) return;
          let node: Element | null = el;
          while (node) {
            const ov = getComputedStyle(node).overflowY;
            if (ov === 'auto' || ov === 'scroll') {
              setScrollRoot(node);
              return;
            }
            node = node.parentElement;
          }
        }}
      >
        {/* Main content */}
        <article className="relative min-w-0 max-w-2xl flex-1 pb-32">

          {/* ── Page Header ── */}
          <div className="border-b border-gray-200 py-8 dark:border-white/6">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-neutral-600">Docs</p>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">Installation</h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 max-w-xl dark:text-neutral-500">
              Build modern, responsive, and customizable interfaces with ease. Follow these steps to get started with a new project or add Watermelon UI to your existing setup.
            </p>
          </div>

          {/* ── Section 1: New Project ── */}
          <section id="new-project" className="border-b border-gray-200 py-10 space-y-8 dark:border-white/6">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1 dark:text-neutral-600">Getting started</p>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Start a New Project</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">Initialize a new project using the shadcn CLI, then add Watermelon components.</p>
            </div>

            {/* Step 1 */}
            <div className="flex gap-4">
              <StepBadge n={1} />
              <div className="flex-1 space-y-3 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">Initialize your project</p>
                <p className="text-sm text-gray-500 dark:text-neutral-500">Choose your framework and run the init command.</p>
                <FrameworkTabs />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <StepBadge n={2} />
              <div className="flex-1 space-y-3 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">Add a Watermelon component</p>
                <p className="text-sm text-gray-500 dark:text-neutral-500">Use the CLI to pull any component directly into your project.</p>
                <ComponentInstallTabs />
              </div>
            </div>
          </section>

          {/* ── Section 2: Existing Project ── */}
          <section id="existing-project" className="border-b border-gray-200 py-10 space-y-8 dark:border-white/6">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1 dark:text-neutral-600">Existing codebase</p>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add to Existing Project</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">
                Already have a project? Ensure you have{' '}
                <span className="text-gray-800 font-medium dark:text-neutral-300">Tailwind CSS v4</span> and{' '}
                <span className="text-gray-800 font-medium dark:text-neutral-300">shadcn-ui</span> initialized, then:
              </p>
            </div>

            <div className="flex gap-4">
              <StepBadge n={1} />
              <div className="flex-1 space-y-3 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">Add any component</p>
                <ComponentInstallTabs />
              </div>
            </div>
          </section>

          {/* ── Section 3: Usage ── */}
          <section id="usage" className="py-10 space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1 dark:text-neutral-600">Usage</p>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Usage Example</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">
                Once installed, import and use the component like any other shadcn component.
              </p>
            </div>

            <CodeBlock language="tsx" title="Usage Example">
              {`import { CardSplitAccordian } from "@/components/ui/card-split-accordian";

export default function App() {
  return (
    <div className="p-8">
      <CardSplitAccordian />
    </div>
  );
}`}
            </CodeBlock>
          </section>

        </article>

        {/* TOC — sticky right column (nav itself is the flex item with self-start) */}
        <TableOfContents items={TOC_ITEMS} scrollRoot={scrollRoot} />

      </div>
    </>
  );
}
