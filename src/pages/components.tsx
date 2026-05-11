import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo-head";
import { uiCategories, uiRegistry } from "@/data/components-registry";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@/lib/hugeicons";
import { CatalogPageHeader } from "@/components/layout/catalog-page-header";

export default function ComponentsPage() {
  return (
    <>
      <SEOHead
        title="Components"
        description="Browse all Watermelon UI base components. Live-rendered, copy-paste ready React components."
        category="Components"
      />

      <CatalogPageHeader
        title="Components"
        description="Browse all base components. Live-rendered, copy-paste ready React components for your next project."
      />

      <div className="flex flex-col gap-6 md:gap-12 mb-12 px-4 md:px-6 lg:px-8 mt-4 md:mt-8">

        {/* ─ Categories grid ─ */}
        <div className="overflow-hidden">
          <div
            className="group/grid grid -mr-px -mb-px border-dashed gap-4 md:gap-6 lg:gap-8"
            style={{
              gridTemplateColumns: `repeat(var(--columns, 1), minmax(0, 1fr))`,
            } as React.CSSProperties}
          >
            <style>{`
              @media (max-width: 639px) {
                .group\\/grid { --columns: 1; }
              }
              @media (min-width: 640px) and (max-width: 1023px) {
                .group\\/grid { --columns: 2; }
              }
              @media (min-width: 1200px) {
                .group\\/grid { --columns: 3; }
              }
            `}</style>

            {uiCategories.map((cat) => {
              const variantCount = uiRegistry[cat.slug]?.length ?? 0;

              return (
                <Link
                  key={cat.slug}
                  to={`/components/${cat.slug}`}
                  id={`ui-category-${cat.slug}`}
                  className="group/card flex flex-col gap-3 h-full no-underline"
                >
                  {/* Title row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{cat.label}</span>
                      <span className="text-xs text-muted-foreground/60">{variantCount}</span>
                    </div>
                    <span className="flex items-center gap-0.5 text-xs font-medium text-muted-foreground opacity-0 group-hover/card:opacity-100 transition-opacity">
                      View
                      <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  {/* Description */}
                  <div className="relative flex min-h-[40px] items-center pb-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
