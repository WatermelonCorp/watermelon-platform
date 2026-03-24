import { CatalogPageHeader } from "@/components/layout/catalog-page-header";
import { BentoCardSkeleton } from "@/components/registry/bento-card-skeleton";

export function BentosPageSkeleton() {
  return (
    <div className="space-y-12 pb-10">
      <section className="space-y-6">
        <CatalogPageHeader title="Bentos" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <BentoCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
