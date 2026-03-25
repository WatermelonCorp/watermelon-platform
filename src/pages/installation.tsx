import { useState } from 'react';
import { SEOHead } from '@/components/seo-head';
import { CodeBlock } from '@/components/mdx';
import { CopyButton } from '@/components/animate-ui/components/buttons/copy';
import { DocPage, DocHeader, DocSection, DocText } from '@/components/docs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HugeiconsIcon } from '@hugeicons/react';
import { SourceCodeIcon } from '@/lib/hugeicons';

function PackageTabs({
  pnpm,
  npm,
  yarn,
  bun,
}: {
  pnpm: string;
  npm: string;
  yarn: string;
  bun: string;
}) {
  const [activeTab, setActiveTab] = useState('npm');
  const commands = { pnpm, npm, yarn, bun };
  const currentCommand = commands[activeTab as keyof typeof commands];

  return (
    <div className="bg-muted/50 dark:bg-muted/20 group mb-4 overflow-hidden rounded-xl border">
      {/* Header */}
      <div className="bg-background/80 dark:bg-background/80 flex items-center justify-between rounded-xl border-b py-2 pr-2 pl-4 backdrop-blur">
        <div className="flex items-center gap-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-auto"
          >
            <TabsList className="flex h-9 items-center gap-1.5 bg-transparent p-0">
              {['pnpm', 'npm', 'yarn', 'bun'].map((pm) => (
                <TabsTrigger
                  key={pm}
                  value={pm}
                  className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground h-7 rounded-md border-none px-3 text-xs font-semibold shadow-none transition-all duration-200"
                >
                  {pm}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <CopyButton
          content={currentCommand}
          variant="secondary"
          size="sm"
          className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>

      {/* Code */}
      <div className=" text-foreground/85 overflow-x-auto p-5 font-mono text-[13px] whitespace-nowrap">
        <code>{currentCommand}</code>
      </div>
    </div>
  );
}

function ComponentInstallation() {
  return (
    <Tabs defaultValue="cli" className="w-full">
      <TabsList className="bg-muted/50 mb-2 h-10 w-fit rounded-lg border p-1">
        <TabsTrigger
          value="cli"
          className="data-[state=active]:bg-background rounded-md px-6 h-6 text-xs transition-all duration-200"
        >
          CLI
        </TabsTrigger>
        <TabsTrigger
          value="manual"
          className="data-[state=active]:bg-background rounded-md px-6 h-6 text-xs transition-all duration-200"
        >
          Manual
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cli" className="mt-0">
        <div className="space-y-4">
          <PackageTabs
            npm="npx shadcn@latest add https://registry.watermelon.sh/r/card-split-accordian.json"
            pnpm="pnpm dlx shadcn@latest add https://registry.watermelon.sh/r/card-split-accordian.json"
            yarn="yarn dlx shadcn@latest add https://registry.watermelon.sh/r/card-split-accordian.json"
            bun="bunx --bun shadcn@latest add https://registry.watermelon.sh/r/card-split-accordian.json"
          />
        </div>
      </TabsContent>

      <TabsContent value="manual" className="mt-0">
        <div className="space-y-8">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">
              1. Install component dependencies
            </h4>
            <PackageTabs
              npm="npm install motion/react"
              pnpm="pnpm add motion/react"
              yarn="yarn add motion/react"
              bun="bun add motion/react"
            />
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">2. Copy the component code</h4>
            <DocText>
              Copy the component source code and paste it into your{' '}
              <code>components/ui</code> directory.
            </DocText>
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
      </TabsContent>
    </Tabs>
  );
}

export default function InstallationPage() {
  return (
    <>
      <SEOHead
        title="Installation"
        description="Get started with Watermelon UI. Build modern, responsive projects with shadcn and Watermelon components."
        keywords="install, setup, npm, nextjs, vite, tailwind, react components, shadcn cli"
      />

      <DocPage>
        <DocHeader
          title="Installation"
          description="Build modern, responsive, and customizable interfaces with ease. Follow these steps to get started with a new project or add Watermelon UI to your existing setup."
        />

        {/* Start a New Project */}
        <DocSection title="Start a New Project" className="mt-3">
          <DocText>Initialize a new project using the shadcn CLI:</DocText>

          <div className="mt-5 mb-6 w-full max-w-2xl">
            <Tabs defaultValue="nextjs" className="w-full">
              <TabsList className="bg-muted/50 mb-2 h-10 w-fit rounded-lg border p-1">
                <TabsTrigger
                  value="nextjs"
                  className="data-[state=active]:bg-background rounded-md px-6 h-6 text-xs transition-all duration-200"
                >
                  Next.js
                </TabsTrigger>
                <TabsTrigger
                  value="vite"
                  className="data-[state=active]:bg-background rounded-md px-6 h-6 text-xs transition-all duration-200"
                >
                  Vite
                </TabsTrigger>
              </TabsList>

              <TabsContent value="nextjs" className="mt-0">
                <PackageTabs
                  npm="npx shadcn@latest init --preset [CODE] --template next"
                  pnpm="pnpm dlx shadcn@latest init --preset [CODE] --template next"
                  yarn="yarn dlx shadcn@latest init --preset [CODE] --template next"
                  bun="bunx --bun shadcn@latest init --preset [CODE] --template next"
                />
              </TabsContent>

              <TabsContent value="vite" className="mt-0">
                <PackageTabs
                  npm="npx shadcn@latest init --preset [CODE] --template vite"
                  pnpm="pnpm dlx shadcn@latest init --preset [CODE] --template vite"
                  yarn="yarn dlx shadcn@latest init --preset [CODE] --template vite"
                  bun="bunx --bun shadcn@latest init --preset [CODE] --template vite"
                />
              </TabsContent>
            </Tabs>
          </div>

          <DocText className="mb-5">
            After project initialization, you can add Watermelon components:
          </DocText>

          <ComponentInstallation />
        </DocSection>

        {/* Existing Project */}
        <DocSection title="Add to Existing Project" className="mt-3">
          <DocText className="mb-8">
            To use Watermelon UI in an existing project, ensure you have{' '}
            <strong>Tailwind CSS v4</strong> and <strong>shadcn-ui</strong>{' '}
            already initialized.
          </DocText>

          <ComponentInstallation />
        </DocSection>

        {/* Usage */}
        <DocSection title="Usage Example" className="mt-3">
          <DocText>
            Once installed, you can import and use the component like any other
            shadcn component.
          </DocText>
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
        </DocSection>
      </DocPage>
    </>
  );
}
