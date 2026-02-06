import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { PageHeader } from '@/components/layout/page-header';
import { CommandPalette } from '@/components/layout/command-palette';
import { Socials } from './socials';
import { registry } from '@/data/registry';
import { LogoIcon } from './logo';
import { motion } from 'framer-motion';

// Route config for breadcrumbs - easy to extend
const routeConfig: Record<string, { label: string; href?: string }> = {
  '/': { label: 'Components' },
  '/basic-usage': { label: 'Basic Usage' },
  '/installation': { label: 'Installation' },
  '/framework-support': { label: 'Framework Support' },
  '/cli': { label: 'CLI' },
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
      const item = registry.find(i => i.slug === slug);
      if (item) {
        return [
          { label: 'Components', href: '/' },
          { label: item.category.charAt(0).toUpperCase() + item.category.slice(1), href: `/components/category/${item.category}` },
          { label: item.name }
        ];
      }
    }

    // Category page: /components/category/:category
    if (path.includes('/components/category/')) {
      const category = params.category || path.split('/').pop() || '';
      const title = category.charAt(0).toUpperCase() + category.slice(1);
      return [
        { label: 'Components', href: '/' },
        { label: title }
      ];
    }

    // Default fallback
    return [{ label: 'Components' }];
  }, [location.pathname, params]);

  return (
    <header className="sticky top-0 z-20 h-20">
      {/* Progressive blur effect - fades from top (blurry) to bottom (clear) */}
      <ProgressiveBlur
        direction="top"
        blurLayers={8}
        blurIntensity={1.2}
        className="absolute inset-0 -bottom-4 pointer-events-none rounded-t-xl"
      />

      {/* Navbar content */}
      <nav className="relative z-10 flex h-16 items-center justify-between gap-2 px-4">
        {/* Left: Sidebar trigger + logo on mobile/collapsed */}
        <div className="flex items-center gap-2 shrink-0">
          {(state === "collapsed" || isMobile) && (
            <motion.div
              initial={{ opacity: 0.8, scale: 0.8, x: -200, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <SidebarTrigger className="-ml-1" />
              <LogoIcon />
            </motion.div>
          )}
        </div>
        {/* Breadcrumbs - hidden on small screens, truncate on medium */}
        {breadcrumbItems.length > 0 && !isMobile && (
          <div className="hidden lg:block shrink min-w-0">
            <PageHeader items={breadcrumbItems} />
          </div>
        )}
        {/* Center: Breadcrumbs + Command Palette */}
        <div className="flex-1 flex items-center justify-center gap-4 min-w-0">


          {/* Command Palette */}
          <div className="shrink-0">
            <CommandPalette />
          </div>
        </div>

        {/* Right: Socials + Theme */}
        <div className="flex items-center gap-2 shrink-0">
          <Socials />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
