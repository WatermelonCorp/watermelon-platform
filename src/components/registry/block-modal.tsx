import { Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { BlockItem } from '@/data/blocks';
import { CodeBlock } from '@/components/mdx/code-block';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, SourceCodeIcon, ReloadIcon, ArrowRight01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { ThemeToggle } from '../layout/theme-toggle';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/animate-ui/components/radix/tabs';

interface BlockModalProps {
  item: BlockItem | null;
  onClose: () => void;
}

export function BlockModal({ item, onClose }: BlockModalProps) {
  const isMobile = useIsMobile();
  const [reloadKey, setReloadKey] = useState(0);
  const [fileCodes, setFileCodes] = useState<Record<string, string>>({});
  const [loadingFiles, setLoadingFiles] = useState(true);

  // Load file codes when item changes
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
    });
  }, [item]);

  if (!item) return null;

  const handleReload = () => {
    setReloadKey(prev => prev + 1);
  };

  // Mobile View - Drawer with tabs
  if (isMobile) {
    return (
      <Drawer open={!!item} onOpenChange={(o) => !o && onClose()}>
        <DrawerContent className="h-[95dvh] p-0 rounded-t-2xl flex flex-col">
          {/* Header */}
          <DrawerHeader className="px-4 py-3 border-b shrink-0 bg-background">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <DrawerTitle className="text-base font-semibold truncate">{item.name}</DrawerTitle>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{item.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/block/${item.slug}`}
                  onClick={onClose}
                  className="p-1.5 rounded-md hover:bg-accent transition-colors"
                  title="Full Page"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                </Link>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-md hover:bg-accent transition-colors"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={16} />
                </button>
              </div>
            </div>
          </DrawerHeader>

          {/* Tabs - Take remaining space */}
          <Tabs defaultValue="preview" className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30 shrink-0">
              <TabsList>
                <TabsTrigger value="preview" className="text-xs">
                  <HugeiconsIcon icon={ViewIcon} size={14} />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="text-xs">
                  <HugeiconsIcon icon={SourceCodeIcon} size={14} />
                  Code
                </TabsTrigger>
              </TabsList>

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

            {/* Tab Contents - Use layout mode for fixed height with scroll */}
            <TabsContents mode="layout" className="flex-1 min-h-0 relative" style={{ overflow: 'hidden' }}>
              <TabsContent value="preview" className="absolute inset-0 overflow-auto">
                <div className="min-h-full bg-muted/5">
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Loading...
                    </div>
                  }>
                    <item.component key={reloadKey} />
                  </Suspense>
                </div>
              </TabsContent>

              <TabsContent value="code" className="absolute inset-0 overflow-auto">
                <div className="p-4 space-y-4 bg-background">
                  {loadingFiles ? (
                    <div className="flex items-center justify-center h-32 text-muted-foreground animate-pulse text-sm">
                      Loading files...
                    </div>
                  ) : (
                    <>
                      {item.dependencies && item.dependencies.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium mb-2 text-muted-foreground">Dependencies</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {item.dependencies.map((dep) => (
                              <span key={dep} className="px-2 py-0.5 rounded bg-muted text-xs">
                                {dep}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.files.map((file) => (
                        <div key={file.name}>
                          <CodeBlock
                            mobile
                            showLineNumbers={false}
                            title={file.name}
                          >
                            {fileCodes[file.name] || '// Loading...'}
                          </CodeBlock>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </TabsContent>
            </TabsContents>
          </Tabs>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop View - Full width with tabs
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-none sm:max-w-none w-[95vw] h-[90vh] p-0 gap-0 flex flex-col bg-background border overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-background shrink-0">
          <div className="flex items-center gap-6 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-semibold truncate">{item.name}</h2>
                {item.dependencies && item.dependencies.length > 0 && (
                  <div className="flex items-center gap-1.5">
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
              <p className="text-sm text-muted-foreground truncate max-w-2xl">
                {item.description}
              </p>
            </div>

            <Link
              to={`/block/${item.slug}`}
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
            >
              Full Page
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-accent transition-colors ml-4"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} />
          </button>
        </div>

        {/* Tabs - Take remaining space */}
        <Tabs defaultValue="preview" className="flex-1 flex flex-col min-h-0 overflow-hidden">
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
              <span className="text-sm text-muted-foreground mr-4">
                {item.files.length} files
              </span>
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

          {/* Tab Contents - Use layout mode with relative positioning for absolute children */}
          <TabsContents mode="layout" className="flex-1 min-h-0 relative" style={{ overflow: 'hidden' }}>
            <TabsContent value="preview" className="absolute inset-0 overflow-auto">
              {/* Preview takes full available size */}
              <div className="w-full h-full">
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Loading block...
                  </div>
                }>
                  <item.component key={reloadKey} />
                </Suspense>
              </div>
            </TabsContent>

            <TabsContent value="code" className="absolute inset-0 overflow-auto">
              <div className="max-w-7xl mx-auto p-8 space-y-6">
                {/* Dependencies */}
                {item.dependencies && item.dependencies.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-3">All Dependencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.dependencies.map((dep) => (
                        <span
                          key={dep}
                          className="px-3 py-1.5 rounded-md bg-muted text-sm flex items-center gap-1.5"
                        >
                          {dep}
                          <img src="/brand/npm-icon.png" alt="npm" width={12} height={12} />
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Files */}
                <div className="space-y-6">
                  <h3 className="font-medium text-lg">Files ({item.files.length})</h3>
                  {loadingFiles ? (
                    <div className="flex items-center justify-center h-32 text-muted-foreground animate-pulse">
                      Loading files...
                    </div>
                  ) : (
                    item.files.map((file) => (
                      <div key={file.name}>
                        <CodeBlock showLineNumbers title={file.name}>
                          {fileCodes[file.name] || '// Loading...'}
                        </CodeBlock>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </TabsContents>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
