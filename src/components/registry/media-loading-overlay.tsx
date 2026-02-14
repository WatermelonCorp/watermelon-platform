import { motion } from "motion/react";

export function MediaLoadingOverlay() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
    >
      <motion.div
        className="size-10 rounded-xl bg-primary flex items-center justify-center shadow-lg"
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.92, 1, 0.92] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/logo-64.png"
          width={28}
          height={28}
          alt=""
          className="h-7 w-7"
        />
      </motion.div>
    </div>
  );
}
