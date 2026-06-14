import { useState } from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowDown01Icon, Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

interface Hero27Props {
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  primaryActionText?: string;
  secondaryActionText?: string;
  backgroundImage?: string;
}

export default function Hero27({
  titleLine1 = "Unlock The Extraordinary",
  titleLine2 = "Power Of Experiences",
  subtitle = "Elevate the way people interact with your brand. Launch and scale experiential with Way.",
  primaryActionText = "Book Tickets",
  secondaryActionText = "Our Exhibitions",
  backgroundImage = "https://assets.watermelon.sh/hero-27.avif",
}: Hero27Props) {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ["Home", "Products", "About", "Features", "Support"];

  return (
    <section className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[#88B0D3]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Header / Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 flex w-full items-center justify-between px-6 py-6 md:px-10 lg:px-12"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
          </svg>
          <span className="text-xl font-medium tracking-tight sm:text-2xl">Melon</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex lg:gap-2">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                activeTab === item ? "text-neutral-950" : "text-white hover:text-white/80"
              }`}
            >
              {activeTab === item && (
                <motion.div
                  layoutId="activeTabIndicatorHero27"
                  className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {item}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Button className="hidden h-10 rounded-full bg-white px-6 text-sm font-medium text-neutral-950 transition-all hover:bg-neutral-100 md:flex">
            Sign up
          </Button>

          <div className="hidden cursor-pointer items-center gap-1.5 text-sm font-medium text-white transition-opacity hover:opacity-80 md:flex">
            <span className="text-base leading-none">🇬🇧</span>
            <span>EN</span>
            <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <HugeiconsIcon icon={isMobileMenuOpen ? Cancel01Icon : Menu01Icon} className="size-6" />
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 top-full mt-2 w-full px-4 lg:hidden"
          >
            <div className="overflow-hidden rounded-2xl bg-white/95 shadow-xl backdrop-blur-md">
              <nav className="flex flex-col p-4">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveTab(item);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
                      activeTab === item
                        ? "bg-neutral-100 text-neutral-950"
                        : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <div className="mt-4 border-t border-neutral-100 pt-4 md:hidden">
                  <Button className="h-12 w-full rounded-full bg-neutral-950 text-base font-medium text-white hover:bg-neutral-800">
                    Sign up
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Main Content */}
      <div className="container relative z-10 mt-10 flex flex-1 flex-col items-center justify-center px-4 pb-32 text-center sm:mt-16 md:mt-0 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto flex w-full max-w-4xl flex-col items-center"
        >
          {/* Title */}
          <h1 className="mb-6 flex w-full flex-col items-center text-white">
            <span className="text-center text-[44px] font-medium leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-[84px] lg:whitespace-nowrap">
              {titleLine1}
            </span>
            <span className="mt-1 text-center font-serif text-[46px] italic leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-[84px] lg:whitespace-nowrap">
              {titleLine2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-[600px] text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            {subtitle}
          </p>

          {/* Actions */}
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
            <Button
              size="lg"
              className="h-14 rounded-full bg-[#1A1A1A] px-8 text-base font-medium text-white transition-all hover:bg-black"
            >
              {primaryActionText}
            </Button>

            <button className="group flex items-center gap-2 text-base font-medium text-neutral-900 transition-opacity hover:opacity-70">
              {secondaryActionText}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-5 transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-neutral-900"
      >
        <span className="text-sm font-medium tracking-wide">Scroll to Discover</span>
        <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
      </motion.div>
    </section>
  );
}