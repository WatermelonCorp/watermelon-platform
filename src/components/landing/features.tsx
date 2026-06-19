import { CodeIcon, PuzzleIcon, PaintBoardIcon, Layout01Icon } from "hugeicons-react";
import { motion, type Variants } from "motion/react";
import Container from "./container";
import Heading from "./heading";

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
    <section className="py-24 relative overflow-hidden bg-background font-mono">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-16 flex flex-col items-start md:items-center text-left md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center text-xs font-bold text-primary mb-8 tracking-widest uppercase"
          >
            <span className="mr-3 opacity-70">{"//"}</span>
            FEATURE BENTO
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-balance text-foreground font-sans"
            >
              Why choose Watermelon UI?
            </Heading>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 auto-rows-[320px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Top Left: 100% Open Source */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 h-full w-full"
          >
            <div className="h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

              <div className="w-full h-full flex flex-col items-start justify-center p-8 relative overflow-hidden z-10">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300 opacity-80">
                  <CodeIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold tracking-widest mb-3 text-foreground uppercase">
                  100% Open Source
                </h3>
                <p className="text-sm text-white/50 text-pretty max-w-sm uppercase tracking-widest leading-relaxed">
                  Free for commercial and personal use. No strings attached,
                  just copy, paste, and ship faster than ever.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Top Right: 600+ Components */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 h-full w-full"
          >
            <div className="h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

              <div className="w-full h-full flex flex-col items-start justify-center p-8 relative overflow-hidden z-10">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300 opacity-80">
                  <PuzzleIcon
                    className="w-8 h-8 text-primary"
                  />
                </div>
                <h3 className="text-xl font-bold tracking-widest mb-3 text-foreground uppercase">
                  600+ Premium Components
                </h3>
                <p className="text-sm text-white/50 text-pretty max-w-md uppercase tracking-widest leading-relaxed">
                  An exhaustive library of meticulously crafted UI elements,
                  covering everything from simple buttons to complex interactive
                  widgets.
                </p>

                {/* Decorative background */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-10 pointer-events-none grid-cols-4 gap-2 p-6 transition-opacity duration-500 group-hover:opacity-30 hidden md:grid">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`bg-primary border border-primary/50 ${[2, 5, 7, 10, 15].includes(i) ? "opacity-100" : "opacity-20"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Left: Custom Theme Options */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 h-full w-full"
          >
            <div className="h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

              <div className="w-full h-full flex flex-col items-start justify-center p-8 relative overflow-hidden z-10">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300 opacity-80">
                  <PaintBoardIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold tracking-widest mb-3 text-foreground uppercase">
                  Powerful Theming
                </h3>
                <p className="text-sm text-white/50 text-pretty max-w-lg uppercase tracking-widest leading-relaxed">
                  Tweak CSS variables just like you&apos;d adjust Tailwind
                  classes. Add your own tokens, and every component instantly
                  inherits your brand&apos;s unique DNA.
                </p>

                {/* Decorative gradient lines */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-24 flex-col gap-4 pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-50 hidden md:flex">
                  <div className="flex-1 bg-primary border-r border-background/50" />
                  <div className="flex-1 w-3/4 bg-primary/80 border-r border-background/50" />
                  <div className="flex-1 w-1/2 bg-primary/50 border-r border-background/50" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right: Modern Templates */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 h-full w-full"
          >
            <div className="h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

              <div className="w-full h-full flex flex-col items-start justify-center p-8 relative overflow-hidden z-10">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300 opacity-80">
                  <Layout01Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold tracking-widest mb-3 text-foreground uppercase">
                  Production Ready
                </h3>
                <p className="text-sm text-white/50 text-pretty max-w-xs uppercase tracking-widest leading-relaxed">
                  Stop building layouts from scratch. Ship complete pages in
                  hours, not weeks, with our production-ready templates.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
