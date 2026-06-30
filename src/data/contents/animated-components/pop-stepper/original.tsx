'use client';

import { Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

interface PopStepperProps {
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
  fontClassName?: string;
  lightColors?: string[];
  darkColors?: string[];
}

function createColorTimes(length: number) {
  if (length <= 2) return [0, 1];

  const startHold = 0.25;
  const endHold = 0.25;
  const usable = 1 - startHold - endHold;
  const middleCount = length - 2;

  return [
    0,
    ...Array.from(
      { length: middleCount },
      (_, i) => startHold + (usable * (i + 1)) / (middleCount + 1),
    ),
    1,
  ];
}

export default function PopStepper({
  initialValue = 10,
  step = 10,
  min = 0,
  max = 100,
  fontClassName = 'font-sans',
  lightColors = ['#000000', '#ef4444', '#3b82f6', '#22c55e', '#000000'],
  darkColors = ['#ffffff', '#be123c', '#1d4ed8', '#15803d', '#ffffff'],
}: PopStepperProps) {
  const [value, setValue] = useState(initialValue);
  const [prevValue, setPrevValue] = useState(initialValue);

  const { resolvedTheme } = useTheme();

  const colors = resolvedTheme === 'dark' ? darkColors : lightColors;

  const updateValue = (next: number) => {
    if (next === value) return;
    setPrevValue(value);
    setValue(next);
  };

  const isIncrementing = value > prevValue;

  return (
    <div className="flex h-screen w-full items-center justify-center gap-3  transition-colors ">
      <motion.button
        whileTap={{
          scale: 1.15,
        }}
        transition={{
          duration: 0.15,
        }}
        onClick={() => updateValue(Math.max(min, value - step))}
        className="rounded-full bg-black p-2 text-white dark:bg-white dark:text-black"
      >
        <Minus className="size-6" />
      </motion.button>

      <div className="inline-flex min-h-18 min-w-40 items-center justify-center overflow-hidden rounded-xl bg-zinc-100 px-5 py-2 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50">
        <motion.span
          key={value}
          initial={{
            scale: 1,
            rotate: 0,
          }}
          animate={{
            scale: [1, 1.25, 1.25, 1],
            rotate: [
              0,
              isIncrementing ? -20 : 20,
              isIncrementing ? -20 : 20,
              0,
            ],
            color: colors,
          }}
          transition={{
            scale: {
              duration: 0.4,
              times: [0, 0.4, 0.6, 1],
              ease: 'easeInOut',
            },
            rotate: {
              duration: 0.4,
              times: [0, 0.4, 0.6, 1],
              ease: 'easeInOut',
            },
            color: {
              duration: 0.35,
              times: createColorTimes(colors.length),
            },
          }}
          className={`text-5xl font-black tracking-tight whitespace-nowrap ${fontClassName}`}
        >
          {value}
        </motion.span>
      </div>

      <motion.button
        whileTap={{
          scale: 1.15,
        }}
        transition={{
          duration: 0.15,
        }}
        onClick={() => updateValue(Math.min(max, value + step))}
        className="rounded-full bg-black p-2 text-white dark:bg-white dark:text-black"
      >
        <Plus className="size-6" />
      </motion.button>
    </div>
  );
}
