import { Skeleton } from "@/components/ui/skeleton";
import { RegistryCardSkeleton } from "@/components/registry/registry-card-skeleton";

export function HomePageSkeleton() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-36" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <RegistryCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
