import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlocksByCategory, hasBlockCategory, blockCategories } from '@/data/blocks';
import { ComponentRenderCard } from '@/components/registry/component-render-card';
import { BlockImageCard } from '@/components/registry/block-image-card';
import { SEOHead } from '@/components/seo-head';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';
import { getBlockPreviewImageUrl } from '@/data/block-preview-images';
import { LayoutGridIcon, RectangleHorizontalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 18;

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = 'cards' | 'images';

// ─── View Mode Toggle ─────────────────────────────────────────────────────────

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Switch view mode"
      className="bg-muted/60 border-input/30 flex items-center gap-px rounded-lg border p-0.5"
    >
      <button
        type="button"
        onClick={() => onChange('images')}
        aria-label="Image grid view"
        aria-pressed={value === 'images'}
        title="Image grid view"
        className={cn(
          'flex size-8 items-center justify-center rounded-md transition-all duration-150',
          value === 'images'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <LayoutGridIcon size={16} />
      </button>
      <button
        type="button"
        onClick={() => onChange('cards')}
        aria-label="Card view"
        aria-pressed={value === 'cards'}
        title="Card view"
        className={cn(
          'flex size-8 items-center justify-center rounded-md transition-all duration-150',
          value === 'cards'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <RectangleHorizontalIcon size={16} />
      </button>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function BlockCategoryPage() {
  const navigate = useNavigate();
  const { category = '' } = useParams<{ category: string }>();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [prevCategory, setPrevCategory] = useState(category);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [scrollTargetSlug, setScrollTargetSlug] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  // ── Infinite scroll for card mode ───────────────────────────────────────────

  useEffect(() => {
    if (viewMode !== 'cards' || !hasMore || !loadMoreRef.current) return;

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
  }, [viewMode, hasMore, allBlocks.length]);

  // ── Scroll to target card after switching from image mode ───────────────────

  useEffect(() => {
    if (viewMode !== 'cards' || !scrollTargetSlug || !containerRef.current) return;

    // Use requestAnimationFrame to wait for the DOM to update after mode switch
    const rafId = requestAnimationFrame(() => {
      const targetEl = containerRef.current?.querySelector<HTMLElement>(
        `[data-block-slug="${scrollTargetSlug}"]`
      );
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setScrollTargetSlug(null);
    });

    return () => cancelAnimationFrame(rafId);
  }, [viewMode, scrollTargetSlug]);

  // ── Handler: image card clicked → switch to cards + scroll ──────────────────

  const handleImageCardClick = useCallback((blockSlug: string) => {
    // Ensure enough cards are loaded so the target card is rendered
    const targetIndex = allBlocks.findIndex((b) => b.slug === blockSlug);
    if (targetIndex >= 0) {
      setVisibleCount((prev) => Math.max(prev, targetIndex + 1));
    }
    setScrollTargetSlug(blockSlug);
    setViewMode('cards');
  }, [allBlocks]);

  // ── Not found state ─────────────────────────────────────────────────────────

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

      <div className="space-y-12 pb-10" ref={containerRef}>
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
            actions={<ViewModeToggle value={viewMode} onChange={setViewMode} />}
          />

          {/* ── Image Grid Mode ──────────────────────────────────────────── */}
          {viewMode === 'images' && (
            <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:px-6 lg:grid-cols-4 lg:px-8">
              {allBlocks.map((block) => {
                const imageUrl = getBlockPreviewImageUrl(block.category, block.slug);
                if (!imageUrl) return null;
                return (
                  <BlockImageCard
                    key={block.slug}
                    block={block}
                    imageUrl={imageUrl}
                    onClick={() => handleImageCardClick(block.slug)}
                  />
                );
              })}
            </div>
          )}

          {/* ── Card Mode ────────────────────────────────────────────────── */}
          {viewMode === 'cards' && (
            <>
              <div className="flex flex-col gap-6 px-4 md:px-6 lg:px-8">
                {visibleBlocks.map((block) => (
                  <div key={block.slug} data-block-slug={block.slug}>
                    <ComponentRenderCard
                      item={block}
                      onClick={() => {
                        if (!block.comingSoon) {
                          navigate(`/block/${block.slug}`);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Infinite scroll sentinel */}
              {hasMore && (
                <div ref={loadMoreRef} className="h-16 flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-muted-foreground/40 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </>
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