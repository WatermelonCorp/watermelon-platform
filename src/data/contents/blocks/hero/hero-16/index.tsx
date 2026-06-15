'use client';

import LogoIcon from '@/assets/logo-icon';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, type Variants } from 'motion/react';

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface Hero16Props {
  brandName?: string;
  navLinks?: NavLink[];
  badgeText?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  demoLabel?: string;
  demoHref?: string;
  backgroundImage?: string;
}

const navLinksDefault: NavLink[] = [
  { label: 'Features', href: '#', hasDropdown: true },
  { label: 'Pricing', href: '#', hasDropdown: true },
  { label: 'Resources', href: '#' },
  { label: 'FAQs', href: '#' },
];

const shellVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const navVariants: Variants = {
  hidden: { opacity: 0, y: -14, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', bounce: 0.4, duration: 1.5 },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', bounce: 0.4, duration: 1.8 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', bounce: 0.2, duration: 2.0 },
  },
};

export default function Hero16({
  brandName = 'Watermelon',
  navLinks = navLinksDefault,
  badgeText = 'Trusted by 500+ Innovation Teams',
  headingLine1 = 'Build The Future With',
  headingLine2 = 'AI-Native Products',
  description = 'Design, build, and scale intelligent products, with powerful AI tools built for modern teams.',
  primaryCtaLabel = 'Explore More',
  primaryCtaHref = '#',
  secondaryCtaLabel = 'Start Journey',
  secondaryCtaHref = '#',
  demoLabel = 'Book Demo',
  demoHref = '#',
  backgroundImage = 'https://assets.watermelon.sh/hero-16-bg.avif',
}: Hero16Props) {
  return (
    <section className="relative isolate flex min-h-screen w-full overflow-hidden bg-slate-950 text-white antialiased">
      <motion.div
        className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-slate-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.38 }}
        variants={shellVariants}
      >
        <motion.img
          variants={imageVariants}
          src={backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
     

        <motion.nav
          variants={navVariants}
          className="max-w-8xl relative z-10 mx-auto flex min-h-14 w-full items-center justify-between px-6 py-3 sm:px-10 lg:px-12"
        >
          <a
            href="#"
            className="text-md inline-flex min-h-10 items-center gap-2 font-normal text-white transition-[opacity,transform] duration-200 ease-out hover:opacity-82 active:scale-[0.96]"
          >
            <LogoIcon className="size-8" />
            {brandName}
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group/nav inline-flex min-h-10 items-center gap-1.5 text-sm font-normal text-white/86 transition-[color,transform] duration-200 ease-out hover:text-white active:scale-[0.96]"
              >
                {link.label}
                {link.hasDropdown ? (
                  <ChevronDown className="size-3 stroke-[2.4] opacity-80 transition-transform duration-200 ease-out group-hover/nav:translate-y-0.5" />
                ) : null}
              </a>
            ))}
          </div>

          <a
            href={demoHref}
            className="group/demo text-sm inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-white/10 px-4 font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),0_16px_40px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-[background-color,transform,box-shadow] duration-200 ease-out hover:bg-white/15 active:scale-[0.96]"
          >
            {demoLabel}
            <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover/demo:translate-x-0.5" />
          </a>
        </motion.nav>

        <div className="relative z-10 mx-auto flex w-full max-w-[78rem] flex-1 flex-col items-center px-6 pt-20 pb-16 text-center sm:px-10 sm:pt-16 lg:px-12">
          <motion.div
            variants={contentVariants}
            className="inline-flex min-h-8 items-center gap-2 rounded-full bg-white/10 pl-3 pr-4 text-sm font-light text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] backdrop-blur-md"
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)]">
              <span className="size-2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
            </span>
            {badgeText}
          </motion.div>

          <motion.h1
            variants={contentVariants}
            className="mt-7 max-w-5xl text-[clamp(3.35rem,5vw,6.15rem)] leading-[0.95] font-light tracking-normal text-balance text-white/95"
          >
            <span className="block">{headingLine1}</span>
            <span className="block">{headingLine2}</span>
          </motion.h1>

          <motion.p
            variants={contentVariants}
            className="mt-7 max-w-xl text-base leading-6 font-light text-pretty text-white/75"
          >
            {description}
          </motion.p>

          <motion.div
            variants={contentVariants}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={primaryCtaHref}
              className="text-md inline-flex min-h-12 min-w-40 items-center justify-center rounded-full bg-zinc-100 px-6 font-normal text-slate-800 shadow-[inset_0_2px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] transition-[background-color,color,transform] duration-200 ease-out text-shadow-2xs hover:bg-zinc-200 hover:text-slate-950 active:scale-[0.96]"
            >
              {primaryCtaLabel}
            </a>
            <a
              href={secondaryCtaHref}
              className="group/secondary text-md inline-flex min-h-12 min-w-40 items-center justify-center gap-2 rounded-full bg-white/10 px-6 font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),0_16px_40px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-[background-color,transform,box-shadow] duration-200 ease-out hover:bg-white/15 active:scale-[0.96]"
            >
              {secondaryCtaLabel}
              <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover/secondary:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
