import { Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { RegistryItem } from '@/data/registry';
import { CodeBlock } from '@/components/mdx/code-block';
import { CodeCollapsibleWrapper } from '@/components/mdx/code-collapsible';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, SourceCodeIcon, ReloadIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
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

interface ComponentModalProps {
  item: RegistryItem | null;
  onClose: () => void;
}

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function ComponentModal({ item, onClose }: ComponentModalProps) {
  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  const isMobile = useIsMobile();
  const [hasCopiedInstall, setHasCopiedInstall] = useState(false);
  const [demoCode, setDemoCode] = useState<string>('');
  const [componentCode, setComponentCode] = useState<string>('');
  const [reloadKey, setReloadKey] = useState(0);
  const [activePackageManager, setActivePackageManager] = useState<PackageManager>('npm');

  // Load code when item changes
  useEffect(() => {
    if (!item) return;
    item.demoCode().then(setDemoCode);
    item.code().then(setComponentCode);
  }, [item]);

  // Early return AFTER all hooks
  if (!item) return null;

  const handleCopyInstall = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setHasCopiedInstall(true);
      setTimeout(() => setHasCopiedInstall(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleReload = () => {
    setReloadKey(prev => prev + 1);
  };

  // Prepare files for PromptItems
  const componentFiles: ComponentFile[] = [
    ...(demoCode ? [{ name: 'demo.tsx', content: demoCode }] : []),
    ...(componentCode ? [{ name: `${item.slug}.tsx`, content: componentCode }] : []),
  ];

  // Mobile View - Drawer with preview on top
  if (isMobile) {
    return (
      <Drawer open={!!item} onOpenChange={(o) => !o && onClose()}>
        <DrawerContent className="h-[95dvh] p-0 rounded-t-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <DrawerHeader className="px-4 py-3 border-b shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {item.componentNumber && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-sm">
                    {item.componentNumber}
                  </span>
                )}
                <span className="capitalize">{item.category}</span>
              </div>
              <Link
                to={`/components/${item.slug}`}
                onClick={onClose}
                className="flex items-center gap-1 text-xs font-medium text-primary"
              >
                Full Page
                <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
              </Link>
            </div>
            <DrawerTitle className="text-xl font-medium mt-1">{item.name}</DrawerTitle>
          </DrawerHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Preview Section - On Top for Mobile */}
            <div className="p-4 border-b bg-muted/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Preview</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    className="p-1.5 rounded-md border bg-background hover:bg-accent transition-colors"
                    onClick={handleReload}
                  >
                    <HugeiconsIcon icon={ReloadIcon} size={14} />
                  </button>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6 flex items-center justify-center min-h-[200px]" >
                <Suspense fallback={
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </div>
                }>
                  <item.component key={reloadKey} />
                </Suspense>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 border-b">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Dependencies */}
              {item.dependencies && item.dependencies.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-medium mb-2 text-muted-foreground">Dependencies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className="px-2 py-0.5 rounded bg-muted text-xs flex items-center gap-1"
                      >
                        {dep}
                        <img src="/brand/npm-icon.png" alt="npm" width={10} height={10} />
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Inspired By */}
              {item.inspiredByName && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Inspired by</span>
                  {item.inspiredByLink ? (
                    <a
                      href={item.inspiredByLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary"
                    >
                      {item.inspiredByName}
                    </a>
                  ) : (
                    <span className="text-xs">{item.inspiredByName}</span>
                  )}
                </div>
              )}
            </div>

            {/* Installation */}
            <div className="p-4 border-b">
              <InstallationCmd
                activePackageManager={activePackageManager}
                setActivePackageManager={setActivePackageManager}
                item={item}
                hasCopiedInstall={hasCopiedInstall}
                handleCopyInstall={handleCopyInstall}
              />
            </div>

            {/* Copy for AI */}
            <div className="p-4 border-b">
              <h3 className="font-medium text-sm mb-3">Copy for AI</h3>
              <PromptItems
                files={componentFiles}
                dependencies={item.dependencies || []}
                componentName={item.name}
              />
            </div>

            {/* Code - Updated to match desktop right side */}
            <div className="p-4 space-y-6">
              {/* Usage header */}
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Usage</h3>
                <p className="text-xs text-muted-foreground">
                  Install and use this component in your project
                </p>
              </div>

              {/* Manual install (dependencies-driven) */}
              <ManualInstallationCmd
                activePackageManager={activePackageManager}
                setActivePackageManager={setActivePackageManager}
                dependencies={item.dependencies}
              />

              {/* Import & use */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Import & use
                </h4>

                {demoCode ? (
                  <CodeBlock language="tsx">
                    {demoCode}
                  </CodeBlock>
                ) : (
                  <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse text-sm">
                    Loading usage example…
                  </div>
                )}
              </div>

              {/* Full source */}
              <CodeCollapsibleWrapper title="View full component source">
                {componentCode ? (
                  <CodeBlock showLineNumbers>
                    {componentCode}
                  </CodeBlock>
                ) : (
                  <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse text-sm">
                    Loading source code…
                  </div>
                )}
              </CodeCollapsibleWrapper>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop View - Dialog
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none sm:max-w-none w-[90vw] h-[90vh] p-0 gap-0 overflow-hidden flex flex-row bg-background border rounded-xl">

        {/* Left Side: Documentation & Code */}
        <div className="w-[40%] flex flex-col h-full border-r bg-background">
          <ScrollFadeEffect className='w-full'>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pt-20">
              <ProgressiveBlur className='w-full absolute top-0 h-26 left-0'
                direction="top"
                blurLayers={8}
                blurIntensity={1.2}
              />


              {/* Header */}
              <div>
                <div className="flex items-center left-0 pl-6 justify-between bg-background absolute top-0 pt-8 w-full z-10">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground ">
                    <div className="flex items-center gap-2">
                      {item.componentNumber && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-sm">
                          {item.componentNumber}
                        </span>
                      )}
                      <span className="hidden lg:block">Components</span>
                      <span className="hidden lg:block">/</span>
                      <span className='capitalize hidden lg:block'>{item.category}</span>
                      <span className="hidden lg:block">/</span>
                      <span className="text-foreground font-medium">{item.name}</span>
                    </div>

                    <Link
                      to={`/components/${item.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      View Full Page
                      <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                    </Link>
                  </div>

                </div>
                <h2 className="text-3xl font-medium tracking-tight mb-2 mt-5 lg:mt-0">{item.name}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
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
              </div>

              {/* Installation */}
              <LayoutGroup id={`install-cli-left-${item.slug}`}>
                <InstallationCmd
                  activePackageManager={activePackageManager}
                  setActivePackageManager={setActivePackageManager}
                  item={item}
                  hasCopiedInstall={hasCopiedInstall}
                  handleCopyInstall={handleCopyInstall}
                />
              </LayoutGroup>


              {/* Copy for AI Platforms */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Copy for AI</h3>
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
          </ScrollFadeEffect>
        </div>

        {/* Right Side: Preview with Tabs */}
        <Tabs defaultValue="preview" className="flex-1 min-w-0 flex flex-col h-full bg-muted/10">

          {/* Toolbar with tabs */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
            <TabsList>

              <TabsTrigger value="preview">
                <HugeiconsIcon icon={ViewIcon} size={14} />
                Preview
              </TabsTrigger>

              {/* Code Tab */}
              <TabsTrigger value="code">
                <HugeiconsIcon icon={SourceCodeIcon} size={14} />
                Code
              </TabsTrigger>
            </TabsList>


            {/* Actions */}
            <div className="flex items-center gap-2 mr-8">
              <ThemeToggle />
              <button
                className="p-2 bg-background/80 backdrop-blur rounded-md border shadow-sm hover:bg-accent transition-colors"
                onClick={handleReload}
                title="Reload preview"
              >
                <HugeiconsIcon icon={ReloadIcon} size={16} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto relative">
            {/* Preview Panel */}
            <TabsContent value="preview">
              <div className="h-full flex items-center justify-center p-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/50 via-transparent to-transparent">
                <div className="w-full max-w-4xl rounded-xl border bg-background shadow-sm flex items-center justify-center overflow-hidden p-8 min-h-[400px]">
                  <Suspense fallback={
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Loading component...
                    </div>
                  }>
                    <item.component key={reloadKey} />
                  </Suspense>
                </div>
              </div>
            </TabsContent>

            {/* Code Panel */}
            <TabsContent value="code">
              <div className="h-full overflow-auto p-4 space-y-8">

                {/* Usage header */}
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Usage</h3>
                  <p className="text-xs text-muted-foreground">
                    Install and use this component in your project
                  </p>
                </div>
                <h3 className="font-medium text-lg">Installation</h3>

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
                    </TabsContent>
                    <TabsContent value="manual">
                      {/* Manual install (dependencies-driven) */}
                      <ManualInstallationCmd
                        activePackageManager={activePackageManager}
                        setActivePackageManager={setActivePackageManager}
                        dependencies={item.dependencies}
                      />
                      <CodeCollapsibleWrapper title="View full component source">
                        {componentCode ? (
                          <CodeBlock showLineNumbers>
                            {componentCode}
                          </CodeBlock>
                        ) : (
                          <div className="h-32 flex items-center justify-center text-muted-foreground animate-pulse text-sm">
                            Loading source code…
                          </div>
                        )}
                      </CodeCollapsibleWrapper>
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
                    </TabsContent>
                  </TabsContents>
                </Tabs>
              </div>
            </TabsContent>

          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
