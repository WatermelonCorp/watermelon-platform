import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { MoreHorizontal, Check, ChevronDown } from 'lucide-react';
import { Flag01Icon, Settings03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { BiSolidHourglassBottom } from 'react-icons/bi';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

// --- Types ---
export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Assignee {
  name: string;
  avatar: string;
  color: string;
}

export interface TaskData {
  title: string;
  progress: number;
  completedCount: number;
  totalCount: number;
  priority: string;
  status: string;
  subtasks: Subtask[];
  assignees: Assignee[];
}

interface Props {
  data: TaskData;
}

export const TaskWidget: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const Transition = {
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.3,
  } as const;

  return (
    <LayoutGroup>
      <motion.div
        layout
        initial={false}
        onClick={() => setIsOpen(!isOpen)}
        transition={Transition}
        className={`relative w-full cursor-pointer overflow-hidden border-2 border-neutral-100 bg-white shadow-xl transition-colors select-none sm:w-[440px] dark:border-neutral-800 dark:bg-neutral-950 ${
          isOpen
            ? 'rounded-[24px] p-5 sm:rounded-[26px] sm:p-[22px]'
            : 'rounded-[20px] p-3 sm:p-[12px]'
        }`}
      >
        {/* --- Header Section --- */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <motion.div
            layout="position"
            transition={Transition}
            className={`flex items-center gap-2 ${isOpen ? 'bg-transparent' : 'bg-neutral-50 dark:bg-neutral-900'} rounded-lg py-0.5 pr-2 pl-1.5 transition-colors sm:pr-2 sm:pl-1.5`}
          >
            <motion.div
              layout
              transition={Transition}
              className={`my-0.5 flex items-center justify-center rounded-lg border-[1.7px] border-neutral-200 bg-white transition-colors dark:border-neutral-700 dark:bg-neutral-900 ${isOpen ? 'h-10 w-10 sm:h-12 sm:w-12' : 'size-7 sm:size-8'}`}
            >
              <HugeiconsIcon
                icon={Settings03Icon}
                size={isOpen ? 20 : 15}
                className="text-neutral-400 sm:hidden dark:text-neutral-500"
                strokeWidth={1.5}
              />
              <HugeiconsIcon
                icon={Settings03Icon}
                size={isOpen ? 24 : 17}
                className="hidden text-neutral-400 sm:block dark:text-neutral-500"
                strokeWidth={1.5}
              />
            </motion.div>
            <motion.h2
              layout
              transition={Transition}
              className={`origin-left font-sans font-semibold text-neutral-800 transition-colors dark:text-neutral-100 ${isOpen ? 'text-xl sm:text-3xl' : 'text-sm whitespace-nowrap sm:text-base'}`}
            >
              {data.title}
            </motion.h2>
          </motion.div>

          <AnimatePresence mode="popLayout" initial={false}>
            {!isOpen ? (
              <motion.div
                key="collapsed-progress"
                initial={{ opacity: 0, scale: 0.9, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 10 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  layoutId="progress-container"
                  className="relative h-2 w-16 overflow-hidden rounded-full bg-neutral-100 transition-colors sm:w-32 dark:bg-neutral-700"
                >
                  <motion.div
                    layoutId="progress-fill"
                    className="relative h-full overflow-hidden rounded-full bg-green-500"
                    style={{ width: `${data.progress}%` }}
                  >
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 h-full w-full"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      }}
                    />
                  </motion.div>
                </motion.div>
                <motion.span
                  layoutId="progress-text"
                  className="text-xs font-medium text-neutral-500 transition-colors sm:text-base dark:text-neutral-400"
                >
                  {data.progress}%
                </motion.span>
              </motion.div>
            ) : (
              <motion.button
                key="more-btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="rounded-md border-2 border-neutral-100 bg-white p-1.5 px-1.5 text-black transition-colors dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
              >
                <MoreHorizontal size={22} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* --- Collapsed Sub-Header --- */}
        <AnimatePresence mode="popLayout">
          {!isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="mt-3 flex items-center justify-between px-1"
            >
              <div className="flex items-center gap-3 text-xs font-medium sm:gap-4 sm:text-sm">
                <div className="flex items-center gap-1 text-neutral-500 sm:gap-1.5 dark:text-neutral-400">
                  <motion.div
                    layoutId="priority-icon"
                    className="flex items-center"
                  >
                    <HugeiconsIcon
                      icon={Flag01Icon}
                      size={18}
                      className="sm:hidden"
                      color="currentColor"
                      fill="currentColor"
                      strokeWidth={1.5}
                    />
                    <HugeiconsIcon
                      icon={Flag01Icon}
                      size={22}
                      className="hidden sm:block"
                      color="currentColor"
                      fill="currentColor"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <motion.span layoutId="priority-text">
                    {data.priority}
                  </motion.span>
                </div>
                <div className="flex items-center gap-1 text-neutral-500 sm:gap-1.5 dark:text-neutral-400">
                  <motion.div
                    layoutId="status-icon"
                    className="flex items-center"
                  >
                    <BiSolidHourglassBottom className="h-4 w-4 text-neutral-400 sm:h-[22px] sm:w-[22px]" />
                  </motion.div>
                  <motion.span layoutId="status-text">
                    {data.status}
                  </motion.span>
                </div>
              </div>
              <div className="flex -space-x-2">
                {data.assignees.map((u, i) => (
                  <motion.img
                    layoutId={`avatar-${u.name}`}
                    key={i}
                    src={u.avatar}
                    className="h-7 w-7 rounded-full border-2 border-neutral-200 shadow-lg sm:h-8 sm:w-8 dark:border-neutral-700"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Expanded Content --- */}
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.1 } }}
              transition={{ ...Transition, delay: 0.05 }}
              className="mt-6 origin-top"
            >
              {/* Progress Bar Container */}
              <div className="mb-7 flex w-fit items-center gap-1.5 rounded-full border-[1.5px] border-neutral-200 bg-neutral-50/50 px-2 py-1 transition-colors sm:gap-2 sm:px-2.5 sm:py-1.5 dark:border-neutral-700 dark:bg-neutral-800/50">
                <div className="flex h-5 w-5 items-center justify-center rounded-full">
                  <IoIosCheckmarkCircleOutline
                    size={24}
                    className="text-neutral-300 dark:text-neutral-600"
                  />
                </div>
                <span className="text-sm font-semibold text-neutral-400 dark:text-neutral-500">
                  <span className="text-neutral-400 dark:text-neutral-500">
                    {data.completedCount}
                  </span>{' '}
                  of {data.totalCount}
                </span>
                <motion.div
                  layoutId="progress-container"
                  className="mx-1 h-2 w-20 rounded-full bg-neutral-100 transition-colors sm:w-28 dark:bg-neutral-700"
                >
                  <motion.div
                    layoutId="progress-fill"
                    className="relative h-full overflow-hidden rounded-full bg-green-500"
                    style={{ width: `${data.progress}%` }}
                  >
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 h-full w-full"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      }}
                    />
                  </motion.div>
                </motion.div>
                <motion.span
                  layoutId="progress-text"
                  className="text-sm font-semibold text-neutral-600 dark:text-neutral-200"
                >
                  {data.progress}%
                </motion.span>
              </div>

              {/* Subtasks */}
              <div className="relative mb-8 ml-6 flex flex-col gap-5">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  className="absolute top-0 bottom-4 left-0 w-[1.7px] origin-top bg-neutral-300 transition-colors dark:bg-neutral-700"
                />
                {data.subtasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.03 }}
                    className="relative flex items-center pl-8"
                  >
                    <div className="absolute top-[-10px] left-0 h-[30px] w-4 rounded-bl-xl border-b-[1.7px] border-l-[1.7px] border-neutral-300 transition-colors sm:w-5 dark:border-neutral-700" />
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.7px] transition-colors ${task.completed ? 'border-neutral-600 bg-neutral-600 dark:border-neutral-200 dark:bg-neutral-200' : 'border-neutral-300 bg-white dark:border-neutral-600 dark:bg-transparent'}`}
                    >
                      {task.completed && (
                        <Check
                          size={12}
                          className="text-white dark:text-black"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                    <span
                      className={`ml-3 text-base font-medium transition-colors ${task.completed ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-500 dark:text-neutral-300'}`}
                    >
                      {task.title}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Priority & Status */}
              <div className="mb-6 space-y-4">
                {[
                  {
                    label: 'Priority',
                    val: data.priority,
                    icon: (
                      <HugeiconsIcon
                        icon={Flag01Icon}
                        size={22}
                        className="text-neutral-400"
                        strokeWidth={1.5}
                      />
                    ),
                    badge:
                      'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400',
                    chevronWrap: 'bg-red-50 dark:bg-neutral-900',
                    chevron: 'text-red-700 dark:text-red-400',
                    layoutId: 'priority',
                  },
                  {
                    label: 'Status',
                    val: data.status,
                    icon: (
                      <BiSolidHourglassBottom
                        className="text-neutral-400"
                        size={22}
                      />
                    ),
                    badge:
                      'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
                    chevronWrap: 'bg-amber-50 dark:bg-neutral-900',
                    chevron: 'text-amber-700 dark:text-amber-300',
                    layoutId: 'status',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 px-1 font-medium sm:gap-8"
                  >
                    <div className="flex min-w-[80px] items-center gap-3 text-neutral-600 transition-colors sm:min-w-[100px] dark:text-neutral-200">
                      <motion.div
                        layoutId={`${item.layoutId}-icon`}
                        className="flex items-center"
                      >
                        {item.icon}
                      </motion.div>
                      {item.label}
                    </div>
                    <div
                      className={`${item.badge} flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-bold opacity-85 transition-colors`}
                    >
                      <motion.span layoutId={`${item.layoutId}-text`}>
                        {item.val}
                      </motion.span>
                      <span
                        className={`${item.chevronWrap} border-0.5 flex items-center justify-center rounded-sm p-px transition-colors`}
                      >
                        <ChevronDown
                          size={16}
                          className={item.chevron}
                          strokeWidth={2}
                        />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Assignees */}
              <div className="flex flex-wrap gap-2">
                {data.assignees.map((user, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 rounded-full border-[1.58px] border-neutral-200 py-1 pr-4 pl-1.5 shadow-sm transition-colors dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <motion.img
                      layoutId={`avatar-${user.name}`}
                      title="avatar"
                      src={user.avatar}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-neutral-500 transition-colors dark:text-neutral-200">
                      {user.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
};
