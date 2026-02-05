import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { registry, type RegistryItem } from '@/data/registry';
import { RegistryCard } from '@/components/registry/registry-card';
import { ComponentModal } from '@/components/registry/component-modal';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);

  // For home page, we might want to show featured or all. Let's show all for now.
  // In a real app, you might have a "featured" flag.
  const featuredItems = registry;

  return (
    <>
      <Helmet>
        <title>Component Registry | Home</title>
        <meta name="description" content="A collection of high-quality React components." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Featured Components</h1>
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

        <ComponentModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </>
  );
}
