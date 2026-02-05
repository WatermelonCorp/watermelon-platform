import { Suspense, useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { RegistryItem } from '@/data/registry';
import { CodeBlock } from '@/components/mdx/code-block';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, CodeIcon, ReloadIcon } from '@hugeicons/core-free-icons';
import { ThemeToggle } from '../layout/theme-toggle';
import { PromptItems } from '@/components/prompt-items';
import { cn } from '@/lib/utils';
import type { ComponentFile } from '@/lib/types';
import { CopyButton } from '../animate-ui/components/buttons/copy';

interface ComponentModalProps {
  item: RegistryItem | null;
  onClose: () => void;
}

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function ComponentModal({ item, onClose }: ComponentModalProps) {
  const [hasCopiedInstall, setHasCopiedInstall] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [demoCode, setDemoCode] = useState<string>('');
  const [componentCode, setComponentCode] = useState<string>('');
  const [reloadKey, setReloadKey] = useState(0);
  const [activePackageManager, setActivePackageManager] = useState<PackageManager>('npm');

  // Load code when item changes
  useEffect(() => {
    if (!item) return;

    // Load demo code
    item.demoCode().then(setDemoCode);
    // Load component code
    item.code().then(setComponentCode);
  }, [item]);

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

  const getInstallCommand = (pm: PackageManager, baseCommand: string) => {
    // Check if it's a shadcn add command
    if (baseCommand.startsWith('npx shadcn') || baseCommand.includes('shadcn@latest add')) {
      const parts = baseCommand.split(' ');
      const componentName = parts[parts.length - 1];
      switch (pm) {
        case 'npm':
          return `npx shadcn@latest add ${componentName}`;
        case 'yarn':
          return `npx shadcn@latest add ${componentName}`;
        case 'pnpm':
          return `pnpm dlx shadcn@latest add ${componentName}`;
        case 'bun':
          return `bunx --bun shadcn@latest add ${componentName}`;
        default:
          return baseCommand;
      }
    }
    // For npm install commands
    if (baseCommand.startsWith('npm install') || baseCommand.startsWith('npm i ')) {
      const packages = baseCommand.replace(/^npm (install|i) /, '');
      switch (pm) {
        case 'npm':
          return `npm install ${packages}`;
        case 'yarn':
          return `yarn add ${packages}`;
        case 'pnpm':
          return `pnpm add ${packages}`;
        case 'bun':
          return `bun add ${packages}`;
        default:
          return baseCommand;
      }
    }
    return baseCommand;
  };

  // Prepare files for PromptItems
  const componentFiles: ComponentFile[] = [
    ...(demoCode ? [{ name: 'demo.tsx', content: demoCode }] : []),
    ...(componentCode ? [{ name: `${item.slug}.tsx`, content: componentCode }] : []),
  ];

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none sm:max-w-none w-[90vw] h-[90vh] p-0 gap-0 overflow-hidden flex flex-row bg-background border rounded-xl">

        {/* Left Side: Documentation & Code */}
        <div className="w-[40%] flex flex-col h-full border-r bg-background">
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>Components</span>
                <span>/</span>
                <span>{item.category}</span>
                <span>/</span>
                <span className="text-foreground font-medium">{item.name}</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">{item.name}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {item.description}
              </p>

              {/* Creator Info */}
              <div className="flex items-center gap-3 mt-6">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                  {item.name?.[0] || '?'}
                </div>
                <div>
                  <div className="font-medium text-sm">Created by</div>
                  <div className="text-sm text-muted-foreground">Watermelon UI</div>
                </div>
              </div>
            </div>



            {/* Installation */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Installation</h3>

              {/* Package Manager Tabs */}
              <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg w-fit border">
                {(['npm', 'pnpm', 'yarn', 'bun'] as PackageManager[]).map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setActivePackageManager(pm)}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                      activePackageManager === pm
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {pm}
                  </button>
                ))}
              </div>

              {/* Install Commands */}
              {item.install.map((cmd, idx) => {
                const command = getInstallCommand(activePackageManager, cmd);
                return (
                  <div key={idx} className="relative group">
                    <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm pr-12 overflow-x-auto whitespace-nowrap border">
                      {command}
                    </div>
                    <CopyButton
                      variant="secondary"
                      size="sm"
                      content={command}
                      copied={hasCopiedInstall}
                      onCopiedChange={() => handleCopyInstall(command)}
                      className="absolute right-2 top-2 p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                    />
                  </div>
                );
              })}
            </div>

            {/* Copy for AI Platforms */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Copy for AI</h3>
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/30">
                <span className="text-sm text-muted-foreground">Generate prompt for:</span>
                <PromptItems
                  files={componentFiles}
                  dependencies={item.dependencies || []}
                  componentName={item.name}
                />
              </div>
            </div>

            {/* How to use - with CodeBlock */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">How to use</h3>
              {demoCode ? (
                <CodeBlock maxHeight="300px" showLineNumbers>
                  {demoCode}
                </CodeBlock>
              ) : (
                <div className="flex items-center justify-center h-32 text-muted-foreground animate-pulse">
                  Loading code...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Preview with Tabs */}
        <div className="flex-1 flex flex-col h-full bg-muted/10">
          {/* Toolbar with tabs */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
            <div className="flex items-center gap-1">
              {/* Preview Tab */}
              <button
                onClick={() => setActiveTab('preview')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                  activeTab === 'preview'
                    ? "bg-background text-foreground shadow-sm border"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <HugeiconsIcon icon={ViewIcon} size={14} />
                Preview
              </button>

              {/* Code Tab */}
              <button
                onClick={() => setActiveTab('code')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                  activeTab === 'code'
                    ? "bg-background text-foreground shadow-sm border"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <HugeiconsIcon icon={CodeIcon} size={14} />
                Code
              </button>
            </div>

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
          <div className="flex-1 overflow-hidden relative">
            {/* Preview Panel */}
            {activeTab === 'preview' && (
              <div className="h-full flex items-center justify-center p-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/50 via-transparent to-transparent">
                <div className="w-full max-w-4xl rounded-xl border bg-background shadow-sm flex items-center justify-center overflow-hidden p-8" key={reloadKey}>
                  <Suspense fallback={
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Loading component...
                    </div>
                  }>
                    <item.component />
                  </Suspense>
                </div>
              </div>
            )}

            {/* Code Panel */}
            {activeTab === 'code' && (
              <div className="h-full overflow-auto p-4">
                {componentCode ? (
                  <CodeBlock maxHeight="calc(90vh - 120px)" showLineNumbers>
                    {componentCode}
                  </CodeBlock>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground animate-pulse">
                    Loading source code...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
