import type { DashboardItem } from "@/data/dashboards";
import type { BlockItem } from "@/data/blocks";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface DashboardCardProps {
  item: DashboardItem | BlockItem;
  onClick: (item: any) => void;
  trackType?: "dashboard" | "block";
}

export function DashboardCard({ item, onClick, trackType = "dashboard" }: DashboardCardProps) {
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
        if ('preload' in item) {
          void item.preload?.();
        }
        onClick(item);
      }}
      onMouseEnter={() => {
        if ('preload' in item) {
          void item.preload?.();
        }
      }}
      className={cn(
        "group relative block",
        "rounded-4xl p-2",
        "bg-gray-100",
        "dark:bg-neutral-800 dark:border-0",
        "backdrop-blur-xl backdrop-saturate-150",
        "shadow-[inset_0_1px_0_0_var(--color-gray-200),inset_0_2px_0_0_rgba(255,255,255,1)]",
        "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]",
        "transition-all duration-300",
        item.comingSoon
          ? "cursor-default opacity-60"
          : "cursor-pointer hover:border-neutral-300 dark:hover:border-white/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pt-2 pb-3 px-2 gap-4">
        <span className="text-base font-medium text-foreground truncate leading-tight">
          {item.name}
        </span>
        
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm text-muted-foreground capitalize">
            {trackType === "block" ? `${item.files.length} files • ${item.category}` : item.category}
          </span>
          {item.comingSoon && (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-foreground/70">
              Coming Soon
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
        <div
          aria-hidden
          className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/20 dark:ring-white/5 pointer-events-none z-10"
        />

        {/* Placeholder or image */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-white dark:bg-black transition-colors duration-300"
          )}
        >
          {item.image ? (
              <img
                src={item.image}
                srcSet={getImageSrcSet(item.image)}
                sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 96vw"
                alt={`${item.name} preview`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
          ) : (
            <div className="text-center space-y-2 p-4">
              <div className="text-4xl">{trackType === "block" ? "🧩" : "📊"}</div>
              <p className="text-sm text-neutral-500 font-medium">{item.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
