import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PaintBoardIcon } from "@/lib/hugeicons";
import { useThemeCss } from "@/contexts/theme-css-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function GlobalCssInput() {
  const { customGlobalCss, setCustomGlobalCss } = useThemeCss();
  const [localCss, setLocalCss] = useState(customGlobalCss);
  const [isOpen, setIsOpen] = useState(false);

  // Sync state if context changes externally
  useEffect(() => {
    setLocalCss(customGlobalCss);
  }, [customGlobalCss]);

  const handleSave = () => {
    setCustomGlobalCss(localCss);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          title="Global CSS Theme"
          className="text-white flex h-9 items-center justify-center gap-2
            rounded-xl border border-lime-600 px-2 transition-colors
            md:w-auto md:px-3 bg-linear-to-b from-primary/90 to-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),inset_4px_4px_0_0_rgba(255,255,255,0.06),inset_-4px_-4px_0_0_rgba(255,255,255,0.06),inset_6px_6px_0_0_rgba(255,255,255,0.04),inset_-6px_-6px_0_0_rgba(255,255,255,0.04),inset_8px_8px_0_0_rgba(255,255,255,0.02),inset_-8px_-8px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.06),0_4px_6px_0_rgba(0,0,0,0.04),0_6px_8px_0_rgba(0,0,0,0.02),0_2px_1px_0_rgba(0,0,0,0.04)] text-shadow-2xs text-shadow-lime-600/45
          "
        >
          <HugeiconsIcon icon={PaintBoardIcon} size={18} />
          <span className="hidden text-sm font-normal md:block">Add Custom Theme</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl md:min-w-4xl p-0 overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] shadow-2xl sm:rounded-2xl gap-0">
        <div className="p-6 pb-5">
          <DialogHeader className="mb-5">
            <DialogTitle className="text-xl font-semibold text-neutral-900 dark:text-white">
              Add Custom Theme CSS
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-500 dark:text-neutral-400">
              Paste your custom CSS variables below to preview components in your own design system.
            </DialogDescription>
          </DialogHeader>

          <div className="group relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#0f0f0f] focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-300 shadow-sm">
            {/* Mock Editor Header */}
            <div className="flex items-center px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-[#0a0a0a]/50 rounded-t-xl">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              <span className="ml-4 text-xs font-mono text-neutral-500">globals.css</span>
            </div>
            
            <textarea
              className="flex min-h-[400px] w-full resize-none bg-transparent px-4 py-4 text-sm font-mono text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus-visible:outline-none leading-relaxed"
              placeholder={`@theme {\n  --color-background: oklch(1 0 0);\n  --color-foreground: oklch(0.145 0 0);\n  /* ... */\n}`}
              value={localCss}
              onChange={(e) => setLocalCss(e.target.value)}
              spellCheck={false}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-neutral-50 dark:bg-[#0f0f0f] border-t border-neutral-200 dark:border-neutral-800">
          <Button 
            variant="ghost" 
            onClick={() => setIsOpen(false)}
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-95"
          >
            Apply Theme Variables
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
