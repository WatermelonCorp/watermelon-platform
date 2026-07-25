import { memo } from 'react';
import type { BlockItem } from '@/data/blocks';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlockImageCardProps {
  /** The block item to display a thumbnail for */
  block: BlockItem;
  /** Preview image URL (.avif) */
  imageUrl: string;
  /** Callback fired when the card is clicked */
  onClick: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * A thumbnail image card that shows a block's preview screenshot.
 * Used in the "image mode" of the block category page.
 */
export const BlockImageCard = memo(function BlockImageCard({
  block,
  imageUrl,
  onClick,
}: BlockImageCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${block.name}`}
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl',
        'bg-muted/40 border border-border/40',
        'transition-all duration-300 ease-out',
        'hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20',
        'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
        'cursor-pointer',
      )}
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={block.name}
          loading="lazy"
          decoding="async"
          className={cn(
            'h-full w-full object-cover object-top',
            'transition-transform duration-500 ease-out',
            'group-hover:scale-[1.03]',
          )}
        />

        {/* Hover overlay with block name */}
        <div
          className={cn(
            'absolute inset-0 flex items-end',
            'bg-linear-to-t from-black/60 via-black/10 to-transparent',
            'opacity-0 transition-opacity duration-300',
            'group-hover:opacity-100',
          )}
        >
          <span className="px-4 pb-3 text-sm font-medium text-white drop-shadow-sm">
            {block.name}
          </span>
        </div>
      </div>
    </button>
  );
});
