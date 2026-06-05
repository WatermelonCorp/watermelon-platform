import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';

import { blocks } from '@/data/blocks';
import { SEOHead } from '@/components/seo-head';
import { CodeBlock } from '@/components/mdx/code-block';
import { HugeiconsIcon } from '@hugeicons/react';
import { InspiredBy } from '@/components/registry/inspired-by';
import { ReloadIcon, ViewIcon, SourceCodeIcon, LaptopIcon, TabletIcon, SmartPhoneIcon } from '@/lib/hugeicons';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { PromptItems } from '@/components/prompt-items';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/animate-ui/components/radix/tabs';
import type { ComponentFile } from '@/lib/types';
import { FileExplorer, type FileItem } from '@/components/ui/file-explorer';
import { motion, AnimatePresence } from 'motion/react';
import { MobileRestriction } from '@/components/mobile-restriction';
import { trackEvent } from '@/lib/analytics';
import { ResponsivePreviewFrame } from '@/components/preview/responsive-preview-frame';
import { InstallCliCommand } from '@/components/registry/install-cli-command';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/animate-ui/components/buttons/copy';
import { generatePromptForPlatform, PLATFORM_INFO } from '@/lib/prompt-template';
import { AnimatedCheck } from '@/components/animated-check';

// ─── Navbar Install Bar ───────────────────────────────────────────────────────

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';
const PM_LIST: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun'];

function buildCommand(pm: PackageManager, base: string): string {
  if (base.startsWith('npx shadcn') || base.includes('shadcn@latest add')) {
    const parts = base.trim().split(' ');
    const component = parts[parts.length - 1];
    switch (pm) {
      case 'pnpm': return `pnpm dlx shadcn@latest add ${component}`;
      case 'bun':  return `bunx --bun shadcn@latest add ${component}`;
      default:     return `npx shadcn@latest add ${component}`;
    }
  }
  if (base.startsWith('npm install') || base.startsWith('npm i ')) {
    const pkgs = base.replace(/^npm (install|i) /, '');
    switch (pm) {
      case 'yarn': return `yarn add ${pkgs}`;
      case 'pnpm': return `pnpm add ${pkgs}`;
      case 'bun':  return `bun add ${pkgs}`;
      default:     return `npm install ${pkgs}`;
    }
  }
  return base;
}

interface NavInstallBarProps {
  install?: string[];
  slug: string;
  name: string;
  category?: string;
}

function NavInstallBar({ install, slug, name, category }: NavInstallBarProps) {
  const [activePm, setActivePm] = useState<PackageManager>('npm');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [dropdownOpen]);

  const baseCommand = useMemo(
    () => (install && install.length > 0 ? install[0] : `npx shadcn@latest add ${slug}`),
    [install, slug],
  );

  const command = useMemo(() => buildCommand(activePm, baseCommand), [activePm, baseCommand]);

  function selectPm(pm: PackageManager) {
    setActivePm(pm);
    setDropdownOpen(false);
    trackEvent('install_pm_select', {
      package_manager: pm,
      slug,
      name,
      category,
      entity_type: 'block',
      source_context: 'page_nav',
    });
  }

  return (
    <div className="flex items-center gap-1.5">
      {/* PM dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          aria-label={`Package manager: ${activePm}`}
          onClick={() => setDropdownOpen((v) => !v)}
          className={cn(
            'flex items-center gap-1 h-7 px-2 rounded-lg border text-xs font-medium',
            'bg-muted/60 border-input/30 text-foreground',
            'hover:bg-muted transition-colors select-none',
          )}
        >
          <span>{activePm}</span>
          <ChevronDownIcon
            size={11}
            className={cn(
              'text-muted-foreground transition-transform duration-150',
              dropdownOpen && 'rotate-180',
            )}
          />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              role="listbox"
              aria-label="Select package manager"
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className={cn(
                'absolute left-0 top-[calc(100%+4px)] z-200 min-w-[96px]',
                'rounded-xl border border-input/40 bg-background/95 backdrop-blur-md',
                'shadow-lg shadow-black/10 dark:shadow-black/40',
                'py-1 overflow-hidden',
              )}
            >
              {PM_LIST.map((pm) => {
                const isActive = activePm === pm;
                return (
                  <button
                    key={pm}
                    role="option"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => selectPm(pm)}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-1.5 text-xs font-medium',
                      'transition-colors select-none',
                      isActive
                        ? 'text-foreground bg-muted/60'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40',
                    )}
                  >
                    <span>{pm}</span>
                    {isActive && <CheckIcon size={11} className="text-primary shrink-0" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Command display + copy */}
      <div className={cn(
        'flex items-center gap-1 h-7 pl-2.5 pr-1',
        'bg-muted/50 rounded-lg border border-input/30',
        'font-mono text-[11px] text-muted-foreground',
        'max-w-[280px] overflow-hidden',
      )}>
        <AnimatePresence mode="wait">
          <motion.span
            key={`${activePm}-${baseCommand}`}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
          >
            {command}
          </motion.span>
        </AnimatePresence>
        <CopyButton
          variant="ghost"
          size="xs"
          content={command}
          ariaLabel={`Copy install command for ${name}`}
          className="shrink-0 size-5 text-muted-foreground hover:text-foreground"
          onCopiedChange={(copied) => {
            if (!copied) return;
            trackEvent('install_command_copy', {
              slug,
              name,
              category,
              package_manager: activePm,
              command,
              entity_type: 'block',
              source_context: 'page_nav',
            });
          }}
        />
      </div>
    </div>
  );
}

// ─── Navbar Prompt Icons ──────────────────────────────────────────────────────

const NAV_PLATFORMS = ['LOVABLE', 'V0', 'BOLT'] as const;
type NavPlatform = (typeof NAV_PLATFORMS)[number];

interface NavPromptIconsProps {
  files: ComponentFile[];
  dependencies: string[];
  name: string;
  slug: string;
  category?: string;
  disabled?: boolean;
}

function NavPromptIcons({ files, dependencies, name, slug, category, disabled }: NavPromptIconsProps) {
  const [copiedPlatform, setCopiedPlatform] = useState<NavPlatform | null>(null);
  const [copyCount, setCopyCount] = useState(0);

  const handleCopy = useCallback(
    async (platform: NavPlatform) => {
      if (!files.some((f) => f.content?.trim())) return;
      const prompt = generatePromptForPlatform(platform, {
        componentName: name,
        files,
        dependencies,
      });
      try {
        await navigator.clipboard.writeText(prompt);
        setCopiedPlatform(platform);
        setCopyCount((c) => c + 1);
        setTimeout(() => setCopiedPlatform(null), 2000);
        trackEvent('ai_prompt_copy', {
          platform,
          component_slug: slug,
          component_name: name,
          category,
          source: 'page_nav',
          file_count: files.length,
          dependency_count: dependencies.length,
        });
      } catch (err) {
        console.error('Failed to copy prompt:', err);
      }
    },
    [files, dependencies, name, slug, category],
  );

  return (
    <div className="flex items-center gap-1.5">
      {NAV_PLATFORMS.map((platform) => {
        const info = PLATFORM_INFO[platform];
        const isCopied = copiedPlatform === platform;
        return (
          <button
            key={platform}
            type="button"
            aria-label={isCopied ? 'Copied!' : `Copy prompt for ${info.name}`}
            title={isCopied ? 'Copied!' : `Copy for ${info.name}`}
            disabled={disabled}
            onClick={() => void handleCopy(platform)}
            className={cn(
              'flex items-center justify-center size-7 rounded-lg transition-all',
              'opacity-70 hover:opacity-100 disabled:opacity-40 disabled:cursor-wait cursor-pointer',
            )}
          >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <AnimatedCheck
                  key={`check-${platform}-${copyCount}`}
                  className="h-4 w-4 text-primary"
                />
              ) : (
                <motion.img
                  key="icon"
                  src={info.icon}
                  alt={info.name}
                  width={16}
                  height={16}
                  className={cn(
                    'w-4 h-4 object-contain shrink-0',
                    platform === 'V0'
                      ? 'invert dark:invert-0'
                      : platform !== 'LOVABLE'
                        ? 'dark:invert'
                        : '',
                  )}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                />
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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
    const loadFiles = async () => {
      setLoadingFiles(true);

      const results = await Promise.all(
        item.files.map(async (file) => {
          const code = await file.code();
          return { name: file.name, code };
        })
      );
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
    };

    loadFiles();
  }, [item, selectedFile]);

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

  // Prepare files for PromptItems / NavPromptIcons
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
            </div>

            <div className="min-h-full bg-muted/5 p-4 flex items-center justify-center">
              <MobileRestriction />
            </div>
          </div>

          {/* Docs */}
          <div className="p-4 space-y-6">
            {/* Dependencies */}
            {/* {item.dependencies && item.dependencies.length > 0 && (
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
            )} */}
            <div className="my-4">
              <InspiredBy inspiredBy={item.inspiredBy} />
            </div>

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

      {/* ================= DESKTOP / TABLET ================= */}
      {!isMobile && (
        <div className="flex flex-col ">

          {/* ── Preview + Code tabs — immediately at top ── */}
          <Tabs defaultValue="preview" className="h-[calc(100dvh-74px)] shrink-0 flex flex-col min-h-0 gap-0">
            {/* ── Navbar bar ── */}
            <div className="flex items-center justify-between px-4 py-2 border-y bg-muted/30 shrink-0">
              {/* Left: tab switcher */}
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

              {/* Centre: prompt icons + divider + install command */}
              <div className="flex items-center gap-3">
                <NavPromptIcons
                  files={componentFiles}
                  dependencies={item.dependencies || []}
                  name={item.name}
                  slug={item.slug}
                  category={item.category}
                  disabled={loadingFiles}
                />

                {/* Divider */}
                <div className="h-4 w-px bg-border/60" aria-hidden />

                <NavInstallBar
                  install={item.install}
                  slug={item.slug}
                  name={item.name}
                  category={item.category}
                />
              </div>

              {/* Right: viewport switcher + theme + reload */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-muted/50 rounded-md p-1 border">
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
                <ThemeToggle />
                <button
                  className="size-9 rounded-lg border border-input/50 bg-background flex items-center justify-center hover:bg-accent transition-colors"
                  onClick={() => setReloadKey(k => k + 1)}
                  aria-label="Reload block preview"
                  title="Reload preview"
                >
                  <HugeiconsIcon icon={ReloadIcon} size={15} />
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <TabsContents mode="layout" className="flex-1 min-h-0 relative" style={{ overflow: 'hidden' }}>
              {/* Preview Tab */}
              <TabsContent value="preview" className="absolute inset-0 overflow-auto bg-muted/5 flex items-start justify-center">
                <ResponsivePreviewFrame
                  viewport={viewMode}
                  previewUrl={`/preview/block/${item.slug}?reload=${reloadKey}`}
                >
                  <item.component key={`${reloadKey}-${viewMode}`} />
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
                  <div className="px-4 border-b bg-muted/30 backdrop-blur-sm flex items-center justify-between shrink-0 h-12.5">
                    <span className="text-sm font-medium">{selectedFile || 'Select a file'}</span>
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

          {/*
            ── Title + Installation + Dependencies + Copy for AI ──
            Commented out for desktop/tablet — controls moved to the navbar above.

          <div className="px-6 pt-4 pb-3 flex items-center gap-2.5">
            <h1 className="text-lg font-semibold tracking-tight leading-snug">{item.name}</h1>
            {item.componentNumber && (
              <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs font-medium border">
                {item.componentNumber}
              </span>
            )}
            {item.inspiredBy && (
              <div className="ml-auto">
                <InspiredBy inspiredBy={item.inspiredBy} />
              </div>
            )}
          </div>

          <div className="border-y flex flex-col lg:flex-row [&>*]:border-r [&>*:last-child]:border-r-0 [&>*]:border-b lg:[&>*]:border-b-0">

            <div className="flex-1 min-w-0 px-6 py-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Installation</p>
              <InstallCliCommand
                install={item.install}
                slug={item.slug}
                name={item.name}
                category={item.category}
                entityType="block"
                source="page"
              />
            </div>

            {item.dependencies && item.dependencies.length > 0 && (
              <div className="shrink-0 px-6 py-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dependencies</p>
                <div className="flex flex-wrap gap-2 items-center">
                  {item.dependencies.map((dep) => (
                    <span
                      key={dep}
                      className="bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1)] flex items-center gap-1.5 px-3 py-1 text-sm"
                    >
                      {dep}
                      <img src="/brand/npm-icon.png" alt="npm" width={10} height={10} />
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!loadingFiles && (
              <div className="shrink-0 px-6 py-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Copy for AI</p>
                <PromptItems
                  files={componentFiles}
                  dependencies={item.dependencies || []}
                  componentName={item.name}
                  componentSlug={item.slug}
                />
              </div>
            )}

          </div>
          */}

        </div>
      )}
    </>
  );
}
