import { useState, useMemo, useRef, useEffect } from 'react';
import { blocks } from '@/data/blocks';
import { DashboardCard } from '@/components/registry/dashboard-card';
import { BlockModal } from '@/components/registry/block-modal';
import type { BlockItem } from '@/data/blocks';
import { SEOHead } from '@/components/seo-head';


const ITEMS_PER_PAGE = 18;

export default function BlocksPage() {
  const [selectedBlock, setSelectedBlock] = useState<BlockItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const visibleBlocks = useMemo(
    () => blocks.slice(0, visibleCount),
    [visibleCount]
  );

  const hasMore = visibleBlocks.length < blocks.length;

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, blocks.length));
      },
      { rootMargin: '300px 0px 300px 0px' }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <>
      <SEOHead
        title="UI Blocks - Pre-built Sections"
        description="Browse our collection of pre-built UI blocks. Copy and paste beautiful hero sections, features, pricing, and more."
        category="UI Blocks"
      />

      <div className="px-2 md:px-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-medium tracking-tight">UI Blocks</h1>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
            Pre-built UI sections ready to drop into your projects. Each block is fully customizable and responsive.
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
        {blocks.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No blocks available yet. Check back soon!
          </div>
        )}
      </div>

      {/* Block Modal */}
      <BlockModal
        item={selectedBlock}
        onClose={() => setSelectedBlock(null)}
      />
    </>
  );
}
