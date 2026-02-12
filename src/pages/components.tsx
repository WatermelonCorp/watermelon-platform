import { useState } from 'react';
import { registry, type RegistryItem } from '@/data/registry';
import { SEOHead } from '@/components/seo-head';
import { RegistryCard } from '@/components/registry/registry-card';
import { ComponentModal } from '@/components/registry/component-modal';

export default function ComponentsPage() {
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);

  return (
    <>
      <SEOHead
        title="All Components"
        description="Browse all Watermelon UI components. High-quality, customizable React components for modern web apps."
        category="Components"
      />

      <div className="space-y-12">
        <section id="components" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-medium tracking-tight">All Components</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Explore every component in the registry with source code and live preview
              </p>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">{registry.length} components available</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registry.map((item) => (
              <RegistryCard
                key={item.slug}
                item={item}
                onClick={(item) => setSelectedItem(item)}
              />
            ))}
          </div>
        </section>

        <ComponentModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </>
  );
}
