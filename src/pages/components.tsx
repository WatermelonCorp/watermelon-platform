import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo-head";
import { uiCategories } from "@/data/components-registry";
import { CatalogPageHeader } from "@/components/layout/catalog-page-header";

export default function ComponentsPage() {
  return (
    <>
      <SEOHead
        title="Components"
        description="Browse all Watermelon UI base components. Live-rendered, copy-paste ready React components."
        category="Components"
      />

      <div className="space-y-10 mb-10">
        <section id="ui-components" className="space-y-6">
          <CatalogPageHeader title="Components" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 md:px-4">
            {uiCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/components/${cat.slug}`}
                id={`ui-category-${cat.slug}`}
                className="group relative flex flex-col gap-2 rounded-xl border bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground">
                    {cat.label}
                  </h2>
                  <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    View →
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
