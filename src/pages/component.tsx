"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { registry } from "@/data/registry";
import { SEOHead } from "@/components/seo-head";
import { CodeBlock } from "@/components/mdx/code-block";
import { CodeCollapsibleWrapper } from "@/components/mdx/code-collapsible";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SourceCodeIcon,
  ReloadIcon,
  BookmarkIcon,
  MoreVerticalIcon,
  X,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PromptItems } from "@/components/prompt-items";
import type { ComponentFile } from "@/lib/types";
import { InstallationCmd } from "@/components/mdx/installation-cmd";
import { ManualInstallationCmd } from "@/components/mdx/manual-installation";
import { LayoutGroup } from "motion/react";
import { ScrollFadeEffect } from "@/components/scroll-fade-effect";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/animate-ui/components/radix/tabs';


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

            <h1 className="text-xl font-semibold">{item.name}</h1>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>

          {/* Preview */}
          <div className="relative min-h-[60dvh] border-y bg-muted/5 flex items-center justify-center">
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <button
                onClick={() => setIsCodeOpen(true)}
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
            <LayoutGroup id={`install-mobile-${item.slug}`}>
              <InstallationCmd
                activePackageManager={activePackageManager}
                setActivePackageManager={setActivePackageManager}
                item={item}
                hasCopiedInstall={hasCopiedInstall}
                handleCopyInstall={async (cmd) => {
                  await navigator.clipboard.writeText(cmd);
                  setHasCopiedInstall(true);
                  setTimeout(() => setHasCopiedInstall(false), 2000);
                }}
              />
            </LayoutGroup>

            <PromptItems
              files={componentFiles}
              dependencies={item.dependencies || []}
              componentName={item.name}
            />
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
        <div className="flex w-full h-[76dvh] overflow-hidden">

          {/* LEFT DOCS */}
          <div className="relative w-[40%] xl:w-[38%] bg-background overflow-y-auto">
            <ScrollFadeEffect>
              <div className="p-6 space-y-8 relative">
                <div className="overflow-y-auto">

                  <h1 className="text-2xl font-semibold">{item.name}</h1>
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
                    <div className="mt-6 flex items-center gap-2 group/inspired-by">
                      <h4 className="text-sm">Inspired By</h4>
                      {item.inspiredByLink ? (
                        <a
                          href={item.inspiredByLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-primary"
                        >
                          {item.inspiredByName}
                          <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="group-hover/inspired-by:translate-x-1 -translate-x-5 opacity-0 group-hover/inspired-by:opacity-100 transition" />
                        </a>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {item.inspiredByName}
                        </span>
                      )}
                    </div>
                  )}

                  <LayoutGroup id={`install-desktop-${item.slug}`}>
                    <InstallationCmd
                      activePackageManager={activePackageManager}
                      setActivePackageManager={setActivePackageManager}
                      item={item}
                      hasCopiedInstall={hasCopiedInstall}
                      handleCopyInstall={async (cmd) => {
                        await navigator.clipboard.writeText(cmd);
                        setHasCopiedInstall(true);
                        setTimeout(() => setHasCopiedInstall(false), 2000);
                      }}
                    />
                  </LayoutGroup>

                  {/* Copy for AI */}
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-sm mb-3">Copy for AI</h3>
                    <PromptItems
                      files={componentFiles}
                      dependencies={item.dependencies || []}
                      componentName={item.name}
                    />
                  </div>

                  {/* How to use - with Collapsible CodeBlock */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">How to use</h3>
                    <CodeCollapsibleWrapper>
                      {demoCode ? (
                        <CodeBlock showLineNumbers title='demo'>
                          {demoCode}
                        </CodeBlock>
                      ) : (
                        <div className="flex items-center justify-center h-32 text-muted-foreground animate-pulse">
                          Loading code...
                        </div>
                      )}
                    </CodeCollapsibleWrapper>
                  </div>
                </div>
              </div>

            </ScrollFadeEffect>

            {/* DESKTOP LEFT PANEL DRAWER */}
            <AnimatePresence>
              {isCodeOpen && (
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                    mass: 0.9,
                  }}
                  className="absolute inset-y-0 left-0 w-full bg-background border rounded-t-2xl z-30"
                >
                  <ProgressiveBlur
                    direction="top"
                    blurLayers={8}
                    blurIntensity={1.2}
                    className="absolute inset-x-0 h-16 top-0 pointer-events-none rounded-t-2xl z-20"
                  />
                  <div className="h-full overflow-y-auto p-6 space-y-4 relative">

                    {/* iOS-style grabber */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-muted-foreground/30" />
                    <div className="sticky top-2 right-2 w-full flex justify-end z-40">
                      <Button
                        onClick={() => setIsCodeOpen(false)}
                        variant="ghost"
                        size="icon"
                      >
                        <HugeiconsIcon icon={X} size={14} />
                      </Button>
                    </div>



                    {/* Usage header */}
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Usage</h3>
                      <p className="text-xs text-muted-foreground">
                        Install and use this component in your project
                      </p>
                    </div>
                    <h3 className="font-medium text-sm">Installation</h3>

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
                        </TabsContent>
                        <TabsContent value="manual">
                          {/* Manual install (dependencies-driven) */}
                          <ManualInstallationCmd
                            activePackageManager={activePackageManager}
                            setActivePackageManager={setActivePackageManager}
                            dependencies={item.dependencies}
                          />

                        </TabsContent>
                      </TabsContents>
                    </Tabs>


                    {/* Import & use */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Import & use
                      </h4>
                      <p className="text-xs text-muted-foreground">Update the import path to match your project structure</p>

                      {demoCode ? (
                        <CodeBlock language="tsx" title='demo'>
                          {demoCode}
                        </CodeBlock>
                      ) : (
                        <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse">
                          Loading usage example…
                        </div>
                      )}
                    </div>

                    {/* Full source */}
                    <CodeCollapsibleWrapper title="View full component source">
                      {componentCode ? (
                        <CodeBlock showLineNumbers title={`components/ui/${item.slug}`}>
                          {componentCode}
                        </CodeBlock>
                      ) : (
                        <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse">
                          Loading source code…
                        </div>
                      )}
                    </CodeCollapsibleWrapper>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>


          {/* RIGHT PREVIEW */}
          <div className="flex-1">
            <div className="sticky top-0 h-dvh flex flex-col bg-muted/5 border rounded-2xl overflow-hidden">
              <div className="flex justify-end gap-2 px-4 py-2 border-b bg-background/80 backdrop-blur">
                <button
                  onClick={() => setIsCodeOpen(!isCodeOpen)}
                  className="px-3 py-1.5 text-xs rounded-md border bg-background"
                >
                  <HugeiconsIcon icon={SourceCodeIcon} size={14} />
                </button>
                <ThemeToggle />
                <button
                  onClick={() => setReloadKey((k) => k + 1)}
                  className="p-2 rounded-md hover:bg-accent"
                >
                  <HugeiconsIcon icon={ReloadIcon} size={16} />
                </button>
                <button className="p-2 rounded-md hover:bg-accent">
                  <HugeiconsIcon icon={BookmarkIcon} size={16} />
                </button>
                <button className="p-2 rounded-md hover:bg-accent">
                  <HugeiconsIcon icon={MoreVerticalIcon} size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-12 flex justify-center">
                <Suspense fallback={<div>Loading preview…</div>}>
                  <item.component key={reloadKey} />
                </Suspense>
              </div>
            </div>
          </div>
        </div >
      )
      }
    </>
  );
}
