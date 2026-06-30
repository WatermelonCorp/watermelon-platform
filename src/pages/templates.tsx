import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates } from '@/data/templates';
import { SEOHead } from '@/components/seo-head';
import { DashboardCard } from '@/components/registry/dashboard-card';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';

const ITEMS_PER_PAGE = 18;

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const visibleTemplates = useMemo(
    () => templates.slice(0, visibleCount),
    [visibleCount]
  );

  const hasMore = visibleTemplates.length < templates.length;

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, templates.length));
      },
      { rootMargin: '300px 0px 300px 0px' }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <>
      <SEOHead
        title="Templates"
        description="Explore our collection of pre-built templates with complete layouts and ready-to-use components."
        category="Templates"
      />

      <div className="space-y-12 pb-10">
        <section id="templates" className="space-y-6">
          <CatalogPageHeader
            title="Templates"
            description="Explore our collection of pre-built templates with complete layouts and ready-to-use components."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 lg:px-8 mt-4 md:mt-8">
            {visibleTemplates.map((item) => (
              <DashboardCard
                key={item.slug}
                item={item}
                onClick={(clicked) => {
                  if (!clicked.comingSoon) {
                    navigate(`/template/${clicked.slug}`);
                  }
                }}
              />
            ))}
          </div>

          {/* Infinite scroll sentinel */}
          {hasMore && (
            <div ref={loadMoreRef} className="h-16 flex items-center justify-center">
              <div className="h-5 w-5 border-2 border-muted-foreground/40 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </section>
      </div>
    </>
  );
}
