import { cn } from "@/lib/utils";
import { CopyButton } from "../animate-ui/components/buttons/copy";
import type { RegistryItem } from "@/data/registry";
import { ScrollFadeEffect } from "../scroll-fade-effect";
import { AnimatePresence, motion } from "motion/react";
import { trackEvent } from "@/lib/analytics";
type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';
const PM_LIST = ['npm', 'pnpm', 'yarn', 'bun'] as PackageManager[]

type InstallTrackingContext = {
  component_slug?: string;
  component_name?: string;
  category?: string;
  source?: string;
};

export const InstallationCmd = ({
  activePackageManager,
  setActivePackageManager,
  item,
  hasCopiedInstall,
  handleCopyInstall,
  trackingContext,
}: {
  activePackageManager: PackageManager
  setActivePackageManager: (pm: PackageManager) => void
  item: RegistryItem
  hasCopiedInstall: boolean
  handleCopyInstall: (cmd: string) => void
  trackingContext?: InstallTrackingContext

}) => {


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

  return (
    <div className="space-y-2">

      {/* Package Manager Tabs */}
      <div className="relative w-fit">
        <div className="relative flex items-center gap-1 p-1 bg-muted/50 rounded-lg w-fit border">
          {PM_LIST.map((pm) => {
            const isActive = activePackageManager === pm

            return (
              <button
                key={pm}
                onClick={() => {
                  setActivePackageManager(pm);
                  trackEvent("install_pm_select", {
                    package_manager: pm,
                    component_slug: item.slug,
                    component_name: item.name,
                    category: item.category,
                    source: "cli",
                    source_context: trackingContext?.source,
                    command_preview:
                      item.install[0]
                        ? getInstallCommand(pm, item.install[0])
                        : undefined,
                    command_count: item.install.length,
                  });
                }}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Active pill */}
                {isActive && (
                  <motion.span
                    layoutId="pm-active-pill"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    className="absolute inset-0 rounded-md bg-primary"
                  />
                )}

                {/* Label */}
                <span className="relative z-10">{pm}</span>
              </button>
            )
          })}
        </div>
      </div>


      {/* Install Commands */}
      <div className="space-y-3">
        {item.install.map((cmd, idx) => {
          const command = getInstallCommand(activePackageManager, cmd)

          return (
            <div key={idx} className="relative group">
              <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm pr-12 overflow-x-auto whitespace-nowrap border">
                <ScrollFadeEffect orientation="horizontal">
                  <AnimatePresence mode="wait">
                    <motion.code
                      key={activePackageManager}
                      initial={{ opacity: 0, filter: "blur(6px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(6px)" }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                    >
                      {command}
                    </motion.code>
                  </AnimatePresence>

                </ScrollFadeEffect>
              </div>

              <CopyButton
                variant="secondary"
                size="sm"
                content={command}
                copied={hasCopiedInstall}
                onCopiedChange={() => {
                  handleCopyInstall(command);
                  trackEvent("install_command_copy", {
                    component_slug: item.slug,
                    component_name: item.name,
                    category: item.category,
                    package_manager: activePackageManager,
                    command,
                    source: "cli",
                    source_context: trackingContext?.source,
                  });
                }}
                className="absolute right-2 top-2 p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
              />
            </div>
          )
        })}
      </div>
    </div>

  )
}
