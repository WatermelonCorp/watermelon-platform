import { useState, Suspense, lazy } from 'react';
import { registry, type RegistryItem } from '@/data/animated-components-registry';
// import { dashboards, type DashboardItem } from '@/data/dashboards';
// import { blocks, type BlockItem } from '@/data/blocks';
import type { DashboardItem } from '@/data/dashboards';
import type { BlockItem } from '@/data/blocks';
import { SEOHead } from '@/components/seo-head';
import { RegistryCard } from '@/components/registry/registry-card';
// import { DashboardCard } from '@/components/registry/dashboard-card';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@/lib/hugeicons';
import { trackEvent } from '@/lib/analytics';
import DashboardFooter from '@/components/layout/dashboard-footer';

const ComponentModal = lazy(() => import('@/components/registry/component-modal').then((m) => ({ default: m.ComponentModal })));
const DashboardModal = lazy(() => import('@/components/registry/dashboard-modal').then((m) => ({ default: m.DashboardModal })));
const BlockModal = lazy(() => import('@/components/registry/block-modal').then((m) => ({ default: m.BlockModal })));

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardItem | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<BlockItem | null>(null);

  // For home page, we might want to show featured or all. Let's show all for now.
  // In a real app, you might have a "featured" flag.
  const featuredItems = registry.slice(0, 6);
  // const featuredDashboards = dashboards.slice(0, 4);
  // const featuredBlocks = blocks.slice(0, 4);

  const organizationSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Watermelon UI",
    "url": "https://ui.watermelon.sh",
    "logo": "https://ui.watermelon.sh/logo.png",
    "foundingDate": "2024-01-01",
    "description": "A collection of high-quality React components for modern web applications.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "support",
      "email": "watermeloncorpui@gmail.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  });

  return (
    <>
      <SEOHead
        title="React Components, Dashboards & Blocks"
        description="Explore our collection of high-quality, customizable React components built with modularity and performance in mind."
        schema={organizationSchema}
        image="/og-image.png"
      />

      <h1 className="sr-only">
        Watermelon UI - High-Quality React Components Registry
      </h1>

      <div className="flex flex-col gap-12">
        {/* Components Section */}
        <section id="components" className="flex flex-col gap-6">

          <h2 className="text-lg font-medium tracking-tight md:text-xl px-4 md:px-8 lg:px-8 pl-5 md:pl-7 lg:pl-9 pt-4">
            Featured Components
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-6 lg:px-8">
            {featuredItems.map((item, index) => (
              <RegistryCard
                key={item.slug}
                item={item}
                imagePriority={index === 0}
                onClick={(item) => setSelectedItem(item)}
              />
            ))}
          </div>
        </section>

        <div className='flex items-center justify-center gap-3 px-4 md:px-6 lg:px-8 py-1'>
          {/* Left: line + two crosses */}
          <div className='flex flex-1 items-center justify-end gap-2.5'>
            <div className='h-px flex-1  bg-linear-to-l from-foreground/20 to-transparent' />
            <span className='text-foreground/20 text-base leading-none select-none'>×</span>
            <span className='text-foreground/20 text-base leading-none select-none'>×</span>
          </div>

          <Link
            to="/animated-components"
            onClick={() =>
              trackEvent('cta_view_all_click', {
                section: 'components',
              })
            }
            className="w-fit py-2 px-4 pr-2.5 text-sm flex items-center justify-center rounded-xl bg-linear-to-b from-lime-400 to-lime-500 border border-lime-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_1px_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_2px_1px_0_rgba(0,0,0,0.04)] text-white"
          >
            View all ({registry.length})
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
          </Link>

          {/* Right: two crosses + line */}
          <div className='flex flex-1 items-center gap-2.5'>
            <span className='text-foreground/20 text-base leading-none select-none'>×</span>
            <span className='text-foreground/20 text-base leading-none select-none'>×</span>
            <div className='h-px flex-1 bg-linear-to-r from-foreground/20 to-transparent' />
          </div>
        </div>

        <DashboardFooter />

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
          {selectedBlock && (
            <BlockModal
              item={selectedBlock}
              onClose={() => setSelectedBlock(null)}
            />
          )}
        </Suspense>
      </div >
    </>
  );
}
