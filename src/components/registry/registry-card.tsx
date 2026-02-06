import { useState, useRef, useEffect } from "react";
import type { RegistryItem } from "@/data/registry";
import { cn } from "@/lib/utils";

interface RegistryCardProps {
  item: RegistryItem;
  onClick: (item: RegistryItem) => void;
}

export function RegistryCard({ item, onClick }: RegistryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isHovered) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative cursor-pointer",
        "rounded-[24px] p-1 border border-border/60 bg-black/5 dark:bg-white/5 backdrop-blur-sm",
        "transition-all duration-300",
        "hover:border-border hover:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      <div className="flex items-center justify-between h-12 px-1">
        <div className="flex flex-col gap-1 p-1">
          <span className="text-xs text-muted-foreground">{item.name}</span>
          <span className="text-[10px] text-muted-foreground capitalize">{item.category}</span>
        </div>
      </div>
      {/* Preview */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-[20px] bg-muted border">
        {/* Static image */}
        <img
          src={item.image}
          alt={`${item.name} preview`}
          loading="lazy"
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            "transition-opacity duration-500 ease-out",
            isHovered && item.video ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Video preview */}
        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            muted
            loop
            playsInline
            preload="none"
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              "transition-opacity duration-500 ease-out",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />
        )}
      </div>
    </div>
  );
}
