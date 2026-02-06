import { Skeleton } from "@/components/ui/skeleton";

export function ComponentPageSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100dvh-14rem)] w-full overflow-hidden">
      {/* LEFT: DOCUMENTATION PANEL */}
      <div className="order-2 lg:order-1 w-full lg:w-[40%] xl:w-[38%] flex flex-col border-t lg:border-t-0 lg:border-r bg-background">
        <div className="flex-1 overflow-y-auto p-6 pt-16 lg:pt-20 space-y-6 lg:space-y-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-5 w-20" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-5 w-32" />
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>

          {/* Created by */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Installation */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-14 rounded-md" />
              ))}
            </div>
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>

          {/* How to use */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>

          {/* Dependencies */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-28" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-28 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: PREVIEW PANEL */}
      <div className="order-1 lg:order-2 flex-1 min-w-0 flex flex-col bg-muted/5">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 lg:px-4 py-2 border-b bg-background/80">
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>

        {/* Preview area */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <Skeleton className="w-full max-w-4xl h-[280px] lg:h-[400px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
