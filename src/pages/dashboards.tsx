import { useState, useMemo, useRef, useEffect } from 'react';
import { dashboards, type DashboardItem } from '@/data/dashboards';
import { SEOHead } from '@/components/seo-head';
import { DashboardCard } from '@/components/registry/dashboard-card';
import { DashboardModal } from '@/components/registry/dashboard-modal';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';

const ITEMS_PER_PAGE = 18;

export default function DashboardsPage() {
  const [selectedItem, setSelectedItem] = useState<DashboardItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const visibleDashboards = useMemo(
    () => dashboards.slice(0, visibleCount),
    [visibleCount]
  );

  const hasMore = visibleDashboards.length < dashboards.length;

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, dashboards.length));
      },
      { rootMargin: '300px 0px 300px 0px' }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <>
      <SEOHead
        title="Dashboard Templates"
        description="Explore our collection of pre-built dashboard templates with charts, tables, and analytics components."
        category="Dashboards"
      />

      <div className="space-y-12">
        <section id="dashboards" className="space-y-6">
          <CatalogPageHeader
            title="Dashboards"
          />


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleDashboards.map((item) => (
              <DashboardCard
                key={item.slug}
                item={item}
                onClick={(item) => setSelectedItem(item)}
              />
            ))}
          </div>

          {/* Infinite scroll sentinel */}
          {hasMore && (
            <div ref={loadMoreRef} className="h-16 flex items-center justify-center">
              <div className="h-5 w-5 border-2 border-muted-foreground/40 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </section >

        <DashboardModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div >
    </>
  );
}
