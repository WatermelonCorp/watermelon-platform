import { ArrowUpRight01Icon, NewTwitterIcon, GithubIcon, DiscordIcon } from "hugeicons-react";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-white/5 relative overflow-hidden mt-24 font-mono">
      {/* Decorative Technical Crosshairs at the very edges */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
        <div className="absolute top-0 left-4 w-px h-full bg-white/10" />
        <div className="absolute top-4 left-0 w-full h-px bg-white/10" />
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
        <div className="absolute top-0 right-4 w-px h-full bg-white/10" />
        <div className="absolute top-4 right-0 w-full h-px bg-white/10" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-20 pb-12 relative z-10">
         {/* Top Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-white/5 pb-16 relative">
            {/* Left Side: Brand & Newsletter (span 5) */}
            <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
               <div className="text-primary font-mono text-xs tracking-widest mb-6 flex items-center gap-2">
                 <span className="opacity-70">{"//"}</span> WATERMELON UI
               </div>
               <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance font-sans">
                 Building the future <br className="hidden lg:block"/> of interfaces.
               </h3>
               <p className="text-white/50 mb-8 max-w-md text-pretty text-sm leading-relaxed">
                 Watermelon UI is the foundational layer for modern web applications—beautifully designed, perfectly animated, and deeply technical.
               </p>
               
               <a href="/docs" className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold text-background bg-primary uppercase tracking-widest hover:bg-primary/90 transition-colors active:scale-[0.96] w-fit">
                 Explore Docs <ArrowUpRight01Icon className="ml-2 w-4 h-4" />
               </a>
            </div>
            
            {/* Right Side: Links (span 7) */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8 lg:pl-8">
               {/* Link Column 1 */}
               <div className="flex flex-col gap-5">
                 <div className="text-primary font-mono text-xs mb-2 tracking-widest flex gap-2"><span className="opacity-70">{"//"}</span> PRODUCT</div>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Components</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Templates</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">CLI</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Figma Kit</a>
               </div>
               {/* Link Column 2 */}
               <div className="flex flex-col gap-5">
                 <div className="text-primary font-mono text-xs mb-2 tracking-widest flex gap-2"><span className="opacity-70">{"//"}</span> RESOURCES</div>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Docs</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Examples</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Showcase</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Blog</a>
               </div>
               {/* Link Column 3 */}
               <div className="flex flex-col gap-5">
                 <div className="text-primary font-mono text-xs mb-2 tracking-widest flex gap-2"><span className="opacity-70">{"//"}</span> COMMUNITY</div>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Discord</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">GitHub</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">X (Twitter)</a>
               </div>
               {/* Link Column 4 */}
               <div className="flex flex-col gap-5">
                 <div className="text-primary font-mono text-xs mb-2 tracking-widest flex gap-2"><span className="opacity-70">{"//"}</span> COMPANY</div>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">About</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Open Source</a>
                 <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">License</a>
               </div>
            </div>
            
            {/* Vertical divider line for desktop */}
            <div className="hidden lg:block absolute left-[41.666%] top-0 bottom-0 w-px bg-white/5" />
         </div>
         
         {/* Middle Section (Strip) */}
         <div className="py-6 border-b border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[16px_16px]" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 px-2 w-full">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(163,255,18,0.6)]" />
                  <span className="text-xs font-mono text-primary tracking-widest uppercase">Built for developers.</span>
               </div>
               
               {/* Cool loading bar graphic */}
               <div className="hidden lg:flex items-center gap-[2px] opacity-80">
                  {[...Array(30)].map((_, i) => (
                     <div key={i} className={cn("w-1.5 h-4 transition-colors", i < 12 ? "bg-primary" : "bg-white/10")} />
                  ))}
               </div>
               
               <div className="text-xs font-mono text-primary tracking-widest">
                 {"[ WATERMELON UI ]"}
               </div>
            </div>
         </div>

         {/* Bottom Section */}
         <div className="pt-12 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 w-full xl:w-auto">
              {/* Logo / Left */}
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 border border-white/20 flex flex-wrap items-center justify-center p-1.5 gap-0.5 relative group bg-white/5">
                   <div className="w-2 h-2 bg-primary" />
                   <div className="w-2 h-2 bg-white/20" />
                   <div className="w-2 h-2 bg-white/20" />
                   <div className="w-2 h-2 bg-primary" />
                 </div>
                 <span className="font-bold text-lg tracking-tight font-sans text-white/90">Watermelon UI</span>
              </div>
              
              <div className="hidden md:flex flex-col border-l border-white/10 pl-8">
                <span className="text-xs text-white/40 tracking-widest">The foundational layer for apps.</span>
                <span className="text-xs text-white/40 tracking-widest">Fast. Animated. Technical.</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16 text-xs text-white/40 w-full xl:w-auto justify-between xl:justify-end uppercase tracking-widest">
               <div className="flex flex-col gap-1">
                 <span>&copy; 2026 Watermelon UI.</span>
                 <span>All rights reserved.</span>
               </div>
               <div className="flex gap-4 md:gap-6">
                 <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                 <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
               </div>
            </div>

            <div className="flex flex-col items-start xl:items-end gap-3 w-full xl:w-auto">
               <div className="text-primary font-mono text-xs tracking-widest flex items-center gap-2">
                 <span className="opacity-70">{"//"}</span> CONNECT
               </div>
               <div className="flex items-center gap-4">
                  <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-white/2">
                    <NewTwitterIcon className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-white/2">
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-white/2">
                    <DiscordIcon className="w-4 h-4" />
                  </a>
               </div>
            </div>
         </div>
      </div>
      
      {/* Bottom Decorative Crosshairs */}
      <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
        <div className="absolute bottom-0 left-4 w-px h-full bg-white/10" />
        <div className="absolute bottom-4 left-0 w-full h-px bg-white/10" />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
        <div className="absolute bottom-0 right-4 w-px h-full bg-white/10" />
        <div className="absolute bottom-4 right-0 w-full h-px bg-white/10" />
      </div>
    </footer>
  );
}
