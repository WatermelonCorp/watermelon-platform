import { Link } from 'react-router-dom';
import { showcases } from '@/data/showcases';
import { SEOHead } from '@/components/seo-head';
import { CatalogPageHeader } from '@/components/layout/catalog-page-header';
import { cn } from '@/lib/utils';
import { ResilientImage } from '@/components/ui/resilient-image';

export default function ShowcasesPage() {
  return (
    <>
      <SEOHead
        title="Showcases"
        description="Curated page compositions built from existing Watermelon UI blocks. Explore realistic section stacks and contribute your own by pull request."
        category="Showcases"
      />

      <div className="space-y-12 pb-10">
        <section id="showcases" className="space-y-6">
          <CatalogPageHeader
            title="Showcases"
            description="Realistic page compositions built from existing Watermelon blocks. Each one is intentionally PR-friendly so the community can add more without inventing a new template system."
          />

          <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:px-8">
            {showcases.map((showcase) => (
              <Link
                key={showcase.slug}
                to={`/showcase/${showcase.slug}`}
                className={cn(
                  'group block rounded-4xl bg-gray-100 p-2 no-underline transition-all duration-300 dark:bg-neutral-800',
                  'shadow-[inset_0_1px_0_0_var(--color-gray-200),inset_0_2px_0_0_rgba(255,255,255,1)]',
                  'dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]',
                )}
              >
                <div className="flex items-start justify-between gap-4 px-2 pb-3 pt-2">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {showcase.featured ? (
                        <span className="rounded-full bg-primary/12 px-2.5 py-1 text-xs font-medium text-primary">
                          Featured
                        </span>
                      ) : null}
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {showcase.sections.length} sections
                      </span>
                    </div>
                    <h2 className="text-lg font-medium tracking-tight text-foreground">
                      {showcase.name}
                    </h2>
                    <p className="max-w-xl text-sm text-muted-foreground">
                      {showcase.description}
                    </p>
                  </div>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-[20px] border border-neutral-200/50 bg-muted dark:border-white/5">
                  <ResilientImage
                    src={showcase.image}
                    alt={`${showcase.name} preview`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    fallback={
                      <div className="absolute inset-0 flex items-center justify-center bg-white text-sm font-medium text-muted-foreground dark:bg-black">
                        Showcase preview
                      </div>
                    }
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-4">
                    {showcase.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-xs text-white/85 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
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
