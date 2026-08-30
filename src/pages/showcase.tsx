import { Link, Navigate, useParams } from 'react-router-dom';
import { showcases } from '@/data/showcases';
import { SEOHead } from '@/components/seo-head';

export default function ShowcasePage() {
  const { slug } = useParams<{ slug: string }>();
  const item = showcases.find((showcase) => showcase.slug === slug);

  if (!item) {
    return <Navigate to="/showcases" replace />;
  }

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: item.name,
    description: item.description,
    url: `https://ui.watermelon.sh/showcase/${item.slug}`,
    isPartOf: 'https://ui.watermelon.sh/showcases',
  });

  return (
    <>
      <SEOHead
        title={item.name}
        description={item.description}
        image={item.image}
        category="Showcase"
        schema={schema}
      />

      <div className="space-y-8 px-4 pb-12 pt-4 md:px-6 lg:px-8">
        <div className="rounded-4xl border border-border/70 bg-muted/20 p-6 md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <Link to="/showcases" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Back to showcases
              </Link>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{item.name}</h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                  {item.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground ring-1 ring-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="min-w-0 max-w-sm rounded-3xl border border-border/70 bg-background p-5">
              <h2 className="text-sm font-medium text-foreground">Contribute a variation</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This page is composed from existing blocks so contributors can propose new sections through a normal pull request instead of maintaining a separate template engine.
              </p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                {item.sections.map((section, index) => (
                  <div key={section.blockSlug} className="flex items-center justify-between gap-4">
                    <span>{index + 1}. {section.title}</span>
                    <Link to={`/block/${section.blockSlug}`} className="text-primary hover:underline">
                      {section.blockSlug}
                    </Link>
                  </div>
                ))}
              </div>
              <a
                href="https://github.com/WatermelonCorp/watermelon-platform/blob/main/CONTRIBUTING.md"
                className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Read contribution guide
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {item.sections.map((section, index) => {
            const BlockComponent = section.block.component;

            return (
              <section key={section.blockSlug} className="space-y-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      Section {index + 1}
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
                    {section.note ? (
                      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{section.note}</p>
                    ) : null}
                  </div>
                  <Link to={`/block/${section.blockSlug}`} className="text-sm text-primary hover:underline">
                    View source block
                  </Link>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-border/70 bg-background shadow-sm">
                  <BlockComponent />
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
