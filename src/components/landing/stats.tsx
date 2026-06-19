import { useEffect, useRef } from 'react';
import {
  CubeIcon,
  MagicWand01Icon,
  Layout01Icon,
  Copy01Icon,
} from 'hugeicons-react';
import { motion, useInView, animate, type Variants } from 'motion/react';
import Container from './container';
import Heading from './heading';

const statsData = [
  {
    id: 1,
    value: '600+',
    label: 'Components',
    icon: <CubeIcon className="text-primary h-6 w-6" />,
  },
  {
    id: 2,
    value: '100+',
    label: 'Animations',
    icon: <MagicWand01Icon className="text-primary h-6 w-6" />,
  },
  {
    id: 3,
    value: '50+',
    label: 'Sections',
    icon: <Layout01Icon className="text-primary h-6 w-6" />,
  },
  {
    id: 4,
    value: '10+',
    label: 'Templates',
    icon: <Copy01Icon className="text-primary h-6 w-6" />,
  },
];

function CountingNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const numMatch = value.match(/\d+/);
  const number = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, '');

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, number, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest).toString();
          }
        },
      });
      return controls.stop;
    }
  }, [isInView, number]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export default function Stats() {
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
    <section className="bg-[#101010] relative w-full overflow-hidden py-24 font-mono md:py-32">
      {/* Decorative Technical Borders */}
      <div className="absolute top-0 left-0 hidden w-full border-t border-white/5 lg:block" />
      <div className="absolute bottom-0 left-0 hidden w-full border-b border-white/5 lg:block" />
      <div className="absolute top-0 bottom-0 left-8 hidden w-px bg-white/5 md:left-16 lg:block"></div>
      <div className="absolute top-0 right-8 bottom-0 hidden w-px bg-white/5 md:right-16 lg:block"></div>

      {/* Crosshairs at intersections */}
      {/* Top Crosshairs */}
      <div className="absolute top-0 left-8 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 md:left-16 lg:block">
        <div className="absolute top-1/2 right-0 left-0 h-px bg-white/20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20"></div>
      </div>
      <div className="absolute top-0 right-8 z-10 hidden h-4 w-4 translate-x-1/2 -translate-y-1/2 md:right-16 lg:block">
        <div className="absolute top-1/2 right-0 left-0 h-px bg-white/20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20"></div>
      </div>
      {/* Bottom Crosshairs */}
      <div className="absolute bottom-0 left-8 z-10 hidden h-4 w-4 -translate-x-1/2 translate-y-1/2 md:left-16 lg:block">
        <div className="absolute top-1/2 right-0 left-0 h-px bg-white/20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20"></div>
      </div>
      <div className="absolute right-8 bottom-0 z-10 hidden h-4 w-4 translate-x-1/2 translate-y-1/2 md:right-16 lg:block">
        <div className="absolute top-1/2 right-0 left-0 h-px bg-white/20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20"></div>
      </div>

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
            TELEMETRY DATA
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              Everything you need <br />
              to <span className="text-primary">ship faster </span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl font-mono text-sm tracking-widest text-pretty text-white/50 uppercase"
          >
            Stop re-building the same interfaces.
            <br className="mt-2 block md:hidden" /> Watermelon UI provides an
            extensive catalog of pre-built blocks.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="group relative border border-white/10 bg-neutral-950 backdrop-blur-md transition-colors duration-300 hover:bg-white/2"
            >
              {/* Corner Accents on the box */}
              <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40"></div>
              <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/40"></div>

              <div className="flex h-full w-full flex-col items-center justify-center p-10 text-center">
                <div className="group-hover:text-primary mb-6 opacity-80 transition-transform duration-300 group-hover:scale-110">
                  {stat.icon}
                </div>
                <div className="text-foreground mb-3 font-mono text-4xl font-bold tracking-tight tabular-nums lg:text-5xl">
                  <CountingNumber value={stat.value} />
                </div>
                <div className="text-xs font-bold tracking-widest text-white/40 uppercase">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
