import { CatalogPageHeader } from "@/components/layout/catalog-page-header";
import { DashboardCardSkeleton } from "@/components/registry/dashboard-card-skeleton";

export function DashboardsPageSkeleton() {
  return (
    <div className="space-y-12 pb-10">
      <section className="space-y-6">
        <CatalogPageHeader title="Dashboards" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <DashboardCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
