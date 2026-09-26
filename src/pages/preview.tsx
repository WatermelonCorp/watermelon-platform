import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { dashboards } from '@/data/dashboards';
import { blocks } from '@/data/blocks';
import { templates } from '@/data/templates';
import { uiRegistry, uiCategories, type UiVariant } from '@/data/components-registry';

export default function PreviewPage() {
  const { type, category, slug } = useParams<{
    type?: string;
    category?: string;
    slug?: string;
  }>();
  const [searchParams] = useSearchParams();

  const theme = searchParams.get('theme') || 'light';
  const transparent = searchParams.get('transparent') === 'true';
  const border = searchParams.get('border') !== 'false';
  const widthParam = searchParams.get('width');
  const width = widthParam ? Math.max(300, Math.min(2400, Number(widthParam))) : 800;
  const height = Math.round((width * 3) / 4); // Exact 4:3 aspect ratio

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // 1. Dashboards
  if (type === 'dashboard') {
    const Component = dashboards.find((d) => d.slug === slug)?.component;
    if (!Component) {
      return (
        <div className="flex items-center justify-center p-8 text-muted-foreground w-full h-screen">
          Preview not found for dashboard: {slug}
        </div>
      );
    }
    return (
      <div id="preview-root" className="w-full min-h-screen bg-background text-foreground overflow-x-hidden">
        <Component />
      </div>
    );
  }

  // 2. Blocks
  if (type === 'block') {
    const Component = blocks.find((b) => b.slug === slug)?.component;
    if (!Component) {
      return (
        <div className="flex items-center justify-center p-8 text-muted-foreground w-full h-screen">
          Preview not found for block: {slug}
        </div>
      );
    }
    return (
      <div id="preview-root" className="w-full min-h-screen bg-background text-foreground overflow-x-hidden">
        <Component />
      </div>
    );
  }

  // 3. Templates
  if (type === 'template') {
    const Component = templates.find((t) => t.slug === slug)?.component;
    if (!Component) {
      return (
        <div className="flex items-center justify-center p-8 text-muted-foreground w-full h-screen">
          Preview not found for template: {slug}
        </div>
      );
    }
    return (
      <div id="preview-root" className="w-full min-h-screen bg-background text-foreground overflow-x-hidden">
        <Component />
      </div>
    );
  }

  // 4. Base UI Components
  if (type === 'component' || type === 'components') {
    let currentVariant: UiVariant | null = null;
    let resolvedCategory = category || '';

    // Route pattern A: /preview/component/:category/:slug
    if (category && uiRegistry[category]) {
      if (slug) {
        currentVariant =
          uiRegistry[category].find(
            (v) => v.id === slug || v.id === `${category}-${slug}`,
          ) || null;
      }
      if (!currentVariant) {
        currentVariant = uiRegistry[category][0] || null;
      }
      resolvedCategory = category;
    }

    // Route pattern B: /preview/component/:slug
    if (!currentVariant && slug) {
      if (uiRegistry[slug]) {
        // slug is category name
        currentVariant = uiRegistry[slug][0] || null;
        resolvedCategory = slug;
      } else {
        // slug is variant id
        for (const [catName, variants] of Object.entries(uiRegistry)) {
          const found = variants.find((v) => v.id === slug);
          if (found) {
            currentVariant = found;
            resolvedCategory = catName;
            break;
          }
        }
      }
    }

    if (!currentVariant || !currentVariant.component) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-muted-foreground w-full min-h-screen gap-4">
          <p className="text-xl font-semibold text-foreground">Component Not Found</p>
          <p className="text-sm">
            Could not find component for: {category ? `${category}/` : ''}{slug || '(none)'}
          </p>
          <div className="flex gap-2">
            <Link to="/preview/components" className="text-sm text-primary underline">
              Browse all previewable components
            </Link>
          </div>
        </div>
      );
    }

    const Component = currentVariant.component;
    const isWide = Boolean(currentVariant.colSpan && currentVariant.colSpan > 1);

    return (
      <div
        id="preview-root"
        className={`min-h-screen w-full flex items-center justify-center p-4 sm:p-8 ${
          theme === 'dark' ? 'dark bg-neutral-950 text-neutral-100' : 'bg-neutral-100 text-neutral-900'
        }`}
      >
        {/*
          4:3 Capture Box
          This container is targeted directly by Playwright for clean, consistent 4:3 screenshotting
        */}
        <div
          id="capture-box"
          data-capture-box
          data-category={resolvedCategory}
          data-variant-id={currentVariant.id}
          style={{ width: `${width}px`, height: `${height}px` }}
          className={`relative aspect-4/3 overflow-hidden flex items-center justify-center p-8 sm:p-12 transition-all ${
            transparent
              ? 'bg-transparent'
              : theme === 'dark'
                ? `bg-neutral-900 text-neutral-100 ${border ? 'border border-neutral-800 rounded-2xl shadow-sm' : ''}`
                : `bg-white text-neutral-900 ${border ? 'border border-neutral-200/80 rounded-2xl shadow-sm' : ''}`
          }`}
        >
          <div
            id="component-wrapper"
            className="flex items-center justify-center max-w-full max-h-full"
          >
            <div
              id="component-content"
              className={`flex w-fit items-center justify-center ${isWide ? 'max-w-2xl' : 'max-w-md'}`}
            >
              <Component />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. Index / Catalog of all components if visiting /preview or /preview/components
  return (
    <div className="min-h-screen bg-background text-foreground p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Component Screenshot Previews</h1>
        <p className="text-muted-foreground mt-2">
          Select any component to preview in an isolated 4:3 capture box for screenshots.
        </p>
      </div>

      <div className="space-y-8">
        {uiCategories.map((cat) => {
          const variants = uiRegistry[cat.slug] ?? [];
          return (
            <div key={cat.slug} className="border rounded-xl p-5 bg-card">
              <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <div>
                  <h2 className="text-lg font-semibold">{cat.label}</h2>
                  <p className="text-xs text-muted-foreground">{variants.length} variants</p>
                </div>
                <Link
                  to={`/preview/component/${cat.slug}`}
                  className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90"
                >
                  Preview Category Primary (4:3)
                </Link>
              </div>

              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <Link
                    key={v.id}
                    to={`/preview/component/${cat.slug}/${v.id}`}
                    className="text-xs px-2.5 py-1 rounded-md border bg-muted/40 hover:bg-accent text-foreground hover:text-foreground transition-colors font-mono"
                  >
                    {v.id}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
