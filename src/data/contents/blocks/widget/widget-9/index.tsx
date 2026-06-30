import { motion, type Variants } from 'motion/react';

export function EngagementsWidget() {
  const data = [
    { value: 50 },
    { value: 40 },
    { value: 45 },
    { value: 30 },
    { value: 65 },
    { value: 75 },
    { value: 52 },
    { value: 48 },
    { value: 65 },
    { value: 85 },
    { value: 45 },
    { value: 60 },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 350, damping: 25 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="bg-card ring-border/10 flex w-full max-w-lg flex-col gap-6 rounded-3xl p-4 antialiased shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_32px_rgba(0,0,0,0.04)] ring-1 sm:flex-row"
    >
      <div className="flex flex-1 flex-col justify-between pt-3 pl-3">
        <div>
          <motion.h3
            variants={itemVariants}
            className="text-muted-foreground mb-1 text-sm font-medium text-balance"
          >
            Total Engagements
          </motion.h3>
          <motion.div
            variants={itemVariants}
            className="mb-4 flex items-baseline gap-2"
          >
            <span className="text-foreground text-4xl font-bold tracking-tight tabular-nums">
              12.8K
            </span>
            <span className="text-destructive bg-destructive/10 rounded-md px-2 py-0.5 text-sm font-medium tabular-nums">
              -5%
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Organic</span>
              <span className="text-foreground font-medium tabular-nums">
                8.2K
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Promoted</span>
              <span className="text-foreground font-medium tabular-nums">
                4.6K
              </span>
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={itemVariants}
          className="text-muted-foreground mt-6 text-xs"
        >
          Last 28 Days vs Previous Period
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="bg-muted/10 ring-border/10 relative flex h-[160px] w-full items-end justify-between gap-[3px] overflow-hidden rounded-lg px-3 pt-6 pb-3 shadow-inner ring-1 ring-inset sm:w-[200px]"
      >
        {data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${item.value}%`, opacity: 1 }}
            transition={{
              delay: 0.2 + i * 0.04,
              duration: 0.6,
              type: 'spring',
              stiffness: 150,
              damping: 15,
            }}
            whileHover={{
              scaleY: 1.05,
              filter: 'brightness(1.5)',
              transition: { duration: 0.2 },
            }}
            className="bg-foreground/20 group hover:bg-foreground/30 flex w-full origin-bottom transform-gpu cursor-pointer flex-col justify-start transition-colors active:scale-[0.96]"
          >
            {/* Top Cap */}
            <div className="bg-foreground/80 group-hover:bg-foreground h-[2px] w-full rounded-t-sm transition-colors" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
