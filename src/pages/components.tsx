import { useEffect, useMemo, useRef, useState } from 'react';
import { registry, type RegistryItem } from '@/data/registry';
import { SEOHead } from '@/components/seo-head';
import { RegistryCard } from '@/components/registry/registry-card';
import { ComponentModal } from '@/components/registry/component-modal';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';

const ITEMS_PER_PAGE = 18;

export default function ComponentsPage() {
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const sortedItems = useMemo(
    () => [...registry].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );
  const visibleItems = useMemo(
    () => sortedItems.slice(0, visibleCount),
    [sortedItems, visibleCount]
  );
  const hasMore = visibleItems.length < sortedItems.length;

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, sortedItems.length));
      },
      { rootMargin: '300px 0px 300px 0px' }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, sortedItems.length]);

  return (
    <>
      <SEOHead
        title="All Components"
        description="Browse all Watermelon UI components. High-quality, customizable React components for modern web apps."
        category="Components"
      />

      <div className="space-y-12 mb-10">
        <section id="components" className="space-y-6">
          <CatalogPageHeader
            title="All Components"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.map((item) => (
              <RegistryCard
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
        </section>

        <ComponentModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </>
  );
}
