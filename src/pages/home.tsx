import { useState, Suspense, lazy } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import DashboardFooter from '@/components/layout/dashboard-footer';
import { ResilientImage } from '@/components/ui/resilient-image';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@/lib/hugeicons';

// Data registries
import { registry, type RegistryItem } from '@/data/animated-components-registry';
import { uiCategories, uiRegistry } from '@/data/components-registry';
import { showcases } from '@/data/showcases';
import { blockCategories } from '@/data/block-metadata';
import { dashboards, type DashboardItem } from '@/data/dashboards';
import { templates } from '@/data/templates';

// Components
import { RegistryCard } from '@/components/registry/registry-card';
import { DashboardCard } from '@/components/registry/dashboard-card';

// Modals
const ComponentModal = lazy(() =>
  import('@/components/registry/component-modal').then((m) => ({
    default: m.ComponentModal,
  })),
);
const DashboardModal = lazy(() =>
  import('@/components/registry/dashboard-modal').then((m) => ({
    default: m.DashboardModal,
  })),
);

// ─── Clean Category Row with Horizontal Scroll & View All ─────────────────────

interface CategoryRowProps {
  id: string;
  title: string;
  viewAllUrl: string;
  children: React.ReactNode;
}

function CategoryRow({
  id,
  title,
  viewAllUrl,
  children,
}: CategoryRowProps) {
  return (
    <section id={id} className="flex flex-col gap-4 px-4 md:px-6 lg:px-8">
      {/* Row Header: Section title on the left, View all button on the right */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>

        <Link
          to={viewAllUrl}
          onClick={() =>
            trackEvent('home_section_view_all_click', { section: id })
          }
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>View all</span>
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
        </Link>
      </div>

      {/* Horizontal Scroll Row — clipped within the content area's padding */}
      <div className="no-scrollbar flex gap-4 md:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1">
        {children}
      </div>
    </section>
  );
}

// ─── Main HomePage Component ──────────────────────────────────────────────────

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardItem | null>(null);

  const renderBlockFallback = (label: string) => (
    <div className="space-y-2 p-4 text-center">
      <div className="text-4xl">🧩</div>
      <p className="text-sm font-medium text-neutral-500">{label}</p>
    </div>
  );

  const organizationSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Watermelon UI',
    url: 'https://ui.watermelon.sh',
    logo: 'https://ui.watermelon.sh/logo.png',
    foundingDate: '2024-01-01',
    description:
      'A collection of high-quality React components for modern web applications.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'support',
      email: 'watermeloncorpui@gmail.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  });

  return (
    <>
      <SEOHead
        title="React Components, Dashboards & Blocks"
        description="Explore our collection of high-quality, customizable React components built with modularity and performance in mind."
        schema={organizationSchema}
        image="/og-image.avif"
      />

      <h1 className="sr-only">
        Watermelon UI - High-Quality React Components Registry
      </h1>

      <div className="flex flex-1 flex-col gap-4 pt-4">

        {/* 1. Animated Components Row */}
        <CategoryRow
          id="animated-components"
          title="Animated Components"
          viewAllUrl="/animated-components"
        >
          {registry.map((item) => (
            <div key={item.slug} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
              <RegistryCard
                item={item}
                onClick={(clickedItem) => setSelectedItem(clickedItem)}
              />
            </div>
          ))}
        </CategoryRow>

        {/* 2. Base UI Components Row */}
        <CategoryRow
          id="components"
          title="Components"
          viewAllUrl="/components"
        >
          {uiCategories.map((cat) => {
            const variantCount = uiRegistry[cat.slug]?.length ?? 0;

            return (
              <Link
                key={cat.slug}
                to={`/components/${cat.slug}`}
                id={`ui-category-${cat.slug}`}
                className={cn(
                  'group/card block w-[280px] sm:w-[320px] shrink-0 snap-start no-underline',
                  'rounded-4xl p-5 bg-gray-100 dark:bg-neutral-800',
                  'border border-neutral-200/50 dark:border-white/5',
                  'shadow-[inset_0_1px_0_0_var(--color-gray-200),inset_0_2px_0_0_rgba(255,255,255,1)]',
                  'dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]',
                  'transition-all duration-300 hover:scale-[1.01]',
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-base font-semibold text-foreground truncate">
                    {cat.label}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                    {variantCount} {variantCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed min-h-[32px]">
                  {cat.description}
                </p>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground group-hover/card:text-foreground">
                  <span className="font-medium">Browse components</span>
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={14}
                    className="transition-transform group-hover/card:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </CategoryRow>

        {/* 3. Showcases Row */}
        <CategoryRow
          id="showcases"
          title="Showcases"
          viewAllUrl="/showcases"
        >
          {showcases.map((showcase) => (
            <Link
              key={showcase.slug}
              to={`/showcase/${showcase.slug}`}
              className={cn(
                'group block w-[300px] sm:w-[340px] shrink-0 snap-start rounded-4xl bg-gray-100 p-2 no-underline transition-all duration-300 dark:bg-neutral-800',
                'shadow-[inset_0_1px_0_0_var(--color-gray-200),inset_0_2px_0_0_rgba(255,255,255,1)]',
                'dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]',
              )}
            >
              <div className="flex items-start justify-between gap-4 px-2 pb-3 pt-2">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap gap-1.5">
                    {showcase.featured ? (
                      <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[11px] font-medium text-primary">
                        Featured
                      </span>
                    ) : null}
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      {showcase.sections.length} sections
                    </span>
                  </div>
                  <h3 className="text-base font-medium tracking-tight text-foreground truncate">
                    {showcase.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
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
                    <div className="absolute inset-0 flex items-center justify-center bg-white text-xs font-medium text-muted-foreground dark:bg-black">
                      Showcase preview
                    </div>
                  }
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-1.5 p-3">
                  {showcase.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[11px] text-white/90 backdrop-blur-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </CategoryRow>

        {/* 4. UI Blocks Row */}
        <CategoryRow
          id="blocks"
          title="UI Blocks"
          viewAllUrl="/blocks"
        >
          {blockCategories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/blocks/${cat.slug}`}
              id={`block-category-${cat.slug}`}
              className={cn(
                'group relative block cursor-pointer no-underline w-[280px] sm:w-[320px] shrink-0 snap-start',
                'rounded-4xl p-2',
                'bg-gray-100',
                'dark:border-0 dark:bg-neutral-800',
                'backdrop-blur-xl backdrop-saturate-150',
                'shadow-[inset_0_1px_0_0_var(--color-gray-200),inset_0_2px_0_0_rgba(255,255,255,1)]',
                'dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]',
                'transition-all duration-300',
                'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
              )}
            >
              <div className="relative z-10 flex items-center justify-between gap-4 px-2 pt-2 pb-3">
                <span className="text-foreground truncate text-base leading-tight font-medium">
                  {cat.label}
                </span>
                <span className="text-muted-foreground text-xs capitalize">
                  {cat.count} {cat.count === 1 ? 'block' : 'blocks'}
                </span>
              </div>

              <div
                className={cn(
                  'relative aspect-4/3 w-full overflow-hidden rounded-[20px]',
                  'bg-muted',
                  'border border-neutral-200/50 dark:border-white/5',
                  'shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]',
                  'dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]',
                )}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 rounded-[20px] ring-1 ring-white/20 ring-inset dark:ring-white/5"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-white transition-colors duration-300 dark:bg-black">
                  {cat.image ? (
                    <ResilientImage
                      src={cat.image}
                      alt={`${cat.label} preview`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fallback={renderBlockFallback(cat.label)}
                    />
                  ) : (
                    renderBlockFallback(cat.label)
                  )}
                </div>
              </div>
            </Link>
          ))}
        </CategoryRow>

        {/* 5. Dashboards Row */}
        <CategoryRow
          id="dashboards"
          title="Dashboards"
          viewAllUrl="/dashboards"
        >
          {dashboards.map((item) => (
            <div key={item.slug} className="w-[300px] sm:w-[340px] shrink-0 snap-start">
              <DashboardCard
                item={item}
                onClick={(clicked) => {
                  if (!clicked.comingSoon) {
                    navigate(`/dashboard/${clicked.slug}`);
                  }
                }}
              />
            </div>
          ))}
        </CategoryRow>

        {/* 6. Templates Row */}
        <CategoryRow
          id="templates"
          title="Templates"
          viewAllUrl="/templates"
        >
          {templates.map((item) => (
            <div key={item.slug} className="w-[300px] sm:w-[340px] shrink-0 snap-start">
              <DashboardCard
                item={item as any}
                onClick={(clicked) => {
                  if (!clicked.comingSoon) {
                    navigate(`/template/${clicked.slug}`);
                  }
                }}
              />
            </div>
          ))}
        </CategoryRow>

        {/* Footer */}
        <div className="mt-auto">
          <DashboardFooter />
        </div>

        {/* Modals */}
        <Suspense fallback={null}>
          {selectedItem && (
            <ComponentModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
          {selectedDashboard && (
            <DashboardModal
              item={selectedDashboard}
              onClose={() => setSelectedDashboard(null)}
            />
          )}
        </Suspense>
      </div>
    </>
  );
}
