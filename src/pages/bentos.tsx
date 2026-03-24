import { useState, useMemo, useRef, useEffect } from 'react';
import { bentos, type BentoItem } from '@/data/bentos';
import { SEOHead } from '@/components/seo-head';
import { BentoCard } from '@/components/registry/bento-card';
import { BentoModal } from '@/components/registry/bento-modal';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';

const ITEMS_PER_PAGE = 18;

export default function BentosPage() {
  const [selectedItem, setSelectedItem] = useState<BentoItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const visibleBentos = useMemo(
    () => bentos.slice(0, visibleCount),
    [visibleCount]
  );

  const hasMore = visibleBentos.length < bentos.length;

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, bentos.length));
      },
      { rootMargin: '300px 0px 300px 0px' }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <>
      <SEOHead
        title="Bentos"
        description="Explore our collection of pre-built bento grid templates with dynamic layouts and robust components."
        category="Bentos"
      />

      <div className="space-y-12 pb-10">
        <section id="bentos" className="space-y-6">
          <CatalogPageHeader
            title="Bentos"
          />


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleBentos.map((item) => (
              <BentoCard
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

        <BentoModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div >
    </>
  );
}
