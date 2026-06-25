import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GithubIcon, NewTwitterIcon, Menu01Icon, Cancel01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import LogoIcon from "@/assets/logo-icon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm py-3" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105">
             <LogoIcon className="w-full h-full text-primary" />
          </div>
          <span className="font-mono font-bold text-sm tracking-widest uppercase">Watermelon UI</span>
        </Link>



        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a href="https://github.com/WatermelonCorp/watermelon-platform" target="_blank" rel="noreferrer" className="flex items-center justify-center h-10 w-10 border border-white/10 bg-transparent text-white/50 hover:text-white hover:bg-white/5 transition-colors">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href="https://x.com/watermelonui" target="_blank" rel="noreferrer" className="flex items-center justify-center h-10 w-10 border border-white/10 bg-transparent text-white/50 hover:text-white hover:bg-white/5 transition-colors">
              <NewTwitterIcon className="w-4 h-4" />
            </a>
          </div>
          <Link to="/home" className="flex items-center h-10 bg-primary text-background font-mono font-bold tracking-widest uppercase px-6 text-xs hover:bg-primary/90 transition-colors active:scale-[0.96]">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            className="text-foreground p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Cancel01Icon className="w-6 h-6" /> : <Menu01Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border/50 shadow-lg p-4 flex flex-col gap-4 animate-fade-in-up">

          <div className="flex items-center justify-center gap-8 p-4 border-t border-border/50 mt-2">
            <a href="https://github.com/WatermelonCorp/watermelon-platform" className="text-muted-foreground hover:text-foreground"><GithubIcon className="w-6 h-6" /></a>
            <a href="https://x.com/watermelonui" className="text-muted-foreground hover:text-foreground"><NewTwitterIcon className="w-6 h-6" /></a>
          </div>
          <Link to="/home" className="w-full text-center bg-primary text-background font-mono font-bold tracking-widest uppercase px-4 py-4 text-xs hover:bg-primary/90 transition-colors active:scale-[0.96] mt-2">
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
