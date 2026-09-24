import { Skeleton } from "@/components/ui/skeleton";

export function HomePageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-4 pb-12">
      {Array.from({ length: 4 }).map((_, sectionIndex) => (
        <section key={sectionIndex} className="flex flex-col gap-4 px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-5 w-16" />
          </div>

          <div className="no-scrollbar flex gap-4 md:gap-5 overflow-hidden py-1">
            {Array.from({ length: 4 }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="w-[280px] sm:w-[320px] shrink-0 rounded-3xl border border-neutral-200/60 dark:border-white/5 bg-gray-100 dark:bg-neutral-800 p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-12 rounded-full" />
                </div>
                <Skeleton className="aspect-4/3 w-full rounded-[20px]" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
