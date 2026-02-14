import { motion } from "motion/react";

export function MediaLoadingOverlay() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/25 bg-black/45 px-4 py-2">
        <div className="relative h-5 w-5">
          <motion.span
            className="absolute inset-0 rounded-full border border-white/60"
            animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-[5px] rounded-full bg-white/90"
            animate={{ scale: [1, 0.78, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-white/90"
              animate={{ y: [0, -3, 0], opacity: [0.45, 1, 0.45] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.12,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
