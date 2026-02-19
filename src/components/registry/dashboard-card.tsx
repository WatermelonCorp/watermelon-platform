import { useEffect, useRef, useState } from "react";
import type { DashboardItem } from "@/data/dashboards";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, ShadcnSquareIcon } from "@/lib/hugeicons";
import { trackEvent } from "@/lib/analytics";
import { CopyButton } from "../animate-ui/components/buttons/copy";
import { Tooltip } from "../animate-ui/primitives/animate/tooltip";
import { TooltipContent, TooltipTrigger } from "../animate-ui/components/animate/tooltip";

interface DashboardCardProps {
  item: DashboardItem;
  onClick: (item: DashboardItem) => void;
  trackType?: "dashboard" | "block";
}

export function DashboardCard({ item, onClick, trackType = "dashboard" }: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

    if (isHovered && item.video) {
      video.currentTime = 0;
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [isHovered, item.video]);

  useEffect(() => {
    if (!isHovered) return;
    void item.preload?.();
  }, [isHovered, item]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(cliCommand);
      trackEvent("install_command_copy", {
        slug: item.slug,
        name: item.name,
        category: item.category,
        command: cliCommand,
        source: trackType === "block" ? "block_card" : "dashboard_card",
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
        if (item.comingSoon) return;
        const eventName = trackType === "block" ? "block_card_click" : "dashboard_card_click";
        trackEvent(eventName, {
          slug: item.slug,
          name: item.name,
        });
        void item.preload?.();
        onClick(item);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative",
        "rounded-[24px] p-1",
        // Light mode
        "bg-neutral-100/80 border border-neutral-200/80",
        // Dark mode
        "dark:bg-neutral-900/60 dark:border-white/10",
        // Backdrop blur
        "backdrop-blur-xl backdrop-saturate-150",
        // Inset shadow
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),inset_0_-1px_0_0_rgba(0,0,0,0.2)]",
        // Hover
        "transition-all duration-300",
        item.comingSoon
          ? "cursor-default opacity-60"
          : "cursor-pointer hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15),inset_0_1px_0_0_rgba(255,255,255,0.15)] dark:hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:border-neutral-300 dark:hover:border-white/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      {/* Inner highlight ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px]
        ring-1 ring-inset ring-white/30 dark:ring-white/5"
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between h-14 px-4 gap-3">
        {/* Left: Title & Category */}
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <span className="text-base font-semibold text-foreground truncate leading-tight">
            {item.name}
          </span>
          <span className="text-xs text-foreground/70 truncate capitalize">
            {trackType === "block" ? `${item.files.length} files • ${item.category}` : item.category}
          </span>
        </div>

        {/* Right: Actions or Status */}
        <div className="flex items-center gap-2 shrink-0">
          {!item.comingSoon && (
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
          )}

          {item.comingSoon ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-foreground/70">
              Coming Soon
            </span>
          ) : (
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs font-medium text-muted-foreground",
                "transition-all duration-200",
                "opacity-0 translate-x-1",
                "group-hover:opacity-100 group-hover:translate-x-0"
              )}
            >
              View
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className={cn(
        "relative aspect-video w-full overflow-hidden rounded-[20px]",
        "bg-muted",
        "border border-neutral-200/50 dark:border-white/5",
        "shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]",
        "dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]"
      )}>
        {/* Inner highlight */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[20px] 
          ring-1 ring-inset ring-white/20 dark:ring-white/5
          pointer-events-none z-10"
        />

        {/* Placeholder or image */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-neutral-50 dark:bg-neutral-900"
          )}
        >
          {item.image ? (
            <>
              <img
                src={item.image}
                srcSet={getImageSrcSet(item.image)}
                sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 96vw"
                alt={`${item.name} preview`}
                loading="lazy"
                decoding="async"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out",
                  item.video && isHovered ? "opacity-0" : "opacity-100"
                )}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {item.video && (
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
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ease-out",
                    isHovered && isVideoReady ? "opacity-100" : "opacity-0"
                  )}
                />
              )}
            </>
          ) : (
            <div className="text-center space-y-2 p-4">
              <div className="text-4xl">{trackType === "block" ? "🧩" : "📊"}</div>
              <p className="text-sm text-neutral-500 font-medium">{item.name}</p>
            </div>
          )}
        </div>

      </div>

      {/* Description */}
      <div className="relative z-10 px-4 py-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
}
