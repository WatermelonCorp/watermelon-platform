import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import type { RegistryItem } from '@/data/animated-components-registry';
import { CodeBlock } from '@/components/mdx/code-block';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ViewIcon,
  SourceCodeIcon,
  ReloadIcon,
  ArrowUpRight01FreeIcons,
} from '@/lib/hugeicons';
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
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/radix/tabs';
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
  const [componentCodeOriginal, setComponentCodeOriginal] =
    useState<string>('');
  const [activeCodeTab, setActiveCodeTab] = useState<'base' | 'original'>(
    'original',
  );
  const [reloadKey, setReloadKey] = useState(0);
  const [activePackageManager, setActivePackageManager] =
    useState<PackageManager>('npm');

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
  }, [item, activeCodeTab]);

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
      source: 'modal',
    });
  }, [item]);

  const layoutGroupId = useMemo(
    () => `install-cli-right-${item?.slug}`,
    [item?.slug],
  );

  // Early return AFTER all hooks
  if (!item) return null;

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  // Prepare files for PromptItems
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
    activeCodeTab === 'base' ? item.component.base : item.component.original;

  // Mobile View - Drawer with preview on top
  // Mobile View — Drawer
  // Mobile View — Drawer (scroll-first, no tabs)
  if (isMobile) {
    return (
      <Drawer open={!!item} onOpenChange={(o) => !o && onClose()}>
        <DrawerContent className="bg-background flex h-[95dvh] flex-col overflow-hidden rounded-t-2xl p-0">
          {/* Sticky Header with Blur */}
          <div className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 backdrop-blur">
            <DrawerHeader className="relative border-b px-4 pt-4 pb-3">
              <ProgressiveBlur
                className="absolute inset-x-0 top-0 h-24"
                direction="top"
                blurLayers={6}
                blurIntensity={1.1}
              />

              <div className="relative z-10">
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <div className="flex flex-col items-start justify-start gap-1">
                    <span className="capitalize">{item.category}</span>
                    <DrawerTitle className="text-lg font-medium">
                      {item.name}
                    </DrawerTitle>
                  </div>
                  <div className="flex flex-col items-end justify-start gap-2">
                    {item.componentNumber && (
                      <span className="bg-muted text-muted-foreground rounded-sm px-2 py-0.5 font-medium">
                        {item.componentNumber}
                      </span>
                    )}
                    <Link
                      to={`/animated-components/${item.slug}`}
                      onClick={onClose}
                      aria-label={`Open ${item.name} full page`}
                      className="text-primary flex items-center gap-1 font-medium"
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
            <section className="bg-muted/20 border-b p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium">Preview</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={handleReload}
                    aria-label="Reload component preview"
                    className="bg-background hover:bg-accent flex size-8 items-center justify-center rounded-md border transition"
                    title="Reload preview"
                  >
                    <HugeiconsIcon icon={ReloadIcon} size={16} />
                  </button>
                </div>
              </div>

              <div
                className={`bg-background flex min-h-[240px] items-center justify-center rounded-xl border p-6`}
              >
                <ActiveComponent key={reloadKey} />
              </div>
            </section>

            {/* Description */}
            <section className="space-y-4 border-b p-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Dependencies */}
              {item.dependencies && item.dependencies?.length > 0 && (
                <div>
                  <h4 className="text-muted-foreground mb-2 text-xs font-medium">
                    Dependencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className="bg-muted flex items-center gap-1 rounded px-2 py-0.5 text-xs"
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
            <section className="space-y-3 border-b p-4">
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
                  source: 'modal',
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
                  source: 'modal',
                }}
              />
            </section>

            {/* How to Use */}
            <section className="space-y-2 border-b p-4">
              <h3 className="text-sm font-medium">How to use</h3>
              <p className="text-muted-foreground text-xs">
                Update the import path to match your project structure
              </p>

              {demoCode && (
                <CodeBlock language="tsx" title="demo.tsx">
                  {demoCode}
                </CodeBlock>
              )}
            </section>

            {/* Source Code */}
            <section className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Source</h3>
                {item.hasVariants && (
                  <Tabs
                    value={activeCodeTab}
                    onValueChange={(v: any) => setActiveCodeTab(v)}
                    className="w-[180px]"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="original" className="text-xs">
                        Original
                      </TabsTrigger>
                      <TabsTrigger value="base" className="text-xs">
                        Base
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              </div>

              {(componentCodeOriginal || componentCodeBase) && (
                <CodeBlock
                  showLineNumbers
                  title={
                    activeCodeTab === 'base'
                      ? `${item.slug}-base.tsx`
                      : `${item.slug}.tsx`
                  }
                >
                  {activeCodeTab === 'base'
                    ? componentCodeBase
                    : componentCodeOriginal}
                </CodeBlock>
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
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="bg-background flex h-[90vh] w-[90vw] max-w-none flex-row gap-0 overflow-hidden rounded-xl border p-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">{item.name}</DialogTitle>
        <DialogDescription className="sr-only">
          {item.description}
        </DialogDescription>

        {/* Left Side: Documentation & Code */}
        <div className="bg-background relative flex h-full w-[40%] flex-col border-r">
          <div className="flex flex-1 flex-col overflow-hidden p-6">
            {/* Header */}
            <div className="mb-4 shrink-0">
              <div className="left-0 z-50 flex items-center justify-between">
                <div className="text-muted-foreground flex items-center gap-2 overflow-hidden text-sm">
                  <span className="hidden shrink-0 md:inline">Components</span>
                  <span className="hidden shrink-0 md:inline">/</span>
                  <span className="hidden shrink-0 capitalize md:inline">
                    {item.category}
                  </span>
                  <span className="hidden shrink-0 md:inline">/</span>
                  <span className="text-foreground truncate font-medium">
                    {item.name}
                  </span>
                  <Link
                    to={`/animated-components/${item.slug}`}
                    onClick={onClose}
                    aria-label={`Open ${item.name} full page`}
                    className="text-primary hover:text-primary/80 ml-2 flex shrink-0 items-center gap-1 text-sm font-medium transition-colors"
                  >
                    <HugeiconsIcon icon={ArrowUpRight01FreeIcons} size={14} />
                  </Link>
                </div>

                {item.componentNumber && (
                  <span className="bg-muted text-muted-foreground shrink-0 rounded-sm px-2 py-0.5 text-xs font-medium">
                    {item.componentNumber}
                  </span>
                )}
              </div>
            </div>

            <div className="h-full overflow-y-auto px-4">
              <ScrollFadeEffect className="min-h-0 w-full flex-1">
                <ProgressiveBlur
                  className="absolute top-12 left-0 h-10 w-full"
                  direction="top"
                  blurLayers={8}
                  blurIntensity={1.2}
                />
                <div className="mb-8 space-y-4 pt-4">
                  <h2 className="mb-2 text-xl font-medium tracking-tight">
                    {item.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Dependencies */}
                  {item.dependencies && item.dependencies.length > 0 && (
                    <div className="">
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
                      source="modal"
                    />
                  </div>

                  {/* How to use */}
                  <div className="space-y-2">
                    <div className="h-full space-y-3 overflow-auto">
                      <h3 className="font-medium">Installation</h3>

                      <Tabs defaultValue="cli" className="w-full">
                        <TabsList>
                          <TabsTrigger value="cli">CLI</TabsTrigger>
                          <TabsTrigger value="manual">Manual</TabsTrigger>
                        </TabsList>
                        <TabsContents>
                          <TabsContent
                            value="cli"
                            className="data-[state=inactive]:hidden"
                          >
                            <LayoutGroup id={layoutGroupId}>
                              <InstallationCmd
                                activeCodeTab={activeCodeTab}
                                activePackageManager={activePackageManager}
                                setActivePackageManager={
                                  setActivePackageManager
                                }
                                item={item}
                                trackingContext={{
                                  component_slug: item.slug,
                                  component_name: item.name,
                                  category: item.category,
                                  source: 'modal',
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

                              {demoCode && (
                                <CodeBlock language="tsx" title="demo.tsx">
                                  {demoCode}
                                </CodeBlock>
                              )}
                            </div>
                          </TabsContent>
                          <TabsContent
                            value="manual"
                            className="space-y-6 data-[state=inactive]:hidden"
                          >
                            {/* Manual install (dependencies-driven) */}
                            <ManualInstallationCmd
                              activePackageManager={activePackageManager}
                              setActivePackageManager={setActivePackageManager}
                              dependencies={item.dependencies}
                              trackingContext={{
                                component_slug: item.slug,
                                component_name: item.name,
                                category: item.category,
                                source: 'modal',
                              }}
                            />
                            {componentCodeOriginal || componentCodeBase ? (
                              <div className="space-y-4">
                                <CodeBlock
                                  showLineNumbers
                                  title={
                                    activeCodeTab === 'base'
                                      ? `${item.slug}-base.tsx`
                                      : `${item.slug}.tsx`
                                  }
                                >
                                  {activeCodeTab === 'base'
                                    ? componentCodeBase
                                    : componentCodeOriginal}
                                </CodeBlock>
                              </div>
                            ) : null}
                            {/* Import & use */}
                            <div className="space-y-2">
                              <h4 className="text-muted-foreground text-sm font-medium">
                                Import & use
                              </h4>
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
                </div>
              </ScrollFadeEffect>
            </div>
          </div>
        </div>

        {/* Right Side: Preview with Tabs */}
        <Tabs
          defaultValue="preview"
          className="bg-muted/10 flex h-full min-w-0 flex-1 flex-col"
        >
          {/* Toolbar with tabs */}
          <div className="bg-muted/30 flex items-center justify-between border-b px-4 py-2">
            <TabsList>
              <TabsTrigger value="preview">
                <HugeiconsIcon icon={ViewIcon} size={14} />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                <HugeiconsIcon icon={SourceCodeIcon} size={14} />
                Code
              </TabsTrigger>
            </TabsList>

            {/* Variant toggle */}
            {item.hasVariants && (
              <div className="bg-muted flex items-center gap-0.5 rounded-lg border p-0.5 text-xs">
                <button
                  onClick={() => setActiveCodeTab('original')}
                  className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                    activeCodeTab === 'original'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setActiveCodeTab('base')}
                  className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                    activeCodeTab === 'base'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Base
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="mr-9.5 flex items-center gap-1.5">
              <Link
                to={`/animated-components/${item.slug}`}
                onClick={onClose}
                className="text-primary group flex items-center gap-1.5 rounded-md px-3 py-2 text-sm tracking-tight transition-colors"
              >
                Open Full Page
                <HugeiconsIcon
                  icon={ArrowUpRight01FreeIcons}
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <ThemeToggle />
              <button
                className="border-input/50 bg-background hover:bg-accent flex size-8 items-center justify-center rounded-lg border transition-colors md:size-10"
                onClick={handleReload}
                aria-label="Reload component preview"
                title="Reload preview"
              >
                <HugeiconsIcon icon={ReloadIcon} size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative flex-1">
            <TabsContents mode="layout" className="h-full">
              {/* Preview Panel */}
              <TabsContent
                value="preview"
                className="absolute inset-0 border-none shadow-none data-[state=inactive]:hidden"
              >
                <div className="from-muted/50 flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] via-transparent to-transparent p-10">
                  <ActiveComponent key={`${reloadKey}-${activeCodeTab}`} />
                </div>
              </TabsContent>

              <TabsContent
                value="code"
                className="absolute inset-0 data-[state=inactive]:hidden"
              >
                <div className="h-full space-y-8 overflow-y-auto p-4">
                  {componentCodeOriginal || componentCodeBase ? (
                    <div className="space-y-4">
                      <CodeBlock
                        showLineNumbers
                        title={
                          activeCodeTab === 'base' && item.hasVariants
                            ? `${item.slug}-base.tsx`
                            : `${item.slug}.tsx`
                        }
                      >
                        {activeCodeTab === 'base'
                          ? componentCodeBase
                          : componentCodeOriginal}
                      </CodeBlock>
                    </div>
                  ) : null}

                  {demoCode && (
                    <CodeBlock language="tsx" title="demo.tsx">
                      {demoCode}
                    </CodeBlock>
                  )}
                  <p className="text-muted-foreground text-xs">
                    Update the import path to match your project structure
                  </p>
                </div>
              </TabsContent>
            </TabsContents>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
