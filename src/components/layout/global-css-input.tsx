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
          className="text-white flex h-7 md:h-9 items-center justify-center gap-2
            rounded-lg border border-lime-600 px-2 transition-colors
            md:w-auto md:px-3 bg-linear-to-b from-primary/90 to-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),inset_4px_4px_0_0_rgba(255,255,255,0.06),inset_-4px_-4px_0_0_rgba(255,255,255,0.06),inset_6px_6px_0_0_rgba(255,255,255,0.04),inset_-6px_-6px_0_0_rgba(255,255,255,0.04),inset_8px_8px_0_0_rgba(255,255,255,0.02),inset_-8px_-8px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.06),0_4px_6px_0_rgba(0,0,0,0.04),0_6px_8px_0_rgba(0,0,0,0.02),0_2px_1px_0_rgba(0,0,0,0.04)] text-shadow-2xs text-shadow-lime-600/45
          "
        >
          <HugeiconsIcon icon={PaintBoardIcon} size={18} />
          <span className="hidden text-sm font-normal md:block">Add Custom Theme</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-background text-foreground border-border">
        <DialogHeader>
          <DialogTitle>Add Custom Theme CSS</DialogTitle>
          <DialogDescription>
            Input your custom Shadcn CSS variables below to preview how the <b>"Base"</b> components will seamlessly blend into your own application's unique design system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <textarea
            className="flex min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
            placeholder={`--background: 0 0% 100%;\n--foreground: 222.2 84% 4.9%;\n/* etc... */`}
            value={localCss}
            onChange={(e) => setLocalCss(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Apply Theme Variables</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
