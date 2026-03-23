'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ThumbsUp } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';

export interface StackItem {
  id: string;
  title: string;
  type: 'form' | 'steps';
  steps?: { icon: any; text: string }[];
  buttonText?: string;
}

interface DialogStackProps {
  stack: StackItem[];
  trigger: {
    label: string;
    icon: any;
  };
}

export const DialogStack: React.FC<DialogStackProps> = ({ stack, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < stack.length - 1) setActiveIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setTimeout(() => setActiveIndex(0), 300);
  };

  const handleHeaderClose = () => {
    if (activeIndex > 0) {
      handleBack();
    } else {
      resetAndClose();
    }
  };

  return (
    <div className="relative flex min-h-[450px] flex-col items-center justify-center sm:min-h-[600px]">
      <motion.button
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.96 }}
        transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.3 }}
        className={`flex transform items-center gap-2 rounded-full border-[1.7px] border-neutral-200 bg-white px-6 py-3 text-lg font-semibold text-neutral-950 shadow-lg transition-all hover:translate-y-[-10px] sm:gap-3 sm:px-8 sm:py-4 sm:text-[20px] dark:border-neutral-800 dark:bg-neutral-900 dark:text-white ${isOpen ? 'translate-y-[-10px]' : ''}`}
      >
        <div className="text-neutral-950 dark:text-neutral-100">
          <HugeiconsIcon
            icon={trigger.icon}
            size={
              typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 28
            }
            strokeWidth={1.5}
          />
        </div>
        <span>{trigger.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 1, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ ease: 'easeOut', duration: 0.25 }}
            className="absolute top-1/2 left-1/2 z-50 flex w-160 -translate-x-1/2 -translate-y-1/2 items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetAndClose}
              className="absolute inset-0 bg-white/10 backdrop-blur-[2px] dark:bg-black/40"
            />

            <div className="relative flex min-h-[450px] w-xs items-center justify-center sm:min-h-[500px] sm:w-sm">
              <AnimatePresence mode="popLayout" initial={false}>
                {stack.map((item, index) => {
                  const isUnder = index < activeIndex;
                  if (index > activeIndex) return null;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ y: 50, opacity: 0, scale: 0.95 }}
                      animate={{
                        y: isUnder ? -35 : 0,
                        scale: isUnder ? 0.94 : 1,
                        opacity: isUnder ? 0.5 : 1,
                        zIndex: index,
                      }}
                      exit={{ y: 50, opacity: 0, scale: 0.95 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 28,
                      }}
                      className="absolute inset-x-0 top-0 flex h-fit flex-col overflow-hidden rounded-[20px] border-[1.6px] border-neutral-200 bg-white shadow-2xl transition-colors sm:rounded-[24px] dark:border-neutral-800 dark:bg-neutral-900"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between border-b-[1.5px] border-neutral-200 bg-neutral-50 px-4 py-2.5 transition-colors sm:px-5 sm:py-3 dark:border-neutral-700 dark:bg-neutral-800">
                        <h3 className="text-base font-medium text-neutral-500 sm:text-lg dark:text-neutral-400">
                          {item.title}
                        </h3>
                        <button
                          title="close"
                          onClick={handleHeaderClose}
                          className="rounded-full p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                          <X
                            size={20}
                            className="text-neutral-500 sm:size-[22px] dark:text-neutral-400"
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 px-5 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-10">
                        {item.type === 'form' ? (
                          <div className="space-y-4 sm:space-y-5">
                            <div className="space-y-2.5 sm:space-y-3">
                              <label className="block text-sm font-normal text-neutral-600 sm:text-base dark:text-neutral-400">
                                Email Address
                              </label>
                              <input
                                title="email"
                                type="text"
                                className="w-full rounded-lg border-[1.5px] border-neutral-200 bg-white p-3 py-2.5 text-black transition-colors focus:outline-none sm:rounded-xl sm:p-4 sm:py-3 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                              />
                              <p className="text-[12px] text-neutral-400 sm:text-[14px]">
                                Use commas to add multiple emails.
                              </p>
                            </div>

                            <div className="space-y-2.5 sm:space-y-3">
                              <label className="block text-sm font-normal text-neutral-600 sm:text-base dark:text-neutral-400">
                                Message
                              </label>
                              <textarea
                                title="message"
                                rows={
                                  typeof window !== 'undefined' &&
                                  window.innerWidth < 640
                                    ? 3
                                    : 4
                                }
                                className="w-full rounded-lg border-[1.5px] border-neutral-200 bg-white p-3 py-2.5 text-black transition-colors focus:outline-none sm:rounded-xl sm:p-4 sm:py-3 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                              />
                            </div>

                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3.5 font-semibold text-white transition-colors active:scale-[0.98] sm:rounded-2xl sm:py-4 dark:bg-white dark:text-black">
                              {item.buttonText || 'Send'}{' '}
                              <ArrowRight size={18} />
                            </button>

                            <button
                              onClick={handleNext}
                              className="w-full text-[14px] font-medium text-neutral-600 transition-colors hover:text-black sm:text-[15px] dark:text-neutral-500 dark:hover:text-white"
                            >
                              How it works?
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-6 sm:space-y-8">
                            <h4 className="text-xl font-bold text-neutral-900 sm:text-2xl dark:text-neutral-100">
                              3 easy steps
                            </h4>

                            <div className="space-y-5 sm:space-y-6">
                              {item.steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className="group flex items-start gap-3 sm:gap-4"
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-800 transition-colors sm:h-12 sm:w-12 sm:rounded-xl dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                                    <HugeiconsIcon
                                      icon={step.icon}
                                      size={
                                        typeof window !== 'undefined' &&
                                        window.innerWidth < 640
                                          ? 22
                                          : 27
                                      }
                                      strokeWidth={1.5}
                                    />
                                  </div>
                                  <p className="pt-0.5 text-sm leading-snug text-neutral-700 sm:pt-1 sm:text-base dark:text-neutral-300">
                                    {step.text}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={handleBack}
                              className="flex w-full items-center justify-center gap-3 rounded-xl bg-black py-3.5 text-base font-medium text-white transition-all active:scale-[0.98] sm:gap-4 sm:rounded-2xl sm:py-4 sm:text-lg dark:bg-white dark:text-black"
                            >
                              Got It{' '}
                              <ThumbsUp size={20} className="sm:size-[22px]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
