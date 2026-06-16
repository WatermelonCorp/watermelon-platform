import { useState } from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, StarIcon, Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";


const PLACEHOLDER_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80",
];

interface Hero28Props {
  titleLine1Start?: string;
  titleLine1Highlight?: string;
  titleLine1End?: string;
  titleLine2?: string;
  subtitle?: string;
  primaryActionText?: string;
  secondaryActionText?: string;
  socialProofText?: string;
  backgroundImage?: string;
}

export default function Hero28({
  titleLine1Start = "Ready to",
  titleLine1Highlight = "scale",
  titleLine1End = "your",
  titleLine2 = "brand with paid ads?",
  subtitle = "If you want to achieve ground-breaking growth with increased sales\nand profitability with paid ads, then you're in the right place.",
  primaryActionText = "Book a call",
  secondaryActionText = "Learn more",
  socialProofText = "200+ Brands Scaled",
  backgroundImage = "https://assets.watermelon.sh/hero-28.webp",
}: Hero28Props) {
  const [activeNav, setActiveNav] = useState("Products");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = ["Products", "Solutions", "About", "Features", "Support"];

  return (
    <section className="relative flex min-h-dvh w-full flex-col items-center overflow-hidden bg-[#EAE8DE]">
      {/* Background Image - light and misty, no dark overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Floating Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 mt-6 flex h-16 w-[calc(100%-2rem)] max-w-7xl items-center justify-between rounded-[20px] bg-[#EAE8DD]/95 px-4 shadow-sm backdrop-blur-md sm:px-6 md:w-[calc(100%-3rem)] md:px-8"
      >
        {/* Logo */}
        <div className="flex items-center justify-center">
          {/* Using a stylized SVG to match the floral logo in the reference, while keeping Watermelon branding accessible */}
          <div className="flex size-8 items-center justify-center text-[#E36C59]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M12 2C12 2 15 7 15 11C15 15 12 18 12 18C12 18 9 15 9 11C9 7 12 2 12 2Z" />
              <path d="M12 22C12 22 17 19 19 15C21 11 18 8 18 8C18 8 17 12 14 15C12.5 16.5 12 22 12 22Z" />
              <path d="M12 22C12 22 7 19 5 15C3 11 6 8 6 8C6 8 7 12 10 15C11.5 16.5 12 22 12 22Z" />
            </svg>
          </div>
          <span className="sr-only">Watermelon</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveNav(link)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeNav === link ? "text-neutral-900" : "text-neutral-700 hover:text-neutral-900"
              }`}
            >
              {activeNav === link && (
                <motion.div
                  layoutId="activeHero28Nav"
                  className="absolute inset-0 -z-10 rounded-full bg-white/60 shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {link}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            size="sm"
            className="h-9 rounded-xl bg-[#E06A59] px-4 text-xs font-medium text-white transition-all hover:bg-[#c95c4b] hover:shadow-md sm:h-10 sm:px-6 sm:text-sm"
          >
            Learn More
          </Button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex size-8 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-neutral-200 sm:size-10 md:hidden"
          >
            <HugeiconsIcon icon={isMobileMenuOpen ? Cancel01Icon : Menu01Icon} className="size-5 sm:size-6" />
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 top-full mt-2 w-full overflow-hidden rounded-[20px] bg-[#EAE8DD]/95 shadow-lg backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col p-2">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    setActiveNav(link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activeNav === link
                      ? "bg-white/60 text-neutral-900 shadow-sm"
                      : "text-neutral-700 hover:bg-white/40 hover:text-neutral-900"
                  }`}
                >
                  {link}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </motion.header>

      {/* Main Content */}
      <div className="container relative z-10 mt-16 flex flex-1 flex-col items-center justify-center px-4 pb-40 text-center md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto flex w-full max-w-4xl flex-col items-center"
        >
          {/* Social Proof */}
          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <div className="flex -space-x-3">
              {PLACEHOLDER_AVATARS.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt="Customer avatar"
                  className="size-10 rounded-full border-2 border-[#EAE8DE] object-cover shadow-sm"
                />
              ))}
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-1 text-[#E36C59]">
                {[...Array(5)].map((_, i) => (
                  <HugeiconsIcon key={i} icon={StarIcon} className="size-4 fill-current" />
                ))}
              </div>
              <span className="mt-0.5 text-sm font-medium text-neutral-800">
                {socialProofText}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-center text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl md:text-7xl lg:text-[80px] lg:leading-[1.1]">
            {titleLine1Start} <span className="font-serif italic">{titleLine1Highlight}</span> {titleLine1End}{" "}
            <br className="hidden md:block" />
            {titleLine2}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-3xl whitespace-pre-line text-base leading-relaxed text-neutral-700 sm:text-lg md:text-xl">
            {subtitle}
          </p>

          {/* Actions */}
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
            <Button
              size="lg"
              className="h-14 w-full rounded-[14px] bg-[#E06A59] px-8 text-base font-medium text-white transition-all hover:bg-[#c95c4b] hover:shadow-lg sm:w-auto"
            >
              {primaryActionText}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-[14px] border-2 border-white/80 dark:border-white/80 bg-[#F5F3E7] dark:bg-[#F5F3E7] px-8 text-base font-medium text-neutral-900 shadow-sm transition-all hover:bg-white sm:w-auto"
            >
              {secondaryActionText}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-neutral-800"
      >
        <span className="text-sm font-medium tracking-wide">Scroll to Discover</span>
        <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
      </motion.div>
    </section>
  );
}