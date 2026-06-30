'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import useMeasure from 'react-use-measure';

const SPRING_CONFIG = {
  type: 'spring',
  stiffness: 200,
  damping: 22,
  mass: 1.2,
} as const;

export default function ExpandDetails() {
  const [isOpen, setIsOpen] = useState(true);
  const [ref, bounds] = useMeasure({ offsetSize: true });

  return (
    <div className="theme-injected flex h-screen w-full items-center justify-center transition-colors">
      <motion.div
        initial={{ borderRadius: 20 }}
        animate={{
          width: isOpen ? 320 : 120,
          height: bounds.height > 0 ? bounds.height : 'auto',
          borderRadius: isOpen ? 20 : 24,
        }}
        transition={{
          height: {
            ...SPRING_CONFIG,
            delay: isOpen ? 0.25 : 0,
          },
          width: {
            ...SPRING_CONFIG,
            delay: isOpen ? 0 : 0.3,
          },
          borderRadius: SPRING_CONFIG,
        }}
        className="border-border bg-card text-card-foreground overflow-hidden border"
      >
        <div ref={ref} className="relative px-4 py-2">
          <motion.button
            layout="position"
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground flex w-full items-center gap-1 transition-colors focus:outline-none"
          >
            <motion.div
              animate={{ rotate: isOpen ? 0 : -90 }}
              transition={{ duration: 0.2, ease: 'easeOut', delay: 0.3 }}
              className="flex items-center justify-center"
            >
              <ChevronDown className="size-5 stroke-2" />
            </motion.div>

            <span className="text-foreground text-lg font-medium tracking-tight">
              Details
            </span>
          </motion.button>

          <AnimatePresence initial={false} mode="popLayout">
            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  filter: 'blur(8px)',
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  transition: {
                    type: 'spring',
                    duration: 0.4,
                    bounce: 0,
                    delay: 0.3,
                  },
                }}
                exit={{
                  opacity: 0,
                  filter: 'blur(8px)',
                  y: 16,
                }}
                transition={{
                  type: 'spring',
                  duration: 0.4,
                  bounce: 0,
                }}
                className="min-w-[320px] overflow-hidden"
              >
                <div className="mt-3 ml-6 grid grid-cols-2 gap-x-4 gap-y-5">
                  <div className="col-span-2">
                    <div className="text-muted-foreground text-sm font-medium">
                      Model
                    </div>
                    <div className="text-foreground mt-1 text-lg tracking-tight">
                      GPT 5.5 Codex
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-sm font-medium">
                      Tokens
                    </div>
                    <div className="text-foreground mt-1 text-lg tracking-tight">
                      3.4K
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-sm font-medium">
                      Cost
                    </div>
                    <div className="text-foreground mt-1 text-lg tracking-tight">
                      $0.27
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-sm font-medium">
                      Latency
                    </div>
                    <div className="text-foreground mt-1 text-lg tracking-tight">
                      1.4s
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-sm font-medium">
                      Temperature
                    </div>
                    <div className="text-foreground mt-1 text-lg tracking-tight">
                      0.7
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
