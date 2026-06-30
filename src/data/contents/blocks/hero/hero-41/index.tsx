import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react"; 
import { FaGoogle } from "react-icons/fa6";
import { AdobeXdIcon, MicrosoftIcon, StripeIcon } from "hugeicons-react";

// ─── Google Font import — Playfair Display for the serif heading ────────────
// Injected once via a <style> tag inside the component so it's self-contained.
const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&display=swap');`;

// ─── Design tokens ─────────────────────────────────────────────────────────
// Deep navy: matches #0d2850 — Tailwind blue-950 is a near-perfect equivalent
const NAVY = "#0d2850";

// ─── Framer-Motion Variants ────────────────────────────────────────────────

/** Nav: slides down from top, blurs clear */
const navVariants: Variants = {
  hidden: { opacity: 0, y: -22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 22, stiffness: 180, delay: 0.05 },
  },
};

/** Illustration: slow pan-up reveal (scale down + fade) */
const bgVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.9, ease: [0.22, 1, 0.36, 1], delay: 0 },
  },
};

/** Headline container: staggers each line */
const headlineContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
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

/** Subtitle: gentler rise, fires after headline settles */
const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 26, stiffness: 90, delay: 0.92 },
  },
};

/** CTA button: scale + fade in after subtitle */
const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 24, stiffness: 110, delay: 1.12 },
  },
};

/** Brand logos strip stagger container */
const logosContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 1.25 },
  },
};

const logoItemVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 22, stiffness: 100 },
  },
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function Hero41() {
  const navLinks = [
    { name: "Features", dropdown: true },
    { name: "Pricing", dropdown: true },
    { name: "Resources", dropdown: false },
    { name: "FAQs", dropdown: false },
  ];

  const logos = [
    { variant: 1 as const, label: "logoipsum" },
    { variant: 2 as const, label: "logoipsum" },
    { variant: 3 as const, label: "logoipsum" },
    { variant: 4 as const, label: "logoipsum" },
  ];

  return (
    <>
      {/* Self-contained font import */}
      <style>{fontStyle}</style>

      <div
        className="relative min-h-screen w-full overflow-hidden bg-white antialiased selection:bg-blue-950/20 selection:text-blue-950"
      >
        <motion.div
          variants={bgVariants}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 will-change-transform select-none"
          style={{ height: "68%" }}
        >
          <img
            src="https://assets.watermelon.sh/bg-hero-41.avif"
            alt="Peaceful winter landscape with snowy pine trees, mountains, and a cozy cabin"
            className="h-full w-full object-cover object-top"
          />
        
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            style={{
              background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* ── z-10 layout layer ────────────────────────────────────────── */}
        <div className="relative z-10 flex min-h-screen flex-col">

          {/* ── Navigation ─────────────────────────────────────────────── */}
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="show"
            className="flex w-full items-center justify-between px-6 py-5 sm:px-10 md:px-14 lg:px-16"
            aria-label="Primary navigation"
          >
            {/* Wordmark — no icon, serif feel matches the brand */}
            <span
              className="text-lg font-semibold tracking-[-0.01em]"
              style={{ color: NAVY, fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Watermelon
            </span>

            {/* Center nav links — hidden below md */}
            <nav
              className="hidden items-center gap-7 md:flex lg:gap-9"
              aria-label="Site links"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.name.toLowerCase()}`}
                  className="group flex min-h-[40px] items-center gap-1 text-sm font-normal transition-colors duration-200"
                  style={{ color: `${NAVY}cc` }}
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                      style={{ color: `${NAVY}99` }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Sign up — pill-shaped outlined button */}
            {/* Optical padding: pl-5 pr-4 to balance text + arrow asymmetry */}
            <button
              className="group flex min-h-[40px] items-center gap-2 rounded-full border pl-5 pr-4 py-2 text-sm font-normal transition-[transform,background-color,border-color] duration-150 ease-out hover:bg-blue-950/[0.04] active:scale-[0.96]"
              style={{
                color: NAVY,
                borderColor: `${NAVY}aa`,
              }}
            >
              Sign up
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                style={{ color: NAVY }}
              />
            </button>
          </motion.nav>

          {/* ── Main hero content — centered ────────────────────────────── */}
          <main className="flex flex-1 flex-col items-center justify-start px-6 text-center">

            {/* Headline — two lines stagger independently for cinematic feel */}
            <motion.h1
              variants={headlineContainerVariants}
              initial="hidden"
              animate="show"
              className="mt-10 text-4xl leading-[1.1] text-balance sm:mt-12 sm:text-5xl md:text-6xl lg:mt-14 lg:text-7xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                color: NAVY,
              }}
            >
              {/* Line 1 — upright bold */}
              <motion.span
                variants={headlineLineVariants}
                className="block will-change-transform"
              >
                Rediscover Your Strength
              </motion.span>

              {/* Line 2 — "Peace" in italic, same serif weight */}
              <motion.span
                variants={headlineLineVariants}
                className="block will-change-transform"
              >
                Reclaim Your{" "}
                <em
                  className="not-italic"
                  style={{ fontStyle: "italic" }}
                >
                  Peace
                </em>
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              animate="show"
              className="mt-5 max-w-[440px] text-sm leading-[1.65] font-normal text-pretty will-change-transform sm:text-base"
              style={{ color: `${NAVY}99` }}
            >
              Confidential, professional help tailored to your unique needs,
              available on your schedule. Your privacy is our first priority.
            </motion.p>

            {/* CTA — dark navy filled pill button */}
            <motion.div
              variants={ctaVariants}
              initial="hidden"
              animate="show"
              className="mt-8 will-change-transform"
            >
              <button
                className="group flex min-h-[48px] items-center gap-2.5 rounded-full pl-7 pr-6 py-3 text-base font-medium text-white shadow-[0_2px_8px_rgba(13,40,80,0.25),0_8px_24px_rgba(13,40,80,0.18),inset_0_1px_0_rgba(255,255,255,0.15)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:shadow-[0_4px_12px_rgba(13,40,80,0.30),0_12px_32px_rgba(13,40,80,0.22)] active:scale-[0.96]"
                style={{ backgroundColor: NAVY }}
              >
                Get Started
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </motion.div>
          </main>

          {/* ── Bottom brand strip ──────────────────────────────────────── */}
          <div className="relative z-20 flex w-full flex-col items-center justify-center px-6 pb-10 pt-4 sm:pb-12">

            {/* "Integrated with the best" label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
              className="mb-5 text-sm font-normal"
              style={{ color: `${NAVY}99` }}
            >
              Integrated with the best
            </motion.p>

            {/* Brand logo marks — staggered */}
            <motion.div
              variants={logosContainerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 md:gap-16 lg:gap-20"
              style={{ color: NAVY }}
            >
              <motion.div
                variants={logoItemVariants}
                className="will-change-transform opacity-70 transition-opacity duration-200 hover:opacity-100"
              >
                <div className="flex items-center gap-2"><FaGoogle className="h-6 w-6" /><span className="font-semibold text-lg">Google</span></div>
              </motion.div>

              <motion.div
                variants={logoItemVariants}
                className="will-change-transform opacity-70 transition-opacity duration-200 hover:opacity-100"
              >
                <div className="flex items-center gap-2"><AdobeXdIcon className="h-6 w-6" /><span className="font-semibold text-lg">Adobe</span></div>
              </motion.div>

              <motion.div
                variants={logoItemVariants}
                className="will-change-transform opacity-70 transition-opacity duration-200 hover:opacity-100"
              >
                <div className="flex items-center gap-2"><MicrosoftIcon className="h-6 w-6" /><span className="font-semibold text-lg">Microsoft</span></div>
              </motion.div>

              <motion.div
                variants={logoItemVariants}
                className="will-change-transform opacity-70 transition-opacity duration-200 hover:opacity-100"
              >
                <div className="flex items-center gap-2"><StripeIcon className="h-6 w-6" /><span className="font-semibold text-lg">Stripe</span></div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </>
  );
}
