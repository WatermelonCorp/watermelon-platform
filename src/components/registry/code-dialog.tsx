import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CodeBlock } from "@/components/mdx/code-block";
import { CopyButton } from "@/components/animate-ui/components/buttons/copy";
import { cn } from "@/lib/utils";
import type { UiVariant } from "@/data/components-registry";

// ─── Types ────────────────────────────────────────────────────────────────────

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const PM_LIST: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

interface CodeDialogProps {
  variant: UiVariant | null;
  onClose: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCliCommand(pm: PackageManager, baseCli: string): string {
  // Detect shadcn add pattern
  if (baseCli.includes("shadcn@latest add") || baseCli.includes("npx shadcn")) {
    const parts = baseCli.trim().split(/\s+/);
    const componentName = parts[parts.length - 1];
    switch (pm) {
      case "pnpm":
        return `pnpm dlx shadcn@latest add ${componentName}`;
      case "yarn":
        return `npx shadcn@latest add ${componentName}`;
      case "bun":
        return `bunx --bun shadcn@latest add ${componentName}`;
      default:
        return `npx shadcn@latest add ${componentName}`;
    }
  }
  // Generic npm install pattern
  if (baseCli.startsWith("npm install") || baseCli.startsWith("npm i ")) {
    const packages = baseCli.replace(/^npm (install|i) /, "");
    switch (pm) {
      case "pnpm":
        return `pnpm add ${packages}`;
      case "yarn":
        return `yarn add ${packages}`;
      case "bun":
        return `bun add ${packages}`;
      default:
        return `npm install ${packages}`;
    }
  }
  return baseCli;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CodeDialog({ variant, onClose }: CodeDialogProps) {
  const [activePm, setActivePm] = useState<PackageManager>("pnpm");

  if (!variant) return null;

  const command = getCliCommand(activePm, variant.cli);

  return (
    <Dialog open={!!variant} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-xs sm:max-w-3xl lg:max-w-5xl w-full p-0 overflow-hidden gap-0"
        showCloseButton
      >
        {/* ─ Header ─ */}
        <DialogHeader className="px-5 pt-5 pb-4 border-b">
          <DialogTitle className="text-base font-semibold">
            CLI Command
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-8rem)] px-5 py-5 space-y-7">
          {/* ─ CLI Section ─ */}
          <div className="space-y-3">
            {/* PM tabs + copy row */}
            <div className="flex items-center justify-between gap-3">
              {/* PM Tabs */}
              <div className="flex items-center gap-0.5 bg-muted/60 rounded-lg p-0.5 border w-fit">
                {PM_LIST.map((pm) => {
                  const isActive = activePm === pm;
                  return (
                    <button
                      key={pm}
                      id={`pm-tab-${pm}`}
                      onClick={() => setActivePm(pm)}
                      className={cn(
                        "relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors select-none",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="ui-pm-pill"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          className="absolute inset-0 rounded-md bg-primary"
                        />
                      )}
                      <span className="relative z-10">{pm}</span>
                    </button>
                  );
                })}
              </div>

              {/* Copy CLI */}
              <CopyButton
                content={command}
                variant="secondary"
                size="sm"
                className="h-7 w-7"
              />
            </div>

            {/* Command display */}
            <div className="relative rounded-lg border bg-muted/40 px-4 py-3 font-mono text-sm overflow-x-auto">
              <AnimatePresence mode="wait">
                <motion.code
                  key={activePm}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="text-foreground whitespace-nowrap"
                >
                  {command}
                </motion.code>
              </AnimatePresence>
            </div>
          </div>

          {/* ─ Manual Code Section ─ */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Manual Code
            </h3>
            <CodeBlock
              language="tsx"
              showLineNumbers
              title={`${variant.id}.tsx`}
            >
              {variant.code}
            </CodeBlock>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
