import { motion, type Variants } from "motion/react";
import Heading from "./heading";
import Container from "./container";

export default function ComponentsBento() {
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
      {/* Decorative Technical Borders */}
      <div className="hidden lg:block absolute top-0 left-0 w-full border-t border-white/5" />
      <div className="hidden lg:block absolute bottom-0 left-0 w-full border-b border-white/5" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-12 flex flex-col items-start md:items-end text-left md:text-right"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center text-xs font-bold text-primary mb-8 tracking-widest uppercase">
            <span className="mr-3 opacity-70 block md:hidden">{"//"}</span>
            STANDARD UI COMPONENTS
            <span className="ml-3 opacity-70 hidden md:block">{"//"}</span>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-balance text-foreground font-sans text-left md:text-right">
              Building blocks.
            </Heading>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 text-sm text-white/50 text-pretty max-w-lg font-mono uppercase tracking-widest leading-relaxed text-left md:text-right">
            The fundamental architecture of your next great application. Robust, accessible, and highly customizable structure.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Big Feature Block */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300 cursor-crosshair">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
               <div className="w-20 h-20 border border-dashed border-white/30 mb-6 flex items-center justify-center group-hover:border-primary group-hover:scale-105 transition-all duration-500">
                 <span className="text-primary text-2xl font-bold tracking-widest">+</span>
               </div>
               <span className="text-white/40 text-sm font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ STRUCTURAL COMPONENTS ]"}</span>
            </div>
          </motion.div>

          {/* Top Right small */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300 cursor-crosshair">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex items-center justify-center p-6">
               <span className="text-white/40 text-xs font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ INPUT FIELDS & FORMS ]"}</span>
            </div>
          </motion.div>

          {/* Bottom Right 1 */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300 cursor-crosshair">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex flex-col items-center justify-center p-6">
               <span className="text-white/40 text-xs font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ BUTTONS ]"}</span>
            </div>
          </motion.div>

          {/* Bottom Right 2 */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300 cursor-crosshair">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex flex-col items-center justify-center p-6">
               <span className="text-white/40 text-xs font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ TOGGLES ]"}</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
