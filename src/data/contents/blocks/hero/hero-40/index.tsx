import { motion, type Variants } from "framer-motion";
import { ArrowRight, Globe, Command, Box, Cloud } from "lucide-react"; 
import LogoIcon from "@/assets/logo-icon";
import { FaGoogle } from "react-icons/fa6";
import { AdobeXdIcon, MicrosoftIcon, StripeIcon } from "hugeicons-react";

// ─── Framer-Motion Variants ────────────────────────────────────────────────

/** Nav bar drops in from the top with a blur-clear reveal */
const navVariants: Variants = {
  hidden: { opacity: 0, y: -20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 22, stiffness: 180, delay: 0.05 },
  },
};

/** Background orb: slow fade + very subtle scale-down */
const bgVariants: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 2.0, ease: [0.22, 1, 0.36, 1], delay: 0 },
  },
};

/** Stagger wrapper for hero content — headline lines stagger independently */
const headlineContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.35 },
  },
};

/** Headline lines: more dramatic rise + blur — feels weighty */
const headlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 52, filter: "blur(18px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 28, stiffness: 76, mass: 1.3 },
  },
};

/** Subtitle: gentler rise after the headline settles */
const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 26,
      stiffness: 95,
      delay: 0.9,
    },
  },
};

/** CTA button: scale + fade, slightly after subtitle */
const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 24, stiffness: 110, delay: 1.1 },
  },
};

/** Logo container staggers each brand mark in */
const logosContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 1.2 },
  },
};

const logoItemVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};

// ─── Hero Component ────────────────────────────────────────────────────────

export default function Hero40() {
  const navLinks = ["Features", "Pricing", "About", "Resources", "Contact"];

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden antialiased selection:bg-orange-500/30 selection:text-white"
      style={{ backgroundColor: "#0c0a07" }}
    >
      {/* ── Background orange orb glow ───────────────────────────────── */}
      {/* Matches the reference: large orange-red light bloom on the right side */}
      <motion.div
        variants={bgVariants}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute inset-0 z-0 will-change-transform select-none"
      >
        <img
          src="https://assets.watermelon.sh/bg-hero-40.avif"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

   
      <div className="relative z-10 flex min-h-screen flex-col">

        {/* ── Navigation ───────────────────────────────────────────── */}
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="show"
          className="flex w-full items-center justify-between px-6 py-4 sm:px-10 md:px-14 lg:px-16"
          aria-label="Primary navigation"
        >
          {/* Logo mark + wordmark */}
          <div className="flex items-center gap-2.5">
            <LogoIcon className="h-7 w-7 shrink-0 sm:h-8 sm:w-8 text-white" />
            <span className="text-lg font-medium tracking-[-0.01em] text-white">
              Watermelon
            </span>
          </div>

          {/* Center navigation links — hidden below md */}
          <nav
            className="hidden items-center gap-8 md:flex lg:gap-10"
            aria-label="Site links"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="flex min-h-[40px] items-center text-sm font-normal text-white/70 transition-colors duration-200 hover:text-white"
              >
                {link}
              </a>
            ))}
          </nav>

          <button className="flex min-h-[40px] items-center justify-center rounded-md bg-orange-600 py-2  px-4 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.22),0_1px_3px_rgba(0,0,0,0.3)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-orange-500 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_2px_6px_rgba(0,0,0,0.35)] active:scale-[0.96]">
            Login
          </button>
        </motion.nav>

        {/* ── Main hero content — centered ─────────────────────────── */}
        <main className="flex flex-1 flex-col items-center justify-start px-6 text-center">

          {/* Headline — each line staggers independently for weight */}
          <motion.h1
            variants={headlineContainerVariants}
            initial="hidden"
            animate="show"
            className="mt-16 text-4xl leading-[1.08] font-normal tracking-[-0.025em] text-balance text-white sm:mt-20 sm:text-5xl md:text-6xl lg:mt-24 lg:text-7xl"
          >
            <motion.span
              variants={headlineLineVariants}
              className="block will-change-transform"
            >
              The data &amp; AI platform
            </motion.span>
           
            <motion.span
              variants={headlineLineVariants}
              className="block will-change-transform font-normal  text-orange-500"
            >
              for modern finance
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-[500px]  leading-[1.65] font-medium text-pretty text-white/80 will-change-transform text-sm"
          >
            Watermelon&nbsp; takes messy transaction data and turns it into
            structured, verified records —{" "}
            with AI agents that help you use it everywhere it matters.
          </motion.p>

          {/* CTA — outlined white button, no border-radius (matches reference) */}
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate="show"
            className="mt-10 will-change-transform"
          >
            <button className="group flex min-h-[48px] items-center gap-2.5 border bg-zinc-50 border-white/75 pl-7 pr-6 py-3 text-base font-normal tracking-[0.005em] text-black shadow-[0_0_0_1px_rgba(255,255,255,0)] transition-[transform,background-color,border-color,box-shadow] duration-150 ease-out hover:border-white  hover:shadow-[0_0_24px_rgba(255,255,255,0.05)] active:scale-[0.96]">
              Request a Demo
              <ArrowRight
                className="h-4 w-4 shrink-0 text-black transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </motion.div>
        </main>

        <div className="relative bottom-0 flex w-full flex-col items-center justify-center px-6 pb-10 pt-4 sm:pb-14">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
            className="mb-6 text-xs font-medium tracking-[0.09em] text-white/40 uppercase"
          >
            Trusted By Leading Brands
          </motion.p>

     
          <motion.div
            variants={logosContainerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 md:gap-16 lg:gap-20 text-white"
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
  );
}
