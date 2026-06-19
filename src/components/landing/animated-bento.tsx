import { motion, type Variants } from "motion/react";
import Heading from "./heading";
import Container from "./container";

export default function AnimatedBento() {
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
      
      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-12 flex flex-col items-start md:items-center text-left md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center text-xs font-bold text-primary mb-8 tracking-widest uppercase">
            <span className="mr-3 opacity-70">{"//"}</span>
            MICRO-INTERACTIONS
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-balance text-foreground font-sans">
              Bring your UI to life.
            </Heading>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 text-sm text-white/50 text-pretty max-w-2xl font-mono uppercase tracking-widest">
            Drop-in animated components to delight your users.<br className="block md:hidden mt-2" /> Smooth, interruptible, and highly optimized.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Top Left - Wide */}
          <motion.div variants={itemVariants} className="md:col-span-2 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300 cursor-crosshair">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
               <div className="w-12 h-12 border border-dashed border-white/30 flex items-center justify-center mb-4 group-hover:rotate-90 group-hover:border-primary transition-all duration-500">
                  <span className="text-primary font-bold tracking-widest">+</span>
               </div>
               <span className="text-white/40 text-xs font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ ANIMATED COMPONENT ]"}</span>
            </div>
          </motion.div>
          
          {/* Top Right - Square-ish */}
          <motion.div variants={itemVariants} className="md:col-span-1 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300 cursor-crosshair">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex items-center justify-center p-6">
               <span className="text-white/40 text-xs font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ HOVER EFFECTS ]"}</span>
            </div>
          </motion.div>
          
          {/* Bottom Left - Square-ish */}
          <motion.div variants={itemVariants} className="md:col-span-1 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300 cursor-crosshair">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex items-center justify-center p-6">
               <span className="text-white/40 text-xs font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ TRAILS ]"}</span>
            </div>
          </motion.div>
          
          {/* Bottom Middle - The label text card */}
          <motion.div variants={itemVariants} className="md:col-span-1 h-full w-full relative border border-primary/20 bg-primary/5 backdrop-blur-sm group">
            {/* Corner Accents - Primary Colored */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>

            <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
               {/* Decorative background grid */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,255,18,0.1)_1px,transparent_1px)] bg-size-[12px_12px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="text-5xl lg:text-6xl font-bold text-foreground tracking-tighter tabular-nums mb-3 font-mono">100+</div>
                 <div className="text-primary font-bold tracking-widest uppercase text-xs">ANIMATED</div>
               </div>
            </div>
          </motion.div>
          
          {/* Bottom Right - Square-ish */}
          <motion.div variants={itemVariants} className="md:col-span-1 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300 cursor-crosshair">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex flex-col items-center justify-center p-6">
               <span className="text-white/40 text-xs font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ TRANSITIONS ]"}</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
