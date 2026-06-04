import { cn } from "@/lib/utils";
import { CopyButton } from "../animate-ui/components/buttons/copy";
import type { RegistryItem } from "@/data/animated-components-registry";
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
  activeCodeTab,
  item,
  trackingContext,
}: {
  activePackageManager: PackageManager
  setActivePackageManager: (pm: PackageManager) => void
  activeCodeTab: 'base' | 'original'
  item: RegistryItem
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
    <div className="flex flex-col gap-2 pl-0.5">

      {/* Package Manager Tabs */}
      <div className="relative w-fit">
        <div className="relative flex items-center gap-1 bg-gray-100 dark:bg-neutral-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] rounded-lg w-fit">
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
                      activeCodeTab === 'base' && item.installBase?.[0]
                        ? getInstallCommand(pm, item.installBase[0])
                        : item.install[0]
                          ? getInstallCommand(pm, item.install[0])
                          : undefined,
                    command_count: activeCodeTab === 'base' && item.installBase ? item.installBase.length : item.install.length,
                  });
                }}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
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
                    className="absolute inset-0 rounded-lg bg-linear-to-b from-lime-400 to-lime-500 border border-lime-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_1px_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_2px_1px_0_rgba(0,0,0,0.04)] text-white"
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
      <div className="flex flex-col gap-2 mt-2">
        {(activeCodeTab === 'base' && item.installBase ? item.installBase : item.install).map((cmd, idx) => {
          const command = getInstallCommand(activePackageManager, cmd)

          return (
            <div key={idx} className="relative group">
              <div className="bg-muted/50 px-3 py-2 rounded-xl border font-mono text-sm pr-12 overflow-x-auto whitespace-nowrap ">
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
                variant="ghost"
                size="sm"
                content={command}
                onCopiedChange={(copied) => {
                  if (copied) {
                    trackEvent("install_command_copy", {
                      component_slug: item.slug,
                      component_name: item.name,
                      category: item.category,
                      package_manager: activePackageManager,
                      command,
                      source: "cli",
                      source_context: trackingContext?.source,
                    });
                  }
                }}
                className="absolute right-[3px] top-[3px] p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              />
            </div>
          )
        })}
      </div>
    </div>

  )
}