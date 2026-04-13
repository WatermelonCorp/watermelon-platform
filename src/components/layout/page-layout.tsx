import { type ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollProgress, ScrollProgressContainer } from '@/components/animate-ui/primitives/animate/scroll-progress';
import { Navbar } from './navbar';

const scrollPositions = new Map<string, number>();

interface PageLayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  showScrollProgress?: boolean;
}

export function PageLayout({
  children,
  showNavbar = true,
  showScrollProgress = true,
}: PageLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // 1. Restore scroll position on route change
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const savedPosition = scrollPositions.get(location.pathname);
    
    // Use requestAnimationFrame to ensure the DOM has updated before jumping
    requestAnimationFrame(() => {
      if (savedPosition !== undefined) {
        el.scrollTop = savedPosition;
      } else {
        el.scrollTop = 0;
      }
    });
  }, [location.pathname]);

  // 2. Track scroll position for the current route
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    scrollPositions.set(location.pathname, target.scrollTop);
  };

  return (
    <>
      {/* ScrollProgressContainer IS the scrollable element */}
      <ScrollProgressContainer 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto rounded-xl m-2 bg-background border md:border-none md:m-0"
      >
        {showNavbar && <Navbar />}

        <main className="flex flex-col gap-4 px-2 md:px-3 min-h-[calc(100vh-10.5rem)]">
          {children}
        </main>

      </ScrollProgressContainer>
      {/* Scroll progress bar - sticky at bottom */}
      {showScrollProgress && (
        <ScrollProgress
          className="fixed bottom-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
          mode="scaleX"
        />
      )}
    </>
  );
}
