import { type ReactNode } from 'react';
import { ScrollProgress, ScrollProgressContainer } from '@/components/animate-ui/primitives/animate/scroll-progress';
import { Navbar } from './navbar';

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
  return (
    <>
      {/* ScrollProgressContainer IS the scrollable element */}
      <ScrollProgressContainer className="flex-1 overflow-y-auto rounded-xl m-2 bg-background border md:border-none md:m-0">
        {showNavbar && <Navbar />}

        <main className="flex flex-col gap-4 p-4 min-h-[calc(100vh-10.5rem)]">
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
