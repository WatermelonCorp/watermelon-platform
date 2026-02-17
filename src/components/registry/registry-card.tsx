import { useState, useRef, useEffect } from "react";
import type { RegistryItem } from "@/data/registry";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight, ShadcnSquareIcon } from "@/lib/hugeicons";
import { CopyButton } from "../animate-ui/components/buttons/copy";
import { Tooltip } from "../animate-ui/primitives/animate/tooltip";
import { TooltipContent, TooltipTrigger } from "../animate-ui/components/animate/tooltip";
import { trackEvent } from "@/lib/analytics";

interface RegistryCardProps {
  item: RegistryItem;
  onClick: (item: RegistryItem) => void;
  imagePriority?: boolean;
}

export function RegistryCard({ item, onClick, imagePriority = false }: RegistryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get the CLI command from item.install (same as component-modal)
  const cliCommand = item.install?.[0] || `npx shadcn@latest add ${item.slug}`;

  const getImageSrcSet = (src: string) => {
    if (!src.startsWith("http")) return undefined;
    const url = new URL(src);
    const supportsWidthParams =
      url.hostname.includes("images.unsplash.com") ||
      url.hostname.includes("assets.watermelon.sh");
    if (!supportsWidthParams) return undefined;

    const mk = (width: number) => {
      const sized = new URL(src);
      sized.searchParams.set("w", String(width));
      sized.searchParams.set("q", "75");
      sized.searchParams.set("format", "auto");
      return `${sized.toString()} ${width}w`;
    };

    return [mk(320), mk(480), mk(640), mk(960), mk(1280)].join(", ");
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari fix: ensure muted property is set on the DOM element
    video.muted = true;

    if (isHovered) {
      video.currentTime = 0;
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [isHovered]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(cliCommand);
      trackEvent("install_command_copy", {
        component_slug: item.slug,
        component_name: item.name,
        category: item.category,
        command: cliCommand,
        source: "card",
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        trackEvent("component_card_click", {
          component_slug: item.slug,
          component_name: item.name,
          category: item.category,
        });
        onClick(item);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative cursor-pointer",
        "rounded-[24px] p-1",
        // Light mode: subtle gray background with soft border
        "bg-neutral-100/80 border border-neutral-200/80",
        // Dark mode: darker glass with white border highlight
        "dark:bg-neutral-900/60 dark:border-white/10",
        // Backdrop blur for glass effect
        "backdrop-blur-xl backdrop-saturate-150",
        // Inset shadow for depth
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),inset_0_-1px_0_0_rgba(0,0,0,0.2)]",
        // Hover effects
        "transition-all duration-300",
        "hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15),inset_0_1px_0_0_rgba(255,255,255,0.15)]",
        "dark:hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        "hover:border-neutral-300 dark:hover:border-white/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      {/* Inner highlight ring for glass depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px]
        ring-1 ring-inset ring-white/30 dark:ring-white/5"
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between h-12 px-4 gap-3">
        {/* Left: Title & Category */}
        <div className="flex flex-col gap-0 min-w-0 flex-1">
          <span className="text-sm font-semibold text-foreground truncate leading-tight">
            {item.name}
          </span>
          <span className="text-[10px] text-foreground/70 capitalize">
            {item.category}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Copy CLI Command Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <CopyButton
                variant="outline"
                onClick={handleCopy}
                icon={<HugeiconsIcon icon={ShadcnSquareIcon} />}
                content={cliCommand}
                ariaLabel={`Copy install command for ${item.name}`}
                className="group-hover:-translate-x-1 translate-x-10 transition-all duration-300 ease-in-out"
              ></CopyButton>
            </TooltipTrigger>
            <TooltipContent>Copy CLI Command</TooltipContent>
          </Tooltip>
          {/* <motion.button
            layout
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={cn(
              "copy-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
              "border backdrop-blur-sm",
              "transition-all duration-200",
              "group-hover:-translate-x-1 translate-x-10",
              "active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
              isCopied
                ? "bg-primary/10 border-primary/20 text-primary"
                : "bg-background/80 border-border/60 hover:bg-background hover:border-border hover:shadow-sm"
            )}
            title={cliCommand}
          >
            {isCopied ? (
              <>
                <HugeiconsIcon icon={Check} className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Copied!</span>
              </>
            ) : (
              <>
                <HugeiconsIcon icon={Copy} className="h-3.5 w-3.5 text-muted-foreground [.copy-btn:hover_&]:text-foreground transition-colors" />
                <span className="text-xs font-medium text-muted-foreground [.copy-btn:hover_&]:text-foreground transition-colors">
                  Copy
                </span>
              </>
            )}
          </motion.button> */}


          {/* View hint - visible on hover */}
          <span
            className={cn(
              "flex items-center gap-0.5 text-[10px] font-medium text-muted-foreground",
              "transition-all duration-200",
              "opacity-0 translate-x-1",
              "group-hover:opacity-100 group-hover:translate-x-0"
            )}
          >
            View
            <HugeiconsIcon icon={ArrowUpRight} className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Preview */}
      <div className={cn(
        "relative aspect-4/3 w-full overflow-hidden rounded-[20px]",
        "bg-muted",
        // Border for definition
        "border border-neutral-200/50 dark:border-white/5",
        // Inset shadow for depth
        "shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]",
        "dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]"
      )}>
        {/* Inner highlight for glass edge */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[20px] 
          ring-1 ring-inset ring-white/20 dark:ring-white/5
          pointer-events-none z-10"
        />

        {/* Static image */}
        <img
          src={item.image}
          srcSet={getImageSrcSet(item.image)}
          sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 96vw"
          alt={`${item.name} preview`}
          loading={imagePriority ? "eager" : "lazy"}
          fetchPriority={imagePriority ? "high" : "auto"}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            "transition-opacity duration-500 ease-out",
            isHovered && item.video ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Video preview */}
        {item.video && (
          <>
            <video
              ref={videoRef}
              src={item.video}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              onCanPlayThrough={() => setIsVideoReady(true)}
              className={cn(
                "absolute inset-0 h-full w-full object-cover",
                "transition-opacity duration-100 ease-out",
                isHovered && isVideoReady ? "opacity-100" : "opacity-0"
              )}
            />
          </>
        )}

        {/* Bottom fade overlay */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16
          bg-linear-to-t from-black/20 to-transparent
          dark:from-black/40
          pointer-events-none z-10"
        />
      </div>
    </div>
  );
}
