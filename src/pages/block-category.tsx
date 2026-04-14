import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlocksByCategory, hasBlockCategory, blockCategories } from '@/data/blocks';
import { DashboardCard } from '@/components/registry/dashboard-card';
import { BlockModal } from '@/components/registry/block-modal';
import type { BlockItem } from '@/data/blocks';
import { SEOHead } from '@/components/seo-head';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';

const ITEMS_PER_PAGE = 18;

export default function BlockCategoryPage() {
  const { category = '' } = useParams<{ category: string }>();
  const [selectedBlock, setSelectedBlock] = useState<BlockItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const exists = hasBlockCategory(category);
  const meta = blockCategories.find((c) => c.slug === category);
  const allBlocks = useMemo(() => getBlocksByCategory(category), [category]);

  const label = meta?.label ?? category.charAt(0).toUpperCase() + category.slice(1);
  const description = meta?.description ?? `${label} block variants.`;

  const visibleBlocks = useMemo(
    () => allBlocks.slice(0, visibleCount),
    [allBlocks, visibleCount]
  );

  const hasMore = visibleBlocks.length < allBlocks.length;

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, allBlocks.length));
      },
      { rootMargin: '300px 0px 300px 0px' }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, allBlocks.length]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [category]);

  if (!exists) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <p className="text-lg font-semibold">Category not found</p>
        <p className="text-sm text-muted-foreground">
          "{category}" doesn't exist in the blocks registry yet.
        </p>
        <Link to="/blocks" className="text-primary text-sm underline underline-offset-4">
          ← Back to Blocks
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${label} - UI Blocks`}
        description={description}
        category="UI Blocks"
      />

      <div className="space-y-12 pb-10">
        <section id={`blocks-${category}`} className="space-y-6">
          <div className=" mt-2 md:mt-0 space-y-1">
            <CatalogPageHeader title={label} />
            <p className="text-sm text-muted-foreground max-w-xl px-2 md:px-4">
              {description}
              <span className="ml-2 text-xs text-muted-foreground/60">
                {allBlocks.length} {allBlocks.length === 1 ? 'block' : 'blocks'}
              </span>
            </p>
          </div>

          {/* Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleBlocks.map((block) => (
              <DashboardCard
                key={block.slug}
                item={block}
                trackType="block"
                onClick={() => !block.comingSoon && setSelectedBlock(block)}
              />
            ))}
          </div>

          {/* Infinite scroll sentinel */}
          {hasMore && (
            <div ref={loadMoreRef} className="h-16 flex items-center justify-center">
              <div className="h-5 w-5 border-2 border-muted-foreground/40 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Empty State */}
          {allBlocks.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No blocks in this category yet. Check back soon!
            </div>
          )}
        </section>
      </div>

      {/* Block Modal */}
      <BlockModal
        item={selectedBlock}
        onClose={() => setSelectedBlock(null)}
      />
    </>
  );
}
