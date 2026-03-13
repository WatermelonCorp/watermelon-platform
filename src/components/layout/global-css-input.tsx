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
          className="
            border-input/50 bg-background hover:bg-accent
            text-muted-foreground hover:text-foreground
            flex h-8 md:h-10 items-center justify-center gap-2
            rounded-lg border px-2 transition-colors
            md:w-auto md:px-3
          "
        >
          <HugeiconsIcon icon={PaintBoardIcon} size={18} />
          <span className="hidden text-sm md:block">Theme CSS</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-background text-foreground border-border">
        <DialogHeader>
          <DialogTitle>Inject Global CSS</DialogTitle>
          <DialogDescription>
            Paste your custom Shadcn CSS variables here. This will apply exclusively to the <b>"Tailwind Base"</b> preview rendering of the components to test how they look in your app's theme.
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
