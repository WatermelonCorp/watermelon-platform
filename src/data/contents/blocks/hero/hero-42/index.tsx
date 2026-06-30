import { motion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  ChevronDown,
  ChevronsRight,
  Globe,
  Heart,
  Mail,
  
  Wifi,
  Zap,
} from "lucide-react";
import LogoIcon from "@/assets/logo-icon";
import { FaGoogle } from "react-icons/fa6";
import { AdobeXdIcon, MicrosoftIcon, StripeIcon } from "hugeicons-react";

// ─── Playfair Display for the italic serif headline line ───────────────────
const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700;1,800&display=swap');`;

// ─── Design token — warm near-black matching the reference ─────────────────
const BG = "#180e08";

// ─── Framer-Motion Variants ────────────────────────────────────────────────

/** Nav: slides down from top + blur-clear */
const navVariants: Variants = {
  hidden: { opacity: 0, y: -22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 22, stiffness: 180, delay: 0.05 },
  },
};

/** Background image: slow scale-down + fade */
const bgVariants: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 2.0, ease: [0.22, 1, 0.36, 1], delay: 0 },
  },
};

/** Stagger wrapper for headline lines */
const headlineContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.32 },
  },
};

/** Each headline line: dramatic rise + blur clear */
const headlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 56, filter: "blur(20px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 30, stiffness: 72, mass: 1.4 },
  },
};

/** Subtitle: softer rise, fires after headline settles */
const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 26, stiffness: 92, delay: 0.94 },
  },
};

/** CTA row: scale + fade after subtitle */
const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 24, stiffness: 110, delay: 1.14 },
  },
};

/** Brand-label line: gentle fade */
const brandLabelVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: 1.3 },
  },
};

/** Brand cards container: staggers each card from left */
const brandsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 1.45 },
  },
};

/** Each brand card: slides in from left + blur */
const brandCardVariants: Variants = {
  hidden: { opacity: 0, x: -18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 22, stiffness: 110 },
  },
};

// ─── Brand data (Lucide icons only — no custom SVG) ────────────────────────
const BRANDS = [
  { Icon: Activity,      label: "novo",         italic: true  },
  { Icon: Wifi,          label: "TeliayCygate",  italic: false },
  { Icon: Heart,         label: "Medtronic",     italic: false },
  { Icon: ChevronsRight, label: "customer.io",   italic: false },
  { Icon: Mail,          label: "Fastmail",      italic: false },
  { Icon: Zap,           label: "Medtronic",     italic: false },
] as const;

// ─── Component ─────────────────────────────────────────────────────────────

export default function Hero42() {
  const navLinks = ["Journey", "Our Story", "What We Offer"];

  return (
    <>
      {/* Self-contained font import */}
      <style>{fontStyle}</style>

      <div
        className="relative min-h-screen w-full overflow-hidden antialiased selection:bg-orange-500/30 selection:text-white"
        style={{ backgroundColor: BG }}
      >
        {/* ── Background image + gradient overlays ─────────────────────── */}
        <motion.div
          variants={bgVariants}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute inset-0 z-0 will-change-transform select-none"
        >
          <img
            src="https://assets.watermelon.sh/bg-hero-42.avif"
            alt="Person gazing up at a dramatic orange glowing orb"
            className="h-full w-full object-cover object-right"
          />

          {/* Left-to-right gradient: keeps left side dark for legible text */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(24,14,8,0.96) 0%, rgba(24,14,8,0.78) 38%, rgba(24,14,8,0.22) 68%, transparent 100%)",
            }}
          />

          {/* Bottom vignette: makes brand strip legible */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(24,14,8,0.92) 0%, rgba(24,14,8,0.40) 30%, transparent 55%)",
            }}
          />
        </motion.div>

        {/* ── z-10 layout ──────────────────────────────────────────────── */}
        <div className="relative z-10 flex min-h-screen flex-col">

          {/* ── Navigation ─────────────────────────────────────────────── */}
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="show"
            className="flex w-full items-center justify-between px-6 py-5 sm:px-8 md:px-12 lg:px-14"
            aria-label="Primary navigation"
          >
            {/* Logo — Sun icon + "Serein" wordmark */}
            <div className="flex items-center gap-2.5">
              <LogoIcon className="h-6 w-6 shrink-0 text-white" />
              <span className="text-lg font-semibold tracking-[-0.01em] text-white">
                Watermelon
              </span>
            </div>

            {/* Centre nav links — hidden below md */}
            <nav
              className="hidden items-center gap-9 md:flex"
              aria-label="Site links"
            >
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex min-h-[40px] items-center text-sm font-normal text-white/75 transition-colors duration-200 hover:text-white"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Right: language selector + Explore more button */}
            <div className="flex items-center gap-3">
              {/* Language selector — hidden on mobile */}
              <button className="group hidden min-h-[40px] items-center gap-1.5 text-sm font-normal text-white/70 transition-colors duration-200 hover:text-white md:flex active:scale-[0.96]">
                <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
                EN
                <ChevronDown
                  className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180"
                  aria-hidden="true"
                />
              </button>

              {/* Explore more — outlined rounded button */}
              <button className="flex min-h-[40px] items-center rounded-lg border border-white/25 bg-white/[0.06] px-4 py-2 text-sm font-normal text-white/85 backdrop-blur-sm transition-[transform,background-color,border-color] duration-150 ease-out hover:border-white/40 hover:bg-white/[0.10] hover:text-white active:scale-[0.96]">
                Explore more
              </button>
            </div>
          </motion.nav>

          {/* ── Main hero content — left-aligned ───────────────────────── */}
          <main className="flex flex-1 flex-col justify-between px-6 pt-14 pb-10 sm:px-8 sm:pt-16 md:px-12 lg:px-14 lg:pt-20">

            {/* Upper block: headline + subtitle + CTA */}
            <div className="flex max-w-4xl flex-col items-start">

              {/* Headline — each line animates independently */}
              <motion.h1
                variants={headlineContainerVariants}
                initial="hidden"
                animate="show"
                className="text-4xl leading-[1.06] tracking-[-0.02em] text-balance sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl"
              >
                {/* Line 1: heavy bold sans-serif — pure white */}
                <motion.span
                  variants={headlineLineVariants}
                  className="block font-medium text-white will-change-transform"
                >
                  The Quiet Is Where
                </motion.span>

                {/* Line 2: italic serif — same colour, distinct texture */}
                <motion.span
                  variants={headlineLineVariants}
                  className="block  text-white will-change-transform"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                  }}
                >
                  Direction Begins.
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={subtitleVariants}
                initial="hidden"
                animate="show"
                className="mt-5 max-w-[360px] text-sm leading-[1.65] font-normal text-pretty text-white/70 will-change-transform sm:text-base"
              >
                Step away from the noise and into clarity. In stillness,
                direction reveals itself.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={ctaVariants}
                initial="hidden"
                animate="show"
                className="mt-8 flex flex-wrap items-center gap-3 will-change-transform"
              >
                {/* Primary: orange filled with arrow — optical padding */}
                <button className="group flex min-h-[44px] items-center gap-2 rounded-lg bg-orange-600 pl-5 pr-4 py-2.5 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.20),inset_0_-1px_0_rgba(0,0,0,0.25),0_2px_8px_rgba(234,88,12,0.35),0_8px_24px_rgba(234,88,12,0.20)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-orange-500 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_4px_14px_rgba(234,88,12,0.50),0_12px_32px_rgba(234,88,12,0.28)] active:scale-[0.96]">
                  Get Demo
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>

                {/* Secondary: dark glass outlined */}
                <button className="flex min-h-[44px] items-center rounded-lg border border-white/20 bg-white/[0.07] px-5 py-2.5 text-base font-normal text-white/80 backdrop-blur-sm transition-[transform,background-color,border-color] duration-150 ease-out hover:border-white/35 hover:bg-white/[0.11] hover:text-white active:scale-[0.96]">
                  Explore more
                </button>
              </motion.div>
            </div>

            {/* ── Bottom brand strip ──────────────────────────────────────── */}
            <div className="mt-14 flex flex-col">

              {/* "Trusted By Leading Brands" label */}
              <motion.p
                variants={brandLabelVariants}
                initial="hidden"
                animate="show"
                className="mb-4 text-xs font-normal tracking-wide text-white/40"
              >
                Trusted By Leading Brands
              </motion.p>

              {/* Brand pill cards — horizontal scroll on small screens */}
              <motion.div
                variants={brandsContainerVariants}
                initial="hidden"
                animate="show"
                className="flex gap-2.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-x-visible sm:pb-0"
                style={{ scrollbarWidth: "none" }}
              >
                <motion.div
                  variants={brandCardVariants}
                  className="will-change-transform flex h-[46px] shrink-0 items-center gap-2.5 rounded-lg border border-white/[0.12] bg-white/[0.07] px-5 backdrop-blur-sm transition-[background-color,border-color] duration-200 hover:border-white/[0.22] hover:bg-white/[0.11]"
                >
                  <FaGoogle className="h-[15px] w-[15px] shrink-0 text-white/70" />
                  <span className="whitespace-nowrap text-sm font-semibold text-white/85">Google</span>
                </motion.div>
                
                <motion.div
                  variants={brandCardVariants}
                  className="will-change-transform flex h-[46px] shrink-0 items-center gap-2.5 rounded-lg border border-white/[0.12] bg-white/[0.07] px-5 backdrop-blur-sm transition-[background-color,border-color] duration-200 hover:border-white/[0.22] hover:bg-white/[0.11]"
                >
                  <AdobeXdIcon className="h-[15px] w-[15px] shrink-0 text-white/70" />
                  <span className="whitespace-nowrap text-sm font-semibold text-white/85">Adobe</span>
                </motion.div>
                
                <motion.div
                  variants={brandCardVariants}
                  className="will-change-transform flex h-[46px] shrink-0 items-center gap-2.5 rounded-lg border border-white/[0.12] bg-white/[0.07] px-5 backdrop-blur-sm transition-[background-color,border-color] duration-200 hover:border-white/[0.22] hover:bg-white/[0.11]"
                >
                  <MicrosoftIcon className="h-[15px] w-[15px] shrink-0 text-white/70" />
                  <span className="whitespace-nowrap text-sm font-semibold text-white/85">Microsoft</span>
                </motion.div>
                
                <motion.div
                  variants={brandCardVariants}
                  className="will-change-transform flex h-[46px] shrink-0 items-center gap-2.5 rounded-lg border border-white/[0.12] bg-white/[0.07] px-5 backdrop-blur-sm transition-[background-color,border-color] duration-200 hover:border-white/[0.22] hover:bg-white/[0.11]"
                >
                  <StripeIcon className="h-[15px] w-[15px] shrink-0 text-white/70" />
                  <span className="whitespace-nowrap text-sm font-semibold text-white/85">Stripe</span>
                </motion.div>
              </motion.div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
