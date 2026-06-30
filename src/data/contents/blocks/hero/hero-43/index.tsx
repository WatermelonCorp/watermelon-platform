import { motion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle, MessageSquare } from "lucide-react"; 
import LogoIcon from "@/assets/logo-icon";

// ─── Geist Mono — via @fontsource jsDelivr CDN (self-contained) ──────────
// Geist Mono is Vercel's monospaced font. Not on Google Fonts — loaded via CDN.
const fontStyle = `
@import url('https://cdn.jsdelivr.net/npm/@fontsource/geist-mono@5/400.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/geist-mono@5/500.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/geist-mono@5/600.css');
`;

// ─── Design tokens ─────────────────────────────────────────────────────────
// Dark teal button: closest Tailwind match is teal-800 (#115e59), but the
// reference reads slightly darker — use teal-900 (#134e4a) as the fill.
const TEAL_CTA = "#134e4a"; // Tailwind teal-900
const TEXT_DARK = "#1c1917"; // Tailwind stone-900

// ─── Framer-Motion Variants ────────────────────────────────────────────────

/** Nav: drops from top + blur clears */
const navVariants: Variants = {
  hidden: { opacity: 0, y: -20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 22, stiffness: 180, delay: 0.05 },
  },
};

/** Background illustration: slow pan-down reveal */
const bgVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.9, ease: [0.22, 1, 0.36, 1], delay: 0 },
  },
};

/** Stagger wrapper for headline spans */
const headlineContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.32 },
  },
};

/** Each headline line: dramatic rise + blur clear */
const headlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(16px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 28, stiffness: 76, mass: 1.3 },
  },
};

/** Subtitle: gentler rise, fires after headline settles */
const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 26, stiffness: 95, delay: 0.90 },
  },
};

/** CTA button: scale + fade after subtitle */
const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 22, stiffness: 115, delay: 1.08 },
  },
};

/** Feature cards container: staggers from left */
const featuresContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 1.28 },
  },
};

/** Each feature card: slides up + blur */
const featureCardVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 24, stiffness: 100 },
  },
};

// ─── Feature data ──────────────────────────────────────────────────────────
const FEATURES = [
  "Everyone needs a Watermelon, not everyone has one.",
  "Everyone needs a Watermelon, not everyone has one.",
  "Everyone needs a Watermelon, not everyone has one.",
] as const;

// ─── Component ─────────────────────────────────────────────────────────────

export default function Hero43() {
  const FONT = "'Geist Mono', 'SF Mono', 'Fira Code', 'Courier New', monospace";

  const navLinks = ["Product", "Features", "Pricing", "Contact Us", "About"];

  return (
    <>
      {/* Self-contained font import */}
      <style>{fontStyle}</style>

      <div
        className="relative min-h-screen w-full overflow-hidden antialiased selection:bg-teal-900/25 selection:text-teal-950"
        style={{ backgroundColor: "#d4e8ee" }} // fallback while image loads
      >
        {/* ── Background illustrated landscape ─────────────────────────── */}
        <motion.div
          variants={bgVariants}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute inset-0 z-0 will-change-transform select-none"
        >
          <img
            src="https://assets.watermelon.sh/bg-hero-43.avif"
            alt="Peaceful illustrated landscape with a lone golden autumn tree on rolling green hills under a blue-peach sky"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* ── z-10 layout ───────────────────────────────────────────────── */}
        <div className="relative z-10 flex min-h-screen flex-col">

          {/* ── Navigation ─────────────────────────────────────────────── */}
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="show"
            className="flex w-full items-center justify-between px-6 py-4 sm:px-8 md:px-10 lg:px-12"
            aria-label="Primary navigation"
          >
            {/* Wordmark — Geist Mono, no icon */}
            <div className="flex items-center gap-2.5"><LogoIcon className="h-6 w-6 text-stone-500" /><span className="text-lg font-medium tracking-tight" style={{ color: TEXT_DARK, fontFamily: FONT }}>Watermelon</span></div>

            {/* Center nav links — hidden below md */}
            <nav
              className="hidden items-center gap-7 md:flex lg:gap-9"
              aria-label="Site links"
            >
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex min-h-[40px] items-center text-sm font-normal transition-opacity duration-200 hover:opacity-70"
                  style={{ color: TEXT_DARK, fontFamily: FONT }}
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* "Let's Talk" — dark filled pill with icon, optical padding */}
            <button
              className="group flex min-h-[40px] items-center gap-2 rounded-lg pl-4 pr-3.5 py-2 text-sm font-medium text-white shadow-[0_2px_6px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.12)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:shadow-[0_4px_12px_rgba(0,0,0,0.30)] active:scale-[0.96]"
              style={{ backgroundColor: TEXT_DARK, fontFamily: FONT }}
            >
              Let&apos;s Talk
              <MessageCircle
                className="h-4 w-4 shrink-0 transition-transform duration-150 ease-out group-hover:scale-110"
                aria-hidden="true"
              />
            </button>
          </motion.nav>

          {/* ── Main content — left-aligned, justify-between ────────────── */}
          <main
            className="flex flex-1 flex-col justify-between px-6 pt-10 pb-10 sm:px-8 sm:pt-12 md:px-10 lg:px-12 lg:pt-40"
          >
            {/* Upper: heading + subtitle + CTA */}
            <div className="flex max-w-6xl flex-col items-start">

              {/* Headline — each line staggers independently */}
              <motion.h1
                variants={headlineContainerVariants}
                initial="hidden"
                animate="show"
                className="text-3xl leading-[1.1] tracking-[-0.01em] text-balance sm:text-5xl md:text-3xl lg:text-4xl"
                style={{ color: TEXT_DARK, fontFamily: FONT, fontWeight: 400 }}
              >
                {/* Line 1 */}
                <motion.span
                  variants={headlineLineVariants}
                  className="block will-change-transform"
                >
                  Watermelon lets you automate your
                </motion.span>
                {/* Line 2 */}
                <motion.span
                  variants={headlineLineVariants}
                  className="block will-change-transform"
                >
                  business with natural language
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={subtitleVariants}
                initial="hidden"
                animate="show"
                className="mt-4 text-sm leading-[1.6] font-normal text-pretty will-change-transform sm:text-base"
                style={{ color: "#44403c", fontFamily: FONT }} // stone-700
              >
                Watermelon can help you with things like CRM enrichment
              </motion.p>

              {/* CTA button */}
              <motion.div
                variants={ctaVariants}
                initial="hidden"
                animate="show"
                className="mt-6 will-change-transform"
              >
                <button
                  className="group flex min-h-[42px] items-center gap-2.5 rounded-lg pl-5 pr-4 py-2.5 text-sm font-medium text-white shadow-[0_1px_3px_rgba(0,0,0,0.20),0_4px_12px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.12)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:shadow-[0_2px_6px_rgba(0,0,0,0.25),0_8px_20px_rgba(0,0,0,0.18)] active:scale-[0.96]"
                  style={{ backgroundColor: TEAL_CTA, fontFamily: FONT }}
                >
                  Get Watermelon
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>
              </motion.div>
            </div>

            {/* Lower: 3-column feature row */}
            <motion.div
              variants={featuresContainerVariants}
              initial="hidden"
              animate="show"
              className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 lg:max-w-[560px]"
            >
              {FEATURES.map((text, i) => (
                <motion.div
                  key={i}
                  variants={featureCardVariants}
                  className="will-change-transform flex flex-col items-start gap-2"
                >
                  {/* Icon — small MessageSquare (chat bubble), dark */}
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-md border"
                    style={{
                      borderColor: "rgba(28,25,23,0.18)",
                      backgroundColor: "rgba(255,255,255,0.30)",
                    }}
                  >
                    <MessageSquare
                      className="h-4 w-4"
                      style={{ color: TEXT_DARK }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Feature caption */}
                  <p
                    className="text-sm leading-[1.55] text-pretty"
                    style={{ color: "#44403c", fontFamily: FONT }} // stone-700
                  >
                    {text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
}
