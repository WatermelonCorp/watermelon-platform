import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlocksByCategory, hasBlockCategory, blockCategories } from '@/data/blocks';
import { ComponentRenderCard } from '@/components/registry/component-render-card';
import { useSidebar } from '@/components/ui/sidebar';
import { SEOHead } from '@/components/seo-head';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';

const ITEMS_PER_PAGE = 18;

export default function BlockCategoryPage() {
  const navigate = useNavigate();
  const { setOpenMobile, setOpen, isMobile } = useSidebar();
  const { category = '' } = useParams<{ category: string }>();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [prevCategory, setPrevCategory] = useState(category);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  if (category !== prevCategory) {
    setPrevCategory(category);
    setVisibleCount(ITEMS_PER_PAGE);
  }

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
          <CatalogPageHeader
            title={label}
            description={
              <>
                {description}
                <span className="ml-2 text-xs text-muted-foreground/60">
                  {allBlocks.length} {allBlocks.length === 1 ? 'block' : 'blocks'}
                </span>
              </>
            }
          />

          {/* Blocks Grid */}
          <div className="flex flex-col gap-6 px-4 md:px-6 lg:px-8">
            {visibleBlocks.map((block) => (
              <ComponentRenderCard
                key={block.slug}
                item={block}
                onClick={() => {
                  if (!block.comingSoon) {
                    navigate(`/block/${block.slug}`);
                    if (isMobile) {
                      setOpenMobile(false);
                    } else {
                      setOpen(false);
                    }
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

          {/* Empty State */}
          {allBlocks.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No blocks in this category yet. Check back soon!
            </div>
          )}
        </section>
      </div>
    </>
  );
}