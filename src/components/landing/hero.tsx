import { ArrowUpRight01Icon } from "hugeicons-react";
import Container from "./container";
import Heading from "./heading";
import SubHeading from "./subheading";
import { motion, type Variants, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ROTATING_WORDS = ["designers.", "developers.", "builders.", "creators."] as const;

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
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-24 font-mono">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Ambient Glow behind heading */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(163,255,18,0.06) 0%, rgba(163,255,18,0.02) 40%, transparent 70%)",
        }}
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Decorative Technical Borders */}
      <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-white/5" />
      <div className="hidden lg:block absolute bottom-24 left-0 right-0 h-px bg-white/5" />
      <div className="hidden lg:block absolute top-0 bottom-0 left-8 md:left-16 w-px bg-white/5" />
      <div className="hidden lg:block absolute top-0 bottom-0 right-8 md:right-16 w-px bg-white/5" />

      {/* Crosshairs at intersections */}
      <div className="hidden lg:block absolute top-24 left-8 md:left-16 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/50" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-primary/50" />
      </div>
      <div className="hidden lg:block absolute top-24 right-8 md:right-16 translate-x-1/2 -translate-y-1/2 w-4 h-4">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />
      </div>
      <div className="hidden lg:block absolute bottom-24 left-8 md:left-16 -translate-x-1/2 translate-y-1/2 w-4 h-4">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />
      </div>
      <div className="hidden lg:block absolute bottom-24 right-8 md:right-16 translate-x-1/2 translate-y-1/2 w-4 h-4">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />
      </div>

      {/* Abstract Background Concentric Circles (Left Edge) */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-white/10 border-dashed flex items-center justify-center">
          <div className="w-[400px] h-[400px] rounded-full border border-white/5 flex items-center justify-center">
            <div className="w-[200px] h-[200px] rounded-full border border-white/5 border-dashed" />
          </div>
        </div>
      </div>

      <Container className="relative z-10 flex-1 flex flex-col justify-center">
        {/* Center-aligned Hero Content */}
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 border border-white/10 bg-white/[0.03] backdrop-blur-sm text-xs font-bold text-primary tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_6px_rgba(163,255,18,0.8)]" />
            Open Source &mdash; Free Forever
          </motion.div>

          {/* Main Heading — 2 lines */}
          <motion.div variants={itemVariants}>
            <Heading
              as="h1"
              variant="big"
              className="mb-2 text-foreground font-sans leading-[0.95]"
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
                    initial={{ y: 24, opacity: 0, rotateX: -40 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -24, opacity: 0, rotateX: 40 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </Heading>
          </motion.div>

          {/* Subheading */}
          <motion.div variants={itemVariants}>
            <SubHeading
              variant="big"
              className="max-w-2xl mb-12 text-pretty"
            >
              600+ free, open-source UI components crafted for the design community.
              Copy, paste, and ship — no strings attached.
            </SubHeading>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/home"
              className="group inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-background bg-primary hover:bg-primary/90 transition-all active:scale-[0.97] gap-2"
            >
              Browse Components
              <ArrowUpRight01Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-foreground border border-white/10 hover:bg-white/5 transition-all active:scale-[0.97]"
            >
              Star on GitHub
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3 text-xs text-white/40 tracking-widest uppercase font-mono">
              <span className="w-8 h-px bg-white/10" />
              Trusted by developers worldwide
              <span className="w-8 h-px bg-white/10" />
            </div>
            <div className="flex items-center gap-6">
              {["600+ Components", "100+ Animations", "100% Free"].map((stat) => (
                <div
                  key={stat}
                  className="text-xs font-bold text-white/60 tracking-wider uppercase border border-white/5 px-4 py-2 bg-white/[0.02]"
                >
                  {stat}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          <div className="flex items-center gap-3 text-xs font-bold text-primary tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(163,255,18,0.6)]" />
            Built for the design community.
          </div>

          <div className="items-center gap-[2px] hidden md:flex">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className={`w-1 h-3 ${i < 14 ? 'bg-primary' : 'bg-white/10'}`}
              />
            ))}
          </div>

          <div className="text-xs font-bold text-primary tracking-widest">
            [ WATERMELON UI ]
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
