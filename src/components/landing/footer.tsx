import {
  ArrowUpRight01Icon,
  NewTwitterIcon,
  GithubIcon,
  DiscordIcon,
} from 'hugeicons-react';
import { cn } from '@/lib/utils';
import LogoIcon from '@/assets/logo-icon';

export default function Footer() {
  return (
    <footer className="bg-background text-foreground relative mt-24 overflow-hidden border-t border-white/5 font-mono">
      {/* Decorative Technical Crosshairs at the very edges */}
      <div className="pointer-events-none absolute top-0 left-0 h-8 w-8">
        <div className="absolute top-0 left-4 h-full w-px bg-white/10" />
        <div className="absolute top-4 left-0 h-px w-full bg-white/10" />
      </div>
      <div className="pointer-events-none absolute top-0 right-0 h-8 w-8">
        <div className="absolute top-0 right-4 h-full w-px bg-white/10" />
        <div className="absolute top-4 right-0 h-px w-full bg-white/10" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12 md:px-8 lg:px-12 xl:px-16">
        {/* Top Grid */}
        <div className="relative grid grid-cols-1 gap-12 border-b border-white/5 pb-16 lg:grid-cols-12 lg:gap-8">
          {/* Left Side: Brand & Newsletter (span 5) */}
          <div className="flex flex-col items-start pr-0 lg:col-span-5 lg:pr-8">
            <div className="text-primary mb-6 flex items-center gap-2 font-mono text-xs tracking-widest">
              <span className="opacity-70">{'//'}</span> WATERMELON UI
            </div>
            <h3 className="mb-6 font-sans text-3xl tracking-tight text-balance md:text-5xl">
              Building the future <br className="hidden lg:block" /> of
              interfaces
            </h3>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-pretty text-white/50">
              Watermelon UI is the foundational layer for modern web
              applications—beautifully designed, perfectly animated, and deeply
              technical
            </p>

            <a
              href="/home"
              className="text-background bg-primary hover:bg-primary/90 inline-flex w-fit items-center justify-center px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors active:scale-[0.96]"
            >
              Explore Docs <ArrowUpRight01Icon className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Right Side: Links (span 7) */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-7 lg:pl-8">
            {/* Link Column 1 */}
            <div className="flex flex-col gap-5">
              <div className="text-primary mb-2 flex gap-2 font-mono text-xs tracking-widest">
                <span className="opacity-70">{'//'}</span> PRODUCT
              </div>
              <a
                href="/animated-components"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                Animated
              </a>
              <a
                href="/components"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                Components
              </a>
              {/* <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Templates</a> */}
              <a
                href="/blocks"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                Blocks
              </a>
              <a
                href="/dashboards"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                Dashboards
              </a>
              {/* <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Figma Kit</a> */}
            </div>
            {/* Link Column 2 */}
            {/* <div className="flex flex-col gap-5">
                 <div className="text-primary font-mono text-xs mb-2 tracking-widest flex gap-2"><span className="opacity-70">{"//"}</span> RESOURCES</div>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Docs</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Examples</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Showcase</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Blog</a>
               </div> */}
            {/* Link Column 3 */}
            <div className="flex flex-col gap-5">
              <div className="text-primary mb-2 flex gap-2 font-mono text-xs tracking-widest">
                <span className="opacity-70">{'//'}</span> COMMUNITY
              </div>
              <a
                href=""
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                Discord
              </a>
              <a
                href="https://github.com/WatermelonCorp/watermelon-platform"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://x.com/watermelonui"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                X (Twitter)
              </a>
            </div>
            {/* Link Column 4 */}
            <div className="flex flex-col gap-5">
              <div className="text-primary mb-2 flex gap-2 font-mono text-xs tracking-widest">
                <span className="opacity-70">{'//'}</span> COMPANY
              </div>
              <a
                href="/terms"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                Terms
              </a>
              <a
                href="/privacy"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                Privacy
              </a>
              <a
                href="/copyright"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                Copyright
              </a>
            </div>
          </div>

          {/* Vertical divider line for desktop */}
          <div className="absolute top-0 bottom-0 left-[41.666%] hidden w-px bg-white/5 lg:block" />
        </div>

        {/* Middle Section (Strip) */}
        <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden border-b border-white/5 py-6 md:flex-row">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[16px_16px]" />
          <div className="relative z-10 flex w-full flex-col items-center justify-between gap-6 px-2 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="bg-primary h-2 w-2 animate-pulse rounded-full shadow-[0_0_8px_rgba(163,255,18,0.6)]" />
              <span className="text-primary font-mono text-xs tracking-widest uppercase">
                Built for developers
              </span>
            </div>

            {/* Cool loading bar graphic */}
            <div className="hidden items-center gap-[2px] opacity-80 lg:flex">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-4 w-1.5 transition-colors',
                    i < 12 ? 'bg-primary' : 'bg-white/10',
                  )}
                />
              ))}
            </div>

            <div className="text-primary font-mono text-xs tracking-widest">
              {'[ WATERMELON UI ]'}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-start justify-between gap-8 pt-12 xl:flex-row xl:items-center">
          <div className="flex w-full flex-col gap-8 md:flex-row md:items-center md:gap-12 xl:w-auto">
            {/* Logo / Left */}
            <div className="flex items-center gap-3">
              <div className="group relative flex h-8 w-8 items-center justify-center">
                <LogoIcon className="text-primary h-full w-full" />
              </div>
              <span className="font-sans text-lg font-bold tracking-tight text-white/90">
                Watermelon UI
              </span>
            </div>

            <div className="hidden flex-col border-l border-white/10 pl-8 md:flex">
              <span className="text-xs tracking-widest text-white/40">
                The foundational layer for apps.
              </span>
              <span className="text-xs tracking-widest text-white/40">
                Fast. Animated. Technical.
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-4 text-xs tracking-widest text-white/40 uppercase md:flex-row md:items-center md:gap-16 xl:w-auto xl:justify-end">
            <div className="flex flex-col gap-1">
              <span>&copy; 2026 Watermelon UI.</span>
              <span>All rights reserved.</span>
            </div>
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-3 xl:w-auto xl:items-end">
            <div className="text-primary flex items-center gap-2 font-mono text-xs tracking-widest">
              <span className="opacity-70">{'//'}</span> CONNECT
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/watermelonui"
                className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/2 text-white/50 transition-all hover:border-white/30 hover:text-white"
              >
                <NewTwitterIcon className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/WatermelonCorp/watermelon-platform"
                className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/2 text-white/50 transition-all hover:border-white/30 hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/2 text-white/50 transition-all hover:border-white/30 hover:text-white"
              >
                <DiscordIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Crosshairs */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-8">
        <div className="absolute bottom-0 left-4 h-full w-px bg-white/10" />
        <div className="absolute bottom-4 left-0 h-px w-full bg-white/10" />
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 h-8 w-8">
        <div className="absolute right-4 bottom-0 h-full w-px bg-white/10" />
        <div className="absolute right-0 bottom-4 h-px w-full bg-white/10" />
      </div>
    </footer>
  );
}
