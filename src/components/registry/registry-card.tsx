import { useState, useRef, useEffect } from 'react';
import type { RegistryItem } from '@/data/registry';
import { cn } from '@/lib/utils';

interface RegistryCardProps {
  item: RegistryItem;
  onClick: (item: RegistryItem) => void;
}

export function RegistryCard({ item, onClick }: RegistryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Video play failed:', error);
        });
      }
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <div
      className="group relative cursor-pointer flex flex-col gap-3 rounded-xl border bg-card p-0 transition-all hover:shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(item)}
    >
      {/* Preview Area */}
      <div className="relative aspect-4/3 w-full bg-muted overflow-hidden rounded-t-xl">
        {/* Static Image */}
        <img
          src={item.image}
          alt={item.name}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            isHovered && item.video ? "opacity-0" : "opacity-100"
          )}
          loading="lazy"
        />

        {/* Video Preview */}
        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            muted
            loop
            playsInline
            preload="none"
          />
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 pt-0">
        <div className="flex items-center justifying-between mb-1">
          <h3 className="font-semibold tracking-tight text-lg">{item.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
}
