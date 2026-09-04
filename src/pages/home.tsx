import { lazy, Suspense, useDeferredValue, useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowRight01Icon,
  SearchIcon,
  SparklesIcon,
} from '@/lib/hugeicons';
import {
  registry,
  type RegistryItem,
} from '@/data/animated-components-registry';
import { blockCategories, blockMetadata } from '@/data/block-metadata';
import { dashboardMetadata } from '@/data/dashboard-metadata';
import { showcaseMetadata } from '@/data/showcase-metadata';
import {
  uiCategoryMetadata,
  uiVariantCount,
} from '@/data/ui-category-metadata';
import { RegistryCard } from '@/components/registry/registry-card';
import { ResilientImage } from '@/components/ui/resilient-image';
import { SEOHead } from '@/components/seo-head';
import DashboardFooter from '@/components/layout/dashboard-footer';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

const templateFiles = import.meta.glob('../data/contents/templates/**/*.mdx');

const ComponentModal = lazy(() =>
  import('@/components/registry/component-modal').then((module) => ({
    default: module.ComponentModal,
  })),
);

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = 'View all',
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-5">
      <div className="max-w-2xl space-y-1.5">
        <p className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
      <Link
        to={href}
        className="text-muted-foreground hover:text-foreground hidden shrink-0 items-center gap-1 text-sm font-medium transition-colors sm:flex"
      >
        {linkLabel}
        <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
      </Link>
    </div>
  );
}

function ComponentRail({
  items,
  onSelect,
}: {
  items: RegistryItem[];
  onSelect: (item: RegistryItem) => void;
}) {
  return (
    <div className="scrollbar-hide -mx-4 grid snap-x grid-flow-col auto-cols-[82%] gap-4 overflow-x-auto px-4 pb-2 sm:auto-cols-[47%] md:-mx-6 md:px-6 lg:-mx-8 lg:grid-flow-row lg:grid-cols-4 lg:px-8">
      {items.map((item) => (
        <div key={item.slug} className="snap-start">
          <RegistryCard item={item} onClick={onSelect} />
        </div>
      ))}
    </div>
  );
}

function BlockCategoryCard({
  category,
}: {
  category: (typeof blockCategories)[number];
}) {
  return (
    <Link
      to={`/blocks/${category.slug}`}
      className="group bg-muted/65 border-border/70 block overflow-hidden rounded-3xl border p-1.5 no-underline transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20"
    >
      <div className="relative aspect-[16/11] overflow-hidden rounded-[18px] bg-white dark:bg-black">
        {category.image ? (
          <ResilientImage
            src={category.image}
            alt={`${category.label} block collection`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            fallback={
              <div className="text-muted-foreground absolute inset-0 grid place-items-center text-sm">
                {category.label}
              </div>
            }
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_62%)]">
            <span className="text-foreground/80 text-3xl font-semibold">
              {category.label.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-3">
        <span className="truncate text-sm font-medium">{category.label}</span>
        <span className="text-muted-foreground shrink-0 text-xs">
          {category.count} blocks
        </span>
      </div>
    </Link>
  );
}

const collectionCards = [
  {
    label: 'Animated',
    description: 'Motion-first interactions and effects.',
    href: '/animated-components',
    accent: 'from-lime-300/45 via-lime-200/10 to-transparent',
  },
  {
    label: 'Components',
    description: 'Production-ready interface primitives.',
    href: '/components',
    accent: 'from-emerald-300/40 via-emerald-200/10 to-transparent',
  },
  {
    label: 'Blocks',
    description: 'Complete sections for real product pages.',
    href: '/blocks',
    accent: 'from-amber-300/40 via-amber-200/10 to-transparent',
  },
  {
    label: 'Dashboards',
    description: 'Data-rich application layouts.',
    href: '/dashboards',
    accent: 'from-sky-300/40 via-sky-200/10 to-transparent',
  },
  {
    label: 'Showcases',
    description: 'Finished compositions made with Watermelon.',
    href: '/showcases',
    accent: 'from-rose-300/40 via-rose-200/10 to-transparent',
  },
  {
    label: 'Templates',
    description: 'Full starting points ready to customize.',
    href: '/templates',
    accent: 'from-orange-300/40 via-orange-200/10 to-transparent',
  },
];

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const templateCount = Object.keys(templateFiles).length;
  const collectionCounts = [
    registry.length,
    uiVariantCount,
    blockMetadata.length,
    dashboardMetadata.length,
    showcaseMetadata.length,
    templateCount,
  ];
  const totalExamples = collectionCounts.reduce((sum, count) => sum + count, 0);
  const animatedCategoryCounts = registry.reduce<Record<string, number>>(
    (counts, item) => {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
      return counts;
    },
    {},
  );
  const topAnimatedCategories = Object.entries(animatedCategoryCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10);

  const matchingComponents = deferredQuery
    ? registry
        .filter((item) =>
          `${item.name} ${item.category} ${item.description}`
            .toLowerCase()
            .includes(deferredQuery),
        )
        .slice(0, 18)
    : [];
  const matchingBlocks = deferredQuery
    ? blockCategories.filter((category) =>
        `${category.label} ${category.description}`
          .toLowerCase()
          .includes(deferredQuery),
      )
    : [];
  const matchingUiCategories = deferredQuery
    ? uiCategoryMetadata.filter((category) =>
        `${category.label} ${category.description}`
          .toLowerCase()
          .includes(deferredQuery),
      )
    : [];
  const hasSearchResults = Boolean(
    matchingComponents.length ||
      matchingBlocks.length ||
      matchingUiCategories.length,
  );

  const organizationSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Watermelon UI',
    url: 'https://ui.watermelon.sh',
    logo: 'https://ui.watermelon.sh/logo.png',
    description:
      'An open-source catalog of React components, blocks, dashboards, and templates.',
  });

  return (
    <>
      <SEOHead
        title="React UI Components, Blocks and Templates"
        description={`Explore ${totalExamples}+ open-source React components, animated interactions, blocks, dashboards, showcases, and templates.`}
        schema={organizationSchema}
        image="/og-image.avif"
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-x-clip">
        <section className="relative isolate overflow-hidden border-b px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="bg-primary/20 pointer-events-none absolute -top-28 left-[12%] -z-10 h-72 w-72 rounded-full blur-[110px]" />
          <div className="pointer-events-none absolute right-[4%] bottom-0 -z-10 h-52 w-80 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_68%)]" />

          <div className="mx-auto max-w-5xl text-center">
            <div className="border-primary/20 bg-primary/8 text-primary mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium">
              <HugeiconsIcon icon={SparklesIcon} size={14} />
              Built in the open, free for the community
            </div>
            <h1 className="text-balance text-4xl leading-[0.98] font-semibold tracking-[-0.045em] md:text-6xl lg:text-7xl">
              Find the piece that makes your interface click.
            </h1>
            <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed md:text-lg">
              Browse a growing React catalog from tiny interactions to complete
              product pages, with source-backed examples ready to build on.
            </p>

            <label className="group border-border/80 bg-background/90 focus-within:border-primary/60 focus-within:ring-primary/15 mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border p-2 pl-4 shadow-xl shadow-black/5 backdrop-blur-xl transition focus-within:ring-4 dark:shadow-black/20">
              <HugeiconsIcon
                icon={SearchIcon}
                size={20}
                className="text-muted-foreground group-focus-within:text-primary transition-colors"
              />
              <span className="sr-only">Search the Watermelon catalog</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search components, blocks, categories..."
                className="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none md:text-base"
              />
              <span className="text-muted-foreground bg-muted hidden rounded-lg px-2 py-1 font-mono text-[11px] sm:block">
                {totalExamples}+
              </span>
            </label>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {topAnimatedCategories.slice(0, 7).map(([category, count]) => (
                <Link
                  key={category}
                  to={`/animated-components/category/${encodeURIComponent(category.toLowerCase())}`}
                  className="border-border/70 bg-background/65 text-muted-foreground hover:border-primary/40 hover:text-foreground rounded-full border px-3 py-1.5 text-xs transition"
                >
                  {category} <span className="text-foreground/45 ml-1">{count}</span>
                </Link>
              ))}
            </div>

            <div className="border-border/70 mx-auto mt-9 grid max-w-2xl grid-cols-3 divide-x rounded-2xl border bg-black/[0.02] py-4 dark:bg-white/[0.025]">
              <div>
                <p className="text-xl font-semibold tracking-tight md:text-2xl">{totalExamples}+</p>
                <p className="text-muted-foreground mt-0.5 text-[11px] tracking-wider uppercase">Examples</p>
              </div>
              <div>
                <p className="text-xl font-semibold tracking-tight md:text-2xl">{uiCategoryMetadata.length + blockCategories.length}</p>
                <p className="text-muted-foreground mt-0.5 text-[11px] tracking-wider uppercase">Categories</p>
              </div>
              <div>
                <p className="text-xl font-semibold tracking-tight md:text-2xl">6</p>
                <p className="text-muted-foreground mt-0.5 text-[11px] tracking-wider uppercase">Collections</p>
              </div>
            </div>
          </div>
        </section>

        {deferredQuery ? (
          <section className="space-y-7 px-4 py-10 md:px-6 lg:px-8">
            <div>
              <p className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase">Search</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Results for "{query.trim()}"
              </h2>
            </div>

            {hasSearchResults ? (
              <>
                {(matchingUiCategories.length > 0 || matchingBlocks.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {matchingUiCategories.map((category) => (
                      <Link
                        key={`ui-${category.slug}`}
                        to={`/components/${category.slug}`}
                        className="bg-muted hover:bg-accent rounded-full px-4 py-2 text-sm transition"
                      >
                        {category.label} <span className="text-muted-foreground">{category.count}</span>
                      </Link>
                    ))}
                    {matchingBlocks.map((category) => (
                      <Link
                        key={`block-${category.slug}`}
                        to={`/blocks/${category.slug}`}
                        className="bg-muted hover:bg-accent rounded-full px-4 py-2 text-sm transition"
                      >
                        {category.label} <span className="text-muted-foreground">{category.count}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {matchingComponents.length > 0 && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {matchingComponents.map((item) => (
                      <RegistryCard key={item.slug} item={item} onClick={setSelectedItem} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="border-border bg-muted/30 rounded-3xl border border-dashed px-6 py-16 text-center">
                <p className="font-medium">No catalog matches yet.</p>
                <p className="text-muted-foreground mt-1 text-sm">Try a broader term like button, hero, card, or menu.</p>
              </div>
            )}
          </section>
        ) : (
          <div className="space-y-16 py-12 md:space-y-20 md:py-16">
            <section className="space-y-6 px-4 md:px-6 lg:px-8">
              <SectionHeading
                eyebrow="Popular now"
                title="Interactions worth stealing"
                description="Our most distinctive motion patterns, ready to inspect, copy, and adapt. Video previews only load when you interact with a card."
                href="/animated-components"
              />
              <ComponentRail items={registry.slice(0, 4)} onSelect={setSelectedItem} />
            </section>

            <section className="space-y-6 px-4 md:px-6 lg:px-8">
              <SectionHeading
                eyebrow="More motion"
                title="Small details, big personality"
                description="A second series of focused interactions for navigation, feedback, storytelling, and product polish."
                href="/animated-components"
              />
              <ComponentRail items={registry.slice(4, 8)} onSelect={setSelectedItem} />
            </section>

            <section className="space-y-6 px-4 md:px-6 lg:px-8">
              <SectionHeading
                eyebrow="Page building"
                title="Start with a complete section"
                description={`${blockMetadata.length} copy-paste blocks organized into practical product and marketing collections.`}
                href="/blocks"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {blockCategories.slice(0, 8).map((category) => (
                  <BlockCategoryCard key={category.slug} category={category} />
                ))}
              </div>
            </section>

            <section className="space-y-6 px-4 md:px-6 lg:px-8">
              <SectionHeading
                eyebrow="UI foundations"
                title="Go deep on every primitive"
                description={`${uiVariantCount} variants across the components teams reach for every day.`}
                href="/components"
              />
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                {uiCategoryMetadata.slice(0, 15).map((category, index) => (
                  <Link
                    key={category.slug}
                    to={`/components/${category.slug}`}
                    className={cn(
                      'group border-border/70 hover:border-primary/40 relative min-h-28 overflow-hidden rounded-2xl border p-4 no-underline transition duration-300 hover:-translate-y-0.5',
                      index === 0 && 'sm:col-span-2',
                    )}
                  >
                    <div className="bg-primary/12 absolute -right-7 -bottom-8 h-24 w-24 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150" />
                    <div className="relative flex h-full flex-col justify-between gap-5">
                      <span className="text-sm font-medium">{category.label}</span>
                      <span className="text-muted-foreground text-xs">{category.count} variants</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="space-y-6 px-4 md:px-6 lg:px-8">
              <SectionHeading
                eyebrow="Everything in one place"
                title="Choose your starting point"
                description="Move from a single control to a complete application without leaving the Watermelon catalog."
                href="/components"
                linkLabel="Browse components"
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {collectionCards.map((collection, index) => (
                  <Link
                    key={collection.label}
                    to={collection.href}
                    onClick={() => trackEvent('home_collection_click', { collection: collection.label })}
                    className="group border-border/70 bg-card relative min-h-44 overflow-hidden rounded-3xl border p-6 no-underline transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                  >
                    <div className={`absolute inset-0 bg-linear-to-br ${collection.accent}`} />
                    <div className="relative flex h-full flex-col justify-between gap-8">
                      <div className="flex items-start justify-between gap-4">
                        <span className="border-foreground/10 bg-background/60 rounded-full border px-2.5 py-1 font-mono text-xs backdrop-blur">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <HugeiconsIcon
                          icon={ArrowRight01Icon}
                          size={20}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="text-xl font-semibold tracking-tight">{collection.label}</h3>
                          <span className="text-muted-foreground text-sm">{collectionCounts[index]}</span>
                        </div>
                        <p className="text-muted-foreground mt-1.5 text-sm">{collection.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}

        <DashboardFooter />

        <Suspense fallback={null}>
          {selectedItem && (
            <ComponentModal item={selectedItem} onClose={() => setSelectedItem(null)} />
          )}
        </Suspense>
      </div>
    </>
  );
}
