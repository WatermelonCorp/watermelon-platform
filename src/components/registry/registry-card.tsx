import { useState, useRef, useEffect, memo } from "react";
import type { RegistryItem } from "@/data/animated-components-registry";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface RegistryCardProps {
  item: RegistryItem;
  onClick: (item: RegistryItem) => void;
  imagePriority?: boolean;
}
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

export const RegistryCard = memo(function RegistryCard({ item, onClick, imagePriority = false }: RegistryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get the CLI command from item.install (same as component-modal)
  // const cliCommand = item.install?.[0] || `npx shadcn@latest add ${item.slug}`;



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

  // const handleCopy = async (e: React.MouseEvent) => {
  //   e.stopPropagation();

  //   try {
  //     await navigator.clipboard.writeText(cliCommand);
  //     trackEvent("install_command_copy", {
  //       component_slug: item.slug,
  //       component_name: item.name,
  //       category: item.category,
  //       command: cliCommand,
  //       source: "card",
  //     });
  //   } catch (err) {
  //     console.error("Failed to copy:", err);
  //   }
  // };

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
        "rounded-4xl p-2",
        // Light mode: subtle gray background with soft border
        "bg-gray-100",
        // Dark mode: darker glass with white border highlight
        "dark:bg-neutral-800 dark:border-0",
        // Backdrop blur for glass effect
        "backdrop-blur-xl backdrop-saturate-150",
        // Inset shadow for depth
        "shadow-[inset_0_1px_0_0_var(--color-gray-200),inset_0_2px_0_0_rgba(255,255,255,1)]",
        "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]",
        "transition-all duration-300",
      )}
    >
      {/* Inner highlight ring for glass depth */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl
        ring-1 ring-inset ring-white/30 dark:ring-white/5"
      /> */}

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pt-2 pb-3 px-2 gap-4">
        {/* Left: Title & Category */}

        <span className="text-base font-medium text-foreground truncate leading-tight">
          {item.name}
        </span>
        <span className="text-sm text-muted-foreground capitalize">
          {item.category}
        </span>


        {/* View hint - visible on hover */}
        {/* <span
          className={cn(
            "flex items-center text-sm font-medium text-muted-foreground",
            "transition-all duration-200",
          )}
        >
          <HugeiconsIcon icon={ArrowUpRight} className="h-4.5 w-4.5 group-hover:text-primary group-hover:scale-125 transition-all duration-300" />
        </span> */}

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
              preload="none"
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
        {/* <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16
          bg-linear-to-t from-black/20 to-transparent
          dark:from-black/40
          pointer-events-none z-10"
        /> */}
      </div>
    </div>
  );
})
