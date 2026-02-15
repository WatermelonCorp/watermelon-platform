import { Skeleton } from "@/components/ui/skeleton";

export function DocPageSkeleton() {
  return (
    <article className="relative mr-auto w-full max-w-4xl px-2 sm:px-6 md:px-10 pb-24">
      <header className="md:pt-4 pb-2 border-b border-border space-y-4">
        <Skeleton className="h-8 md:h-9 w-56 md:w-72" />
        <div className="space-y-2 max-w-2xl">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[85%]" />
        </div>
      </header>

      <section className="py-2 md:py-4 border-b border-border">
        <Skeleton className="h-7 w-44 mb-4" />
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>
      </section>

      <section className="py-2 md:py-4 border-b border-border">
        <Skeleton className="h-7 w-52 mb-4" />
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
          </div>
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </section>

      <section className="py-2 md:py-4">
        <Skeleton className="h-7 w-40 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </section>
    </article>
  );
}
