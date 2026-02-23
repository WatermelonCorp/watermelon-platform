import { Suspense, useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';

import { blocks } from '@/data/blocks';
import { SEOHead } from '@/components/seo-head';
import { CodeBlock } from '@/components/mdx/code-block';
import { HugeiconsIcon } from '@hugeicons/react';
import { ReloadIcon, ViewIcon, SourceCodeIcon, LaptopIcon, TabletIcon, SmartPhoneIcon } from '@/lib/hugeicons';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { PromptItems } from '@/components/prompt-items';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/animate-ui/components/radix/tabs';
import type { ComponentFile } from '@/lib/types';
import { FileExplorer, type FileItem } from '@/components/ui/file-explorer';
import { motion } from 'motion/react';
import { MobileRestriction } from '@/components/mobile-restriction';
import { trackEvent } from '@/lib/analytics';
import { ResponsivePreviewFrame } from '@/components/preview/responsive-preview-frame';
import { InstallCliCommand } from '@/components/registry/install-cli-command';

export default function BlockPage() {
  const { slug } = useParams<{ slug: string }>();
  const [reloadKey, setReloadKey] = useState(0);
  const [fileCodes, setFileCodes] = useState<Record<string, string>>({});
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const isMobile = useIsMobile();

  const item = blocks.find((b) => b.slug === slug);

  // Load file codes
  useEffect(() => {
    if (!item) return;
    setLoadingFiles(true);

    Promise.all(
      item.files.map(async (file) => {
        const code = await file.code();
        return { name: file.name, code };
      })
    ).then((results) => {
      const codeMap: Record<string, string> = {};
      results.forEach(({ name, code }) => {
        codeMap[name] = code;
      });
      setFileCodes(codeMap);
      setLoadingFiles(false);
      // Auto-select first file
      if (results.length > 0 && !selectedFile) {
        setSelectedFile(results[0].name);
      }
    });
  }, [item]);

  useEffect(() => {
    if (!item) return;
    trackEvent('block_view', {
      block_slug: item.slug,
      block_name: item.name,
      source: 'page',
    });
  }, [item]);

  if (!item) {
    return <Navigate to="/blocks" replace />;
  }

  // Prepare files for PromptItems
  const componentFiles: ComponentFile[] = item.files.map((file) => ({
    name: file.name,
    content: fileCodes[file.name] || '',
  }));

  return (
    <>
      <SEOHead
        title={`${item.name} - UI Block`}
        description={item.description}
      />

      {/* ================= MOBILE ================= */}
      {isMobile && (
        <>
          {/* Header */}
          <div className="relative px-4 pt-4 pb-3 bg-background">
            <div className="text-xs text-muted-foreground flex gap-2 mb-2">
              <Link to="/blocks">Blocks</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{item.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">{item.name}</h1>
              {item.componentNumber && (
                <span className="px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded-sm">
                  {item.componentNumber}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>

          {/* Preview */}
          <div className="relative min-h-[60dvh] border-y bg-muted/5 overflow-auto">
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <button
                onClick={() => setIsCodeOpen(true)}
                aria-label="Open source code drawer"
                className="px-3 py-1.5 text-xs rounded-md border bg-background"
              >
                <HugeiconsIcon icon={SourceCodeIcon} size={14} />
              </button>
              {/* <ThemeToggle /> */}
            </div>

            <div className="min-h-full bg-muted/5 p-4 flex items-center justify-center">
              <MobileRestriction />
            </div>
          </div>

          {/* Docs */}
          <div className="p-4 space-y-6">
            {/* Dependencies */}
            {item.dependencies && item.dependencies.length > 0 && (
              <div>
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

            <InstallCliCommand
              install={item.install}
              slug={item.slug}
              name={item.name}
              category={item.category}
              entityType="block"
              source="page"
            />

            {/* Copy for AI */}
            {!loadingFiles && (
              <div className="space-y-2">
                <h3 className="font-medium">Copy for AI</h3>
                <PromptItems
                  files={componentFiles}
                  dependencies={item.dependencies || []}
                  componentName={item.name}
                  componentSlug={item.slug}
                />
              </div>
            )}
          </div>

          {/* MOBILE BOTTOM DRAWER */}
          <Drawer open={isCodeOpen} onOpenChange={setIsCodeOpen}>
            <DrawerContent className="h-[85dvh] max-h-[85dvh] overflow-hidden p-0">
              {/* Sticky header */}
              <div className="sticky top-0 z-10 bg-background border-b px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Source Code ({item.files.length} files)</h3>
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
                {loadingFiles ? (
                  <div className="flex items-center justify-center h-32 text-muted-foreground animate-pulse text-sm">
                    Loading files...
                  </div>
                ) : (
                  item.files.map((file) => (
                    <CodeBlock
                      key={file.name}
                      mobile
                      showLineNumbers={false}
                      title={file.name}
                    >
                      {fileCodes[file.name] || '// Loading...'}
                    </CodeBlock>
                  ))
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </>
      )}

      {/* ================= DESKTOP ================= */}
      {!isMobile && (
        <div className="flex flex-col mb-10">
          {/* Header - Outside tabs, always visible */}


          <div className="px-6 py-4 border-b bg-background shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-semibold">{item.name}</h1>
                  {item.dependencies && item.dependencies.length > 0 && (
                    <div className="flex items-center gap-1.5 ">
                      {item.dependencies.slice(0, 3).map((dep) => (
                        <span
                          key={dep}
                          className="px-2 py-0.5 rounded bg-muted text-xs"
                          title={dep}
                        >
                          {dep}
                        </span>
                      ))}
                      {item.dependencies.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{item.dependencies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-4 max-w-3xl">
                  <InstallCliCommand
                    install={item.install}
                    slug={item.slug}
                    name={item.name}
                    category={item.category}
                    entityType="block"
                    source="page"
                  />
                </div>
                {!loadingFiles && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Copy for AI</h4>
                    <PromptItems
                      files={componentFiles}
                      dependencies={item.dependencies || []}
                      componentName={item.name}
                      componentSlug={item.slug}
                    />
                  </div>
                )}
              </div>
              {item.componentNumber && (
                <div className="flex items-center justify-center shrink-0">
                  <span className="px-3 py-1 text-sm font-mono font-medium bg-muted text-muted-foreground rounded-md border">
                    {item.componentNumber}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Tabs - Take remaining space */}
          <Tabs defaultValue="preview" className="h-[90dvh] shrink-0 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-6 py-2 border-b bg-muted/30 shrink-0">
              <TabsList>
                <TabsTrigger value="preview">
                  <HugeiconsIcon icon={ViewIcon} size={14} />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code">
                  <HugeiconsIcon icon={SourceCodeIcon} size={14} />
                  Source Code
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-muted/50 rounded-md p-1 mr-2 border">
                  <button
                    onClick={() => setViewMode('desktop')}
                    aria-label="Desktop preview"
                    className={`p-1.5 rounded-sm transition-all ${viewMode === 'desktop' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    title="Desktop view"
                  >
                    <HugeiconsIcon icon={LaptopIcon} size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode('tablet')}
                    aria-label="Tablet preview"
                    className={`p-1.5 rounded-sm transition-all ${viewMode === 'tablet' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    title="Tablet view"
                  >
                    <HugeiconsIcon icon={TabletIcon} size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    aria-label="Mobile preview"
                    className={`p-1.5 rounded-sm transition-all ${viewMode === 'mobile' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    title="Mobile view"
                  >
                    <HugeiconsIcon icon={SmartPhoneIcon} size={14} />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground mr-2">
                  {item.files.length} files
                </span>
                <ThemeToggle />
                <button
                  className="p-2 bg-background/80 backdrop-blur rounded-md border shadow-sm hover:bg-accent transition-colors"
                  onClick={() => setReloadKey(k => k + 1)}
                  aria-label="Reload block preview"
                  title="Reload preview"
                >
                  <HugeiconsIcon icon={ReloadIcon} size={16} />
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <TabsContents mode="layout" className="flex-1 min-h-0 relative" style={{ overflow: 'hidden' }}>
              {/* Preview Tab */}
              <TabsContent value="preview" className="absolute inset-0 overflow-auto bg-muted/5 flex items-start justify-center p-8">
                {/* Preview takes full available size or constraint */}
                <ResponsivePreviewFrame
                  viewport={viewMode}
                  previewUrl={`/preview/block/${item.slug}?reload=${reloadKey}`}
                >
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Loading block...
                    </div>
                  }>
                    <item.component key={`${reloadKey}-${viewMode}`} />
                  </Suspense>
                </ResponsivePreviewFrame>
              </TabsContent>

              {/* Source Code Tab */}
              <TabsContent value="code" className="absolute inset-0 flex">
                {/* File Explorer Sidebar */}
                <FileExplorer
                  files={item.files.map((f): FileItem => ({ name: f.name, type: 'file' }))}
                  selectedFile={selectedFile}
                  onFileSelect={setSelectedFile}
                  className="w-56 shrink-0"
                />

                {/* Code Preview Panel */}
                <div className="flex-1 flex flex-col min-w-0 relative">
                  {/* File Header */}
                  <div className="px-4 py-2 border-b bg-muted/30 backdrop-blur-sm flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{selectedFile || 'Select a file'}</span>
                    </div>
                    {/* Copy for AI */}
                    {!loadingFiles && (
                      <PromptItems
                        files={componentFiles}
                        dependencies={item.dependencies || []}
                        componentName={item.name}
                        componentSlug={item.slug}
                      />
                    )}
                  </div>

                  {/* Code Content */}
                  <div className="flex-1 overflow-auto p-4">
                    {loadingFiles ? (
                      <div className="flex items-center justify-center h-full text-muted-foreground animate-pulse">
                        Loading files...
                      </div>
                    ) : selectedFile ? (
                      <motion.div
                        key={selectedFile}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CodeBlock showLineNumbers title={selectedFile}>
                          {fileCodes[selectedFile] || '// No content'}
                        </CodeBlock>
                      </motion.div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        Select a file to view its contents
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </TabsContents>
          </Tabs>
        </div >
      )
      }
    </>
  );
}
