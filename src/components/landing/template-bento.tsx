import { useState, useEffect } from "react";
import { motion, type Variants, AnimatePresence } from "motion/react";
import Heading from "./heading";
import Container from "./container";

const IMAGES = [
  "https://assets.watermelon.sh/lp-hero-01.avif",
  "https://assets.watermelon.sh/lp-footer-01.avif",
  "https://assets.watermelon.sh/lp-hero-02.avif",
  "https://assets.watermelon.sh/lp-footer-02.avif",
  "https://assets.watermelon.sh/lp-hero-03.avif",
  "https://assets.watermelon.sh/lp-footer-03.avif",
  "https://assets.watermelon.sh/lp-hero-05.avif",
  "https://assets.watermelon.sh/lp-hero-04.avif"
];

export default function TemplateBento() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#101010] font-mono">
      {/* Decorative Technical Borders */}
      <div className="hidden lg:block absolute top-0 left-0 w-full border-t border-white/5" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-16 flex flex-col items-start md:items-center text-left md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center text-xs font-bold text-primary mb-8 tracking-widest uppercase">
            <span className="mr-3 opacity-70">{"//"}</span>
            PRODUCTION TEMPLATES
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-balance text-foreground font-sans">
              Production Ready <span className="text-primary">Templates</span>
            </Heading>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 text-sm text-white/50 text-pretty max-w-2xl font-mono uppercase tracking-widest leading-relaxed">
            Don&apos;t start from scratch.<br className="block md:hidden mt-2" /> Use our comprehensive page templates.
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={itemVariants} className="w-full h-[700px] md:h-[1000px] border border-white/10 bg-black/40 backdrop-blur-md relative group cursor-crosshair hover:bg-white/2 transition-colors duration-300">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex flex-col">
              {/* Tech Header */}
              <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 md:px-6 gap-2 md:gap-4 w-full">
                {/* Techy "traffic lights" */}
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-white/20 group-hover:bg-destructive/80 transition-colors" />
                  <div className="w-2 h-2 bg-white/20 group-hover:bg-yellow-500/80 transition-colors" />
                  <div className="w-2 h-2 bg-white/20 group-hover:bg-primary/80 transition-colors" />
                </div>
                <div className="ml-2 md:ml-4 flex-1 flex justify-center min-w-0">
                   <div className="px-2 md:px-4 py-1 text-[10px] md:text-xs border border-white/10 text-white/50 font-mono w-full max-w-[280px] md:w-76 text-center tracking-widest uppercase truncate">
                     {"[ WATERMELON-UI.COM/TEMPLATES ]"}
                   </div>
                </div>
                {/* Right side spacer to keep center aligned */}
                <div className="w-6 md:w-10"></div>
              </div>
              
              <div className="flex-1 w-full flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden">
                {/* Technical background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px]"></div>
                
                <div className="flex-1 w-full border border-white/20 flex flex-col items-center justify-center bg-black relative z-10 overflow-hidden group-hover:border-primary/50 transition-colors duration-500">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIndex}
                      src={IMAGES[currentIndex]}
                      initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="w-full h-full object-cover object-top"
                      alt={`Template preview ${currentIndex + 1}`}
                    />
                  </AnimatePresence>
                </div>
                
                <div className="mt-2 md:mt-4 relative z-10 w-full overflow-hidden">
                  <p className="text-xs md:text-sm font-bold text-white/40 tracking-[0.2em] uppercase flex flex-wrap justify-center gap-x-3 md:gap-x-6 gap-y-2">
                    <span className="hover:text-primary transition-colors cursor-pointer">HERO</span>
                    <span className="text-white/20">{"//"}</span>
                    <span className="hover:text-primary transition-colors cursor-pointer">FOOTER</span>
                    <span className="text-white/20">{"//"}</span>
                    <span className="hover:text-primary transition-colors cursor-pointer">LANDING PAGE</span>
                    <span className="text-white/20">{"//"}</span>
                    <span className="hover:text-primary transition-colors cursor-pointer">DASHBOARD</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
