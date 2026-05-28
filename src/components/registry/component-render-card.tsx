import {
  useState,
  useCallback,
  useSyncExternalStore,
  type KeyboardEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Maximize01Icon } from '@hugeicons/core-free-icons';
import { Moon02Icon, Sun01Icon } from '@/lib/hugeicons';
import { useTheme } from 'next-themes';
import type { BlockItem } from '@/data/blocks';
import type { PreviewViewport } from '@/components/preview/responsive-preview-frame';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

/** Pixel height of the toolbar strip */
const TOOLBAR_HEIGHT = 48;

/** Viewport widths for non-desktop modes */
const VIEWPORT_WIDTHS: Record<Exclude<PreviewViewport, 'desktop'>, number> = {
  tablet: 768,
  mobile: 390,
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ComponentRenderCardProps {
  /** The block item whose live component will be rendered. */
  item: BlockItem;
  /** Optional click handler — if omitted, the card navigates to /block/:slug. */
  onClick?: () => void;
}

// ─── Viewport Options ────────────────────────────────────────────────────────

const VIEWPORT_OPTIONS: ReadonlyArray<{
  value: PreviewViewport;
  label: string;
}> = [
  { value: 'mobile',  label: 'Mobile'  },
  { value: 'tablet',  label: 'Tablet'  },
  { value: 'desktop', label: 'Desktop' },
] as const;

// ─── Subcomponents ────────────────────────────────────────────────────────────

/** Theme toggle that stops event propagation so the card click isn't triggered. */
function CardThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="flex items-center justify-center size-8 rounded-lg bg-background border border-input/50"
      >
        <div className="size-4 rounded bg-muted animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setTheme(isDark ? 'light' : 'dark');
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        'flex items-center justify-center size-8 rounded-lg transition-colors',
        'bg-background border border-input/50',
        'hover:bg-accent text-foreground/70 hover:text-foreground',
      )}
    >
      <HugeiconsIcon icon={isDark ? Sun01Icon : Moon02Icon} size={14} />
    </button>
  );
}

/** Pill-style viewport segmented control. */
function ViewportSwitcher({
  value,
  onChange,
}: {
  value: PreviewViewport;
  onChange: (v: PreviewViewport) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Select viewport"
      className="flex items-center bg-muted/60 rounded-lg p-0.5 gap-px border border-input/30"
    >
      {VIEWPORT_OPTIONS.map(({ value: v, label }) => (
        <button
          key={v}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(v);
          }}
          aria-label={`${label} preview`}
          aria-pressed={value === v}
          title={`${label} view`}
          className={cn(
            'px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 select-none',
            value === v
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/**
 * Renders the block component directly (no iframe) so the card height matches
 * the component's natural rendered height.
 *
 * - Desktop: full container width, auto height.
 * - Tablet / Mobile: centres a width-constrained box inside the full container,
 *   matching each viewport's canonical width.
 */
function InlineComponentPreview({
  item,
  viewport,
}: {
  item: BlockItem;
  viewport: PreviewViewport;
}) {
  if (item.comingSoon) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
        Coming Soon
      </div>
    );
  }

  if (viewport === 'desktop') {
    // Full width — component dictates height naturally.
    return (
      <div className="w-full">
        <item.component />
      </div>
    );
  }

  // Tablet / Mobile — centred, width-constrained box.
  const maxWidth = VIEWPORT_WIDTHS[viewport];
  return (
    <div className="w-full overflow-x-auto bg-muted/20 py-4">
      <div
        className="mx-auto overflow-hidden bg-background rounded-xl border border-neutral-200/50 dark:border-white/5 shadow-sm"
        style={{ width: maxWidth, maxWidth: '100%' }}
      >
        <item.component />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * `ComponentRenderCard`
 *
 * A full-width card that renders a live block component **directly** (no
 * sandboxed iframe) so the card height is always determined by the component's
 * natural size, not a hard-coded constant.
 *
 * - Toolbar: Mobile / Tablet / Desktop switcher + theme toggle + fullscreen.
 * - Clicking anywhere on the card (outside the toolbar) navigates to the
 *   block's detail page.
 * - Tablet / Mobile modes render the component inside a centred, width-
 *   constrained box matching each device's canonical width.
 */
export function ComponentRenderCard({
  item,
  onClick,
}: ComponentRenderCardProps) {
  const navigate = useNavigate();
  const [viewport, setViewport] = useState<PreviewViewport>('desktop');

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleCardClick = useCallback(() => {
    if (item.comingSoon) return;

    trackEvent('block_card_click', {
      slug: item.slug,
      name: item.name,
    });

    if (onClick) {
      onClick();
    } else {
      navigate(`/block/${item.slug}`);
    }
  }, [item, navigate, onClick]);

  const handleCardKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick();
      }
    },
    [handleCardClick],
  );

  const handleFullscreen = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!item.comingSoon) {
        navigate(`/block/${item.slug}`);
      }
    },
    [item, navigate],
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      role="button"
      tabIndex={item.comingSoon ? -1 : 0}
      aria-label={`${item.name} — click to view full page`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      onMouseEnter={() => {
        if ('preload' in item) {
          void (item as BlockItem & { preload?(): Promise<unknown> }).preload?.();
        }
      }}
      className={cn(
        'group relative w-full rounded-4xl p-2',
        'bg-gray-100 dark:bg-neutral-800',
        'backdrop-blur-xl backdrop-saturate-150',
        'shadow-[inset_0_1px_0_0_var(--color-gray-200),inset_0_2px_0_0_rgba(255,255,255,1)]',
        'dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]',
        'transition-all duration-300',
        item.comingSoon
          ? 'cursor-default opacity-60'
          : 'cursor-pointer hover:border-neutral-300 dark:hover:border-white/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      )}
    >
      {/* ── Title Row ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between pt-2 pb-3 px-2 gap-4">
        <span className="text-base font-medium text-foreground truncate leading-tight">
          {item.name}
        </span>

        {item.comingSoon && (
          <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-foreground/70">
            Coming Soon
          </span>
        )}
      </div>

      {/* ── Preview Panel ────────────────────────────────────────────────── */}
      {/*
        No fixed height here — the panel grows to fit whatever the component
        renders. The toolbar is sticky at the top via `position: sticky` so it
        stays visible as the content below it grows.
      */}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-[20px]',
          'border border-neutral-200/50 dark:border-white/5',
          'shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]',
          'dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]',
          'bg-background',
        )}
      >
        {/* Decorative inset ring */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/20 dark:ring-white/5 pointer-events-none z-20"
        />

        {/* ── Toolbar ───────────────────────────────────────────────────── */}
        <div
          className={cn(
            'sticky top-0 z-10 w-full',
            'flex items-center justify-between px-3',
            'bg-background/90 backdrop-blur-md',
            'border-b border-neutral-200/40 dark:border-white/5',
          )}
          style={{ height: TOOLBAR_HEIGHT }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left — viewport switcher */}
          <ViewportSwitcher value={viewport} onChange={setViewport} />

          {/* Right — theme toggle + fullscreen */}
          <div className="flex items-center gap-1.5">
            <CardThemeToggle />

            <button
              type="button"
              onClick={handleFullscreen}
              aria-label={`Open ${item.name} full page`}
              title="Open full page"
              className={cn(
                'flex items-center justify-center size-8 rounded-lg transition-colors',
                'bg-background border border-input/50',
                'hover:bg-accent text-foreground/70 hover:text-foreground',
              )}
            >
              <HugeiconsIcon icon={Maximize01Icon} size={14} />
            </button>
          </div>
        </div>

        {/* ── Live Component (auto-height) ──────────────────────────────── */}
        {/*
          Stops propagation so interacting with the component (e.g. typing in
          an input, clicking a button) doesn't trigger the card's navigate.
        */}
        <div onClick={(e) => e.stopPropagation()}>
          <InlineComponentPreview item={item} viewport={viewport} />
        </div>
      </div>
    </div>
  );
}
