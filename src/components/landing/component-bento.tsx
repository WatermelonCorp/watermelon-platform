"use client";

import { motion, type Variants } from "motion/react";
import Heading from "./heading";
import Container from "./container";
import Checkbox16 from "@/data/contents/components/checkbox/variant-16";
import Switch3 from "@/data/contents/components/switch/variant-3";
import Tabs7 from "@/data/contents/components/tabs/variant-7";
import Breadcrumb7 from "@/data/contents/components/breadcrumb/variant-7";

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
    <section className="py-24 md:py-32 relative overflow-hidden bg-background font-mono">
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
              Building <span className="text-primary">blocks</span>
            </Heading>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 text-sm text-white/50 text-pretty max-w-lg font-mono uppercase tracking-widest leading-relaxed text-left md:text-right">
            The fundamental architecture of your next great application. Robust, accessible, and highly customizable structure.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[240px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Top Left - Tabs 7 */}
          <motion.div variants={itemVariants} className="md:col-span-1 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
               <div className="absolute top-6 left-6 z-10">
                 <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ TABS ]"}</span>
               </div>
               <div className="scale-[0.9] origin-center w-full mt-6 flex justify-center">
                 <Tabs7 />
               </div>
            </div>
          </motion.div>

          {/* Top Right - Checkbox 16 */}
          <motion.div variants={itemVariants} className="md:col-span-1 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex items-center justify-center p-6 relative overflow-hidden">
               <div className="absolute top-6 left-6 z-10">
                 <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ CHECKBOX ]"}</span>
               </div>
               <div className="scale-[0.9] origin-center mt-6">
                 <Checkbox16 />
               </div>
            </div>
          </motion.div>

          {/* Bottom Left - Switch 3 */}
          <motion.div variants={itemVariants} className="md:col-span-1 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
               <div className="absolute top-6 left-6 z-10">
                 <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ SWITCH ]"}</span>
               </div>
               <div className="scale-[0.9] origin-center flex justify-center w-full mt-6">
                 <Switch3 />
               </div>
            </div>
          </motion.div>

          {/* Bottom Right - Breadcrumb 7 */}
          <motion.div variants={itemVariants} className="md:col-span-1 h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
               <div className="absolute top-6 left-6 z-10">
                 <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">{"[ BREADCRUMB ]"}</span>
               </div>
               <div className="scale-[0.9] origin-center mt-6">
                 <Breadcrumb7 />
               </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
