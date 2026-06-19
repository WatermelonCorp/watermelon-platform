import { motion, type Variants } from 'motion/react';
import Heading from './heading';
import Container from './container';

const testimonials = [
  {
    id: 1,
    content:
      'Axiom Zero completely changed how we build systems. What used to take a week now takes an afternoon. The animation defaults are perfectly dialed in.',
    author: 'SARAH DRASNER',
    role: 'VP OF ENGINEERING',
    avatar: '[S]',
  },
  {
    id: 2,
    content:
      "I've tried every UI library out there, and this is the first one that feels like it was designed by an engineer for engineers. The bento grids are insane.",
    author: 'MARC JOHNSON',
    role: 'DESIGN ENGINEER',
    avatar: '[M]',
  },
  {
    id: 3,
    content:
      "Finally, an open-source library that doesn't look like standard Material. It has that premium, highly technical feel right out of the box.",
    author: 'ELENA RODRIGUEZ',
    role: 'FRONTEND LEAD',
    avatar: '[E]',
  },
  {
    id: 4,
    content:
      "The crosshair cursors and monospace typography make everything feel incredibly tactile. It's like building an interface for a spaceship.",
    author: 'ALEX CHEN',
    role: 'PRODUCT DESIGNER',
    avatar: '[A]',
  },
  {
    id: 5,
    content:
      'We dropped our entire custom design system to use this. The framer-motion integration is flawless and the performance is surprisingly good.',
    author: 'DAVID KIM',
    role: 'CTO @ NEURAL',
    avatar: '[D]',
  },
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
    <section className="bg-[#101010] relative overflow-hidden py-24 md:py-32 font-mono">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 hidden w-full border-t border-white/5 lg:block" />

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
            COMMUNITY FEEDBACK
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              Loved by <span className="text-primary">builders</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl font-mono text-sm leading-relaxed tracking-widest text-pretty text-white/50 uppercase"
          >
            Don&apos;t just take our word for it.
            <br className="mt-2 block md:hidden" /> Telemetry from active
            developers.
          </motion.p>
        </motion.div>
      </Container>

      {/* Marquee Scroller */}
      <div className="relative mt-8 flex w-full max-w-full overflow-hidden">
        {/* Left/Right Fade Gradients for smooth entering/exiting */}
        <div className="from-background pointer-events-none absolute top-0 left-0 z-20 h-full w-32 bg-linear-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute top-0 right-0 z-20 h-full w-32 bg-linear-to-l to-transparent" />

        <motion.div
          className="flex gap-6 px-3 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 30, // Adjust speed here
          }}
        >
          {marqueeItems.map((t, index) => (
            <div
              key={`${t.id}-${index}`}
              className="group relative w-[350px] shrink-0 cursor-crosshair border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-300 md:w-[450px]"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40"></div>
              <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/40"></div>

              <div className="flex h-full w-full flex-col p-8 whitespace-normal">
                <div className="mb-6 font-mono text-xl text-white/20">
                  {`//`}
                </div>
                <p className="group-hover:text-primary transition-colors duration-300 mb-8 grow font-mono text-sm leading-relaxed tracking-wide text-white/80 uppercase">
                  &quot;{t.content}&quot;
                </p>

                <div className="mt-auto flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="text-primary group-hover:border-primary flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 font-bold transition-colors">
                    {t.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold tracking-widest text-white/90">
                      {t.author}
                    </span>
                    <span className="mt-1 text-[10px] tracking-widest text-white/40">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
