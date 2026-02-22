import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/animate-ui/components/buttons/copy";
import { ScrollFadeEffect } from "@/components/scroll-fade-effect";
import { trackEvent } from "@/lib/analytics";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
const PM_LIST = ["npm", "pnpm", "yarn", "bun"] as PackageManager[];

interface InstallCliCommandProps {
  install?: string[];
  slug: string;
  name: string;
  category?: string;
  source: "modal" | "page";
  entityType: "dashboard" | "block";
  className?: string;
}

const buildShadcnCommand = (pm: PackageManager, componentName: string) => {
  switch (pm) {
    case "npm":
    case "yarn":
      return `npx shadcn@latest add ${componentName}`;
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${componentName}`;
    case "bun":
      return `bunx --bun shadcn@latest add ${componentName}`;
    default:
      return `npx shadcn@latest add ${componentName}`;
  }
};

const convertCommandForPm = (baseCommand: string, pm: PackageManager) => {
  if (baseCommand.startsWith("npx shadcn") || baseCommand.includes("shadcn@latest add")) {
    const parts = baseCommand.trim().split(" ");
    const componentName = parts[parts.length - 1];
    return buildShadcnCommand(pm, componentName);
  }

  if (baseCommand.startsWith("npm install") || baseCommand.startsWith("npm i ")) {
    const packages = baseCommand.replace(/^npm (install|i) /, "");
    switch (pm) {
      case "npm":
        return `npm install ${packages}`;
      case "yarn":
        return `yarn add ${packages}`;
      case "pnpm":
        return `pnpm add ${packages}`;
      case "bun":
        return `bun add ${packages}`;
      default:
        return baseCommand;
    }
  }

  return baseCommand;
};

export function InstallCliCommand({
  install,
  slug,
  name,
  category,
  source,
  entityType,
  className,
}: InstallCliCommandProps) {
  const [activePackageManager, setActivePackageManager] = useState<PackageManager>("npm");
  const baseCommands = useMemo(
    () => (install && install.length > 0 ? install : [`npx shadcn@latest add ${slug}`]),
    [install, slug]
  );

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-medium">CLI Command</h4>
        <div className="relative w-fit">
          <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg border">
            {PM_LIST.map((pm) => {
              const isActive = activePackageManager === pm;
              return (
                <button
                  key={pm}
                  onClick={() => {
                    setActivePackageManager(pm);
                    trackEvent("install_pm_select", {
                      package_manager: pm,
                      slug,
                      name,
                      category,
                      entity_type: entityType,
                      source_context: source,
                    });
                  }}
                  className={cn(
                    "relative px-2.5 py-1 text-xs font-medium rounded-md transition-colors",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`pm-${source}-${entityType}-${slug}`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-md bg-primary"
                    />
                  )}
                  <span className="relative z-10">{pm}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {baseCommands.map((baseCommand, idx) => {
          const command = convertCommandForPm(baseCommand, activePackageManager);
          return (
            <div key={idx} className="relative group">
              <div className="bg-muted/50 p-3 rounded-lg font-mono text-xs sm:text-sm pr-12 border max-w-full overflow-x-auto">
                <ScrollFadeEffect orientation="horizontal">
                  <AnimatePresence mode="wait">
                    <motion.code
                      key={`${activePackageManager}-${baseCommand}`}
                      initial={{ opacity: 0, filter: "blur(6px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(6px)" }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="whitespace-nowrap"
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
                onCopiedChange={(copied) => {
                  if (!copied) return;
                  trackEvent("install_command_copy", {
                    slug,
                    name,
                    category,
                    package_manager: activePackageManager,
                    command,
                    entity_type: entityType,
                    source_context: source,
                  });
                }}
                className="absolute right-2 top-2"
                ariaLabel={`Copy install command for ${name}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
