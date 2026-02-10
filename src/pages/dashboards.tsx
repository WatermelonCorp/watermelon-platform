import { useState } from 'react';
import { dashboards, type DashboardItem } from '@/data/dashboards';
import { SEOHead } from '@/components/seo-head';
import { DashboardCard } from '@/components/registry/dashboard-card';
import { DashboardModal } from '@/components/registry/dashboard-modal';

export default function DashboardsPage() {
  const [selectedItem, setSelectedItem] = useState<DashboardItem | null>(null);

  return (
    <>
      <SEOHead
        title="Dashboard Templates"
        description="Explore our collection of pre-built dashboard templates with charts, tables, and analytics components."
        category="Dashboards"
      />

      <div className="space-y-12">
        <section id="dashboards" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-medium tracking-tight">Dashboards</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Pre-built dashboard templates with full source code
              </p>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">{dashboards.length} dashboards available</p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboards.map((item) => (
              <DashboardCard
                key={item.slug}
                item={item}
                onClick={(item) => setSelectedItem(item)}
              />
            ))}
          </div>
        </section >

        <DashboardModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div >
    </>
  );
}
