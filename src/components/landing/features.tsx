import {
  CodeIcon,
  PuzzleIcon,
  PaintBoardIcon,
  Layout01Icon,
} from 'hugeicons-react';
import { motion, type Variants } from 'motion/react';
import Container from './container';
import Heading from './heading';
import { PremiumComponent, ThemingComponent, OpenSourceComponent, ProductionReadyComponent } from './feature-visuals';

export default function Features() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0, 0, 1] },
    },
  };

  return (
    <section className="bg-[#101010] relative overflow-hidden py-24 font-mono md:py-32">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-16 flex flex-col items-start text-left md:items-center md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            variants={itemVariants}
            className="text-primary mb-8 inline-flex items-center text-xs font-bold tracking-widest uppercase"
          >
            <span className="mr-3 opacity-70">{'//'}</span>
            FEATURE BENTO
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              Why choose <span className="text-primary">Watermelon</span>  UI?
            </Heading>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid auto-rows-[320px] grid-cols-1 gap-6 lg:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Top Left: 100% Open Source */}
          <motion.div
            variants={itemVariants}
            className="h-full w-full lg:col-span-2"
          >
            <div className="group relative h-full w-full border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-300 hover:bg-white/2">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40"></div>
              <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/40"></div>

              <div className="relative z-10 flex h-full w-full flex-col items-start justify-center overflow-hidden p-8">
                <div className="mb-6 opacity-80 transition-transform duration-300 group-hover:scale-110">
                  <CodeIcon className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-bold tracking-widest uppercase">
                  100% Open Source
                </h3>
                <p className="max-w-sm text-sm leading-relaxed tracking-widest text-pretty text-white/50 uppercase">
                  Free for commercial and personal use. No strings attached,
                  just copy, paste, and ship faster than ever.
                </p>
                
                <OpenSourceComponent />
              </div>
            </div>
          </motion.div>

          {/* Top Right: 600+ Components */}
          <motion.div
            variants={itemVariants}
            className="h-full w-full lg:col-span-3"
          >
            <div className="group relative h-full w-full border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-300 hover:bg-white/2">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40"></div>
              <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/40"></div>

              <div className="relative z-10 flex h-full w-full flex-col items-start justify-center overflow-hidden p-8">
                <div className="mb-6 opacity-80 transition-transform duration-300 group-hover:scale-110">
                  <PuzzleIcon className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-bold tracking-widest uppercase">
                  600+ Premium Components
                </h3>
                <p className="max-w-md text-sm leading-relaxed tracking-widest text-pretty text-white/50 uppercase">
                  An exhaustive library of meticulously crafted UI elements,
                  covering everything from simple buttons to complex interactive
                  widgets.
                </p>

                <PremiumComponent />
              </div>
            </div>
          </motion.div>

          {/* Bottom Left: Custom Theme Options */}
          <motion.div
            variants={itemVariants}
            className="h-full w-full lg:col-span-3"
          >
            <div className="group relative h-full w-full border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-300 hover:bg-white/2">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40"></div>
              <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/40"></div>

              <div className="relative z-10 flex h-full w-full flex-col items-start justify-center overflow-hidden p-8">
                <div className="mb-6 opacity-80 transition-transform duration-300 group-hover:scale-110">
                  <PaintBoardIcon className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-bold tracking-widest uppercase">
                  Powerful Theming
                </h3>
                <p className="max-w-lg text-sm leading-relaxed tracking-widest text-balance text-white/50 uppercase">
                  Tweak CSS variables just like <br className='hidden md:block lg:hidden' /> you&apos;d adjust Tailwind
                  classes. Add your own tokens, and every component instantly
                  inherits your brand&apos;s unique DNA.
                </p>

                <ThemingComponent />
              </div>
            </div>
          </motion.div>

          {/* Bottom Right: Modern Templates */}
          <motion.div
            variants={itemVariants}
            className="h-full w-full lg:col-span-2"
          >
            <div className="group relative h-full w-full border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-300 hover:bg-white/2">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40"></div>
              <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/40"></div>

              <div className="relative z-10 flex h-full w-full flex-col items-start justify-center overflow-hidden p-8">
                <div className="mb-6 opacity-80 transition-transform duration-300 group-hover:scale-110">
                  <Layout01Icon className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-bold tracking-widest uppercase">
                  Production Ready
                </h3>
                <p className="max-w-xs text-sm leading-relaxed tracking-widest text-pretty text-white/50 uppercase">
                  Stop building layouts from scratch. Ship complete pages in
                  hours, not weeks, with our production-ready templates.
                </p>

                <ProductionReadyComponent />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
