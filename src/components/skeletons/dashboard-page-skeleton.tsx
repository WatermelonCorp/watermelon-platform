import { Skeleton } from "@/components/ui/skeleton";

export function DashboardPageSkeleton() {
  return (
    <div className="hidden md:flex flex-col mb-10 animate-pulse">
      <div className="px-6 py-4 bg-background shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <Skeleton className="h-8 w-64" />
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-5 w-20 rounded" />
              </div>
            </div>
            <Skeleton className="h-4 w-96 mt-3" />
            <Skeleton className="h-4 w-72 mt-2" />

            <div className="mt-6 max-w-3xl">
              <Skeleton className="h-10 w-full max-w-md rounded-md" />
            </div>
            <div className="mt-6 space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-12 w-full max-w-2xl rounded-md" />
            </div>
          </div>
          <div className="flex items-center justify-center shrink-0">
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>
      </div>

      <div className="h-[90dvh] shrink-0 flex flex-col min-h-0 border rounded-xl overflow-hidden mt-4 mx-6">
        <div className="flex items-center justify-between px-6 py-2 border-b bg-muted/30 shrink-0 h-12">
          <div className="flex gap-4">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-28 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-32 rounded-md" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
        <div className="flex-1 bg-muted/5 flex items-center justify-center p-8">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
