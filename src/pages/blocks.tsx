import { Link } from 'react-router-dom';
import { blockCategories } from '@/data/blocks';
import { SEOHead } from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 lg:px-8">
            {blockCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/blocks/${cat.slug}`}
                id={`block-category-${cat.slug}`}
                className={cn(
                  "group relative cursor-pointer no-underline block",
                  "rounded-4xl p-2",
                  "bg-gray-100",
                  "dark:bg-neutral-800 dark:border-0",
                  "backdrop-blur-xl backdrop-saturate-150",
                  "shadow-[inset_0_1px_0_0_var(--color-gray-200),inset_0_2px_0_0_rgba(255,255,255,1)]",
                  "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]",
                  "transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                )}
              >
                {/* Header */}
                <div className="relative z-10 flex items-center justify-between pt-2 pb-3 px-2 gap-4">
                  <span className="text-base font-medium text-foreground truncate leading-tight">
                    {cat.label}
                  </span>
                  <span className="text-sm text-muted-foreground capitalize">
                    {cat.count} {cat.count === 1 ? 'block' : 'blocks'}
                  </span>
                </div>

                {/* Preview */}
                <div className={cn(
                  "relative aspect-4/3 w-full overflow-hidden rounded-[20px]",
                  "bg-muted",
                  "border border-neutral-200/50 dark:border-white/5",
                  "shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]",
                  "dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]"
                )}>
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/20 dark:ring-white/5 pointer-events-none z-10"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-black transition-colors duration-300">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={`${cat.label} preview`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-center space-y-2 p-4">
                        <div className="text-4xl">🧩</div>
                        <p className="text-sm text-neutral-500 font-medium">{cat.label}</p>
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
