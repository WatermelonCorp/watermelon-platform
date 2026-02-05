import { motion, type HTMLMotionProps } from "framer-motion";
import React from "react";

export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  HTMLMotionProps<"button">
>(({ className, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md ${className}`}
      {...props}
    />
  );
});

AnimatedButton.displayName = "AnimatedButton";
