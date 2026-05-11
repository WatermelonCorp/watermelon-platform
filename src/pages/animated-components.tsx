import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { registry, allCategories } from '@/data/animated-components-registry';
import { SEOHead } from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';

export default function AnimatedComponentsPage() {
  // Build category data dynamically from the registry
  const categories = useMemo(() => {
    return allCategories.map((cat) => {
      const items = registry.filter((i) => i.category === cat);
      return {
        slug: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        count: items.length,
        description: `${items.length} animated ${cat} component${items.length !== 1 ? 's' : ''} ready to use.`,
        image: items.find((i) => i.image)?.image,
      };
    });
  }, []);

  return (
    <>
      <SEOHead
        title="Animated Components"
        description="Browse all Watermelon UI animated components. High-quality, customizable React components for modern web apps."
        category="Components"
      />

      <CatalogPageHeader
        title="Animated Components"
        description="High-quality animated React components. Browse by category or explore individual components."
      />

      <div className="flex w-full pb-10 px-4 md:px-6 lg:px-8 mt-4">
        <section id="animated-components" className="flex flex-col w-full gap-6 md:gap-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/animated-components/category/${cat.slug}`}
                id={`animated-category-${cat.slug}`}
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
                    {cat.count} {cat.count === 1 ? 'component' : 'components'}
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

                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={`${cat.label} preview`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
                      />
                    ) : (
                      <div className="text-center space-y-2 p-4">
                        <div className="text-4xl">✨</div>
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
