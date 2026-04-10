'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';

export interface PasteData {
  name: string;
  image: string;
}

interface QuickPasteProps {
  onPaste: (value: string) => PasteData | null;
  onClear?: () => void;
  onContinue?: (data: PasteData) => void;
  placeholder?: string;
  submitText?: string;
  className?: string;
}

export const QuickPaste: React.FC<QuickPasteProps> = ({
  onPaste,
  onClear,
  onContinue,
  placeholder = 'Email Address',
  submitText = 'Paste',
  className = '',
}) => {
  const [pastedData, setPastedData] = useState<PasteData | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handlePaste = () => {
    const data = onPaste(inputValue);
    if (data) {
      setPastedData(data);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlePaste();
    }
  };

  const handleClear = () => {
    setPastedData(null);
    setInputValue('');
    onClear?.();
  };

  const springConfig = { type: 'spring' as const, bounce: 0.1, duration: 0.4 };

  return (
    <div
      className={`flex w-full flex-col items-center justify-center p-4 antialiased select-none ${className}`}
    >
      <div className="w-full max-w-100">
        <LayoutGroup>
          <motion.div
            layout
            transition={springConfig}
            className="flex min-h-16 items-center rounded-full bg-neutral-100 p-1.5 shadow-sm transition-colors duration-300 dark:bg-neutral-900"
          >
            <AnimatePresence mode="popLayout">
              {pastedData ? (
                <motion.div
                  key="pasted"
                  className="flex w-full items-center justify-between pr-1"
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      filter: 'blur(4px)',
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: 'blur(0px)',
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      filter: 'blur(4px)',
                      x: -20,
                    }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                    className="flex items-center rounded-full border border-neutral-200 bg-white py-1.5 pr-4 pl-1.5 shadow-sm transition-colors dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <img
                      src={pastedData.image}
                      alt={pastedData.name}
                      className="mr-3 h-9 w-9 rounded-full border border-neutral-200 object-cover shadow-sm dark:border-neutral-700"
                    />
                    <span className="mr-3 max-w-30 truncate text-[15px] font-bold tracking-tight text-neutral-600 transition-colors sm:max-w-none sm:text-[16px] dark:text-neutral-200">
                      {pastedData.name}
                    </span>
                    <button
                      title="remove"
                      onClick={handleClear}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-400 text-white transition-colors hover:bg-red-500"
                    >
                      <X size={14} strokeWidth={3} />
                    </button>
                  </motion.div>

                  <motion.button
                    title="continue"
                    layoutId="shared-action-button"
                    transition={springConfig}
                    style={{ borderRadius: 9999 }}
                    onClick={() => onContinue?.(pastedData)}
                    className="ml-2 flex h-11 w-11 shrink-0 items-center justify-center bg-neutral-900 text-white shadow-lg active:scale-95 dark:bg-white dark:text-black"
                  >
                    <motion.div
                      layout="position"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      <ArrowRight size={22} strokeWidth={2.5} />
                    </motion.div>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, filter: 'blur(4px)', x: 0 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                  exit={{ opacity: 0, filter: 'blur(4px)', x: 0 }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                  className="flex w-full items-center justify-between pr-1 pl-4"
                >
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="mr-2 w-full border-none bg-transparent text-[16px] font-semibold text-neutral-900 transition-colors outline-none placeholder:text-neutral-400 sm:text-[18px] dark:text-white dark:placeholder:text-neutral-600"
                  />
                  <motion.button
                    layoutId="shared-action-button"
                    type="button"
                    transition={springConfig}
                    style={{ borderRadius: 9999 }}
                    onClick={handlePaste}
                    className="flex h-11 shrink-0 items-center justify-center bg-blue-600 px-5 text-[14px] font-bold tracking-tight text-white shadow-md hover:bg-blue-700 active:scale-95 sm:px-7 sm:text-[15px]"
                  >
                    <motion.span
                      layout="position"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap"
                    >
                      {submitText}
                    </motion.span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
};
