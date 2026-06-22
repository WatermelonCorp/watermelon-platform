import { motion, type Variants } from "motion/react";
import React from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  variants?: Variants;
  wordVariants?: Variants;
  letterVariants?: Variants;
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: customDelay,
    },
  }),
};

const defaultLetterVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      mass: 0.5,
    },
  },
};

export function SplitText({
  text,
  className = "",
  delay = 0,
  variants = defaultContainerVariants,
  letterVariants = defaultLetterVariants,
}: SplitTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={variants}
      custom={delay}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
          {/* Add a space after each word, except the last one */}
          {wordIndex !== words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}
