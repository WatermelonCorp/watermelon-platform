import { Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import type { DashboardItem } from '@/data/dashboards';
import { CodeBlock } from '@/components/mdx/code-block';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, SourceCodeIcon, ReloadIcon, ArrowRight01Icon, Cancel01Icon, ArrowUpRight01FreeIcons } from '@/lib/hugeicons';
import { ThemeToggle } from '../layout/theme-toggle';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/animate-ui/components/radix/tabs';
import { FileExplorer, type FileItem } from '@/components/ui/file-explorer';
import { motion } from 'framer-motion';
import { MobileRestriction } from '../mobile-restriction';
import { LaptopIcon, TabletIcon, SmartPhoneIcon } from '@/lib/hugeicons';
import { trackEvent } from '@/lib/analytics';

interface DashboardModalProps {
  item: DashboardItem | null;
  onClose: () => void;
}

export function DashboardModal({ item, onClose }: DashboardModalProps) {
  const isMobile = useIsMobile();
  const [reloadKey, setReloadKey] = useState(0);
  const [fileCodes, setFileCodes] = useState<Record<string, string>>({});
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

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
      // Auto-select first file
      if (results.length > 0 && !selectedFile) {
        setSelectedFile(results[0].name);
      }
    });
  }, [item]);

  useEffect(() => {
    if (!item) return;
    trackEvent('dashboard_view', {
      dashboard_slug: item.slug,
      dashboard_name: item.name,
      source: 'modal',
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
                  to={`/dashboard/${item.slug}`}
                  onClick={onClose}
                  aria-label={`Open ${item.name} full page`}
                  className="p-1.5 rounded-md hover:bg-accent transition-colors"
                  title="Full Page"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                </Link>
                <button
                  onClick={onClose}
                  aria-label="Close dashboard modal"
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
                  aria-label="Reload dashboard preview"
                >
                  <HugeiconsIcon icon={ReloadIcon} size={14} />
                </button>
              </div>
            </div>

            {/* Tab Contents - Use layout mode for fixed height with scroll */}
            <TabsContents mode="layout" className="flex-1 min-h-0 relative" style={{ overflow: 'hidden' }}>
              <TabsContent value="preview" className="absolute inset-0 overflow-auto">
                <div className="min-h-full bg-muted/5">
                  <MobileRestriction />
                </div>
              </TabsContent>

              <TabsContent value="code" className="absolute inset-0 flex flex-col">
                {/* File Explorer - Horizontal on mobile */}
                {/* File Explorer - Horizontal on mobile */}
                <FileExplorer
                  files={item.files.map((f): FileItem => ({ name: f.name, type: 'file' }))}
                  selectedFile={selectedFile}
                  onFileSelect={setSelectedFile}
                  orientation="horizontal"
                  className="shrink-0"
                />

                {/* Code Content */}
                <div className="flex-1 overflow-auto p-4 bg-background">
                  {loadingFiles ? (
                    <div className="flex items-center justify-center h-32 text-muted-foreground animate-pulse text-sm">
                      Loading files...
                    </div>
                  ) : selectedFile ? (
                    <motion.div
                      key={selectedFile}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CodeBlock mobile showLineNumbers={false} title={selectedFile}>
                        {fileCodes[selectedFile] || '// No content'}
                      </CodeBlock>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                      Select a file to view
                    </div>
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
        <DialogTitle className="sr-only">{item.name}</DialogTitle>
        <DialogDescription className="sr-only">
          {item.description}
        </DialogDescription>
        {/* Header with Breadcrumb */}
        <div className="flex items-center justify-between px-6 py-3 border-b bg-background shrink-0">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="shrink-0">Dashboards</span>
              <span className="shrink-0">/</span>
              <span className="text-foreground font-medium truncate">{item.name}</span>
              <Link
                to={`/dashboard/${item.slug}`}
                onClick={onClose}
                aria-label={`Open ${item.name} full page`}
                className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors shrink-0 ml-1"
              >
                <HugeiconsIcon icon={ArrowUpRight01FreeIcons} size={14} />
              </Link>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dashboard modal"
            className="p-2 rounded-md hover:bg-accent transition-colors"
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

              <span className="text-sm text-muted-foreground mr-4">
                {item.files.length} files
              </span>
              <ThemeToggle />
              <button
                className="p-2 bg-background/80 backdrop-blur rounded-md border shadow-sm hover:bg-accent transition-colors"
                onClick={handleReload}
                aria-label="Reload dashboard preview"
                title="Reload preview"
              >
                <HugeiconsIcon icon={ReloadIcon} size={16} />
              </button>
            </div>
          </div>

          {/* Tab Contents - Use layout mode with relative positioning for absolute children */}
          <TabsContents mode="layout" className="flex-1 min-h-0 relative" style={{ overflow: 'hidden' }}>
            <TabsContent value="preview" className="absolute inset-0 overflow-auto bg-muted/5 flex items-start justify-center p-8">
              {/* Preview takes full available size or constraint */}
              <div
                className={`transition-all duration-300 ease-in-out bg-background border shadow-sm overflow-hidden ${viewMode === 'desktop' ? 'w-full h-full rounded-md' :
                  viewMode === 'tablet' ? 'w-[768px] h-[1024px] rounded-[2rem] border-4' :
                    'w-[375px] h-[812px] rounded-[2.5rem] border-4'
                  }`}
              >
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Loading dashboard...
                  </div>
                }>
                  <item.component key={`${reloadKey}-${viewMode}`} />
                </Suspense>
              </div>
            </TabsContent>

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
                <div className="px-4 py-2 border-b bg-muted/30 backdrop-blur-sm flex items-center justify-between shrink-0 h-12.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{selectedFile || 'Select a file'}</span>
                  </div>
                  {item.dependencies && item.dependencies.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      {item.dependencies.slice(0, 4).map((dep) => (
                        <span
                          key={dep}
                          className="px-2 py-0.5 rounded bg-muted text-xs flex items-center gap-1"
                        >
                          {dep}
                          <img src="/brand/npm-icon.png" alt="npm" width={10} height={10} />
                        </span>
                      ))}
                    </div>
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
      </DialogContent>
    </Dialog>
  );
}
