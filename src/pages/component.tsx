"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { registry } from "@/data/registry";
import { SEOHead } from "@/components/seo-head";
import { CodeBlock } from "@/components/mdx/code-block";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SourceCodeIcon,
  ReloadIcon,
  ArrowUpRight01FreeIcons,
} from "@/lib/hugeicons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PromptItems } from "@/components/prompt-items";
import type { ComponentFile } from "@/lib/types";
import { InstallationCmd } from "@/components/mdx/installation-cmd";
import { ManualInstallationCmd } from "@/components/mdx/manual-installation";
import { LayoutGroup } from "motion/react";
import { ScrollFadeEffect } from "@/components/scroll-fade-effect";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/animate-ui/components/radix/tabs';
import { trackEvent } from "@/lib/analytics";


type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export default function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = registry.find((i) => i.slug === slug);
  const isMobile = useIsMobile();

  const [demoCode, setDemoCode] = useState("");
  const [componentCode, setComponentCode] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [activePackageManager, setActivePackageManager] =
    useState<PackageManager>("npm");
  const [hasCopiedInstall, setHasCopiedInstall] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  useEffect(() => {
    if (!item) return;
    item.demoCode().then(setDemoCode);
    item.code().then(setComponentCode);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    trackEvent("component_view", {
      component_slug: item.slug,
      component_name: item.name,
      category: item.category,
      source: "page",
    });
  }, [item]);

  if (!item) {
    return <div className="p-12 text-center">Component not found</div>;
  }

  const componentFiles: ComponentFile[] = [
    ...(demoCode ? [{ name: "demo.tsx", content: demoCode }] : []),
    ...(componentCode
      ? [{ name: `${item.slug}.tsx`, content: componentCode }]
      : []),
  ];
  const handleCopyInstall = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setHasCopiedInstall(true);
      setTimeout(() => setHasCopiedInstall(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

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
          <div className="relative px-4 pt-4 pb-3 bg-background">
            <div className="text-xs text-muted-foreground flex gap-2 mb-2">
              <Link to="/">Components</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{item.name}</span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-semibold">{item.name}</h1>
              {item.componentNumber && (
                <span className="px-2 py-0.5 text-xs font-medium bg-muted backdrop-blur-md text-muted-foreground rounded-sm">
                  {item.componentNumber}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>

          {/* Preview */}
          <div className="relative min-h-[60dvh] border-y bg-muted/5 flex items-center justify-center">
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <button
                onClick={() => setIsCodeOpen(true)}
                aria-label="Open source code drawer"
                className="px-3 py-1.5 text-xs rounded-md border bg-background"
              >
                <HugeiconsIcon icon={SourceCodeIcon} size={14} />
              </button>
              <ThemeToggle />
            </div>

            <Suspense fallback={<div>Loading preview…</div>}>
              <item.component key={reloadKey} />
            </Suspense>
          </div>

          {/* Docs */}
          <div className="p-4 space-y-6">
            {/* Dependencies */}
            {item.dependencies && item.dependencies.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Dependencies</h4>
                <div className="flex flex-wrap gap-2">
                  {item.dependencies.map((dep) => (
                    <span
                      key={dep}
                      className="px-2.5 py-1 rounded-md bg-muted text-xs flex items-center gap-1.5"
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
                    className="inline-flex items-center text-sm text-foreground underline underline-offset-4"
                  >
                    {item.inspiredByName}
                    <HugeiconsIcon icon={ArrowUpRight01FreeIcons} size={14} className="ml-0.5" />
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">
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
                          activePackageManager={activePackageManager}
                          setActivePackageManager={setActivePackageManager}
                          item={item}
                          hasCopiedInstall={hasCopiedInstall}
                          handleCopyInstall={handleCopyInstall}
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
                    <TabsContent value="manual" className='space-y-6'>
                      {/* Manual install (dependencies-driven) */}
                      <ManualInstallationCmd
                        activePackageManager={activePackageManager}
                        setActivePackageManager={setActivePackageManager}
                        dependencies={item.dependencies}
                        trackingContext={{
                          component_slug: item.slug,
                          component_name: item.name,
                          category: item.category,
                          source: "page",
                        }}
                      />
                      {componentCode ? (
                        <CodeBlock showLineNumbers title={`${item.slug}.tsx`}>
                          {componentCode}
                        </CodeBlock>
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

          {/* MOBILE BOTTOM DRAWER */}
          <Drawer open={isCodeOpen} onOpenChange={setIsCodeOpen}>
            <DrawerContent
              className="
      h-[85dvh]
      max-h-[85dvh]
      overflow-hidden
      p-0
    "
            >
              {/* Sticky header */}
              <div className="sticky top-0 z-10 bg-background border-b px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Usage & Source</h3>
                  <button
                    onClick={() => setIsCodeOpen(false)}
                    aria-label="Close source code drawer"
                    className="text-sm text-muted-foreground"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Scroll container */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
                <ManualInstallationCmd
                  activePackageManager={activePackageManager}
                  setActivePackageManager={setActivePackageManager}
                  dependencies={item.dependencies}
                  trackingContext={{
                    component_slug: item.slug,
                    component_name: item.name,
                    category: item.category,
                    source: "page",
                  }}
                />

                {/* DEMO CODE — MOBILE SAFE */}
                {demoCode && (
                  <CodeBlock
                    mobile
                    showLineNumbers={false}
                  >
                    {demoCode}
                  </CodeBlock>
                )}

                {componentCode && (
                  <CodeBlock
                    mobile
                    showLineNumbers={false}
                  >
                    {componentCode}
                  </CodeBlock>
                )}
              </div>
            </DrawerContent>
          </Drawer>

        </>
      )}

      {/* ================= DESKTOP ================= */}
      {!isMobile && (
        <div className="relative flex w-full h-[calc(100dvh-84px)] overflow-hidden">

          {/* LEFT DOCS - Scrollable */}
          <div className="w-[40%] xl:w-[38%] shrink-0 flex-1 overflow-y-auto">
            <ScrollFadeEffect>
              <div className="px-6 space-y-4 py-6 pb-12">
                <div className="flex items-center justify-between pt-2">
                  <h1 className="text-2xl font-semibold">{item.name}</h1>

                  {item.componentNumber && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-muted backdrop-blur-md text-muted-foreground rounded-sm">
                      {item.componentNumber}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                {/* Dependencies */}
                {item.dependencies && item.dependencies.length > 0 && (
                  <div className="mt-6">
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
                        <TabsContent value="cli">
                          <LayoutGroup id={`install-cli-right-${item.slug}`}>
                            <InstallationCmd
                              activePackageManager={activePackageManager}
                              setActivePackageManager={setActivePackageManager}
                              item={item}
                              hasCopiedInstall={hasCopiedInstall}
                              handleCopyInstall={handleCopyInstall}
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
                        <TabsContent value="manual" className='space-y-6'>
                          {/* Manual install (dependencies-driven) */}
                          <ManualInstallationCmd
                            activePackageManager={activePackageManager}
                            setActivePackageManager={setActivePackageManager}
                            dependencies={item.dependencies}
                            trackingContext={{
                              component_slug: item.slug,
                              component_name: item.name,
                              category: item.category,
                              source: "page",
                            }}
                          />
                          {componentCode ? (
                            <CodeBlock showLineNumbers title={`${item.slug}.tsx`}>
                              {componentCode}
                            </CodeBlock>
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


          {/* RIGHT PREVIEW - Sticky */}
          <div className="flex-1 sticky top-0 h-[calc(100dvh-84px)] p-6">
            <div className="h-full flex flex-col bg-muted/5 border rounded-2xl overflow-hidden">
              <div className="flex justify-end gap-2 px-4 py-2 border-b bg-background/80 backdrop-blur rounded-t-2xl">
                <ThemeToggle />
                <button
                  onClick={() => setReloadKey((k) => k + 1)}
                  aria-label="Reload component preview"
                  className="p-2 rounded-md hover:bg-accent"
                >
                  <HugeiconsIcon icon={ReloadIcon} size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-12 flex justify-center items-center">
                <Suspense fallback={<div>Loading preview…</div>}>
                  <item.component key={reloadKey} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}
