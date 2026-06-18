import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { PaintBoardIcon, SourceCodeIcon } from '@/lib/hugeicons';
import { useThemeCss } from '@/contexts/theme-css-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
          className="from-primary/90 to-primary m-2 flex h-9 items-center justify-center gap-2 rounded-xl border border-lime-600 bg-linear-to-b px-2 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),inset_4px_4px_0_0_rgba(255,255,255,0.06),inset_-4px_-4px_0_0_rgba(255,255,255,0.06),inset_6px_6px_0_0_rgba(255,255,255,0.04),inset_-6px_-6px_0_0_rgba(255,255,255,0.04),inset_8px_8px_0_0_rgba(255,255,255,0.02),inset_-8px_-8px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.06),0_4px_6px_0_rgba(0,0,0,0.04),0_6px_8px_0_rgba(0,0,0,0.02),0_2px_1px_0_rgba(0,0,0,0.04)] transition-colors text-shadow-2xs text-shadow-lime-600/45 md:w-auto md:px-3"
        >
          <HugeiconsIcon icon={PaintBoardIcon} size={18} />
          <span className="hidden text-sm font-normal md:block">
            Add Custom Theme
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[95vh] w-[calc(100%-1rem)] max-w-4xl flex-col gap-0 overflow-hidden rounded-2xl border-neutral-200 bg-white p-0 shadow-2xl md:min-w-2xl lg:max-w-4xl dark:border-neutral-800 dark:bg-[#0a0a0a]">
        <div className="flex-1 overflow-y-auto p-4 pb-3 md:p-6 md:pb-5">
          <DialogHeader className="mb-4 pr-6">
            <DialogTitle className="text-lg font-semibold text-neutral-900 md:text-xl dark:text-white">
              Add Custom Theme CSS
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-500 dark:text-neutral-400">
              Paste your custom CSS variables below to preview components in
              your own design system.
            </DialogDescription>
          </DialogHeader>

          <div className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] transition-all duration-300 dark:bg-neutral-800 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)]">
            {/* Editor Header */}
            <div className="flex items-center justify-between rounded-t-2xl border-b border-black/5 bg-white/40 px-4 py-3 backdrop-blur-md dark:border-white/5 dark:bg-neutral-900/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg border border-black/5 bg-white p-1.5 shadow-sm dark:border-white/5 dark:bg-neutral-800">
                  <HugeiconsIcon
                    icon={SourceCodeIcon}
                    size={14}
                    className="text-muted-foreground"
                  />
                </div>
                <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  globals.css
                </span>
              </div>
            </div>

            <textarea
              className="flex h-[300px] w-full resize-none bg-white/50 px-4 py-4 font-mono text-xs leading-[1.6] text-neutral-800 placeholder:text-neutral-400 focus-visible:outline-none md:h-[400px] dark:bg-neutral-900/50 dark:text-neutral-200 dark:placeholder:text-neutral-600"
              placeholder={`@theme {\n  --color-background: oklch(1 0 0);\n  --color-foreground: oklch(0.145 0 0);\n  /* ... */\n}`}
              value={localCss}
              onChange={(e) => setLocalCss(e.target.value)}
              spellCheck={false}
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-3 border-t border-neutral-200 bg-neutral-50 px-4 py-3 md:px-6 md:py-4 dark:border-neutral-800 dark:bg-[#0f0f0f]">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="from-primary/90 to-primary bg-linear-to-b font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),inset_4px_4px_0_0_rgba(255,255,255,0.06),inset_-4px_-4px_0_0_rgba(255,255,255,0.06),inset_6px_6px_0_0_rgba(255,255,255,0.04),inset_-6px_-6px_0_0_rgba(255,255,255,0.04),inset_8px_8px_0_0_rgba(255,255,255,0.02),inset_-8px_-8px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.06),0_4px_6px_0_rgba(0,0,0,0.04),0_6px_8px_0_rgba(0,0,0,0.02),0_2px_1px_0_rgba(0,0,0,0.04)] transition-all text-shadow-2xs text-shadow-lime-600/45 active:scale-95"
          >
            Apply Theme Variables
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
