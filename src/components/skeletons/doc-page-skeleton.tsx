import { Skeleton } from "@/components/ui/skeleton";

export function DocPageSkeleton() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      {/* Page title */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-5 w-full max-w-lg" />
      </div>

      {/* Content sections */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-48" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Code block placeholder */}
      <Skeleton className="h-40 w-full rounded-lg" />

      {/* More content */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-56" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
