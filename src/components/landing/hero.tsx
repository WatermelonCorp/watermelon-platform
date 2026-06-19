import { ArrowUpRight01Icon } from 'hugeicons-react';
import Container from './container';
import Heading from './heading';
import SubHeading from './subheading';
import { motion, type Variants, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BgFrame from './bg-frame';

const ROTATING_WORDS = [
  'designers.',
  'developers.',
  'builders.',
  'creators.',
] as const;

const HERO_IMAGES = Array.from({ length: 10 }).map(
  (_, i) =>
    `https://assets.watermelon.sh/lp-hero-${(i + 1).toString().padStart(2, '0')}.avif`,
);

const IMAGE_POSITIONS = [
  // L4 (Highest, furthest left)
  { top: '-30%', left: '-15%', width: '24%', rotate: '-15deg', zIndex: 1 },
  // R4 (Highest, furthest right)
  { top: '-30%', right: '-15%', width: '24%', rotate: '15deg', zIndex: 1 },

  // L3
  { top: '-10%', left: '-5%', width: '28%', rotate: '-10deg', zIndex: 2 },
  // R3
  { top: '-10%', right: '-5%', width: '28%', rotate: '10deg', zIndex: 2 },

  // L2
  { top: '10%', left: '5%', width: '34%', rotate: '-5deg', zIndex: 3 },
  // R2
  { top: '10%', right: '5%', width: '34%', rotate: '5deg', zIndex: 3 },

  // L1
  { top: '25%', left: '15%', width: '42%', rotate: '-2deg', zIndex: 4 },
  // R1
  { top: '25%', right: '15%', width: '42%', rotate: '2deg', zIndex: 4 },

  // Center (Front, lowest)
  { top: '40%', left: '24%', width: '52%', rotate: '0deg', zIndex: 10 },

  // Top Center (Background Floater)
  { top: '15%', left: '38%', width: '24%', rotate: '0deg', zIndex: 0 },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const glowVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
    },
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden pt-32 pb-24 font-mono">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Ambient Glow behind heading */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 translate-y-[-60%] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(163,255,18,0.06) 0%, rgba(163,255,18,0.02) 40%, transparent 70%)',
        }}
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Decorative Technical Borders */}
      <div className="absolute top-24 right-0 left-0 hidden h-px bg-white/5 lg:block" />
      <div className="absolute right-0 bottom-24 left-0 hidden h-px bg-white/5 lg:block" />
      <div className="absolute top-0 bottom-0 left-8 hidden w-px bg-white/5 md:left-16 lg:block" />
      <div className="absolute top-0 right-8 bottom-0 hidden w-px bg-white/5 md:right-16 lg:block" />

      {/* Crosshairs at intersections */}
      <div className="absolute top-24 left-8 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 md:left-16 lg:block">
        <div className="bg-primary/50 absolute top-1/2 right-0 left-0 h-px" />
        <div className="bg-primary/50 absolute top-0 bottom-0 left-1/2 w-px" />
      </div>
      <div className="absolute top-24 right-8 hidden h-4 w-4 translate-x-1/2 -translate-y-1/2 md:right-16 lg:block">
        <div className="absolute top-1/2 right-0 left-0 h-px bg-white/20" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />
      </div>
      <div className="absolute bottom-24 left-8 hidden h-4 w-4 -translate-x-1/2 translate-y-1/2 md:left-16 lg:block">
        <div className="absolute top-1/2 right-0 left-0 h-px bg-white/20" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />
      </div>
      <div className="absolute right-8 bottom-24 hidden h-4 w-4 translate-x-1/2 translate-y-1/2 md:right-16 lg:block">
        <div className="absolute top-1/2 right-0 left-0 h-px bg-white/20" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />
      </div>

      {/* Abstract Background Concentric Circles (Left Edge) */}
      <div className="pointer-events-none absolute top-1/2 left-0 flex h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/5 opacity-30">
        <div className="flex h-[600px] w-[600px] items-center justify-center rounded-full border border-dashed border-white/10">
          <div className="flex h-[400px] w-[400px] items-center justify-center rounded-full border border-white/5">
            <div className="h-[200px] w-[200px] rounded-full border border-dashed border-white/5" />
          </div>
        </div>
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center">
        {/* Center-aligned Hero Content */}
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="text-primary mb-10 inline-flex items-center gap-2 border border-white/10 bg-white/3 px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-sm"
          >
            Open Source &mdash; Free Forever
          </motion.div>

          {/* Main Heading — 2 lines */}
          <motion.div variants={itemVariants}>
            <Heading
              as="h1"
              variant="big"
              className="text-foreground mb-2 font-sans leading-[0.95]"
            >
              Beautiful Components
            </Heading>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Heading
              as="h1"
              variant="big"
              className="mb-8 font-sans leading-[0.95]"
            >
              <span className="text-foreground">Built for </span>
              <span className="relative inline-block min-w-[3ch]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    className="text-primary inline-block"
                    initial={{ y: 12, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{
                      y: -12,
                      opacity: 0,
                      filter: 'blur(4px)',
                      transition: { duration: 0.15, ease: 'easeIn' },
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </Heading>
          </motion.div>

          {/* Subheading */}
          <motion.div variants={itemVariants}>
            <SubHeading variant="big" className="mb-12 max-w-2xl text-pretty">
              600+ free, open-source UI components crafted for the design
              community. Copy, paste, and ship — no strings attached.
            </SubHeading>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              to="/home"
              className="group text-background bg-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold transition-all active:scale-[0.97]"
            >
              Browse Components
              <ArrowUpRight01Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-foreground inline-flex items-center justify-center border border-white/10 px-8 py-3 text-sm font-bold transition-all hover:bg-white/5 active:scale-[0.97]"
            >
              Star on GitHub
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/40 uppercase">
              <span className="h-px w-8 bg-white/10" />
              Trusted by developers worldwide
              <span className="h-px w-8 bg-white/10" />
            </div>
            <motion.div
              className="flex flex-wrap justify-center items-center gap-4 sm:gap-6"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              {['600+ Components', '100+ Animations', '100% Free'].map(
                (stat) => (
                  <motion.div
                    key={stat}
                    variants={{
                      hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="border border-white/5 bg-white/2 px-4 py-2 text-xs font-bold tracking-wider text-white/60 uppercase"
                  >
                    {stat}
                  </motion.div>
                ),
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Images Collage */}
        <motion.div
          className="pointer-events-none relative mx-auto mt-32 flex h-[400px] w-full max-w-6xl items-center justify-center sm:h-[600px] md:h-[800px]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.8,
              },
            },
          }}
        >
          {HERO_IMAGES.map((url, i) => (
            <motion.div
              key={url}
              className="pointer-events-auto absolute shadow-2xl"
              style={{
                ...IMAGE_POSITIONS[i],
                transformOrigin: 'center center',
              }}
              variants={{
                hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{
                scale: 1.05,
                zIndex: 50,
                transition: { duration: 0.4 },
              }}
            >
              <BgFrame
                imageUrl={url}
                className="bg-background w-full border-white/10 shadow-2xl"
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
