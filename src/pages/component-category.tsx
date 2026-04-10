import { useState, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { SEOHead } from "@/components/seo-head";
import { getUiVariants, hasUiCategory, uiCategories } from "@/data/components-registry";
import type { UiVariant } from "@/data/components-registry";
import { CodeDialog } from "@/components/registry/code-dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { SourceCodeIcon } from "@/lib/hugeicons";

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
      <div className="flex items-center justify-between border-b py-3">
        <span className="text-sm font-medium text-foreground">{variant.title}</span>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComponentCategoryPage() {
  const { category = "" } = useParams<{ category: string }>();
  const [activeVariant, setActiveVariant] = useState<UiVariant | null>(null);

  const variants = getUiVariants(category);
  const exists = hasUiCategory(category);
  const meta = uiCategories.find((c) => c.slug === category);

  const label = meta?.label ?? (category.charAt(0).toUpperCase() + category.slice(1));
  const description = meta?.description ?? `${label} component variants.`;

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
        title={label}
        description={description}
        category="Components"
      />

      <div className="space-y-8 mb-12 px-2 md:px-4">

        {/* ─ Page header ─ */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">{label}</h1>
          <p className="text-sm text-muted-foreground max-w-xl">{description}</p>
        </div>

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
              @media (min-width: 1024px) {
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
      </div>

      {/* ─ Code dialog ─ */}
      <CodeDialog
        variant={activeVariant}
        onClose={() => setActiveVariant(null)}
      />
    </>
  );
}
