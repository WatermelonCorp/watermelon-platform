'use client';

import { useState, useId, type FC } from 'react';
import { motion, AnimatePresence, type Transition } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlarmClockFreeIcons,
  Calendar03Icon,
  Cancel01Icon,
  Edit03Icon,
  Link01Icon,
  Menu02Icon,
  Task02Icon,
  Tick02Icon,
  Ticket02Icon,
} from '@hugeicons/core-free-icons/index';

/* --- Types --- */
interface EditableRowProps {
  icon: any;
  label: string;
  value: string;
  secondaryValue?: string;
  onSave?: (value: string) => void;
  onSaveRange?: (v1: string, v2: string) => void;
  type?: 'text' | 'time' | 'url';
  multiline?: boolean;
}

export interface EventData {
  event: string;
  date: string;
  start: string;
  end: string;
  location: string;
  url: string;
  desc: string;
}

interface InlineEditCardProps {
  data: EventData;
  onDataChange: (data: EventData) => void;
  title?: string;
}

const spring: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 28,
  mass: 0.6,
};

/* --- Sub-Component: EditableRow (Styling Intact) --- */
const EditableRow: FC<EditableRowProps> = ({
  icon,
  label,
  value,
  secondaryValue,
  onSave,
  onSaveRange,
  type = 'text',
  multiline = false,
}) => {
  const [editing, setEditing] = useState(false);
  const [v1, setV1] = useState(value);
  const [v2, setV2] = useState(secondaryValue || '');
  const inputId = useId();
  const secondaryInputId = useId();
  const isTime = type === 'time';

  const handleSave = () => {
    if (isTime && onSaveRange) onSaveRange(v1, v2);
    else if (onSave) onSave(v1);
    setEditing(false);
  };

  return (
    <motion.div
      layout
      transition={spring}
      className={`relative flex w-full ${multiline ? 'flex-col items-start gap-4' : 'flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'}`}
    >
      <div
        className={`flex shrink-0 items-center gap-3 ${multiline ? 'w-full' : 'w-full sm:w-[130px]'}`}
      >
        <HugeiconsIcon
          icon={icon}
          size={24}
          color="#b3b2b7"
          strokeWidth={1.5}
        />
        <label
          htmlFor={inputId}
          className="cursor-pointer text-[16px] font-medium text-[#8E8E91] dark:text-[#636366]"
        >
          {label}
        </label>
      </div>

      <div
        className={`relative w-full bg-[#FEFEFE] transition-colors dark:bg-zinc-950`}
      >
        <motion.div
          layout
          className="group/content w-full rounded-xl px-2 hover:bg-[#F9F9FB] sm:px-3 dark:hover:bg-zinc-900/50"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!editing ? (
              <motion.div
                key="view"
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={spring}
                onClick={() => setEditing(true)}
                className={`flex min-h-[40px] cursor-pointer ${multiline ? 'flex-col gap-2 py-2.5' : 'items-center justify-between'}`}
              >
                <div
                  className={`text-[16px] font-medium text-gray-800 dark:text-zinc-200 ${multiline ? 'w-full leading-relaxed' : 'flex items-center gap-2'}`}
                >
                  {isTime ? (
                    <div className="flex items-center gap-1.5 text-[15px] sm:text-[16px]">
                      <span>{value}</span>
                      <span className="mx-1 text-gray-300 dark:text-zinc-700">
                        to
                      </span>
                      <span>{secondaryValue}</span>
                    </div>
                  ) : (
                    <div
                      className={
                        multiline
                          ? 'text-[15px] wrap-break-word whitespace-pre-wrap sm:text-[16px]'
                          : 'max-w-[180px] truncate text-[15px] sm:max-w-[220px] sm:text-[16px]'
                      }
                    >
                      {value}
                    </div>
                  )}
                  {type === 'url' && (
                    <HugeiconsIcon
                      icon={Task02Icon}
                      size={20}
                      color="#b3b2b7"
                      className="ml-1 inline"
                    />
                  )}
                </div>
                <div
                  className={`flex size-7 items-center justify-center rounded-lg border border-gray-200 bg-[#fefefe] opacity-0 shadow-sm group-hover/content:opacity-100 dark:border-zinc-800 dark:bg-zinc-900 ${multiline ? 'mt-1 self-end' : ''}`}
                >
                  <HugeiconsIcon icon={Edit03Icon} size={18} color="#B7B7B9" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="edit"
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={spring}
                className={`flex min-h-[40px] w-full gap-2 ${multiline ? 'flex-col py-2.5' : 'items-center'}`}
              >
                {isTime ? (
                  <div className="flex w-full gap-2">
                    <input
                      id={inputId}
                      autoFocus
                      type="text"
                      value={v1}
                      onChange={(e) => setV1(e.target.value)}
                      className="h-10 w-full rounded-xl border border-transparent bg-transparent px-2 text-[14px] font-medium text-[#2B2A35] outline-none focus:border-gray-100 sm:px-3 dark:text-zinc-100 dark:focus:border-zinc-800"
                    />
                    <input
                      id={secondaryInputId}
                      type="text"
                      value={v2}
                      onChange={(e) => setV2(e.target.value)}
                      className="h-10 w-full rounded-xl border border-transparent bg-transparent px-2 text-[14px] font-medium text-[#2B2A35] outline-none focus:border-gray-100 sm:px-3 dark:text-zinc-100 dark:focus:border-zinc-800"
                    />
                  </div>
                ) : multiline ? (
                  <textarea
                    id={inputId}
                    autoFocus
                    rows={3}
                    value={v1}
                    onChange={(e) => setV1(e.target.value)}
                    className="w-full resize-none rounded-xl bg-transparent px-0 py-0 text-[15px] leading-relaxed font-medium text-[#2B2A35] outline-none sm:text-[16px] dark:text-zinc-100"
                  />
                ) : (
                  <input
                    id={inputId}
                    autoFocus
                    type="text"
                    value={v1}
                    onChange={(e) => setV1(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    className="h-10 w-full rounded-xl bg-transparent text-[15px] font-medium text-[#2B2A35] outline-none sm:text-base dark:text-zinc-100"
                  />
                )}
                <div
                  className={`flex shrink-0 items-center gap-1 ${multiline ? 'mt-1 self-end' : ''}`}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex size-7 items-center justify-center rounded-lg bg-black text-white dark:bg-zinc-100 dark:text-black"
                  >
                    <HugeiconsIcon icon={Tick02Icon} size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditing(false)}
                    className="flex size-7 items-center justify-center rounded-lg bg-black text-white dark:bg-zinc-800"
                  >
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      size={18}
                      color="#ffffff"
                    />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* --- MAIN REUSABLE COMPONENT --- */
export const InlineEditCard: FC<InlineEditCardProps> = ({
  data,
  onDataChange,
  title = 'Update Details',
}) => {
  return (
    <div className="mx-auto h-fit w-[92vw] max-w-xs rounded-[34px] border-[1.6px] border-[#F2F2F4] bg-[#F9F9FB] p-1.5 shadow-sm transition-colors sm:mx-0 sm:w-[440px] sm:max-w-none dark:border-zinc-800 dark:bg-zinc-900">
      <div className="w-full overflow-hidden rounded-[28px] border-[1.6px] border-[#E7E7E9] bg-[#fefefe] transition-colors dark:border-zinc-800 dark:bg-zinc-950">
        <div className="rounded-t-[32px] border-b-[1.6px] border-[#E7E7E9] bg-[#FAFAFC] px-8 py-3.5 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h4 className="text-[15px] font-semibold tracking-wide text-[#8C8B92] uppercase dark:text-zinc-500">
            {title}
          </h4>
        </div>

        <div className="space-y-4 px-4 py-3 sm:space-y-1">
          <EditableRow
            icon={Ticket02Icon}
            label="Event"
            value={data.event}
            onSave={(v) => onDataChange({ ...data, event: v })}
          />
          <EditableRow
            icon={Calendar03Icon}
            label="Date"
            value={data.date}
            onSave={(v) => onDataChange({ ...data, date: v })}
          />
          <EditableRow
            icon={AlarmClockFreeIcons}
            label="Time"
            type="time"
            value={data.start}
            secondaryValue={data.end}
            onSaveRange={(a, b) => onDataChange({ ...data, start: a, end: b })}
          />
          <EditableRow
            icon={Link01Icon}
            label="URL"
            type="url"
            value={data.url}
            onSave={(v) => onDataChange({ ...data, url: v })}
          />
          <div className="mt-2 border-t border-gray-50 pt-4 dark:border-zinc-900">
            <EditableRow
              icon={Menu02Icon}
              label="Description"
              multiline
              value={data.desc}
              onSave={(v) => onDataChange({ ...data, desc: v })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
