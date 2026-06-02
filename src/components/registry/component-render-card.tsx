import {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useSyncExternalStore,
  type KeyboardEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Maximize01Icon } from '@hugeicons/core-free-icons';
import { Moon02Icon, Sun01Icon } from '@/lib/hugeicons';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import type { BlockItem } from '@/data/blocks';
import { ResponsivePreviewFrame, type PreviewViewport } from '@/components/preview/responsive-preview-frame';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/animate-ui/components/buttons/copy';
import { generatePromptForPlatform, PLATFORM_INFO } from '@/lib/prompt-template';
import type { ComponentFile } from '@/lib/types';
import { AnimatedCheck } from '@/components/animated-check';

// ─── Constants ────────────────────────────────────────────────────────────────

/** Pixel height of the toolbar strip */
const TOOLBAR_HEIGHT = 48;

/** Fixed height of the preview area (iframe needs explicit height to scale correctly) */
const PREVIEW_HEIGHT = 520;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ComponentRenderCardProps {
  /** The block item whose live component will be rendered. */
  item: BlockItem;
  /** Optional click handler — if omitted, the card navigates to /block/:slug. */
  onClick?: () => void;
}

// ─── Package Manager ──────────────────────────────────────────────────────────

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

const PM_LIST: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun'];

function buildCommand(pm: PackageManager, base: string): string {
  if (base.startsWith('npx shadcn') || base.includes('shadcn@latest add')) {
    const parts = base.trim().split(' ');
    const component = parts[parts.length - 1];
    switch (pm) {
      case 'pnpm': return `pnpm dlx shadcn@latest add ${component}`;
      case 'bun':  return `bunx --bun shadcn@latest add ${component}`;
      default:     return `npx shadcn@latest add ${component}`;
    }
  }
  if (base.startsWith('npm install') || base.startsWith('npm i ')) {
    const pkgs = base.replace(/^npm (install|i) /, '');
    switch (pm) {
      case 'yarn': return `yarn add ${pkgs}`;
      case 'pnpm': return `pnpm add ${pkgs}`;
      case 'bun':  return `bun add ${pkgs}`;
      default:     return `npm install ${pkgs}`;
    }
  }
  return base;
}

// ─── Viewport Options ─────────────────────────────────────────────────────────

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

// ─── Card Prompt Icons ────────────────────────────────────────────────────────

/**
 * The three platforms exposed as icon buttons in the card title row.
 * Each maps to a platform key in PLATFORM_INFO / generatePromptForPlatform.
 */
const CARD_PLATFORMS = ['LOVABLE', 'V0', 'BOLT'] as const;
type CardPlatform = (typeof CARD_PLATFORMS)[number];

interface CardPromptIconsProps {
  item: BlockItem;
}

/**
 * Lazily loads the block's source files on first click, then copies a
 * platform-tailored AI prompt to the clipboard — same content as PromptItems
 * on the block detail page.
 */
function CardPromptIcons({ item }: CardPromptIconsProps) {
  const [fileCodes, setFileCodes] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState<CardPlatform | null>(null);
  const [copyCount, setCopyCount] = useState(0);

  /** Load file source on first interaction (lazy). */
  const loadFiles = useCallback(async (): Promise<Record<string, string>> => {
    if (fileCodes) return fileCodes;
    setLoading(true);
    const results = await Promise.all(
      item.files.map(async (file) => {
        const code = await file.code();
        return { name: file.name, code };
      }),
    );
    const map: Record<string, string> = {};
    results.forEach(({ name, code }) => { map[name] = code; });
    setFileCodes(map);
    setLoading(false);
    return map;
  }, [fileCodes, item.files]);

  const handleCopy = useCallback(
    async (platform: CardPlatform) => {
      const codes = await loadFiles();
      const files: ComponentFile[] = item.files.map((f) => ({
        name: f.name,
        content: codes[f.name] ?? '',
      }));

      if (!files.some((f) => f.content?.trim())) return;

      const prompt = generatePromptForPlatform(platform, {
        componentName: item.name,
        files,
        dependencies: item.dependencies ?? [],
      });

      try {
        await navigator.clipboard.writeText(prompt);
        setCopiedPlatform(platform);
        setCopyCount((c) => c + 1);
        setTimeout(() => setCopiedPlatform(null), 2000);
        trackEvent('ai_prompt_copy', {
          platform,
          component_slug: item.slug,
          component_name: item.name,
          category: item.category,
          source: 'card',
          file_count: files.length,
          dependency_count: item.dependencies?.length ?? 0,
        });
      } catch (err) {
        console.error('Failed to copy prompt:', err);
      }
    },
    [loadFiles, item],
  );

  return (
    <div className="flex items-center gap-1.5">
      {CARD_PLATFORMS.map((platform) => {
        const info = PLATFORM_INFO[platform];
        const isCopied = copiedPlatform === platform;
        return (
          <button
            key={platform}
            type="button"
            aria-label={isCopied ? 'Copied!' : `Copy prompt for ${info.name}`}
            title={isCopied ? 'Copied!' : `Copy for ${info.name}`}
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
              void handleCopy(platform);
            }}
            className={cn(
              'flex items-center justify-center size-7 rounded-lg transition-all',
              'opacity-80 hover:opacity-100 disabled:opacity-40 disabled:cursor-wait cursor-pointer',
            )}
          >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <AnimatedCheck
                  key={`check-${platform}-${copyCount}`}
                  className="h-4 w-4 text-primary"
                />
              ) : (
                <motion.img
                  key="icon"
                  src={info.icon}
                  alt={info.name}
                  width={16}
                  height={16}
                  className={cn(
                    'w-4 h-4 object-contain shrink-0',
                    platform === 'V0'
                      ? 'invert dark:invert-0'
                      : platform !== 'LOVABLE'
                        ? 'dark:invert'
                        : '',
                  )}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                />
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

// ─── Inline Install Bar ───────────────────────────────────────────────────────

interface InlineInstallBarProps {
  install?: string[];
  slug: string;
  name: string;
  category?: string;
}

/**
 * Compact install bar: PM dropdown trigger + animated command text + inline copy button.
 * Sits at the right end of the card title row.
 */
function InlineInstallBar({ install, slug, name, category }: InlineInstallBarProps) {
  const [activePm, setActivePm] = useState<PackageManager>('npm');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [dropdownOpen]);

  const baseCommand = useMemo(
    () => (install && install.length > 0 ? install[0] : `npx shadcn@latest add ${slug}`),
    [install, slug],
  );

  const command = useMemo(
    () => buildCommand(activePm, baseCommand),
    [activePm, baseCommand],
  );

  function selectPm(pm: PackageManager) {
    setActivePm(pm);
    setDropdownOpen(false);
    trackEvent('install_pm_select', {
      package_manager: pm,
      slug,
      name,
      category,
      entity_type: 'block',
      source_context: 'card',
    });
  }

  return (
    <div
      className="flex items-center gap-1.5"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── PM dropdown ─────────────────────────────────────────────── */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          aria-label={`Package manager: ${activePm}`}
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen((v) => !v);
          }}
          className={cn(
            'flex items-center gap-1 h-7 px-2 rounded-lg border text-xs font-medium',
            'bg-muted/60 border-input/30 text-foreground',
            'hover:bg-muted transition-colors select-none',
          )}
        >
          <span>{activePm}</span>
          <ChevronDownIcon
            size={11}
            className={cn(
              'text-muted-foreground transition-transform duration-150',
              dropdownOpen && 'rotate-180',
            )}
          />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              role="listbox"
              aria-label="Select package manager"
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className={cn(
                'absolute left-0 top-[calc(100%+4px)] z-200 min-w-[96px]',
                'rounded-xl border border-input/40 bg-background/95 backdrop-blur-md',
                'shadow-lg shadow-black/10 dark:shadow-black/40',
                'py-1 overflow-hidden',
              )}
            >
              {PM_LIST.map((pm) => {
                const isActive = activePm === pm;
                return (
                  <button
                    key={pm}
                    role="option"
                    aria-selected={isActive}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectPm(pm);
                    }}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-1.5 text-xs font-medium',
                      'transition-colors select-none',
                      isActive
                        ? 'text-foreground bg-muted/60'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40',
                    )}
                  >
                    <span>{pm}</span>
                    {isActive && <CheckIcon size={11} className="text-primary shrink-0" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Command display + inline copy ───────────────────────────── */}
      <div className={cn(
        'flex items-center gap-1 h-7 pl-2.5 pr-1',
        'bg-muted/50 rounded-lg border border-input/30',
        'font-mono text-[11px] text-muted-foreground',
        'max-w-[280px] overflow-hidden',
      )}>
        {/* Animated command text — truncated, no wrapping */}
        <AnimatePresence mode="wait">
          <motion.span
            key={`${activePm}-${baseCommand}`}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
          >
            {command}
          </motion.span>
        </AnimatePresence>

        {/* Copy button — sits flush inside the bar, no overlap */}
        <CopyButton
          variant="ghost"
          size="xs"
          content={command}
          ariaLabel={`Copy install command for ${name}`}
          className="shrink-0 size-5 text-muted-foreground hover:text-foreground"
          onCopiedChange={(copied) => {
            if (!copied) return;
            trackEvent('install_command_copy', {
              slug,
              name,
              category,
              package_manager: activePm,
              command,
              entity_type: 'block',
              source_context: 'card',
            });
          }}
        />
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
 * - Title row: block name (left) + brand icons + PM switcher + install command (right).
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
      <div className="relative z-50 flex items-center justify-between pt-2 pb-3 px-2 gap-3">
        {/* Left — block name + coming soon badge */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base font-medium text-foreground truncate leading-tight">
            {item.name}
          </span>

          {item.comingSoon && (
            <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-foreground/70">
              Coming Soon
            </span>
          )}
        </div>

        {/* Right — brand icons + PM switcher + install command (desktop only) */}
        {!item.comingSoon && (
          <div
            className="hidden md:flex items-center gap-3 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <CardPromptIcons item={item} />

            {/* Divider */}
            <div className="h-4 w-px bg-border/60" aria-hidden />

            <InlineInstallBar
              install={item.install}
              slug={item.slug}
              name={item.name}
              category={item.category}
            />
          </div>
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

        {/* ── Live Component via ResponsivePreviewFrame ─────────────────── */}
        {/*
          Uses the same iframe-based scaler as block.tsx so switching to
          Mobile / Tablet fires real CSS media queries at the correct viewport
          width instead of just squishing the layout.
        */}
        <div
          className="w-full"
          style={{ height: PREVIEW_HEIGHT }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.comingSoon ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              Coming Soon
            </div>
          ) : (
            <ResponsivePreviewFrame viewport={viewport}>
              <item.component />
            </ResponsivePreviewFrame>
          )}
        </div>
      </div>
    </div>
  );
}
