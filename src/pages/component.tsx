'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { registry } from '@/data/registry';
import { SEOHead } from '@/components/seo-head';
import { CodeBlock } from '@/components/mdx/code-block';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SourceCodeIcon,
  ReloadIcon,
  ArrowUpRight01FreeIcons,
} from '@/lib/hugeicons';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { PromptItems } from '@/components/prompt-items';
import type { ComponentFile } from '@/lib/types';
import { InstallationCmd } from '@/components/mdx/installation-cmd';
import { ManualInstallationCmd } from '@/components/mdx/manual-installation';
import { LayoutGroup } from 'motion/react';
import { ScrollFadeEffect } from '@/components/scroll-fade-effect';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/radix/tabs';
import { trackEvent } from '@/lib/analytics';

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export default function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = registry.find((i) => i.slug === slug);
  const isMobile = useIsMobile();

  const [demoCode, setDemoCode] = useState('');
  const [componentCodeBase, setComponentCodeBase] = useState('');
  const [componentCodeOriginal, setComponentCodeOriginal] = useState('');
  const [activeVariant, setActiveVariant] = useState<'base' | 'original'>(
    'original',
  );
  const [reloadKey, setReloadKey] = useState(0);
  const [activePackageManager, setActivePackageManager] =
    useState<PackageManager>('npm');

  const [isCodeOpen, setIsCodeOpen] = useState(false);

  useEffect(() => {
    if (!item) return;
    item.demoCode[activeVariant]().then(setDemoCode);
    item.code.base().then(setComponentCodeBase);
    item.code.original().then(setComponentCodeOriginal);
  }, [item, activeVariant]);

  useEffect(() => {
    if (!item) return;
    trackEvent('component_view', {
      component_slug: item.slug,
      component_name: item.name,
      category: item.category,
      source: 'page',
    });
  }, [item]);

  if (!item) {
    return <div className="p-12 text-center">Component not found</div>;
  }

  const componentFiles: ComponentFile[] = [
    ...(demoCode ? [{ name: 'demo.tsx', content: demoCode }] : []),
    ...(componentCodeBase
      ? [{ name: `${item.slug}-base.tsx`, content: componentCodeBase }]
      : []),
    ...(componentCodeOriginal
      ? [{ name: `${item.slug}.tsx`, content: componentCodeOriginal }]
      : []),
  ];

  const OriginalComponent = item.component.original;
  const BaseComponent = item.component.base;

  return (
    <>
      <SEOHead
        title={item.name}
        description={item.description}
        image={item.image}
        category={item.category}
      />

      {/* ================= MOBILE ================= */}
      {isMobile && (
        <>
          {/* Header */}
          <div className="bg-background relative px-4 pt-4 pb-3">
            <div className="text-muted-foreground mb-2 flex gap-2 text-xs">
              <Link to="/">Components</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{item.name}</span>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <h1 className="text-xl font-semibold">{item.name}</h1>
              {item.componentNumber && (
                <span className="bg-muted text-muted-foreground rounded-sm px-2 py-0.5 text-xs font-medium backdrop-blur-md">
                  {item.componentNumber}
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>

          {/* Preview */}
          <div className="bg-muted/5 relative flex min-h-[60dvh] items-center justify-center border-y">
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <button
                onClick={() => setIsCodeOpen(true)}
                aria-label="Open source code drawer"
                className="size-8 rounded-lg border border-input/50 bg-background flex items-center justify-center active:bg-accent transition-colors"
              >
                <HugeiconsIcon icon={SourceCodeIcon} size={16} />
              </button>
              <ThemeToggle />
            </div>

            <div
              className={
                activeVariant === 'base'
                  ? 'theme-injected flex w-full items-center justify-center'
                  : 'flex w-full items-center justify-center'
              }
            >
              <Suspense fallback={<div>Loading preview…</div>}>
                <div className={activeVariant === 'original' ? 'contents' : 'hidden'}>
                  <OriginalComponent key={`orig-${reloadKey}`} />
                </div>
                <div className={activeVariant === 'base' ? 'contents' : 'hidden'}>
                  {BaseComponent && <BaseComponent key={`base-${reloadKey}`} />}
                </div>
              </Suspense>
            </div>
          </div>

          {/* Docs */}
          <div className="space-y-6 p-4">
            {/* Dependencies */}
            {item.dependencies && item.dependencies.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Dependencies</h4>
                <div className="flex flex-wrap gap-2">
                  {item.dependencies.map((dep) => (
                    <span
                      key={dep}
                      className="bg-muted flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs"
                    >
                      {dep}
                      <img
                        src="/brand/npm-icon.png"
                        alt="npm"
                        width={10}
                        height={10}
                        className="inline-block"
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="font-medium">Copy for AI</h3>
              <PromptItems
                files={componentFiles}
                dependencies={item.dependencies || []}
                componentName={item.name}
                componentSlug={item.slug}
                category={item.category}
                source="page"
              />
            </div>

            {/* Inspired By */}
            {item.inspiredByName && (
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Inspired By</h4>
                {item.inspiredByLink ? (
                  <a
                    href={item.inspiredByLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground inline-flex items-center text-sm underline underline-offset-4"
                  >
                    {item.inspiredByName}
                    <HugeiconsIcon
                      icon={ArrowUpRight01FreeIcons}
                      size={14}
                      className="ml-0.5"
                    />
                  </a>
                ) : (
                  <span className="text-muted-foreground text-sm">
                    {item.inspiredByName}
                  </span>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium">Installation</h3>

                <Tabs defaultValue="cli" className="w-full">
                  <TabsList>
                    <TabsTrigger value="cli">CLI</TabsTrigger>
                    <TabsTrigger value="manual">Manual</TabsTrigger>
                  </TabsList>
                  <TabsContents>
                    <TabsContent value="cli" forceMount className="data-[state=inactive]:hidden">
                      <LayoutGroup id={`install-mobile-${item.slug}`}>
                        <InstallationCmd
                          activeCodeTab={activeVariant}
                          activePackageManager={activePackageManager}
                          setActivePackageManager={setActivePackageManager}
                          item={item}
                          trackingContext={{
                            component_slug: item.slug,
                            component_name: item.name,
                            category: item.category,
                            source: 'page',
                          }}
                        />
                      </LayoutGroup>
                      {/* Import & use */}
                      <div className="my-4 space-y-4">
                        <p className="text-muted-foreground text-xs">
                          Update the import path to match your project structure
                        </p>
                        <h3 className="font-medium">How to use</h3>

                        {demoCode ? (
                          <CodeBlock language="tsx" title="demo.tsx">
                            {demoCode}
                          </CodeBlock>
                        ) : (
                          <div className="text-muted-foreground flex h-32 animate-pulse items-center justify-center">
                            Loading usage example…
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="manual" forceMount className="space-y-6 data-[state=inactive]:hidden">
                      {/* Manual install (dependencies-driven) */}
                      <ManualInstallationCmd
                        activePackageManager={activePackageManager}
                        setActivePackageManager={setActivePackageManager}
                        dependencies={item.dependencies}
                        trackingContext={{
                          component_slug: item.slug,
                          component_name: item.name,
                          category: item.category,
                          source: 'page',
                        }}
                      />
                      {componentCodeOriginal && componentCodeBase ? (
                        <div className="space-y-4">
                          <div className={activeVariant === 'original' ? 'block' : 'hidden'}>
                            <CodeBlock showLineNumbers title={`${item.slug}.tsx`}>
                              {componentCodeOriginal}
                            </CodeBlock>
                          </div>
                          <div className={activeVariant === 'base' ? 'block' : 'hidden'}>
                            <CodeBlock showLineNumbers title={`${item.slug}-base.tsx`}>
                              {componentCodeBase}
                            </CodeBlock>
                          </div>
                        </div>
                      ) : (
                        <div className="text-muted-foreground flex h-32 animate-pulse items-center justify-center text-sm">
                          Loading source code…
                        </div>
                      )}
                      {/* Import & use */}
                      <div className="space-y-2">
                        <h4 className="text-muted-foreground text-sm font-medium">
                          Import & use
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          Update the import path to match your project structure
                        </p>

                        {demoCode ? (
                          <CodeBlock language="tsx" title="demo.tsx">
                            {demoCode}
                          </CodeBlock>
                        ) : (
                          <div className="text-muted-foreground flex h-32 animate-pulse items-center justify-center">
                            Loading usage example…
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </TabsContents>
                </Tabs>
              </div>
            </div>
          </div>

          {/* MOBILE BOTTOM DRAWER */}
          <Drawer open={isCodeOpen} onOpenChange={setIsCodeOpen}>
            <DrawerContent className="h-[85dvh] max-h-[85dvh] overflow-hidden p-0">
              {/* Sticky header */}
              <div className="bg-background sticky top-0 z-10 border-b px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Usage & Source</h3>
                  <button
                    onClick={() => setIsCodeOpen(false)}
                    aria-label="Close source code drawer"
                    className="text-muted-foreground text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Scroll container */}
              <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
                <ManualInstallationCmd
                  activePackageManager={activePackageManager}
                  setActivePackageManager={setActivePackageManager}
                  dependencies={item.dependencies}
                  trackingContext={{
                    component_slug: item.slug,
                    component_name: item.name,
                    category: item.category,
                    source: 'page',
                  }}
                />

                {/* DEMO CODE — MOBILE SAFE */}
                {demoCode && (
                  <CodeBlock mobile showLineNumbers={false}>
                    {demoCode}
                  </CodeBlock>
                )}

                {(componentCodeOriginal || componentCodeBase) && (
                  <>
                    <div className={activeVariant === 'original' ? 'block' : 'hidden'}>
                      <CodeBlock mobile showLineNumbers={false}>
                        {componentCodeOriginal}
                      </CodeBlock>
                    </div>
                    <div className={activeVariant === 'base' ? 'block' : 'hidden'}>
                      <CodeBlock mobile showLineNumbers={false}>
                        {componentCodeBase}
                      </CodeBlock>
                    </div>
                  </>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </>
      )}

      {/* ================= DESKTOP ================= */}
      {!isMobile && (
        <div className="relative flex h-[calc(100dvh-84px)] w-full overflow-hidden">
          {/* LEFT DOCS - Scrollable */}
          <div className="w-[40%] flex-1 shrink-0 overflow-y-auto xl:w-[38%]">
            <ScrollFadeEffect>
              <div className="space-y-4 px-6 py-6 pb-12">
                <div className="flex items-center justify-between pt-2">
                  <h1 className="text-2xl font-semibold">{item.name}</h1>

                  {item.componentNumber && (
                    <span className="bg-muted text-muted-foreground rounded-sm px-2 py-0.5 text-xs font-medium backdrop-blur-md">
                      {item.componentNumber}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
                {/* Dependencies */}
                {item.dependencies && item.dependencies.length > 0 && (
                  <div className="mt-6">
                    <h4 className="mb-2 text-sm font-medium">Dependencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.dependencies.map((dep) => (
                        <span
                          key={dep}
                          className="bg-muted flex items-center gap-1.5 rounded-md px-3 py-1 text-sm"
                        >
                          {dep}
                          <img
                            src="/brand/npm-icon.png"
                            alt="npm"
                            width={12}
                            height={12}
                            className="inline-block"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inspired By */}
                {item.inspiredByName && (
                  <div className="group/inspired-by flex items-center gap-2">
                    <h4 className="text-sm">Inspired By</h4>
                    {item.inspiredByLink ? (
                      <a
                        href={item.inspiredByLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground inline-flex items-center text-sm underline underline-offset-4"
                      >
                        {item.inspiredByName}
                        <HugeiconsIcon
                          icon={ArrowUpRight01FreeIcons}
                          size={14}
                          className="-translate-x-5 opacity-0 transition group-hover/inspired-by:translate-x-1 group-hover/inspired-by:opacity-100"
                        />
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        {item.inspiredByName}
                      </span>
                    )}
                  </div>
                )}

                {/* Copy for AI Platforms */}
                <div className="space-y-2">
                  <h3 className="font-medium">Copy for AI</h3>
                  <PromptItems
                    files={componentFiles}
                    dependencies={item.dependencies || []}
                    componentName={item.name}
                    componentSlug={item.slug}
                    category={item.category}
                    source="page"
                  />
                </div>

                {/* How to use - with Collapsible CodeBlock */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-medium">Installation</h3>

                    <Tabs defaultValue="cli" className="w-full">
                      <TabsList>
                        <TabsTrigger value="cli">CLI</TabsTrigger>
                        <TabsTrigger value="manual">Manual</TabsTrigger>
                      </TabsList>
                      <TabsContents>
                        <TabsContent value="cli" forceMount className="data-[state=inactive]:hidden">
                          <LayoutGroup id={`install-cli-right-${item.slug}`}>
                            <InstallationCmd
                              activeCodeTab={activeVariant}
                              activePackageManager={activePackageManager}
                              setActivePackageManager={setActivePackageManager}
                              item={item}
                              trackingContext={{
                                component_slug: item.slug,
                                component_name: item.name,
                                category: item.category,
                                source: 'page',
                              }}
                            />
                          </LayoutGroup>
                          {/* Import & use */}
                          <div className="my-4 space-y-4">
                            <p className="text-muted-foreground text-xs">
                              Update the import path to match your project
                              structure
                            </p>
                            <h3 className="font-medium">How to use</h3>

                            {demoCode ? (
                              <CodeBlock language="tsx" title="demo.tsx">
                                {demoCode}
                              </CodeBlock>
                            ) : (
                              <div className="text-muted-foreground flex h-32 animate-pulse items-center justify-center">
                                Loading usage example…
                              </div>
                            )}
                          </div>
                        </TabsContent>
                        <TabsContent value="manual" forceMount className="space-y-6 data-[state=inactive]:hidden">
                          {/* Manual install (dependencies-driven) */}
                          <ManualInstallationCmd
                            activePackageManager={activePackageManager}
                            setActivePackageManager={setActivePackageManager}
                            dependencies={item.dependencies}
                            trackingContext={{
                              component_slug: item.slug,
                              component_name: item.name,
                              category: item.category,
                              source: 'page',
                            }}
                          />
                          {componentCodeOriginal && componentCodeBase ? (
                            <div className="space-y-4">
                              <div className={activeVariant === 'original' ? 'block' : 'hidden'}>
                                <CodeBlock showLineNumbers title={`${item.slug}.tsx`}>
                                  {componentCodeOriginal}
                                </CodeBlock>
                              </div>
                              <div className={activeVariant === 'base' ? 'block' : 'hidden'}>
                                <CodeBlock showLineNumbers title={`${item.slug}-base.tsx`}>
                                  {componentCodeBase}
                                </CodeBlock>
                              </div>
                            </div>
                          ) : (
                            <div className="text-muted-foreground flex h-32 animate-pulse items-center justify-center text-sm">
                              Loading source code…
                            </div>
                          )}
                          {/* Import & use */}
                          <div className="space-y-2">
                            <h4 className="text-muted-foreground text-sm font-medium">
                              Import & use
                            </h4>
                            <p className="text-muted-foreground text-xs">
                              Update the import path to match your project
                              structure
                            </p>

                            {demoCode ? (
                              <CodeBlock language="tsx" title="demo.tsx">
                                {demoCode}
                              </CodeBlock>
                            ) : (
                              <div className="text-muted-foreground flex h-32 animate-pulse items-center justify-center">
                                Loading usage example…
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </TabsContents>
                    </Tabs>
                  </div>
                </div>
              </div>
            </ScrollFadeEffect>
          </div>

          {/* RIGHT PREVIEW - Sticky */}
          <div className="sticky top-0 h-[calc(100dvh-84px)] flex-1 p-6">
            <div className="bg-muted/5 flex h-full flex-col overflow-hidden rounded-2xl border">
              <div className={`bg-background/80 flex items-center gap-2 rounded-t-2xl border-b px-4 py-2 backdrop-blur ${item.hasVariants ? 'justify-between' : 'justify-end'}`}>
                {/* Variant toggle */}
                {item.hasVariants && (
                  <div className="bg-muted flex items-center gap-0.5 rounded-lg border p-0.5 text-xs">
                    <button
                      onClick={() => setActiveVariant('original')}
                      className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                        activeVariant === 'original'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Original
                    </button>
                    <button
                      onClick={() => setActiveVariant('base')}
                      className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                        activeVariant === 'base'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Base
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => setReloadKey((k) => k + 1)}
                    aria-label="Reload component preview"
                    className="size-8 md:size-10 rounded-lg border border-input/50 bg-background flex items-center justify-center hover:bg-accent transition-colors"
                  >
                    <HugeiconsIcon icon={ReloadIcon} size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center overflow-auto p-12">
                <div className="flex max-w-full items-center justify-center">
                  <Suspense fallback={<div>Loading preview…</div>}>
                    <div className={activeVariant === 'original' ? 'contents' : 'hidden'}>
                      <OriginalComponent key={`orig-${reloadKey}`} />
                    </div>
                    <div className={activeVariant === 'base' ? 'contents' : 'hidden'}>
                      {BaseComponent && <BaseComponent key={`base-${reloadKey}`} />}
                    </div>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
