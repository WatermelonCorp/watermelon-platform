import { CatalogPageHeader } from "@/components/layout/catalog-page-header";
import { DashboardCardSkeleton } from "@/components/registry/dashboard-card-skeleton";

interface DashboardsPageSkeletonProps {
  title?: string;
  description?: string;
}

export function DashboardsPageSkeleton({
  title = "Dashboards",
  description,
}: DashboardsPageSkeletonProps = {}) {
  return (
    <div className="space-y-12 pb-10">
      <section className="space-y-6">
        <CatalogPageHeader title={title} description={description} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 lg:px-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <DashboardCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function ShowcasesPageSkeleton() {
  return (
    <DashboardsPageSkeleton
      title="Showcases"
      description="Realistic page compositions built from existing Watermelon blocks. Each one is intentionally PR-friendly so the community can add more without inventing a new template system."
    />
  );
}

export function TemplatesPageSkeleton() {
  return (
    <DashboardsPageSkeleton
      title="Templates"
      description="Explore our collection of pre-built templates with complete layouts and ready-to-use components."
    />
  );
}
