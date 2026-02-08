import { useState } from 'react';
import { registry, type RegistryItem } from '@/data/registry';
import { dashboards, type DashboardItem } from '@/data/dashboards';
import { blocks, type BlockItem } from '@/data/blocks';
import { SEOHead } from '@/components/seo-head';
import { RegistryCard } from '@/components/registry/registry-card';
import { ComponentModal } from '@/components/registry/component-modal';
import { DashboardCard } from '@/components/registry/dashboard-card';
import { DashboardModal } from '@/components/registry/dashboard-modal';
import { BlockModal } from '@/components/registry/block-modal';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardItem | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<BlockItem | null>(null);

  // For home page, we might want to show featured or all. Let's show all for now.
  // In a real app, you might have a "featured" flag.
  const featuredItems = registry.slice(0, 6);
  const featuredDashboards = dashboards.slice(0, 4);
  const featuredBlocks = blocks.slice(0, 4);

  const organizationSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Watermelon UI",
    "url": "https://watermelon-ui.com",
    "logo": "https://watermelon-ui.com/logo.png",
    "foundingDate": "2024-01-01",
    "description": "A collection of high-quality React components for modern web applications.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "support",
      "email": "support@watermelon-ui.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  });

  return (
    <>
      <SEOHead
        title="Featured Components"
        description="Explore our collection of high-quality, customizable React components built with modularity and performance in mind."
        schema={organizationSchema}
        image="/og-image.png"
      />

      <div className="space-y-12">
        {/* Components Section */}
        <section id="components" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="tracking-tight text-sm md:text-base">Featured Components</h2>
            <Link
              to="/components"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all ({registry.length})
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <RegistryCard
                key={item.slug}
                item={item}
                onClick={(item) => setSelectedItem(item)}
              />
            ))}
          </div>
        </section>

        {/* Dashboards Section */}
        <section id="dashboards" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="tracking-tight text-sm md:text-base">Dashboard Templates</h2>
            <Link
              to="/dashboards"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all ({dashboards.length})
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredDashboards.map((item) => (
              <DashboardCard
                key={item.slug}
                item={item}
                onClick={(item) => setSelectedDashboard(item)}
              />
            ))}
          </div>
        </section>

        {/* Blocks Section */}
        <section id="blocks" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="tracking-tight text-sm md:text-base">UI Blocks</h2>
            <Link
              to="/blocks"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all ({blocks.length})
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredBlocks.map((item) => (
              <DashboardCard
                key={item.slug}
                item={item as unknown as DashboardItem}
                onClick={(item) => setSelectedBlock(item as unknown as BlockItem)}
              />
            ))}
          </div>
        </section>

        {/* Footer with Semantic Sections */}
        <footer className="border-t py-2 sr-only">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-muted-foreground">
            <section id="about" className="space-y-2">
              <h2 className="font-semibold text-foreground">About</h2>
              <p>
                Watermelon UI is a comprehensive component registry improving developer experience with accessible, performant, and beautiful UI blocks.
              </p>
            </section>

            <section id="team" className="space-y-2">
              <h2 className="font-semibold text-foreground">Team</h2>
              <p>
                Maintained by a dedicated team of open-source contributors.
              </p>
            </section>

            <section id="contact" className="space-y-2">
              <h2 className="font-semibold text-foreground">Contact</h2>
              <p>
                For support and inquiries, please reach out via GitHub issues or email <a href="mailto:support@watermelon-ui.com" className="hover:text-foreground underline underline-offset-4">support@watermelon-ui.com</a>.
              </p>
            </section>
          </div>
        </footer>

        <ComponentModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />

        <DashboardModal
          item={selectedDashboard}
          onClose={() => setSelectedDashboard(null)}
        />

        <BlockModal
          item={selectedBlock}
          onClose={() => setSelectedBlock(null)}
        />
      </div>
    </>
  );
}
