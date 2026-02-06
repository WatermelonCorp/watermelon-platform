import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function RegistryCardSkeleton() {
  return (
    <div
      className={cn(
        "rounded-[24px] p-1 border border-border/60 bg-black/5 dark:bg-white/5",
        "animate-pulse"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-12 px-1">
        <div className="flex flex-col gap-1.5 p-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      </div>

      {/* Preview image area */}
      <Skeleton className="aspect-4/3 w-full rounded-[20px]" />
    </div>
  );
}
