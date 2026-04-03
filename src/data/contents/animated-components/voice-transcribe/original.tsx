'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TbMessageFilled,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
} from 'react-icons/tb';

interface VoiceMessageProps {
  duration: number;
  transcription: string;
  waveformHeights?: number[];
  className?: string;
}

const DEFAULT_WAVEFORM = [
  8, 12, 16, 12, 10, 18, 24, 16, 14, 20, 12, 16, 22, 18, 14, 10, 16, 24, 18, 14,
  12, 10, 8, 12, 16, 14, 10,
];

export const TranscribeVoiceMessage: React.FC<VoiceMessageProps> = ({
  duration: initialDuration,
  transcription,
  waveformHeights = DEFAULT_WAVEFORM,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscription, setShowTranscription] = useState(false);
  useEffect(() => {
    if (!isPlaying) return;

    let frameId: number;
    const startTime = performance.now() - currentTime * 1000;

    const tick = (now: number) => {
      const nextTime = (now - startTime) / 1000;
      if (nextTime >= initialDuration) {
        setCurrentTime(initialDuration);
        setIsPlaying(false);
      } else {
        setCurrentTime(nextTime);
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, initialDuration, currentTime]);

  const handlePlayToggle = () => {
    if (currentTime >= initialDuration) setCurrentTime(0);
    setIsPlaying(!isPlaying);
  };

  const remainingTime = Math.ceil(initialDuration - currentTime);
  const progressPercent = currentTime / initialDuration;

  const words = transcription.split(' ');
  const totalChars = transcription.length;
  const isDone = currentTime >= initialDuration;

  // When done, reveal everything avoiding any tricky zone calculations
  const revealedCount = isDone
    ? totalChars
    : Math.floor(progressPercent * totalChars);

  return (
    <div
      className={`flex w-full flex-col items-center justify-center p-2 antialiased select-none sm:p-4 ${className}`}
    >
      <div className="relative flex w-full max-w-fit items-center gap-2 sm:gap-4">
        {/* Transcription Icon Toggle */}
        <button
          title="Transcription"
          onClick={() => setShowTranscription(!showTranscription)}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-16 sm:w-16 ${showTranscription
              ? 'border-neutral-200 bg-transparent text-neutral-900 dark:border-white/20 dark:text-white'
              : 'border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700'
            }`}
        >
          <TbMessageFilled size={22} className="sm:hidden" />
          <TbMessageFilled size={28} className="hidden sm:block" />
        </button>

        {/* Main Player Pill */}
        <div className="flex items-center gap-2 rounded-full border border-black/5 bg-neutral-100 px-3 py-2 shadow-sm transition-colors sm:gap-3 sm:px-4 sm:py-3 dark:border-white/5 dark:bg-neutral-800">
          <button
            onClick={handlePlayToggle}
            className="flex h-7 w-7 items-center justify-center text-neutral-900 transition-all active:scale-90 sm:h-8 sm:w-8 dark:text-white"
          >
            {isPlaying ? (
              <motion.div
                initial={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
              >
                <TbPlayerPauseFilled size={24} className="sm:w-5.5" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
              >
                <TbPlayerPlayFilled
                  size={24}
                  className="ml-0.5 sm:ml-1 sm:w-5.5"
                />
              </motion.div>
            )}
          </button>

          {/* Waveform */}
          <div className="relative flex h-8 items-center gap-0.5 sm:h-10 sm:gap-[3.5px]">
            {/* Background (Unplayed) */}
            {waveformHeights.map((h, i) => (
              <motion.div
                key={`bg-${i}`}
                initial={{ height: h * 0.7 }}
                animate={{ height: h }}
                transition={{ duration: 0.1 }}
                className="w-0.5 rounded-full bg-neutral-400 sm:w-1 dark:bg-neutral-700"
              />
            ))}

            {/* Foreground (Played) with continuous masking */}
            <div
              className="absolute inset-0 flex items-center gap-0.5 sm:gap-[3.5px]"
              style={{
                clipPath: `inset(0 ${100 - progressPercent * 100}% 0 0)`,
              }}
            >
              {waveformHeights.map((h, i) => (
                <motion.div
                  key={`fg-${i}`}
                  initial={{ height: h * 0.7 }}
                  animate={{ height: h }}
                  transition={{ duration: 0.1 }}
                  className="w-0.5 rounded-full bg-neutral-900 sm:w-1 dark:bg-white"
                />
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className="relative flex h-4 w-5 items-center justify-end text-xs font-bold text-neutral-500 sm:h-5 sm:w-[26px] sm:text-base dark:text-neutral-400">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={remainingTime}
                initial={{ y: -15, scale: 0, filter: 'blur(8px)', opacity: 0 }}
                animate={{ y: 0, scale: 1, filter: 'blur(0px)', opacity: 1 }}
                exit={{ y: 15, scale: 0, filter: 'blur(8px)', opacity: 0 }}
                transition={{ type: 'spring', bounce: 0.3, duration: 0.7 }}
                className="inline-block tabular-nums"
              >
                {remainingTime}
              </motion.span>
            </AnimatePresence>
            <span>s</span>
          </div>
        </div>

        {/* Transcription Bubble */}
        <AnimatePresence>
          {showTranscription && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 8, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.85, y: 8, filter: 'blur(8px)' }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              className="pointer-events-none absolute bottom-[170%] left-0 z-20 origin-bottom-left"
            >
              <div className="relative">
                <motion.div
                  layout
                  transition={{ type: 'spring', damping: 32, stiffness: 300 }}
                  className="w-[calc(100vw-5rem)] max-w-60 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 shadow-xl sm:max-w-70 sm:rounded-[28px] sm:px-6 sm:py-5 dark:border-white/10 dark:bg-neutral-800"
                >
                  <p className="flex flex-wrap text-sm leading-relaxed font-bold tracking-tight wrap-break-word text-neutral-900 sm:text-lg dark:text-white">
                    {(() => {
                      let globalIndex = 0;
                      return words.map((word, wIdx) => {
                        const wordChars = word.split('');
                        const wordNode = (
                          <span
                            key={wIdx}
                            className="mr-[0.25em] inline-flex whitespace-nowrap"
                          >
                            {wordChars.map((char, cIdx) => {
                              const isRevealed = globalIndex < revealedCount;
                              globalIndex++;
                              return (
                                <motion.span
                                  key={cIdx}
                                  initial={false}
                                  animate={{
                                    opacity: isRevealed ? 1 : 0,
                                  }}
                                  transition={{
                                    ease: 'easeOut',
                                    duration: 0.1,
                                  }}
                                  className="inline-block"
                                >
                                  {char}
                                </motion.span>
                              );
                            })}
                          </span>
                        );
                        // Increment for the space between words
                        globalIndex++;
                        return wordNode;
                      });
                    })()}
                  </p>
                </motion.div>

                {/* Speech Bubble Connectors */}
                <div className="absolute -bottom-9 left-4 flex flex-col items-center gap-1.5">
                  <div className="ml-3 h-3.5 w-3.5 rounded-full bg-neutral-50 shadow-md sm:h-4 sm:w-4 dark:bg-neutral-800" />
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-50 shadow-md sm:h-2 sm:w-2 dark:bg-neutral-800" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
