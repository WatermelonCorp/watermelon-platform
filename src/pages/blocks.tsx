import { Link } from 'react-router-dom';
import { blockCategories } from '@/data/block-metadata';
import { SEOHead } from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';
import { ResilientImage } from '@/components/ui/resilient-image';

export default function BlocksPage() {
  return (
    <>
      <SEOHead
        title="UI Blocks - Pre-built Sections"
        description="Browse our collection of pre-built UI blocks. Copy and paste beautiful hero sections, features, pricing, and more."
        category="UI Blocks"
      />

      <div className="space-y-12 pb-10">
        <section id="blocks" className="space-y-6">
          <CatalogPageHeader
            title="UI Blocks"
            description="Pre-built, copy-paste ready UI sections. Browse by category and drop them straight into your project."
          />

          <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3 lg:px-8">
            {blockCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/blocks/${cat.slug}`}
                id={`block-category-${cat.slug}`}
                className={cn(
                  'group relative block cursor-pointer no-underline',
                  'rounded-4xl p-2',
                  'bg-gray-100',
                  'dark:border-0 dark:bg-neutral-800',
                  'backdrop-blur-xl backdrop-saturate-150',
                  'shadow-[inset_0_1px_0_0_var(--color-gray-200),inset_0_2px_0_0_rgba(255,255,255,1)]',
                  'dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]',
                  'transition-all duration-300',
                  'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
                )}
              >
                {/* Header */}
                <div className="relative z-10 flex items-center justify-between gap-4 px-2 pt-2 pb-3">
                  <span className="text-foreground truncate text-base leading-tight font-medium">
                    {cat.label}
                  </span>
                  <span className="text-muted-foreground text-sm capitalize">
                    {cat.count} {cat.count === 1 ? 'block' : 'blocks'}
                  </span>
                </div>

                {/* Preview */}
                <div
                  className={cn(
                    'relative aspect-4/3 w-full overflow-hidden rounded-[20px]',
                    'bg-muted',
                    'border border-neutral-200/50 dark:border-white/5',
                    'shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]',
                    'dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]',
                  )}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-10 rounded-[20px] ring-1 ring-white/20 ring-inset dark:ring-white/5"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-white transition-colors duration-300 dark:bg-black">
                    {cat.image ? (
                      <ResilientImage
                        src={cat.image}
                        alt={`${cat.label} preview`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        fallback={
                          <div className="space-y-2 p-4 text-center">
                            <div className="text-4xl">🧩</div>
                            <p className="text-sm font-medium text-neutral-500">
                              {cat.label}
                            </p>
                          </div>
                        }
                      />
                    ) : (
                      <div className="space-y-2 p-4 text-center">
                        <div className="text-4xl">🧩</div>
                        <p className="text-sm font-medium text-neutral-500">
                          {cat.label}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
