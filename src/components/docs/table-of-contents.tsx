import { useEffect, useRef, useState } from 'react';

export interface TOCItem {
  id: string;
  title: string;
  level: 1 | 2 | 3;
}

interface TableOfContentsProps {
  items: TOCItem[];
  title?: string;
  /** The scrollable container element (for IntersectionObserver root). Defaults to window. */
  scrollRoot?: Element | null;
}

// ── SVG outline config ────────────────────────────────────────────────────────
const SVG_W = 14;
const STROKE = 1.5;

function xOf(level: 1 | 2 | 3): number {
  if (level === 1) return 1;
  if (level === 2) return 7;
  return 13;
}

interface YRange { top: number; bottom: number }
interface PathInfo { d: string; totalH: number; ranges: YRange[] }

function buildPath(items: TOCItem[], ranges: YRange[]): PathInfo {
  if (!items.length || !ranges.length) return { d: '', totalH: 0, ranges: [] };
  const totalH = ranges[ranges.length - 1].bottom;
  let d = '';

  for (let i = 0; i < items.length; i++) {
    const x = xOf(items[i].level);
    const { top, bottom } = ranges[i];

    if (i === 0) {
      d += `M ${x} 0 L ${x} ${bottom}`;
    } else {
      const prevX = xOf(items[i - 1].level);
      const prevBottom = ranges[i - 1].bottom;
      if (prevX !== x) {
        // Cubic bezier bridge between indent levels
        d += ` C ${prevX} ${prevBottom + 8} ${x} ${top - 8} ${x} ${top}`;
      }
      d += ` L ${x} ${bottom}`;
    }
  }

  return { d, totalH, ranges };
}

// ─────────────────────────────────────────────────────────────────────────────

export function TableOfContents({ items, title = 'On this page', scrollRoot }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const [pathInfo, setPathInfo] = useState<PathInfo | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // ── Track active heading via IntersectionObserver + scroll-to-bottom fallback ──
  useEffect(() => {
    const root = scrollRoot !== undefined ? scrollRoot : null;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length === 0) return;
        for (const item of items) {
          if (visible.some(e => e.target.id === item.id)) {
            setActiveId(item.id);
            return;
          }
        }
      },
      { root, rootMargin: '-5% 0px -50% 0px', threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    // When scrolled to the very bottom, activate the last item
    const scrollEl = root ?? document.documentElement;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      if (scrollTop + clientHeight >= scrollHeight - 32) {
        const lastId = items[items.length - 1]?.id;
        if (lastId) setActiveId(lastId);
      }
    };
    scrollEl.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      obs.disconnect();
      scrollEl.removeEventListener('scroll', onScroll);
    };
  }, [items, scrollRoot]);


  // ── Measure item positions and build SVG path ─────────────────────────────
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const containerTop = containerRef.current.getBoundingClientRect().top;

      const ranges: YRange[] = items.map(item => {
        const el = itemRefs.current.get(item.id);
        if (!el) return { top: 0, bottom: 0 };
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top - containerTop,
          bottom: rect.bottom - containerTop,
        };
      });

      setPathInfo(buildPath(items, ranges));
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [items]);

  // ── Compute clip-path for animated thumb ──────────────────────────────────
  const activeIndex = items.findIndex(i => i.id === activeId);
  const totalH = pathInfo?.totalH ?? 0;
  const activeRange = pathInfo?.ranges[activeIndex];
  const clipTop = activeRange?.top ?? 0;
  const clipBottom = activeRange ? totalH - activeRange.bottom : totalH;

  return (
    <nav className="fixed top-30 right-10 w-48 hidden lg:block z-10">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <svg width="13" height="10" viewBox="0 0 13 10" className="shrink-0 text-gray-400 dark:text-neutral-600">
          <line x1="0" y1="1" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-neutral-500">
          {title}
        </span>
      </div>

      {/* Body: SVG column + item links */}
      <div className="relative flex gap-3" ref={containerRef}>

        {/* SVG outline column */}
        <div className="relative shrink-0" style={{ width: SVG_W }}>
          {pathInfo?.d && (
            <>
              {/* Static muted outline */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${SVG_W} ${totalH}`}
                width={SVG_W}
                height={totalH}
                className="absolute top-0 left-0"
                style={{ overflow: 'visible' }}
              >
                <path
                  d={pathInfo.d}
                  strokeWidth={STROKE}
                  fill="none"
                  strokeLinecap="round"
                  className="stroke-gray-200 dark:stroke-white/10"
                />
              </svg>

              {/* Animated thumb — same path, clipped to active range */}
              <div
                className="absolute top-0 left-0"
                style={{
                  clipPath: activeRange
                    ? `inset(${Math.max(0, clipTop - 1)}px -4px ${Math.max(0, clipBottom - 1)}px -4px)`
                    : 'inset(0px -4px 100% -4px)',
                  transition: 'clip-path 350ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={`0 0 ${SVG_W} ${totalH}`}
                  width={SVG_W}
                  height={totalH}
                  style={{ overflow: 'visible' }}
                >
                  <path
                    d={pathInfo.d}
                    strokeWidth={STROKE}
                    fill="none"
                    strokeLinecap="round"
                    className="stroke-foreground"
                  />
                </svg>
              </div>
            </>
          )}
        </div>

        {/* Item links */}
        <div className="flex-1 min-w-0">
          {items.map(item => (
            <div
              key={item.id}
              ref={el => {
                if (el) itemRefs.current.set(item.id, el);
                else itemRefs.current.delete(item.id);
              }}
              style={{ paddingLeft: `${(item.level - 1) * 8}px` }}
            >
              <a
                href={`#${item.id}`}
                className={`block w-full py-[5px] text-[12px] leading-snug transition-colors duration-200 truncate ${activeId === item.id
                    ? 'text-gray-900 font-medium dark:text-white'
                    : 'text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-300'
                  }`}
              >
                {item.title}
              </a>
            </div>
          ))}
        </div>

      </div>
    </nav>
  );
}
