import { motion, type Variants } from "motion/react";
import Heading from "./heading";
import Container from "./container";

const testimonials = [
  {
    id: 1,
    content: "Axiom Zero completely changed how we build systems. What used to take a week now takes an afternoon. The animation defaults are perfectly dialed in.",
    author: "SARAH DRASNER",
    role: "VP OF ENGINEERING",
    avatar: "[S]",
  },
  {
    id: 2,
    content: "I've tried every UI library out there, and this is the first one that feels like it was designed by an engineer for engineers. The bento grids are insane.",
    author: "MARC JOHNSON",
    role: "DESIGN ENGINEER",
    avatar: "[M]",
  },
  {
    id: 3,
    content: "Finally, an open-source library that doesn't look like standard Material. It has that premium, highly technical feel right out of the box.",
    author: "ELENA RODRIGUEZ",
    role: "FRONTEND LEAD",
    avatar: "[E]",
  },
  {
    id: 4,
    content: "The crosshair cursors and monospace typography make everything feel incredibly tactile. It's like building an interface for a spaceship.",
    author: "ALEX CHEN",
    role: "PRODUCT DESIGNER",
    avatar: "[A]",
  },
  {
    id: 5,
    content: "We dropped our entire custom design system to use this. The framer-motion integration is flawless and the performance is surprisingly good.",
    author: "DAVID KIM",
    role: "CTO @ NEURAL",
    avatar: "[D]",
  }
];

export default function Testimonial() {
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

  // Duplicate the array to create a seamless infinite loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="py-32 relative overflow-hidden bg-background font-mono">
      {/* Decorative top border */}
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
            COMMUNITY FEEDBACK
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-balance text-foreground font-sans">
              Loved by builders.
            </Heading>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 text-sm text-white/50 text-pretty max-w-2xl font-mono uppercase tracking-widest leading-relaxed">
            Don&apos;t just take our word for it.<br className="block md:hidden mt-2" /> Telemetry from active developers.
          </motion.p>
        </motion.div>
      </Container>

      {/* Marquee Scroller */}
      <div className="relative w-full max-w-full overflow-hidden mt-8 flex">
        {/* Left/Right Fade Gradients for smooth entering/exiting */}
        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-background to-transparent z-20 pointer-events-none" />
        
        <motion.div 
          className="flex gap-6 px-3 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust speed here
          }}
        >
          {marqueeItems.map((t, index) => (
            <div 
              key={`${t.id}-${index}`} 
              className="w-[350px] md:w-[450px] shrink-0 relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300 cursor-crosshair"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

              <div className="p-8 flex flex-col h-full w-full whitespace-normal">
                <div className="text-white/20 mb-6 font-mono text-xl">
                  {`//`}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-8 grow font-mono uppercase tracking-wide">
                  &quot;{t.content}&quot;
                </p>
                
                <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-6">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-primary font-bold bg-white/5 group-hover:border-primary transition-colors">
                    {t.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white/90 text-xs tracking-widest">{t.author}</span>
                    <span className="text-[10px] text-white/40 tracking-widest mt-1">{t.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative gradient radial at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
