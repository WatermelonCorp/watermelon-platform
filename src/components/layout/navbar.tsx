import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { PageHeader } from '@/components/layout/page-header';
import { CommandPalette } from '@/components/layout/command-palette';
import { registry } from '@/data/animated-components-registry';
import { dashboards } from '@/data/dashboards';
import { blocks, blockCategories } from '@/data/blocks';
import { motion } from 'motion/react';
import { GlobalCssInput } from './global-css-input';

// Route config for breadcrumbs - easy to extend
const routeConfig: Record<string, { label: string; href?: string }> = {
  '/': { label: 'Home' },
  '/animated-components': { label: 'Animated Components' },
  '/components': { label: 'Components' },

  '/installation': { label: 'Installation' },
  '/framework-support': { label: 'Framework Support' },

  '/terms': { label: 'Terms' },
  '/privacy': { label: 'Privacy' },
  '/copyright': { label: 'Copyright' },
  '/dashboards': { label: 'Dashboards' },
  '/blocks': { label: 'Blocks' },
  '/changelog': { label: 'Changelog' },
};

export const Navbar = () => {
  const { state, isMobile } = useSidebar();
  const location = useLocation();
  const params = useParams();

  // Derive breadcrumb from current route - memoized for performance
  const breadcrumbItems = useMemo(() => {
    const path = location.pathname;

    // Static routes
    if (routeConfig[path]) {
      return [routeConfig[path]];
    }

    // Animated Component detail page: /animated-components/:slug
    if (path.startsWith('/animated-components/') && !path.includes('/category/')) {
      const slug = params.slug || path.split('/').pop();
      const item = registry.find((i) => i.slug === slug);
      if (item) {
        return [
          { label: 'Animated Components', href: '/animated-components' },
          {
            label:
              item.category.charAt(0).toUpperCase() + item.category.slice(1),
            href: `/animated-components/category/${item.category}`,
          },
          { label: item.name },
        ];
      }
    }

    // Animated Category page: /animated-components/category/:category
    if (path.includes('/animated-components/category/')) {
      const category = params.category || path.split('/').pop() || '';
      const title = category.charAt(0).toUpperCase() + category.slice(1);
      return [{ label: 'Animated Components', href: '/animated-components' }, { label: title }];
    }

    // New Component category page / UI Base Components: /components/:category
    if (path.startsWith('/components/')) {
      const category = params.category || path.split('/').pop() || '';
      const title = category.charAt(0).toUpperCase() + category.slice(1);
      return [{ label: 'Components' }, { label: title }];
    }

    // Dashboard detail page: /dashboard/:slug
    if (path.startsWith('/dashboard/')) {
      const slug = params.slug || path.split('/').pop();
      const item = dashboards.find((d) => d.slug === slug);
      if (item) {
        return [
          { label: 'Dashboards', href: '/dashboards' },
          { label: item.name },
        ];
      }
    }

    // Block category page: /blocks/:category
    if (path.startsWith('/blocks/')) {
      const catSlug = params.category || path.split('/').pop() || '';
      const catMeta = blockCategories.find((c) => c.slug === catSlug);
      const catLabel = catMeta?.label ?? catSlug.charAt(0).toUpperCase() + catSlug.slice(1);
      return [{ label: 'Blocks', href: '/blocks' }, { label: catLabel }];
    }

    // Block detail page: /block/:slug
    if (path.startsWith('/block/')) {
      const slug = params.slug || path.split('/').pop();
      const item = blocks.find((b) => b.slug === slug);
      if (item) {
        const catMeta = blockCategories.find((c) => c.slug === item.category);
        const catLabel = catMeta?.label ?? item.category.charAt(0).toUpperCase() + item.category.slice(1);
        return [
          { label: 'Blocks', href: '/blocks' },
          { label: catLabel, href: `/blocks/${item.category}` },
          { label: item.name },
        ];
      }
    }

    // Default fallback
    return [{ label: 'Home' }];
  }, [location.pathname, params]);

  return (
    <header className="sticky top-0 z-20 py-4 ">
      {/* Progressive blur effect - fades from top (blurry) to bottom (clear) */}
      <ProgressiveBlur
        direction="top"
        blurLayers={8}
        blurIntensity={1.2}
        className="pointer-events-none absolute inset-0 rounded-t-xl bg-background/90"
      />

      {/* Navbar content */}
      <nav className="relative z-10 flex items-center justify-between gap-2 px-4 md:px-6 lg:px-8">
        {/* Left: Sidebar trigger + logo on mobile/collapsed */}
        <div className="flex shrink-0 items-center gap-2">
          {(state === 'collapsed' || isMobile) && (
            <motion.div
              initial={{
                opacity: 0.8,
                scale: 0.8,
                x: -200,
                filter: 'blur(10px)',
              }}
              animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <SidebarTrigger className="bg-gray-100 dark:bg-neutral-800 rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] size-9" />
            </motion.div>
          )}
        </div>
        {/* Breadcrumbs - hidden on small screens, truncate on medium */}
        {breadcrumbItems.length > 0 && !isMobile && (
          <div className="hidden min-w-0 shrink lg:block">
            <PageHeader items={breadcrumbItems} />
          </div>
        )}
        {/* Center: Breadcrumbs + Command Palette */}
        <div className="flex min-w-0 flex-1 items-center justify-center gap-4">
          {/* Command Palette */}
          <div className="shrink-0">
            <CommandPalette />
          </div>
        </div>

        {/* Right: Socials + Theme */}
        <div className="flex shrink-0 items-center gap-3">
          <GlobalCssInput />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
