import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { CopyButton } from "../animate-ui/components/buttons/copy";
import { ScrollFadeEffect } from "../scroll-fade-effect";
import { trackEvent } from "@/lib/analytics";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
const PM_LIST = ["npm", "pnpm", "yarn", "bun"] as PackageManager[];

type InstallTrackingContext = {
  component_slug?: string;
  component_name?: string;
  category?: string;
  source?: string;
};

export function ManualInstallationCmd({
  activePackageManager,
  setActivePackageManager,
  dependencies,
  trackingContext,
}: {
  activePackageManager: PackageManager;
  setActivePackageManager: (pm: PackageManager) => void;
  dependencies?: string[];
  trackingContext?: InstallTrackingContext;
}) {
  if (!dependencies || dependencies.length === 0) return null;

  const getCommand = (pm: PackageManager) => {
    const pkgs = dependencies.join(" ");
    switch (pm) {
      case "npm":
        return `npm install ${pkgs}`;
      case "yarn":
        return `yarn add ${pkgs}`;
      case "pnpm":
        return `pnpm add ${pkgs}`;
      case "bun":
        return `bun add ${pkgs}`;
    }
  };

  const command = getCommand(activePackageManager);

  return (
    <div className="flex flex-col gap-2 pl-0.5">

      {/* PM Switcher */}
      <div className="relative w-fit">
        <div className="relative flex items-center gap-1 bg-gray-100 dark:bg-neutral-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] rounded-lg w-fit">
          {PM_LIST.map((pm) => {
            const isActive = pm === activePackageManager;

            return (
              <button
                key={pm}
                onClick={() => {
                  setActivePackageManager(pm);
                  trackEvent("manual_pm_select", {
                    package_manager: pm,
                    dependency_count: dependencies.length,
                    ...trackingContext,
                  });
                }}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium rounded-lg",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={`pm-manual-pill`}
                    className="absolute inset-0 rounded-lg bg-linear-to-b from-lime-400 to-lime-500 border border-lime-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_1px_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_2px_1px_0_rgba(0,0,0,0.04)] text-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{pm}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Command */}
      <div className="relative group mt-2">
        <div className="bg-muted/50 px-3 py-2 rounded-xl border font-mono text-sm pr-12 overflow-x-auto whitespace-nowrap">
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
                className="whitespace-nowrap"
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
          onCopiedChange={() => {
            if (!command) return;
            trackEvent("manual_install_copy", {
              package_manager: activePackageManager,
              command,
              dependency_count: dependencies.length,
              ...trackingContext,
            });
          }}
          className="absolute right-[3px] top-[3px] rounded-xl hover:bg-transparent!"
        />
      </div>

    </div>
  );
}
