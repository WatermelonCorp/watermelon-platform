"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export interface TourStep {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface FeatureTourProps {
    steps: TourStep[];
    onClose: () => void;
    onLearnMore?: (step: TourStep) => void;
    className?: string;
}

export const FeatureTour: React.FC<FeatureTourProps> = ({
    steps,
    onClose,
    onLearnMore,
    className = ""
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const goToStep = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' && currentIndex < steps.length - 1) {
                goToStep(currentIndex + 1);
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                goToStep(currentIndex - 1);
            } else if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, steps.length, onClose]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            filter: 'blur(10px)',
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            filter: 'blur(10px)',
        }),
    };

    const currentStep = steps[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-[400px] sm:aspect-[1/1.3] min-h-[520px] sm:min-h-0 rounded-[34px] border shadow-sm p-6 sm:p-8 flex flex-col items-center overflow-hidden transition-colors duration-300 bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 ${className}`}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full transition-colors z-50 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
                <X size={20} strokeWidth={3} className="text-white dark:text-neutral-200" />
            </button>

            <div className="flex-1 w-full flex flex-col items-center justify-center relative">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 },
                            scale: { duration: 0.4 },
                            filter: { duration: 0.4 }
                        }}
                        className="w-full flex flex-col items-center text-center"
                    >
                        <div className="flex items-center justify-center min-h-[100px]">
                            <motion.div
                                initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                                className="dark:text-white"
                            >
                                {currentStep.icon}
                            </motion.div>
                        </div>

                        <div className="space-y-2 px-4 mt-8 sm:mt-12">
                            <motion.h2
                                className="text-[26px] font-bold text-neutral-900 dark:text-white"
                            >
                                {currentStep.title}
                            </motion.h2>

                            <p className="text-[20px] font-medium leading-tight text-neutral-500 dark:text-neutral-400">
                                {currentStep.description}
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onLearnMore?.(currentStep)}
                            className="mt-6 sm:mt-10 px-10 py-3 rounded-full font-semibold text-lg transition-colors bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                        >
                            Learn More
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center gap-3">
                {steps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToStep(index)}
                        className="relative h-2 focus:outline-none"
                    >
                        <div
                            className={`h-[12px] w-[12px] rounded-full transition-all duration-500 ease-out ${index === currentIndex
                                ? 'bg-neutral-500 dark:bg-neutral-200'
                                : 'bg-neutral-200 dark:bg-neutral-700'
                                }`}
                        />
                    </button>
                ))}
            </div>

            <div className="absolute inset-0 pointer-events-none rounded-[40px] bg-gradient-to-br from-white/20 via-transparent to-black/5 dark:from-white/5 dark:via-transparent dark:to-black/40" />
        </motion.div>
    );
};