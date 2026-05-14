import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { registry, allCategories } from '@/data/animated-components-registry';
import { SEOHead } from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@/lib/hugeicons';

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

      <div className="space-y-12 pb-10">
        <section id="animated-components" className="space-y-6">
          <div className="space-y-1.5 px-2 md:px-4">
            <h1 className="text-2xl font-semibold tracking-tight">Animated Components</h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              High-quality animated React components. Browse by category or explore individual components.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/animated-components/category/${cat.slug}`}
                id={`animated-category-${cat.slug}`}
                className={cn(
                  "group relative",
                  "rounded-[24px] p-1",
                  "bg-neutral-100/80 border border-neutral-200/80",
                  "dark:bg-neutral-900/60 dark:border-white/10",
                  "backdrop-blur-xl backdrop-saturate-150",
                  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
                  "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),inset_0_-1px_0_0_rgba(0,0,0,0.2)]",
                  "transition-all duration-300",
                  "cursor-pointer hover:border-neutral-300 dark:hover:border-white/20",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  "no-underline"
                )}
              >
                {/* Inner highlight ring */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[24px]
                  ring-1 ring-inset ring-white/30 dark:ring-white/5"
                />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between h-14 px-4 gap-3">
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-base font-semibold text-foreground truncate leading-tight">
                      {cat.label}
                    </span>
                    <span className="text-xs text-foreground/70 truncate">
                      {cat.count} {cat.count === 1 ? 'component' : 'components'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        "flex items-center gap-0.5 text-xs font-medium text-muted-foreground",
                        "transition-all duration-200",
                        "opacity-0 translate-x-1",
                        "group-hover:opacity-100 group-hover:translate-x-0"
                      )}
                    >
                      View
                      <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {/* Preview */}
                <div className={cn(
                  "relative aspect-video w-full overflow-hidden rounded-[20px]",
                  "bg-muted",
                  "border border-neutral-200/50 dark:border-white/5",
                  "shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]",
                  "dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]"
                )}>
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[20px]
                    ring-1 ring-inset ring-white/20 dark:ring-white/5
                    pointer-events-none z-10"
                  />

                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center",
                      "bg-neutral-50 dark:bg-neutral-900"
                    )}
                  >
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={`${cat.label} preview`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center space-y-2 p-4">
                        <div className="text-4xl">✨</div>
                        <p className="text-sm text-neutral-500 font-medium">{cat.label}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="relative z-10 px-4 py-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
