import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { registry, type RegistryItem } from '@/data/registry';
import { RegistryCard } from '@/components/registry/registry-card';
import { ComponentModal } from '@/components/registry/component-modal';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (!category) return [];
    return registry
      .filter(item => item.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [category]);

  const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';

  if (filteredItems.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Category not found</h2>
        <p className="text-muted-foreground">No components found for this category.</p>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{title} Components | Registry</title>
        <meta name="description" content={`Browse ${title} components.`} />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-medium tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-sm md:text-base">{filteredItems.length} components</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
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
