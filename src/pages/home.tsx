import { useState } from 'react';
import { registry, type RegistryItem } from '@/data/registry';
import { SEOHead } from '@/components/seo-head';
import { RegistryCard } from '@/components/registry/registry-card';
import { ComponentModal } from '@/components/registry/component-modal';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);

  // For home page, we might want to show featured or all. Let's show all for now.
  // In a real app, you might have a "featured" flag.
  const featuredItems = registry;

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
        <section id="components" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="tracking-tight">Featured Components</h2>
            <p className="text-muted-foreground">{featuredItems.length} components available</p>
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
      </div>
    </>
  );
}
