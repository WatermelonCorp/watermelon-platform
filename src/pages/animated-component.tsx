'use client';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { registry } from '@/data/animated-components-registry';
import { SEOHead } from '@/components/seo-head';
import { CodeBlock } from '@/components/mdx/code-block';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SourceCodeIcon,
  ReloadIcon,
  ArrowUpRight01FreeIcons,
} from '@/lib/hugeicons';
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

export default function AnimatedComponentPage() {
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

  // 1. Fetch Demo Code (Depends on item AND variant)
  useEffect(() => {
    if (!item) return;
    let isActive = true;
    item.demoCode[activeVariant]().then((code) => {
      if (isActive) setDemoCode(code);
    });
    return () => {
      isActive = false;
    };
  }, [item, activeVariant]);

  // 2. Fetch Base/Original Code (Depends ONLY on the item)
  useEffect(() => {
    if (!item) return;
    let isActive = true;
    Promise.all([item.code.base(), item.code.original()]).then(
      ([baseCode, originalCode]) => {
        if (isActive) {
          setComponentCodeBase(baseCode);
          setComponentCodeOriginal(originalCode);
        }
      },
    );
    return () => {
      isActive = false;
    };
  }, [item]);

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

  const ActiveComponent =
    activeVariant === 'base' ? item.component.base : item.component.original;
  const activeCode =
    activeVariant === 'base' ? componentCodeBase : componentCodeOriginal;

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
          <div className="bg-background relative border-b px-4 pt-4 pb-3">
            <div className="text-muted-foreground mb-2 flex gap-2 text-xs">
              <Link to="/animated-components">Animated Components</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{item.name}</span>
            </div>

            <div className="mt-4 mb-2 flex items-center justify-between">
              <h1 className="text-xl font-semibold">{item.name}</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCodeOpen(true)}
                  aria-label="Open source code drawer"
                  className="bg-muted hover:bg-accent flex size-8 items-center justify-center rounded-md border transition-colors md:size-8 lg:size-10"
                >
                  <HugeiconsIcon icon={SourceCodeIcon} size={16} />
                </button>
                {/* <ThemeToggle /> */}
                {item.componentNumber && (
                  <span className="bg-muted text-muted-foreground ml-2 rounded-sm px-3.5 py-[4px] font-medium backdrop-blur-md">
                    {item.componentNumber}
                  </span>
                )}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>

          {/* Preview */}
          <div className="bg-muted/5 relative flex min-h-[50dvh] items-center justify-center border-b">
            <div
              className={
                activeVariant === 'base'
                  ? 'theme-injected flex w-full items-center justify-center p-8 pb-12'
                  : 'flex w-full items-center justify-center p-8 pb-12'
              }
            >
              <ActiveComponent key={reloadKey} />
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
                    <TabsContent value="cli">
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

                        {demoCode && (
                          <CodeBlock language="tsx" title="demo.tsx">
                            {demoCode}
                          </CodeBlock>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="manual" className="space-y-6">
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
                      {componentCodeOriginal || componentCodeBase ? (
                        <div className="space-y-4">
                          <CodeBlock
                            showLineNumbers
                            title={
                              activeVariant === 'base' && item.hasVariants
                                ? `${item.slug}-base.tsx`
                                : `${item.slug}.tsx`
                            }
                          >
                            {activeCode}
                          </CodeBlock>
                        </div>
                      ) : null}
                      {/* Import & use */}
                      <div className="space-y-2">
                        <h4 className="text-muted-foreground text-sm font-medium">
                          Import & use
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          Update the import path to match your project structure
                        </p>

                        {demoCode && (
                          <CodeBlock language="tsx" title="demo.tsx">
                            {demoCode}
                          </CodeBlock>
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
                  <CodeBlock mobile showLineNumbers={false}>
                    {activeCode}
                  </CodeBlock>
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
              {/* ── Title row ── */}
              <div className="shrink-0 border-b px-6 py-5">
                <div className="text-muted-foreground mb-1.5 flex items-center gap-1 text-xs">
                  <span className="capitalize">{item.category}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-2xl leading-snug font-semibold tracking-tight">
                    {item.name}
                  </h1>
                  {item.componentNumber && (
                    <span className="bg-muted text-muted-foreground mt-0.5 shrink-0 rounded border px-2 py-0.5 text-xs font-medium">
                      {item.componentNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* ── Divider-based sections ── */}
              <div className="divide-y">
                {/* Description */}
                <div className="px-6 py-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Dependencies */}
                {item.dependencies && item.dependencies.length > 0 && (
                  <div className="space-y-2 px-6 py-4">
                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                      Dependencies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.dependencies.map((dep) => (
                        <span
                          key={dep}
                          className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1 text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1)]"
                        >
                          {dep}
                          <img
                            src="/brand/npm-icon.png"
                            alt="npm"
                            width={10}
                            height={10}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inspired By */}
                {item.inspiredByName && (
                  <div className="flex items-baseline gap-1.5 px-6 py-3">
                    <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                      Inspired by
                    </span>
                    {item.inspiredByLink ? (
                      <a
                        href={item.inspiredByLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground relative text-sm transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
                      >
                        {item.inspiredByName}
                      </a>
                    ) : (
                      <span className="text-sm">{item.inspiredByName}</span>
                    )}
                  </div>
                )}

                {/* Copy for AI */}
                <div className="space-y-3 px-6 py-4">
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Copy for AI
                  </p>
                  <PromptItems
                    files={componentFiles}
                    dependencies={item.dependencies || []}
                    componentName={item.name}
                    componentSlug={item.slug}
                    category={item.category}
                    source="page"
                  />
                </div>

                {/* Installation */}
                <div className="space-y-4 px-6 py-4 pb-12">
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Installation
                  </p>
                  <Tabs defaultValue="cli" className="w-full">
                    <TabsList className="bg-gray-100 dark:bg-neutral-800">
                      <TabsTrigger
                        className="h-full text-sm font-normal!"
                        value="cli"
                      >
                        CLI
                      </TabsTrigger>
                      <TabsTrigger
                        className="h-full text-sm font-normal!"
                        value="manual"
                      >
                        Manual
                      </TabsTrigger>
                    </TabsList>
                    <TabsContents>
                      <TabsContent value="cli" className="space-y-4 pt-3">
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
                        <div className="space-y-2">
                          <p className="text-muted-foreground text-xs">
                            Update the import path to match your project
                            structure
                          </p>
                          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                            How to use
                          </p>
                          {demoCode && (
                            <CodeBlock language="tsx" title="demo.tsx">
                              {demoCode}
                            </CodeBlock>
                          )}
                        </div>
                      </TabsContent>
                      <TabsContent value="manual" className="space-y-6 pt-3">
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
                        {componentCodeOriginal || componentCodeBase ? (
                          <div className="space-y-4">
                            <CodeBlock
                              showLineNumbers
                              title={
                                activeVariant === 'base' && item.hasVariants
                                  ? `${item.slug}-base.tsx`
                                  : `${item.slug}.tsx`
                              }
                            >
                              {activeCode}
                            </CodeBlock>
                          </div>
                        ) : null}
                        <div className="space-y-2">
                          <p className="text-muted-foreground text-xs">
                            Update the import path to match your project
                            structure
                          </p>
                          {demoCode && (
                            <CodeBlock language="tsx" title="demo.tsx">
                              {demoCode}
                            </CodeBlock>
                          )}
                        </div>
                      </TabsContent>
                    </TabsContents>
                  </Tabs>
                </div>
              </div>
            </ScrollFadeEffect>
          </div>

          {/* RIGHT PREVIEW - Sticky */}
          <div className="sticky top-0 h-[calc(100dvh-84px)] flex-1 pr-4 md:pr-6 lg:pr-8">
            <div className="bg-muted/5 flex h-full flex-col overflow-hidden rounded-2xl border">
              <div className="bg-background/80 flex items-center justify-between gap-2 rounded-t-2xl border-b px-4 py-2 backdrop-blur">
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
                      Custom Theme
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {/* <ThemeToggle /> */}
                  <button
                    onClick={() => setReloadKey((k) => k + 1)}
                    aria-label="Reload component preview"
                    className="hover:bg-accent flex size-10 items-center justify-center rounded-md transition-colors"
                  >
                    <HugeiconsIcon icon={ReloadIcon} size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center overflow-auto p-12">
                <div className="flex max-w-full items-center justify-center">
                  <ActiveComponent key={`${reloadKey}-${activeVariant}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
