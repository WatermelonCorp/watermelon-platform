import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useState } from 'react';

const springConfig = {
  type: 'spring',
  visualDuration: 0.35,
  bounce: 0.3,
} as const;

export default function LicenceKey() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  const PLACEHOLDER_TEXT = 'License Key';

  return (
    <MotionConfig transition={springConfig}>
      <div className="theme-injected flex h-screen w-full items-center justify-center">
        <motion.div
          className="border-border bg-card text-card-foreground relative h-16 cursor-pointer rounded-full border text-lg"
          animate={{ width: isOpen ? '400px' : '230px' }}
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
            }
          }}
        >
          <div className="flex h-full w-full items-center justify-center gap-1 pr-3 pl-4 font-semibold overflow-hidden relative">
            <AnimatePresence mode="popLayout">
              {!isOpen && (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{
                    opacity: 1,
                    filter: 'blur(0px)',
                    transition: {
                      type: 'spring',
                      visualDuration: 0.2,
                      bounce: 0,
                      delay: 0.05,
                    },
                  }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{
                    type: 'spring',
                    visualDuration: 0.2,
                    bounce: 0,
                  }}
                >
                  I have a{' '}
                </motion.span>
              )}
            </AnimatePresence>

            {!isOpen && (
              <motion.span layoutId="placeholder">
                {PLACEHOLDER_TEXT}
              </motion.span>
            )}

            <AnimatePresence mode="popLayout" anchorX="right">
              {isOpen && (
                <div
                  key="open"
                  className="flex flex-1 items-center justify-start"
                >
                  <motion.span
                    layoutId="placeholder"
                    className="text-muted-foreground pointer-events-none absolute text-lg font-medium"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: value.length === 0 ? 1 : 0,
                    }}
                    exit={{
                      opacity: 0,
                      filter: 'blur(4px)',
                    }}
                    transition={{
                      type: 'spring',
                      visualDuration: 0.25,
                      bounce: 0.1,
                    }}
                  >
                    {PLACEHOLDER_TEXT}
                  </motion.span>

                  <motion.input
                    autoFocus
                    initial={{
                      opacity: 0,
                      width: 0,
                    }}
                    animate={{
                      opacity: 1,
                      width: 'auto',
                    }}
                    exit={{
                      opacity: 0,
                      width: 0,
                    }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="text-foreground flex-1 bg-transparent focus-visible:ring-0 focus-visible:outline-none"
                  />

                  <motion.button
                    initial={{ opacity: 0, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(2px)' }}
                    transition={{
                      type: 'spring',
                      duration: 0.3,
                      bounce: 0.1,
                    }}
                    className="border-primary bg-primary text-primary-foreground cursor-pointer rounded-full border px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Activate
                  </motion.button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
