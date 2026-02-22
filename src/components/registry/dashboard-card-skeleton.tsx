import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function DashboardCardSkeleton() {
  return (
    <div
      className={cn(
        "rounded-[24px] p-1",
        "bg-neutral-100/80 border border-neutral-200/80",
        "dark:bg-neutral-900/60 dark:border-white/10",
        "backdrop-blur-xl backdrop-saturate-150",
        "animate-pulse"
      )}
    >
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between h-14 px-4 gap-3">
        <div className="flex flex-col gap-1.5 min-w-0 flex-1 py-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Preview image area */}
      <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-muted border border-neutral-200/50 dark:border-white/5">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>

      {/* Description */}
      <div className="relative z-10 px-4 py-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}
