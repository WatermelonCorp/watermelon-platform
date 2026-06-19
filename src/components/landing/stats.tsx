import { CubeIcon, MagicWand01Icon, Layout01Icon, Copy01Icon } from "hugeicons-react";
import { motion, type Variants } from "motion/react";
import Container from "./container";
import Heading from "./heading";

const statsData = [
  {
    id: 1,
    value: "600+",
    label: "Components",
    icon: <CubeIcon className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    value: "100+",
    label: "Animations",
    icon: <MagicWand01Icon className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    value: "50+",
    label: "Sections",
    icon: <Layout01Icon className="w-6 h-6 text-primary" />,
  },
  {
    id: 4,
    value: "10+",
    label: "Templates",
    icon: <Copy01Icon className="w-6 h-6 text-primary" />,
  },
];

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
    <section className="relative w-full py-24 overflow-hidden bg-background font-mono">
      {/* Decorative Technical Borders */}
      <div className="hidden lg:block absolute top-0 left-0 w-full border-t border-white/5" />
      <div className="hidden lg:block absolute bottom-0 left-0 w-full border-b border-white/5" />
      <div className="hidden lg:block absolute top-0 bottom-0 left-8 md:left-16 w-px bg-white/5"></div>
      <div className="hidden lg:block absolute top-0 bottom-0 right-8 md:right-16 w-px bg-white/5"></div>

      {/* Crosshairs at intersections */}
      {/* Top Crosshairs */}
      <div className="hidden lg:block absolute top-0 left-8 md:left-16 -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-10">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20"></div>
      </div>
      <div className="hidden lg:block absolute top-0 right-8 md:right-16 translate-x-1/2 -translate-y-1/2 w-4 h-4 z-10">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20"></div>
      </div>
      {/* Bottom Crosshairs */}
      <div className="hidden lg:block absolute bottom-0 left-8 md:left-16 -translate-x-1/2 translate-y-1/2 w-4 h-4 z-10">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20"></div>
      </div>
      <div className="hidden lg:block absolute bottom-0 right-8 md:right-16 translate-x-1/2 translate-y-1/2 w-4 h-4 z-10">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20"></div>
      </div>

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="flex flex-col items-start md:items-center text-left md:text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center text-xs font-bold text-primary mb-8 tracking-widest uppercase">
            <span className="mr-3 opacity-70">{"//"}</span>
            TELEMETRY DATA
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-balance text-foreground font-sans">
              Everything you need to ship faster.
            </Heading>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 text-sm text-white/50 text-pretty max-w-2xl font-mono uppercase tracking-widest">
            Stop re-building the same interfaces.<br className="block md:hidden mt-2" /> Watermelon UI provides an extensive catalog of pre-built blocks.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {statsData.map((stat) => (
            <motion.div 
              key={stat.id} 
              variants={itemVariants}
              className="relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300"
            >
              {/* Corner Accents on the box */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

              <div className="flex flex-col items-center justify-center h-full w-full p-10 text-center">
                <div className="mb-6 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 opacity-80">
                  {stat.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground tabular-nums mb-3 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/40">
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
