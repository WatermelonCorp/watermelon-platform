import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { PageHeader } from '@/components/layout/page-header';
import { CommandPalette } from '@/components/layout/command-palette';
import { registry } from '@/data/registry';
// import { dashboards } from '@/data/dashboards';
// import { blocks } from '@/data/blocks';
import { LogoIcon } from './logo';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Book02Icon } from '@/lib/hugeicons';
import { Link } from 'react-router-dom';

// Route config for breadcrumbs - easy to extend
const routeConfig: Record<string, { label: string; href?: string }> = {
  '/': { label: 'Components' },
  '/basic-usage': { label: 'Basic Usage' },
  '/installation': { label: 'Installation' },
  '/framework-support': { label: 'Framework Support' },
  '/cli': { label: 'CLI' },
  // '/dashboards': { label: 'Dashboards' },
  // '/blocks': { label: 'Blocks' },
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

    // Component detail page: /components/:slug
    if (path.startsWith('/components/') && !path.includes('/category/')) {
      const slug = params.slug || path.split('/').pop();
      const item = registry.find((i) => i.slug === slug);
      if (item) {
        return [
          { label: 'Components', href: '/' },
          {
            label:
              item.category.charAt(0).toUpperCase() + item.category.slice(1),
            href: `/components/category/${item.category}`,
          },
          { label: item.name },
        ];
      }
    }

    // Category page: /components/category/:category
    if (path.includes('/components/category/')) {
      const category = params.category || path.split('/').pop() || '';
      const title = category.charAt(0).toUpperCase() + category.slice(1);
      return [{ label: 'Components', href: '/' }, { label: title }];
    }

    // Dashboards disabled
    // if (path.startsWith('/dashboard/')) {
    //   const slug = params.slug || path.split('/').pop();
    //   const item = dashboards.find((d) => d.slug === slug);
    //   if (item) {
    //     return [
    //       { label: 'Dashboards', href: '/dashboards' },
    //       { label: item.name },
    //     ];
    //   }
    // }

    // Block detail page: /block/:slug
    // if (path.startsWith('/block/')) {
    //   const slug = params.slug || path.split('/').pop();
    //   const item = blocks.find((b) => b.slug === slug);
    //   if (item) {
    //     return [{ label: 'Blocks', href: '/blocks' }, { label: item.name }];
    //   }
    // }

    // Default fallback
    return [{ label: 'Components' }];
  }, [location.pathname, params]);

  return (
    <header className="sticky top-0 z-20 h-14">
      {/* Progressive blur effect - fades from top (blurry) to bottom (clear) */}
      <ProgressiveBlur
        direction="top"
        blurLayers={8}
        blurIntensity={1.2}
        className="pointer-events-none absolute inset-0 -bottom-4 rounded-t-xl"
      />

      {/* Navbar content */}
      <nav className="relative z-10 flex h-14 items-center justify-between gap-2 px-4">
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
              <SidebarTrigger className="bg-background border-input/50 hover:bg-accent -ml-1 size-9 border" />
              <LogoIcon />
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
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/changelog"
            title="Changelog"
            className="
    border-input/50 bg-background hover:bg-accent
    text-muted-foreground hover:text-foreground
    flex h-9 items-center justify-center gap-2
    rounded-md border px-2 transition-colors
    md:w-auto md:px-3
  "
          >
            <HugeiconsIcon icon={Book02Icon} size={18} />
            <span className="hidden text-sm md:block">Changelog</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
