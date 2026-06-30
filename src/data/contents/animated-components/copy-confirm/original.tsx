import {
  Boxes,
  CheckIcon,
  CopyIcon,
  Settings2,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, useState } from 'react';

interface SkillCardProps {
  title?: string;
  icon?: ReactNode;
  valueToCopy?: string;

  copiedText?: string;
  copyText?: string;

  showSettings?: boolean;
  loading?: boolean;

  onSettingsClick?: () => void;
}

export default function CopyConfirm({
  title = 'Clay Skill',
  icon = <Boxes size={16} />,
  valueToCopy = 'Clay Skill',

  copiedText = 'Copied',
  copyText = 'Copy',

  showSettings = true,
  loading = false,

  onSettingsClick = () => {},
}: SkillCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(valueToCopy);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5 rounded-full">
          <div className="border-border/20 flex items-center gap-1.5 rounded-l-full border bg-zinc-100 p-3">
            <div className="text-zinc-500">{icon}</div>

            <span className="text-sm font-semibold text-zinc-800">
              {title}
            </span>
          </div>

          {showSettings && (
            <button
              onClick={onSettingsClick}
              className="flex items-center justify-center rounded-r-full bg-zinc-100 px-3 transition"
            >
              <Settings2 size={20} className="text-zinc-700" />
            </button>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          animate={{
            backgroundColor: copied ? '#15803d' : '#000000', // green-500 : black
          }}
          onClick={handleCopy}
          className="relative flex  items-center justify-center gap-2 overflow-hidden rounded-full bg-[#0C3415] py-2 px-4 text-white"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={copied ? 'check' : 'copy'}
              initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
              transition={{
                type: 'spring',
                duration: 0.3,
                bounce: 0,
              }}
                          className='text-sm'
            >
              {copied ? (
                <CheckIcon className="stoke-2 size-4" />
              ) : (
                <CopyIcon className="stroke-2 size-4" />
              )}
            </motion.div>
          </AnimatePresence>
          <AnimatedText from={copyText} to={copiedText} isCopied={copied} />
        </motion.button>
      </div>
    </div>
  );
}

const AnimatedText = ({
  from,
  to,
  isCopied,
}: {
  from: string;
  to: string;
  isCopied: boolean;
}) => {
  const activeText = isCopied ? to : from;

  return (
    <div className="flex text-lg tracking-tight will-change-transform">
      <AnimatePresence mode="popLayout" initial={false}>
        {activeText.split('').map((char, index) => {
          const displayChar = char === ' ' ? '\u00A0' : char;

          return (
            <motion.span
              key={char + index}
              layout
              initial={{ opacity: 0, y: 5, scale: 0.7 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.03 * index,
                },
              }}
              exit={{ opacity: 0, y: -5, scale: 0.7 }}
            >
              {displayChar}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
