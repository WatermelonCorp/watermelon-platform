import { useState } from 'react';
import { blocks } from '@/data/blocks';
import { DashboardCard } from '@/components/registry/dashboard-card';
import { BlockModal } from '@/components/registry/block-modal';
import type { BlockItem } from '@/data/blocks';
import { SEOHead } from '@/components/seo-head';


export default function BlocksPage() {
  const [selectedBlock, setSelectedBlock] = useState<BlockItem | null>(null);



  return (
    <>
      <SEOHead
        title="UI Blocks - Pre-built Sections"
        description="Browse our collection of pre-built UI blocks. Copy and paste beautiful hero sections, features, pricing, and more."
      />

      <div className="px-2 md:px-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-medium tracking-tight">UI Blocks</h2>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
            Pre-built UI sections ready to drop into your projects. Each block is fully customizable and responsive.
          </p>
        </div>

        {/* Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((block) => (
            <DashboardCard
              key={block.slug}
              item={block}
              trackType="block"
              onClick={() => !block.comingSoon && setSelectedBlock(block)}
            />
          ))}
        </div>

        {/* Empty State */}
        {blocks.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No blocks available yet. Check back soon!
          </div>
        )}
      </div>

      {/* Block Modal */}
      <BlockModal
        item={selectedBlock}
        onClose={() => setSelectedBlock(null)}
      />
    </>
  );
}
