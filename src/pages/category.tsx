import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { registry, type RegistryItem } from '@/data/registry';
import { RegistryCard } from '@/components/registry/registry-card';
import { ComponentModal } from '@/components/registry/component-modal';
import { SEOHead } from '@/components/seo-head';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';

const ITEMS_PER_PAGE = 18;

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = useMemo(() => {
    if (!category) return [];
    return registry
      .filter(item => item.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [category]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount]
  );

  const hasMore = visibleItems.length < filteredItems.length;

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length));
      },
      { rootMargin: '300px 0px 300px 0px' }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, filteredItems.length]);

  const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';

  if (filteredItems.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Category not found</h2>
        <p className="text-muted-foreground">No components found for this category.</p>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={`${title} Components`}
        description={`Browse our collection of ${title} components. High-quality, customizable React components for your next project.`}
        category={title}
      />

      <CatalogPageHeader
        title={title}
      />
      <div className="space-y-12">

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

        <ComponentModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </>
  );
}
