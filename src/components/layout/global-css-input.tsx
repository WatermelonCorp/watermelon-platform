import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PaintBoardIcon, SourceCodeIcon } from "@/lib/hugeicons";
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

  const handleOpenChange = (open: boolean) => {
    if (open) setLocalCss(customGlobalCss);
    setIsOpen(open);
  };

  const handleSave = () => {
    setCustomGlobalCss(localCss);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          title="Global CSS Theme"
          className="text-white flex h-9 items-center justify-center gap-2 m-2
            rounded-xl border border-lime-600 px-2 transition-colors
            md:w-auto md:px-3 bg-linear-to-b from-primary/90 to-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),inset_4px_4px_0_0_rgba(255,255,255,0.06),inset_-4px_-4px_0_0_rgba(255,255,255,0.06),inset_6px_6px_0_0_rgba(255,255,255,0.04),inset_-6px_-6px_0_0_rgba(255,255,255,0.04),inset_8px_8px_0_0_rgba(255,255,255,0.02),inset_-8px_-8px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.06),0_4px_6px_0_rgba(0,0,0,0.04),0_6px_8px_0_rgba(0,0,0,0.02),0_2px_1px_0_rgba(0,0,0,0.04)] text-shadow-2xs text-shadow-lime-600/45
          "
        >
          <HugeiconsIcon icon={PaintBoardIcon} size={18} />
          <span className="hidden text-sm font-normal md:block">Add Custom Theme</span> 
        </button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-1rem)] max-h-[95vh] flex flex-col max-w-4xl md:min-w-2xl lg:max-w-4xl p-0 overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-2xl gap-0">
        <div className="p-4 md:p-6 pb-3 md:pb-5 overflow-y-auto flex-1">
          <DialogHeader className="mb-4 pr-6">
            <DialogTitle className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
              Add Custom Theme CSS
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-500 dark:text-neutral-400">
              Paste your custom CSS variables below to preview components in your own design system.
            </DialogDescription>
          </DialogHeader>

          <div className="group relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] transition-all duration-300">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 dark:border-white/5 rounded-t-2xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="bg-white dark:bg-neutral-800 p-1.5 rounded-lg shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-center">
                  <HugeiconsIcon icon={SourceCodeIcon} size={14} className="text-muted-foreground" />
                </div>
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  globals.css
                </span>
              </div>
            </div>
            
            <textarea
              className="flex h-[300px] md:h-[400px] w-full resize-none bg-white/50 dark:bg-neutral-900/50 px-4 py-4 text-xs font-mono text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus-visible:outline-none leading-[1.6]"
              placeholder={`@theme {\n  --color-background: oklch(1 0 0);\n  --color-foreground: oklch(0.145 0 0);\n  /* ... */\n}`}
              value={localCss}
              onChange={(e) => setLocalCss(e.target.value)}
              spellCheck={false}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-4 md:px-6 py-3 md:py-4 bg-neutral-50 dark:bg-[#0f0f0f] border-t border-neutral-200 dark:border-neutral-800 shrink-0">
          <Button 
            variant="ghost" 
            onClick={() => setIsOpen(false)}
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="font-medium transition-all active:scale-95 bg-linear-to-b from-primary/90 to-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),inset_4px_4px_0_0_rgba(255,255,255,0.06),inset_-4px_-4px_0_0_rgba(255,255,255,0.06),inset_6px_6px_0_0_rgba(255,255,255,0.04),inset_-6px_-6px_0_0_rgba(255,255,255,0.04),inset_8px_8px_0_0_rgba(255,255,255,0.02),inset_-8px_-8px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.06),0_4px_6px_0_rgba(0,0,0,0.04),0_6px_8px_0_rgba(0,0,0,0.02),0_2px_1px_0_rgba(0,0,0,0.04)] text-shadow-2xs text-shadow-lime-600/45"
          >
            Apply Theme Variables
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
