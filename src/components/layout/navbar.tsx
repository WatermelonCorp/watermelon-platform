import { ProgressiveBlur } from '../ui/progressive-blur';
import { SidebarTrigger } from '../ui/sidebar';
import { ThemeToggle } from './theme-toggle';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 h-20">
      {/* Progressive blur effect - fades from top (blurry) to bottom (clear) */}
      <ProgressiveBlur
        direction="top"
        blurLayers={8}
        blurIntensity={0.5}
        className="absolute inset-0 -bottom-4 pointer-events-none"
      />

      {/* Navbar content */}
      <nav className="relative z-10 flex h-16 items-center justify-between px-4">
        <SidebarTrigger className="-ml-1" />
        <ThemeToggle />
      </nav>
    </header>
  );
};
