import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo-head";
import { uiCategories, uiRegistry } from "@/data/components-registry";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@/lib/hugeicons";

export default function ComponentsPage() {
  return (
    <>
      <SEOHead
        title="Components"
        description="Browse all Watermelon UI base components. Live-rendered, copy-paste ready React components."
        category="Components"
      />

      <div className="space-y-8 mb-12 px-2 md:px-4">
        {/* ─ Page header ─ */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">Components</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Browse all base components. Live-rendered, copy-paste ready React components for your next project.
          </p>
        </div>

        {/* ─ Categories grid ─ */}
        <div className="overflow-hidden">
          <div
            className="group/grid grid -mr-px -mb-px border-dashed"
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
              @media (min-width: 1024px) {
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
                  className="group/card flex flex-col gap-3 px-4 h-full border-r border-b border-dashed border-border no-underline"
                >
                  {/* Title row */}
                  <div className="flex items-center justify-between border-b py-3">
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
                  <div className="relative flex min-h-[60px] items-center pb-4">
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
