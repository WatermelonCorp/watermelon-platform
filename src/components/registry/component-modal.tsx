import { Suspense, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import type { RegistryItem } from '@/data/registry';
import { CodeBlock } from '@/components/mdx/code-block';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, SourceCodeIcon, ReloadIcon, ArrowUpRight01FreeIcons } from '@/lib/hugeicons';
import { ThemeToggle } from '../layout/theme-toggle';
import { PromptItems } from '@/components/prompt-items';
import type { ComponentFile } from '@/lib/types';
import { ScrollFadeEffect } from '../scroll-fade-effect';
import { InstallationCmd } from '../mdx/installation-cmd';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProgressiveBlur } from '../ui/progressive-blur';
import { ManualInstallationCmd } from '../mdx/manual-installation';
import { LayoutGroup } from 'motion/react';
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/animate-ui/components/radix/tabs';
import { trackEvent } from '@/lib/analytics';

interface ComponentModalProps {
  item: RegistryItem | null;
  onClose: () => void;
}

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function ComponentModal({ item, onClose }: ComponentModalProps) {
  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  const isMobile = useIsMobile();

  const [demoCode, setDemoCode] = useState<string>('');
  const [componentCodeBase, setComponentCodeBase] = useState<string>('');
  const [componentCodeOriginal, setComponentCodeOriginal] = useState<string>('');
  const [activeCodeTab, setActiveCodeTab] = useState<'base' | 'original'>('original');
  const [reloadKey, setReloadKey] = useState(0);
  const [activePackageManager, setActivePackageManager] = useState<PackageManager>('npm');

  // Load code when item changes
  // useEffect(() => {
  //   if (!item) return;
  //   item.demoCode[activeCodeTab]().then(setDemoCode);
  //   if (item.code) {
  //     item.code.base().then(setComponentCodeBase);
  //     item.code.original().then(setComponentCodeOriginal);
  //   }
  // }, [item, activeCodeTab]);

  useEffect(() => {
  if (!item) return;

  let isActive = true;

  item.demoCode[activeCodeTab]().then((code) => {
    if (isActive) setDemoCode(code);
  });

  return () => {
    isActive = false;
  };
}, [item?.slug, activeCodeTab]);

// 2. Fetch Base/Original Code (Depends ONLY on the item)
useEffect(() => {
  if (!item) return;

  let isActive = true;

  Promise.all([
    item.code.base(),
    item.code.original()
  ]).then(([baseCode, originalCode]) => {
    if (isActive) {
      setComponentCodeBase(baseCode);
      setComponentCodeOriginal(originalCode);
    }
  });

  return () => {
    isActive = false;
  };
}, [item?.slug]);
  useEffect(() => {
    if (!item) return;
    trackEvent('component_view', {
      component_slug: item.slug,
      component_name: item.name,
      category: item.category,
      source: 'modal',
    });
  }, [item]);

  const layoutGroupId = useMemo(
  () => `install-cli-right-${item?.slug}`,
  [item?.slug]
);
 


  // Early return AFTER all hooks
  if (!item) return null;



  const handleReload = () => {
    setReloadKey(prev => prev + 1);
  };

  // Prepare files for PromptItems
  const componentFiles: ComponentFile[] = [
    ...(demoCode ? [{ name: 'demo.tsx', content: demoCode }] : []),
    ...(componentCodeBase ? [{ name: `${item.slug}-base.tsx`, content: componentCodeBase }] : []),
    ...(componentCodeOriginal ? [{ name: `${item.slug}.tsx`, content: componentCodeOriginal }] : []),
  ];

  const ActiveComponent = activeCodeTab === 'base' ? item.component.base : item.component.original;

  // Mobile View - Drawer with preview on top
  // Mobile View — Drawer
  // Mobile View — Drawer (scroll-first, no tabs)
  if (isMobile) {
    return (
      <Drawer open={!!item} onOpenChange={(o) => !o && onClose()}>
        <DrawerContent className="h-[95dvh] p-0 rounded-t-2xl overflow-hidden flex flex-col bg-background">

          {/* Sticky Header with Blur */}
          <div className="sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <DrawerHeader className="relative px-4 pt-4 pb-3 border-b">
              <ProgressiveBlur
                className="absolute inset-x-0 top-0 h-24"
                direction="top"
                blurLayers={6}
                blurIntensity={1.1}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex flex-col justify-start items-start gap-1">
                    <span className="capitalize">{item.category}</span>
                    <DrawerTitle className="text-lg font-medium">
                      {item.name}
                    </DrawerTitle>
                  </div>
                  <div className="flex flex-col justify-start items-end gap-2">
                    {item.componentNumber && (
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded-sm font-medium">
                        {item.componentNumber}
                      </span>
                    )}
                    <Link
                      to={`/components/${item.slug}`}
                      onClick={onClose}
                      aria-label={`Open ${item.name} full page`}
                      className="flex items-center gap-1 text-primary font-medium"
                    >
                      Full Page
                      <HugeiconsIcon icon={ArrowUpRight01FreeIcons} size={12} />
                    </Link>
                  </div>

                </div>


              </div>
            </DrawerHeader>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">

            {/* Preview Section */}
            <section className="p-4 border-b bg-muted/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Preview</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={handleReload}
                    aria-label="Reload component preview"
                    className="p-1.5 rounded-md border bg-background hover:bg-accent transition"
                    title="Reload preview"
                  >
                    <HugeiconsIcon icon={ReloadIcon} size={14} />
                  </button>
                </div>
              </div>

              <div className={`rounded-xl border bg-background p-6 min-h-[240px] flex items-center justify-center`}>
                <Suspense
                  fallback={
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Loading preview…
                    </div>
                  }
                >
                  <ActiveComponent key={reloadKey} />
                </Suspense>
              </div>
            </section>

            {/* Description */}
            <section className="p-4 border-b space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Dependencies */}
              {item.dependencies && item.dependencies?.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium mb-2 text-muted-foreground">
                    Dependencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className="px-2 py-0.5 rounded bg-muted text-xs flex items-center gap-1"
                      >
                        {dep}
                        <img
                          src="/brand/npm-icon.png"
                          width={10}
                          height={10}
                          alt=""
                        />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Installation */}
            <section className="p-4 border-b space-y-3">
              <h3 className="text-sm font-medium">Installation</h3>

              <InstallationCmd
                activeCodeTab={activeCodeTab}
                activePackageManager={activePackageManager}
                setActivePackageManager={setActivePackageManager}
                item={item}

                trackingContext={{
                  component_slug: item.slug,
                  component_name: item.name,
                  category: item.category,
                  source: "modal",
                }}
              />

              <ManualInstallationCmd
                activePackageManager={activePackageManager}
                setActivePackageManager={setActivePackageManager}
                dependencies={item.dependencies}
                trackingContext={{
                  component_slug: item.slug,
                  component_name: item.name,
                  category: item.category,
                  source: "modal",
                }}
              />
            </section>

            {/* How to Use */}
            <section className="p-4 border-b space-y-2">
              <h3 className="text-sm font-medium">How to use</h3>
              <p className="text-xs text-muted-foreground">
                Update the import path to match your project structure
              </p>

              {demoCode ? (
                <CodeBlock language="tsx" title="demo.tsx">
                  {demoCode}
                </CodeBlock>
              ) : (
                <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse text-sm">
                  Loading usage example…
                </div>
              )}
            </section>

            {/* Source Code */}
            <section className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Source</h3>
                {item.hasVariants && (
                  <Tabs value={activeCodeTab} onValueChange={(v: any) => setActiveCodeTab(v)} className="w-[180px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="original" className="text-xs">Original</TabsTrigger>
                      <TabsTrigger value="base" className="text-xs">Base</TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              </div>

              {componentCodeOriginal && componentCodeBase ? (
                <CodeBlock showLineNumbers title={activeCodeTab === 'base' ? `${item.slug}-base.tsx` : `${item.slug}.tsx`}>
                  {activeCodeTab === 'base' ? componentCodeBase : componentCodeOriginal}
                </CodeBlock>
              ) : (
                <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse text-sm">
                  Loading source code…
                </div>
              )}
            </section>

          </div>
        </DrawerContent>
      </Drawer>
    );
  }



  // Desktop View - Dialog
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="max-w-none sm:max-w-none w-[90vw] h-[90vh] p-0 gap-0 overflow-hidden flex flex-row bg-background border rounded-xl">
        <DialogTitle className="sr-only">{item.name}</DialogTitle>
        <DialogDescription className="sr-only">
          {item.description}
        </DialogDescription>

        {/* Left Side: Documentation & Code */}
        <div className="w-[40%] flex flex-col h-full border-r bg-background relative">
          <div className="flex-1 flex flex-col p-6 overflow-hidden">

            {/* Header */}
            <div className='shrink-0 mb-4'>
              <div className="flex items-center justify-between left-0 z-50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground overflow-hidden">
                  <span className="hidden md:inline shrink-0">Components</span>
                  <span className="hidden md:inline shrink-0">/</span>
                  <span className="capitalize hidden md:inline shrink-0">{item.category}</span>
                  <span className="hidden md:inline shrink-0">/</span>
                  <span className="text-foreground font-medium truncate">{item.name}</span>
                  <Link
                    to={`/components/${item.slug}`}
                    onClick={onClose}
                    aria-label={`Open ${item.name} full page`}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0 ml-2"
                  >
                    <HugeiconsIcon icon={ArrowUpRight01FreeIcons} size={14} />
                  </Link>
                </div>

                {item.componentNumber && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded-sm shrink-0">
                    {item.componentNumber}
                  </span>
                )}
              </div>
            </div>

            <div className='h-full overflow-y-auto px-4'>
              <ScrollFadeEffect className='w-full flex-1 min-h-0'>
                <ProgressiveBlur className='w-full absolute top-12 h-10 left-0'
                  direction="top"
                  blurLayers={8}
                  blurIntensity={1.2}
                />
                <div className=' space-y-4 pt-4 mb-8'>

                  <h2 className="text-xl font-medium tracking-tight mb-2">{item.name}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Dependencies */}
                  {item.dependencies && item.dependencies.length > 0 && (
                    <div className="">
                      <h4 className="text-sm font-medium mb-2">Dependencies</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.dependencies.map((dep) => (
                          <span
                            key={dep}
                            className="px-3 py-1 rounded-md bg-muted text-sm flex items-center gap-1.5"
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
                    <div className="flex items-center gap-2 group/inspired-by">
                      <h4 className="text-sm">Inspired By</h4>
                      {item.inspiredByLink ? (
                        <a
                          href={item.inspiredByLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-foreground underline underline-offset-4"
                        >
                          {item.inspiredByName}
                          <HugeiconsIcon icon={ArrowUpRight01FreeIcons} size={14} className="group-hover/inspired-by:translate-x-1 -translate-x-5 opacity-0 group-hover/inspired-by:opacity-100 transition" />
                        </a>
                      ) : (
                        <span className="text-sm text-muted-foreground">
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
                      source="modal"
                    />
                  </div>

                  {/* How to use */}
                  <div className="space-y-2">
                    <div className="h-full overflow-auto space-y-3">
                      <h3 className="font-medium">Installation</h3>

                      <Tabs defaultValue="cli" className="w-full">
                        <TabsList>
                          <TabsTrigger value="cli">CLI</TabsTrigger>
                          <TabsTrigger value="manual">Manual</TabsTrigger>
                        </TabsList>
                        <TabsContents>
                          <TabsContent value="cli"  className="data-[state=inactive]:hidden">
                            <LayoutGroup id={layoutGroupId}>
                              <InstallationCmd
                                activeCodeTab={activeCodeTab}
                                activePackageManager={activePackageManager}
                                setActivePackageManager={setActivePackageManager}
                                item={item}

                                trackingContext={{
                                  component_slug: item.slug,
                                  component_name: item.name,
                                  category: item.category,
                                  source: "modal",
                                }}
                              />
                            </LayoutGroup>
                            {/* Import & use */}
                            <div className="space-y-4 my-4">
                              <p className="text-xs text-muted-foreground">Update the import path to match your project structure</p>
                              <h3 className="font-medium">How to use</h3>

                              {demoCode ? (
                                <CodeBlock language="tsx" title='demo.tsx'>
                                  {demoCode}
                                </CodeBlock>
                              ) : (
                                <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse">
                                  Loading usage example…
                                </div>
                              )}
                            </div>
                          </TabsContent>
                          <TabsContent value="manual"  className="space-y-6 data-[state=inactive]:hidden">
                            {/* Manual install (dependencies-driven) */}
                            <ManualInstallationCmd
                              activePackageManager={activePackageManager}
                              setActivePackageManager={setActivePackageManager}
                              dependencies={item.dependencies}
                              trackingContext={{
                                component_slug: item.slug,
                                component_name: item.name,
                                category: item.category,
                                source: "modal",
                              }}
                            />
                            {componentCodeOriginal && componentCodeBase ? (
                              <div className="space-y-4">
                                <CodeBlock showLineNumbers title={activeCodeTab === 'base' ? `${item.slug}-base.tsx` : `${item.slug}.tsx`}>
                                  {activeCodeTab === 'base' ? componentCodeBase : componentCodeOriginal}
                                </CodeBlock>
                              </div>
                            ) : (
                              <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse text-sm">
                                Loading source code…
                              </div>
                            )}
                            {/* Import & use */}
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-muted-foreground">
                                Import & use
                              </h4>
                              <p className="text-xs text-muted-foreground">Update the import path to match your project structure</p>

                              {demoCode ? (
                                <CodeBlock language="tsx" title='demo.tsx'>
                                  {demoCode}
                                </CodeBlock>
                              ) : (
                                <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse">
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
          </div>
        </div>

        {/* Right Side: Preview with Tabs */}
        <Tabs defaultValue="preview" className="flex-1 min-w-0 flex flex-col h-full bg-muted/10">

          {/* Toolbar with tabs */}
          <div className="flex items-center justify-between px-2 md:px-4 py-2 border-b bg-muted/30 gap-1 md:gap-2 min-w-0">
            <TabsList className="shrink-0">
              <TabsTrigger value="preview" className="text-xs md:text-sm px-2 md:px-3">
                <HugeiconsIcon icon={ViewIcon} size={14} />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="text-xs md:text-sm px-2 md:px-3">
                <HugeiconsIcon icon={SourceCodeIcon} size={14} />
                Code
              </TabsTrigger>
            </TabsList>

            {/* Variant toggle */}
            {item.hasVariants && (
              <div className="flex items-center rounded-lg border bg-muted p-0.5 gap-0.5 text-xs shrink-0">
                <button
                  onClick={() => setActiveCodeTab('original')}
                  className={`px-2 md:px-3 py-1 md:py-1.5 rounded-md font-medium transition-colors ${
                    activeCodeTab === 'original'
                      ? 'bg-background shadow-sm text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setActiveCodeTab('base')}
                  className={`px-2 md:px-3 py-1 md:py-1.5 rounded-md font-medium transition-colors ${
                    activeCodeTab === 'base'
                      ? 'bg-background shadow-sm text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Base
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2 shrink-0 pr-8">
              <Link
                to={`/components/${item.slug}`}
                onClick={onClose}
                className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm tracking-tight text-primary rounded-md group transition-colors whitespace-nowrap"
              >
                <span className="hidden min-[1120px]:inline">Open Full Page</span>
                <span className="min-[1120px]:hidden">Open</span>
                <HugeiconsIcon icon={ArrowUpRight01FreeIcons} size={14} className='group-hover:translate-x-1 transition-transform duration-300' />
              </Link>
              <ThemeToggle />
              <button
                className="p-1.5 md:p-2 bg-background/80 backdrop-blur rounded-md border shadow-sm hover:bg-accent transition-colors"
                onClick={handleReload}
                aria-label="Reload component preview"
                title="Reload preview"
              >
                <HugeiconsIcon icon={ReloadIcon} size={16} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto relative">
            {/* Preview Panel */}
            <TabsContent value="preview" className="data-[state=inactive]:hidden">
              <div className="h-full flex items-center justify-center p-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/50 via-transparent to-transparent">

                <Suspense fallback={
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Loading component...
                  </div>
                }>
                  <ActiveComponent key={`${reloadKey}-${activeCodeTab}`} />
                </Suspense>

              </div>
            </TabsContent>

            {/* Code Panel */}
            <TabsContent value="code" className="data-[state=inactive]:hidden">
              <div className="h-full overflow-y-auto p-4 space-y-8">
                {componentCodeOriginal && componentCodeBase ? (
                  <div className="space-y-4">
                    <CodeBlock showLineNumbers title={activeCodeTab === 'base' && item.hasVariants ? `${item.slug}-base.tsx` : `${item.slug}.tsx`}>
                      {activeCodeTab === 'base' ? componentCodeBase : componentCodeOriginal}
                    </CodeBlock>
                  </div>
                ) : (
                  <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse text-sm">
                    Loading source code…
                  </div>
                )}

                {demoCode ? (
                  <CodeBlock language="tsx" title='demo.tsx'>
                    {demoCode}
                  </CodeBlock>
                ) : (
                  <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse">
                    Loading usage example…
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Update the import path to match your project structure</p>

              </div>
            </TabsContent>

          </div>
        </Tabs>
      </DialogContent >
    </Dialog >
  );
}
