import { SEOHead } from "@/components/seo-head";
import { uiCategories, uiRegistry } from "@/data/components-registry";
import { CatalogPageHeader } from "@/components/layout/catalog-page-header";
import { ComponentCategoryCard } from "@/components/registry/component-category-card";
import { RelatedResources } from "@/components/seo/related-resources";

export default function ComponentsPage() {
  return (
    <>
      <SEOHead
        title="Base React Components for Tailwind CSS"
        description="Browse all Watermelon UI base components. Live-rendered, copy-paste ready React components for Tailwind CSS, installable with the shadcn CLI."
        category="Components"
      />

      <CatalogPageHeader
        title="Components"
        description="Browse all base components. Live-rendered, copy-paste ready React components for your next project."
      />

      <div className="flex flex-col gap-6 md:gap-12 mb-12 px-4 md:px-6 lg:px-8 mt-4 md:mt-8">

        {/* ─ Categories grid: same image cards as the home page row ─ */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {uiCategories.map((cat) => (
            <ComponentCategoryCard
              key={cat.slug}
              slug={cat.slug}
              label={cat.label}
              variantCount={uiRegistry[cat.slug]?.length ?? 0}
            />
          ))}
        </div>

        <RelatedResources kind="components" />
      </div>
    </>
  );
}
