"use client";

import { motion } from "motion/react";

export function AnimatedCheck({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <motion.path
        d="M5 12l5 5l10-10"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />
    </svg>
  );
}
