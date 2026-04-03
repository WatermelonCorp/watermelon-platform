'use client';

import React, { useState, type ReactNode } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { IoChevronDown } from 'react-icons/io5';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

export interface User {
  id: number;
  name: string;
  img: string;
  active?: boolean;
}

type IconRenderer = (props?: any) => ReactNode;

interface VoiceChatDisclosureProps {
  users?: User[];
  title?: string;
  ctaText?: string;
  helperText?: string;
  closeIcon?: IconRenderer;
}

const DEFAULT_USERS: User[] = [
  {
    id: 1,
    name: 'Oğuz',
    img: 'https://i.pravatar.cc/150?u=oguz',
    active: true,
  },
  { id: 2, name: 'Ashish', img: 'https://i.pravatar.cc/150?u=ashish' },
  { id: 3, name: 'Mariana', img: 'https://i.pravatar.cc/150?u=mariana' },
  { id: 4, name: 'MDS', img: 'https://i.pravatar.cc/150?u=mds' },
  { id: 5, name: 'Ana', img: 'https://i.pravatar.cc/150?u=ana' },
  {
    id: 6,
    name: 'Natko',
    img: 'https://i.pravatar.cc/150?u=natko',
    active: true,
  },
];

export const VoiceChatDisclosure: React.FC<VoiceChatDisclosureProps> = ({
  users = DEFAULT_USERS,
  title = 'Voice Chat',
  ctaText = 'Join Now',
  helperText = 'Mic will be muted initially.',
  closeIcon = (props) => (
    <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={2} {...props} />
  ),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const bars = [0, 1, 2, 3];

  return (
    <MotionConfig
      transition={{ type: 'spring', bounce: 0, visualDuration: 0.32 }}
    >
      <motion.div layout className="relative">
        <AnimatePresence mode="popLayout">
          {!isOpen && (
            <motion.div
              layout="position"
              className="absolute -top-4 -left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 shadow-lg dark:bg-neutral-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-[3px]">
                {bars.map((i) => (
                  <motion.div
                    key={i}
                    className="w-[2.5px] rounded-full bg-white dark:bg-neutral-900"
                    initial={{ height: 6 }}
                    animate={{ height: [2, 16, 6] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          onClick={() => !isOpen && setIsOpen(true)}
          className="cursor-pointer overflow-hidden border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
          style={{
            width: isOpen ? 420 : 280,
            height: isOpen ? 420 : 90,
            borderRadius: isOpen ? 32 : 44,
          }}
        >
          <AnimatePresence mode="popLayout">
            {!isOpen ? (
              <div className="flex h-full items-center px-6">
                <div className="flex -space-x-3">
                  {users.slice(0, 4).map((user, idx) => (
                    <motion.div
                      key={user.id}
                      layoutId={`avatar-${user.id}`}
                      style={{ zIndex: 10 - idx }}
                    >
                      <motion.img
                        layoutId={`avatar-img-${user.id}`}
                        src={user.img}
                        className="h-14 w-14 rounded-full border-4 border-white object-cover shadow-lg dark:border-neutral-900"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="ml-4 flex items-center gap-1 text-lg font-medium text-neutral-600 dark:text-neutral-400">
                  <span>+{users.length - 4}</span>
                  <IoChevronDown />
                </div>
              </div>
            ) : (
              <motion.div layout className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-8 py-3 dark:border-neutral-700 dark:bg-neutral-800">
                  <div className="w-8" />
                  <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                    {title}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-neutral-200 p-2 dark:bg-neutral-700"
                  >
                    {closeIcon({
                      className: 'text-neutral-600 dark:text-neutral-300',
                    })}
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-y-8 px-6 py-6">
                  {users.map((user) => (
                    <motion.div
                      key={user.id}
                      layoutId={`avatar-${user.id}`}
                      className="relative flex flex-col items-center gap-2"
                    >
                      <div className="relative">
                        <motion.img
                          layoutId={`avatar-img-${user.id}`}
                          src={user.img}
                          className="h-[56px] w-[56px] rounded-full border border-neutral-200 object-cover shadow-md dark:border-neutral-700"
                        />

                        {user.active && (
                          <motion.div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-xl dark:bg-neutral-800">
                            <div className="flex items-center gap-[2px]">
                              {bars.map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-[2px] rounded-full bg-neutral-700 dark:bg-neutral-300"
                                  animate={{ height: [2, 12, 6] }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                  }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-400">
                        {user.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="px-6 pb-6">
                  <button className="w-full rounded-xl bg-neutral-900 py-3 text-lg text-white transition active:scale-[0.98] dark:bg-neutral-100 dark:text-neutral-900">
                    {ctaText}
                  </button>
                  <p className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-500">
                    {helperText}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};
