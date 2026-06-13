'use client';

import { type FormEvent } from 'react';
import { motion, type Variants } from 'motion/react';
import {
  ArrowRight,
  MessageSquare,
  Settings,
  Moon,
  ChevronDown,
} from 'lucide-react';
import LogoIcon from '@/assets/logo-icon';

interface LinkItem {
  label: string;
  href: string;
}

interface NavColumn {
  title: string;
  links: LinkItem[];
}

interface Footer23Props {
  brandName?: string;
  ctaHeading?: string;
  ctaSubtitle?: string;
  getDemoLabel?: string;
  getDemoHref?: string;
  signInLabel?: string;
  signInHref?: string;
  heroImage?: string;
  heroAlt?: string;
  emailPlaceholder?: string;
  subscribeLabel?: string;
  onSubscribe?: (email: string) => void;
  columns?: NavColumn[];
  language?: string;
}

const defaultColumns: NavColumn[] = [
  {
    title: 'SOLUTIONS',
    links: [
      { label: 'Transactional Emails', href: '#' },
      { label: 'Marketing Emails', href: '#' },
      { label: 'Email Automation', href: '#' },
      { label: 'SMTP', href: '#' },
      { label: 'Email Builder', href: '#' },
    ],
  },
  {
    title: 'DOCS',
    links: [
      { label: 'Getting Started', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Transactional Emails', href: '#' },
      { label: 'Transactional Emails', href: '#' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'FAQ', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Glossary', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Fair Use', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Subprocessors', href: '#' },
    ],
  },
];


const sectionStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};


const riseClean: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};


const midStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.03 },
  },
};

const midItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 },
  },
};


const linkCascade: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const linkTrickle: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 350, damping: 30, mass: 0.6 },
  },
};


const btnPop: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 22, mass: 0.6 },
  },
};


const wordmarkSlam: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 22, mass: 1.8 },
  },
};


const utilityFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};


export default function Footer23({
  brandName = 'Watermelon',
  ctaHeading = 'Build your app in minutes',
  ctaSubtitle = 'Start building with our free tools and test models directly in your app.',
  getDemoLabel = 'GET A DEMO',
  getDemoHref = '#',
  signInLabel = 'SIGN IN FOR FREE',
  signInHref = '#',
  heroImage = 'https://assets.watermelon.sh/footer-23-bg.avif',
  heroAlt = 'Person standing in a sunlit flower field at golden hour',
  emailPlaceholder = 'Enter Your Email',
  subscribeLabel = 'Subscribe',
  onSubscribe,
  columns = defaultColumns,
  language = 'English',
}: Footer23Props) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubscribe?.(String(fd.get('email') ?? ''));
  }

  return (
    <footer className="w-full overflow-hidden bg-stone-50 font-sans antialiased">
      {/* ── Top CTA section ─────────────────────────────────────────────── */}
      <motion.div
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col gap-6 px-6 pt-12 pb-8 sm:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:px-14 xl:px-16"
      >
        {/* Left: heading + subtitle */}
        <motion.div
          variants={riseClean}
          className="flex flex-col gap-2 lg:max-w-md xl:max-w-lg"
        >
          <h2 className="text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.15] font-normal tracking-[-0.02em] text-zinc-900">
            {ctaHeading}
          </h2>
          <p className="text-md max-w-sm text-zinc-500">{ctaSubtitle}</p>
        </motion.div>

        <motion.div
          variants={sectionStagger}
          className="flex flex-wrap items-end gap-3 lg:mt-1"
        >
          <motion.a
            variants={btnPop}
            href={getDemoHref}
            className="inline-flex min-h-10 items-center gap-2 border border-zinc-300 bg-stone-200 px-4 font-mono text-sm font-medium text-zinc-700 transition-[background-color,border-color,transform] duration-200 hover:border-zinc-400 hover:bg-stone-100 active:scale-[0.97]"
          >
            {getDemoLabel}
            <ArrowRight className="size-4 stroke-1" />
          </motion.a>
          <motion.a
            variants={btnPop}
            href={signInHref}
            className="inline-flex min-h-10 items-center gap-2 border border-zinc-300 bg-stone-200 px-4 font-mono text-sm font-medium text-zinc-700 transition-[background-color,border-color,transform] duration-200 hover:border-zinc-400 hover:bg-stone-100 active:scale-[0.97]"
          >
            {signInLabel}
            <ArrowRight className="size-4 stroke-1" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── Wide landscape image ──────────────────────────────────────── */}
      <motion.div
        variants={imageReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="-oultine-offset-1 mx-6 overflow-hidden outline outline-black/20 sm:mx-10 lg:mx-14 xl:mx-16"
      >
        <img
          src={heroImage}
          alt={heroAlt}
          className="h-[220px] w-full object-cover object-bottom sm:h-[280px] md:h-[320px] lg:h-[360px]"
        />
      </motion.div>

      {/* ── Middle: brand + email form + nav columns ─────────────────── */}
      <motion.div
        variants={midStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="grid grid-cols-1 gap-6 md:gap-40 px-6 pt-8 pb-6 sm:px-10 md:grid-cols-[auto_1fr] lg:px-14 xl:px-16"
      >
        {/* Left: logo + subscribe */}
        <motion.div
          variants={midItem}
          className="flex flex-col gap-4 md:max-w-xs"
        >
          {/* Brand */}
          <div className="flex items-center gap-1.5">
            <LogoIcon className="size-8 text-zinc-500" />
            <span className="text-md font-medium text-zinc-900 uppercase select-none">
              {brandName}
            </span>
          </div>

          {/* Subscribe form */}
          <form onSubmit={handleSubmit} className="flex w-full max-w-xs gap-0">
            <label htmlFor="footer23-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer23-email"
              name="email"
              type="email"
              placeholder={emailPlaceholder}
              required
              className="h-9 w-full border-2 border-zinc-300 bg-white px-3 text-[0.8125rem] text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
            />
            <motion.button
              type="submit"
              className="group mt-0 h-9 cursor-pointer border-2 border-l-0 border-zinc-300 bg-stone-100 px-3 text-sm font-normal text-zinc-700 transition-[background-color] hover:bg-stone-200 active:bg-stone-300"
            >
              {subscribeLabel}
            </motion.button>
          </form>
        </motion.div>

        <motion.nav
          variants={midStagger}
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
        >
          {columns.map((col) => (
            <motion.div
              key={col.title}
              variants={midItem}
              className="flex flex-col gap-3"
            >
              <h3 className="text-sm font-medium text-zinc-400 uppercase">
                {col.title}
              </h3>
              <motion.ul variants={linkCascade} className="flex flex-col gap-2">
                {col.links.map((link, i) => (
                  <motion.li key={`${link.label}-${i}`} variants={linkTrickle}>
                    <a
                      href={link.href}
                      className="text-sm leading-none font-medium text-zinc-600 transition-colors duration-150 hover:text-zinc-900"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.nav>
      </motion.div>

      <div className="relative overflow-hidden">
        <motion.div
          variants={wordmarkSlam}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-end overflow-hidden px-4 pt-2 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <svg
            className="w-full select-none"
            viewBox={`0 0 ${Math.max(brandName.length * 95, 400)} 120`}
            preserveAspectRatio="xMidYMid meet"
            aria-label={brandName}
          >
            <text
              x="50%"
              y="100%"
              dominantBaseline="alphabetic"
              textAnchor="middle"
              textLength="100%"
              lengthAdjust="spacing"
              fontSize="150"
              fontWeight="500"
              fontFamily="sans-serif"
              fill="#1c1917"
            >
              {brandName.toUpperCase()}
            </text>
          </svg>
        </motion.div>
      </div>
    </footer>
  );
}
