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
  const isMobile = useIsMobile();

  const [demoCode, setDemoCode] = useState<string>('');
  const [componentCodeBase, setComponentCodeBase] = useState<string>('');
  const [componentCodeOriginal, setComponentCodeOriginal] = useState<string>('');
  const [activeCodeTab, setActiveCodeTab] = useState<'base' | 'original'>('original');
  const [reloadKey, setReloadKey] = useState(0);
  const [activePackageManager, setActivePackageManager] = useState<PackageManager>('npm');

  useEffect(() => {
    if (!item) return;
    let isActive = true;
    item.demoCode[activeCodeTab]().then((code) => {
      if (isActive) setDemoCode(code);
    });
    return () => { isActive = false; };
  }, [item, activeCodeTab]);

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
    return () => { isActive = false; };
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

  if (!item) return null;

  const handleReload = () => setReloadKey((prev) => prev + 1);

  const componentFiles: ComponentFile[] = [
    ...(demoCode ? [{ name: 'demo.tsx', content: demoCode }] : []),
    ...(componentCodeBase ? [{ name: `${item.slug}-base.tsx`, content: componentCodeBase }] : []),
    ...(componentCodeOriginal ? [{ name: `${item.slug}.tsx`, content: componentCodeOriginal }] : []),
  ];

  const ActiveComponent =
    activeCodeTab === 'base' ? item.component.base : item.component.original;

  // ─── Mobile View ────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <Drawer open={!!item} onOpenChange={(o) => !o && onClose()}>
        <DrawerContent className="bg-background flex h-[95dvh] flex-col overflow-hidden rounded-t-2xl p-0">
          {/* Sticky Header */}
          <div className="bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-30 backdrop-blur">
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
          <div className="flex-1 overflow-y-auto divide-y">
            {/* Preview */}
            <section className="bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium">Preview</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={handleReload}
                    aria-label="Reload component preview"
                    className="bg-background hover:bg-accent flex size-8 items-center justify-center rounded-md border transition"
                  >
                    <HugeiconsIcon icon={ReloadIcon} size={16} />
                  </button>
                </div>
              </div>
              <div className="bg-background flex min-h-[240px] items-center justify-center rounded-xl border p-6">
                <ActiveComponent key={reloadKey} />
              </div>
            </section>

            {/* Description */}
            <section className="p-4">
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </section>

            {/* Dependencies */}
            {item.dependencies && item.dependencies?.length > 0 && (
              <section className="p-4 space-y-2">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Dependencies</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.dependencies.map((dep) => (
                    <span key={dep} className="bg-muted flex items-center gap-1 rounded px-2 py-0.5 text-xs">
                      {dep}
                      <img src="/brand/npm-icon.png" width={10} height={10} alt="" />
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Installation */}
            <section className="p-4 space-y-3">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Installation</p>
              <InstallationCmd
                activeCodeTab={activeCodeTab}
                activePackageManager={activePackageManager}
                setActivePackageManager={setActivePackageManager}
                item={item}
                trackingContext={{ component_slug: item.slug, component_name: item.name, category: item.category, source: 'modal' }}
              />
              <ManualInstallationCmd
                activePackageManager={activePackageManager}
                setActivePackageManager={setActivePackageManager}
                dependencies={item.dependencies}
                trackingContext={{ component_slug: item.slug, component_name: item.name, category: item.category, source: 'modal' }}
              />
            </section>

            {/* How to Use */}
            <section className="p-4 space-y-2">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">How to use</p>
              <p className="text-muted-foreground text-xs">Update the import path to match your project structure</p>
              {demoCode && (
                <CodeBlock language="tsx" title="demo.tsx">{demoCode}</CodeBlock>
              )}
            </section>

            {/* Source Code */}
            <section className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Source</p>
                {item.hasVariants && (
                  <Tabs value={activeCodeTab} onValueChange={(v: any) => setActiveCodeTab(v)} className="w-[180px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="original" className="text-xs">Original</TabsTrigger>
                      <TabsTrigger value="base" className="text-xs">Base</TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              </div>
              {(componentCodeOriginal || componentCodeBase) && (
                <CodeBlock showLineNumbers title={activeCodeTab === 'base' ? `${item.slug}-base.tsx` : `${item.slug}.tsx`}>
                  {activeCodeTab === 'base' ? componentCodeBase : componentCodeOriginal}
                </CodeBlock>
              )}
            </section>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // ─── Desktop View ───────────────────────────────────────────────────────────
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="bg-background flex h-[90vh] w-[90vw] max-w-none flex-row gap-0 overflow-hidden rounded-2xl border p-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">{item.name}</DialogTitle>
        <DialogDescription className="sr-only">{item.description}</DialogDescription>

        {/* ── Left Panel: Docs ─────────────────────────────────────────────── */}
        <div className="relative flex h-full w-[38%] flex-col border-r">

          {/* Sticky Header */}
          <div className="shrink-0 border-b px-6 py-4">
            <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span>Components</span>
              <span>/</span>
              <span className="capitalize">{item.category}</span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight leading-snug">{item.name}</h2>
              <div className="flex items-center gap-2 shrink-0 pt-0.5">
                {item.componentNumber && (
                  <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs font-medium">
                    {item.componentNumber}
                  </span>
                )}
                <Link
                  to={`/animated-components/${item.slug}`}
                  onClick={onClose}
                  aria-label={`Open ${item.name} full page`}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs hover:underline hover:underline-offset-2 transition-colors"
                >
                  Full page
                  <HugeiconsIcon icon={ArrowUpRight01FreeIcons} size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto divide-y">

            {/* Description */}
            <div className="px-6 py-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            {/* Dependencies */}
            {item.dependencies && item.dependencies.length > 0 && (
              <div className="px-6 py-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dependencies</p>
                <div className="flex flex-wrap gap-2">
                  {item.dependencies.map((dep) => (
                    <span key={dep} className="bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] flex items-center gap-1.5 px-3 py-1 text-sm">
                      {dep}
                      <img src="/brand/npm-icon.png" alt="npm" width={10} height={10} />
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Inspired By */}
            {item.inspiredByName && (
              <div className="px-6 py-3 flex items-end gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Inspired by</span>
                {item.inspiredByLink ? (
                  <a
                    href={item.inspiredByLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base hover:text-foreground transition-colors bg-amber-600"
                  >
                    {item.inspiredByName}
                  </a>
                ) : (
                  <span className="text-sm">{item.inspiredByName}</span>
                )}
              </div>
            )}

            {/* Copy for AI */}
            <div className="px-6 py-4 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Copy for AI</p>
              <PromptItems
                files={componentFiles}
                dependencies={item.dependencies || []}
                componentName={item.name}
                componentSlug={item.slug}
                category={item.category}
                source="modal"
              />
            </div>

            {/* Installation */}
            <div className="px-6 py-4 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Installation</p>
              <Tabs defaultValue="cli" className="w-full">
                <TabsList className='bg-gray-100 dark:bg-neutral-800'>
                  <TabsTrigger className='text-sm font-normal! h-full' value="cli">CLI</TabsTrigger>
                  <TabsTrigger className='text-sm font-normal! h-full' value="manual">Manual</TabsTrigger>
                </TabsList>
                <TabsContents>
                  <TabsContent value="cli" className="data-[state=inactive]:hidden space-y-4 pt-3">
                    <LayoutGroup id={layoutGroupId}>
                      <InstallationCmd
                        activeCodeTab={activeCodeTab}
                        activePackageManager={activePackageManager}
                        setActivePackageManager={setActivePackageManager}
                        item={item}
                        trackingContext={{ component_slug: item.slug, component_name: item.name, category: item.category, source: 'modal' }}
                      />
                    </LayoutGroup>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Update the import path to match your project structure</p>
                      {demoCode && <CodeBlock language="tsx" title="demo.tsx">{demoCode}</CodeBlock>}
                    </div>
                  </TabsContent>
                  <TabsContent value="manual" className="data-[state=inactive]:hidden space-y-4 pt-3">
                    <ManualInstallationCmd
                      activePackageManager={activePackageManager}
                      setActivePackageManager={setActivePackageManager}
                      dependencies={item.dependencies}
                      trackingContext={{ component_slug: item.slug, component_name: item.name, category: item.category, source: 'modal' }}
                    />
                    {(componentCodeOriginal || componentCodeBase) && (
                      <CodeBlock showLineNumbers title={activeCodeTab === 'base' ? `${item.slug}-base.tsx` : `${item.slug}.tsx`}>
                        {activeCodeTab === 'base' ? componentCodeBase : componentCodeOriginal}
                      </CodeBlock>
                    )}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Update the import path to match your project structure</p>
                      {demoCode && <CodeBlock language="tsx" title="demo.tsx">{demoCode}</CodeBlock>}
                    </div>
                  </TabsContent>
                </TabsContents>
              </Tabs>
            </div>

          </div>
        </div>

        {/* ── Right Panel: Preview & Code ──────────────────────────────────── */}
        <Tabs defaultValue="preview" className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">

          {/* Toolbar */}
          <div className="relative flex shrink-0 items-center justify-between border-b px-4 py-2">
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
                  className={`rounded-md px-3 py-1.5 font-medium transition-colors ${activeCodeTab === 'original' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Original
                </button>
                <button
                  onClick={() => setActiveCodeTab('base')}
                  className={`rounded-md px-3 py-1.5 font-medium transition-colors ${activeCodeTab === 'base' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Base
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pr-8">
              <ThemeToggle />
              <button
                className="size-7 md:size-9 bg-gray-100 dark:bg-neutral-800 rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] flex items-center justify-center hover:bg-accent transition-colors"
                onClick={handleReload}
                aria-label="Reload component preview"
              >
                <HugeiconsIcon icon={ReloadIcon} size={16} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative flex-1 overflow-hidden">
            <TabsContents mode="layout" className="h-full">

              <TabsContent value="preview" className="absolute inset-0 overflow-hidden border-none shadow-none data-[state=inactive]:hidden">
                <div className="from-muted/50 flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] via-transparent to-transparent p-10">
                  <ActiveComponent key={`${reloadKey}-${activeCodeTab}`} />
                </div>
              </TabsContent>

              <TabsContent value="code" className="absolute inset-0 data-[state=inactive]:hidden">
                <div className="h-full space-y-6 overflow-y-auto p-4">
                  {(componentCodeOriginal || componentCodeBase) && (
                    <CodeBlock showLineNumbers title={activeCodeTab === 'base' && item.hasVariants ? `${item.slug}-base.tsx` : `${item.slug}.tsx`}>
                      {activeCodeTab === 'base' ? componentCodeBase : componentCodeOriginal}
                    </CodeBlock>
                  )}
                  {demoCode && <CodeBlock language="tsx" title="demo.tsx">{demoCode}</CodeBlock>}
                  <p className="text-muted-foreground text-xs">Update the import path to match your project structure</p>
                </div>
              </TabsContent>

            </TabsContents>
          </div>
        </Tabs>

      </DialogContent>
    </Dialog>
  );
}
