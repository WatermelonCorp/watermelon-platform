import { useState, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { SEOHead } from "@/components/seo-head";
import { getUiVariants, hasUiCategory, uiCategories } from "@/data/components-registry";
import type { UiVariant } from "@/data/components-registry";
import { CodeDialog } from "@/components/registry/code-dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { SourceCodeIcon } from "@/lib/hugeicons";
import { CatalogPageHeader } from "@/components/layout/catalog-page-header";
import { componentCategorySeo } from "@/data/seo/catalog-meta";
import { componentGuides, guideFaqSchema, type CategoryGuide } from "@/data/seo/category-guides";
import { RelatedResources } from "@/components/seo/related-resources";

// ─── Loading fallback ─────────────────────────────────────────────────────────

function ComponentSkeleton() {
  return (
    <div className="flex h-48 items-center justify-center rounded-xl border bg-muted/20">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground/60" />
    </div>
  );
}

// ─── Single variant card ──────────────────────────────────────────────────────

function VariantCard({
  variant,
  onCodeClick,
}: {
  variant: UiVariant;
  onCodeClick: (v: UiVariant) => void;
}) {
  return (
    <div className="flex flex-col gap-3 px-4 h-full">
      {/* Title row */}
      <div className="flex items-center justify-between gap-3 border-b py-3">
        <div className="min-w-0">
          <h2 className="text-sm font-medium text-foreground">{variant.title}</h2>
          {variant.description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{variant.description}</p>
          )}
        </div>
        <button
          id={`code-btn-${variant.id}`}
          onClick={() => onCodeClick(variant)}
          aria-label={`View code for ${variant.title}`}
          className="flex size-7 items-center justify-center rounded-md border bg-muted/50 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <HugeiconsIcon icon={SourceCodeIcon} size={14} />
        </button>
      </div>

      {/* Live preview */}
      <div className="relative flex min-h-[200px] items-center justify-center bg-background px-6 py-8 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
         
        />
        <Suspense fallback={<ComponentSkeleton />}>
          <div className={variant.colSpan && variant.colSpan > 1 ? "flex w-full justify-center" : "flex w-full max-w-md justify-center"}>
            <variant.component />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

// ─── Guide ────────────────────────────────────────────────────────────────────

function CategoryGuideSection({ guide, name }: { guide: CategoryGuide; name: string }) {
  const sibling = (slug: string) => uiCategories.find((c) => c.slug === slug)?.label ?? slug;
  return (
    <section className="mx-auto w-full max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">About {name}</h2>
        <p>{guide.answer}</p>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">When to use it</h2>
        <ul className="list-disc space-y-1 pl-5">
          {guide.useWhen.map((u) => <li key={u}>{u}</li>)}
        </ul>
      </div>
      {guide.instead.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">When to use something else</h2>
          <ul className="list-disc space-y-1 pl-5">
            {guide.instead.map((i) => (
              <li key={i.slug}>
                Use{" "}
                <Link to={`/components/${i.slug}`} className="text-foreground underline underline-offset-4">
                  {sibling(i.slug)}
                </Link>{" "}
                when {i.when}.
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Frequently asked questions</h2>
        {guide.faq.map((f) => (
          <div key={f.q} className="space-y-1">
            <h3 className="font-medium text-foreground">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComponentCategoryPage() {
  const { category = "" } = useParams<{ category: string }>();
  const [activeVariant, setActiveVariant] = useState<UiVariant | null>(null);

  const variants = getUiVariants(category);
  const exists = hasUiCategory(category);
  const meta = uiCategories.find((c) => c.slug === category);

  const label = meta?.label ?? (category.charAt(0).toUpperCase() + category.slice(1));
  const description = meta?.description ?? `${label} component variants.`;
  const seo = componentCategorySeo(category, variants.length);
  const guide = componentGuides[category];

  if (!exists) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <p className="text-lg font-semibold">Category not found</p>
        <p className="text-sm text-muted-foreground">
          "{category}" doesn't exist in the component registry yet.
        </p>
        <Link to="/components" className="text-primary text-sm underline underline-offset-4">
          ← Back to Components
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={seo?.title ?? label}
        description={seo?.description ?? description}
        category="Components"
        schema={guide ? JSON.stringify(guideFaqSchema(guide)) : undefined}
      />

      <CatalogPageHeader title={seo?.h1 ?? label} description={description} />

      <div className="flex flex-col gap-6 md:gap-12 mb-12 px-4 md:px-6 lg:px-8 mt-4 md:mt-8">

        {/* ─ Variants grid ─ */}
        <div className="overflow-hidden">
          <div 
            className="group/grid grid -mr-px -mb-px border-dashed"
            style={{ 
              gridTemplateColumns: `repeat(var(--columns, 1), minmax(0, 1fr))` 
            } as React.CSSProperties}
          >
            {/* Responsive CSS variables */}
            <style>{`
              @media (max-width: 767px) {
                .group\\/grid { --columns: 1; }
                .group\\/grid > div { grid-column: span 1 / span 1 !important; }
              }
              @media (min-width: 768px) and (max-width: 1023px) {
                .group\\/grid { --columns: ${Math.min(meta?.columns || 2, 2)}; }
                .group\\/grid > .col-span-2 { grid-column: span 2 / span 2; }
              }
              @media (min-width: 1200px) {
                .group\\/grid { --columns: ${meta?.columns || 2}; }
              }
            `}</style>

            {variants.map((variant) => (
              <div 
                key={variant.id} 
                className={`border-r border-b border-dashed border-border ${variant.colSpan && variant.colSpan > 1 ? `lg:col-span-${variant.colSpan} col-span-2` : ""}`}
                style={variant.colSpan && variant.colSpan > 1 ? {
                  gridColumn: `span ${variant.colSpan} / span ${variant.colSpan}`
                } : undefined}
              >
                <VariantCard
                  variant={variant}
                  onCodeClick={setActiveVariant}
                />
              </div>
            ))}
          </div>
        </div>

        {guide && <CategoryGuideSection guide={guide} name={seo?.h1 ?? label} />}

        <RelatedResources kind="components" />
      </div>

      {/* ─ Code dialog ─ */}
      <CodeDialog
        variant={activeVariant}
        onClose={() => setActiveVariant(null)}
      />
    </>
  );
}
