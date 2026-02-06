import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { CopyButton } from "../animate-ui/components/buttons/copy";
import { ScrollFadeEffect } from "../scroll-fade-effect";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
const PM_LIST = ["npm", "pnpm", "yarn", "bun"] as PackageManager[];

export function ManualInstallationCmd({
  activePackageManager,
  setActivePackageManager,
  dependencies,
}: {
  activePackageManager: PackageManager;
  setActivePackageManager: (pm: PackageManager) => void;
  dependencies?: string[];
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
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground">
        Manual installation
      </h4>

      {/* PM Switcher */}
      <div className="relative w-fit">
        <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg border">
          {PM_LIST.map((pm) => {
            const isActive = pm === activePackageManager;

            return (
              <button
                key={pm}
                onClick={() => setActivePackageManager(pm)}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium rounded-md",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={`pm-manual-pill`}
                    className="absolute inset-0 rounded-md bg-primary"
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
      <div className="relative group">
        <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm pr-12 border max-w-full overflow-x-auto">
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
          variant="secondary"
          size="sm"
          content={command}
          className="absolute right-2 top-2"
        />
      </div>

    </div>
  );
}
