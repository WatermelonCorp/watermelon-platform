import { useEffect, useRef, useState } from "react";
import type { DashboardItem } from "@/data/dashboards";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@/lib/hugeicons";
import { trackEvent } from "@/lib/analytics";
import { MediaLoadingOverlay } from "./media-loading-overlay";

interface DashboardCardProps {
  item: DashboardItem;
  onClick: (item: DashboardItem) => void;
  trackType?: "dashboard" | "block";
}

export function DashboardCard({ item, onClick, trackType = "dashboard" }: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered && item.video && isVideoReady) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
      return;
    }
    videoRef.current.pause();
  }, [isHovered, isVideoReady, item.video]);

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
          <span className="text-xs text-foreground/70">
            {item.files.length} files • {item.dependencies?.length || 0} dependencies
          </span>
        </div>

        {/* Right: Status or View */}
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
            "bg-linear-to-br from-muted via-muted to-muted/50"
          )}
        >
          {item.image ? (
            <>
              <img
                src={item.image}
                alt={`${item.name} preview`}
                loading="lazy"
                decoding="async"
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-200",
                  item.video && isHovered && isVideoReady ? "opacity-0" : "opacity-100"
                )}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {item.video && (
                <>
                  <video
                    ref={videoRef}
                    src={item.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                    onLoadedData={() => setIsVideoReady(true)}
                    onCanPlay={() => setIsVideoReady(true)}
                    onLoadStart={() => setIsVideoReady(false)}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-200",
                      isHovered && isVideoReady ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {isHovered && !isVideoReady && <MediaLoadingOverlay />}
                </>
              )}
            </>
          ) : (
            <div className="text-center space-y-2 p-4">
              <div className="text-4xl">📊</div>
              <p className="text-sm text-muted-foreground font-medium">{item.name}</p>
            </div>
          )}
        </div>

        {/* Hover overlay */}
        {!item.comingSoon && (
          <div
            className={cn(
              "absolute inset-0 bg-black/40 flex items-center justify-center",
              "transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
              "z-20"
            )}
          >
            <span className="text-white font-medium text-sm flex items-center gap-1">
              View Dashboard
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4" />
            </span>
          </div>
        )}
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
