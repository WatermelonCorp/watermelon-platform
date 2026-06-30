'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { type LucideIcon, Plus } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';

interface Action {
  icon: LucideIcon;
  label: string;
}

interface SplitActionsProps {
  actions: Action[];
  triggerIcon?: LucideIcon;
}

export default function SplitActions({
  actions,
  triggerIcon: TriggerIcon = Plus,
}: SplitActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [positions, setPositions] = useState<number[]>([]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const GAP = 8;

    const calculatePositions = () => {
      const widths = buttonRefs.current.map(
        (button) => button?.offsetWidth ?? 0,
      );

      const totalWidth =
        widths.reduce((sum, width) => sum + width, 0) +
        GAP * (widths.length - 1);

      let cursor = -totalWidth / 2;

      const newPositions = widths.map((width) => {
        const center = cursor + width / 2;
        cursor += width + GAP;
        return center;
      });

      setPositions(newPositions);
    };

    requestAnimationFrame(calculatePositions);

    window.addEventListener('resize', calculatePositions);

    return () => {
      window.removeEventListener('resize', calculatePositions);
    };
  }, [actions, isOpen]);

  return (
    <div className="theme-injected flex h-screen w-full items-center justify-center">
      <div
        className="relative flex min-h-14 min-w-14 items-center justify-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.button
              key="trigger"
              whileTap={{ scale: 1.15 }}
              initial={{
                scale: 0.5,
                opacity: 0,
                filter: 'blur(8px)',
              }}
              animate={{
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
              }}
              exit={{
                scale: 0.5,
                opacity: 0,
                filter: 'blur(8px)',
              }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 24,
              }}
              className="bg-primary text-primary-foreground rounded-full p-2"
            >
              <TriggerIcon className="size-8 stroke-[3]" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isOpen &&
            actions.map((action, index) => (
              <motion.button
                key={action.label}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                initial={{
                  x: 0,
                  scale: 0,
                  opacity: 0,
                  filter: 'blur(8px)',
                }}
                animate={{
                  x: positions[index] ?? 0,
                  scale: 1,
                  opacity: 1,
                  filter: 'blur(0px)',
                }}
                exit={{
                  x: 0,
                  scale: 0.5,
                  opacity: 0,
                  filter: 'blur(8px)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 24,
                }}
                className={cn(
                  'border-border bg-card text-card-foreground absolute flex items-center gap-2 rounded-full border px-4 py-2',
                  (positions[index] ?? 0) < 0 ? 'origin-right' : 'origin-left',
                )}
              >
                <action.icon className="size-4 stroke-2" />
                <span className="text-lg font-medium">{action.label}</span>
              </motion.button>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
