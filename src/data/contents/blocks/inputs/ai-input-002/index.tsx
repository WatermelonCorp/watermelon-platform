import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowLeft } from 'lucide-react';

/* TYPES */
export type Role = 'user' | 'assistant';

export interface MessageReply {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

const defaultReplies = [
  'Lock in vro 🫡',
  'Got it 👍',
  'Interesting 👀',
  'Tell me more',
];

const defaultAiResponse = async (): Promise<string> => {
  await new Promise((res) => setTimeout(res, 700));
  return defaultReplies[0];
};

const ChatBubble: React.FC<{ role: Role; content: string }> = ({
  role,
  content,
}) => {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={`mb-3 flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[90%] px-4 py-2 text-[14px] font-semibold shadow-sm transition-colors duration-200 sm:max-w-[80%] sm:px-5 sm:py-2.5 sm:text-[15px] ${
          isUser
            ? 'rounded-[16px] rounded-br-[4px] border border-neutral-100 bg-white text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'
            : 'rounded-[16px] rounded-bl-[4px] border border-sky-400/20 bg-[#1DA1F2] text-white shadow-sky-500/10 dark:bg-sky-600'
        }`}
      >
        {content}
      </div>
    </motion.div>
  );
};

interface AiInputBarProps {
  onSend: (msg: string) => void;
  isLoading: boolean;
  placeholderText: string;
}

const AiInputBar: React.FC<AiInputBarProps> = ({
  onSend,
  isLoading,
  placeholderText,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (inputValue.trim() && !isLoading) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="w-full max-w-[700px] px-3 pb-4 sm:px-4 sm:pb-24">
      <motion.div
        layout
        className="relative flex items-center rounded-2xl border border-neutral-100/50 bg-white p-1.5 shadow-sm transition-colors duration-200 sm:rounded-[28px] sm:p-2 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
      >
        <button
          title="add files"
          type="button"
          className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-500 transition-colors hover:bg-neutral-100 sm:h-12 sm:w-12 sm:rounded-2xl dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <Plus size={20} className="sm:size-[22px]" strokeWidth={2.5} />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder={placeholderText}
          className="flex-1 bg-transparent px-3 py-2 text-[15px] text-neutral-700 transition-colors outline-none placeholder:text-neutral-400 sm:px-4 sm:py-3 sm:text-[17px] dark:text-neutral-200 dark:placeholder:text-neutral-500"
          disabled={isLoading}
        />

        <div className="mr-1">
          <button
            title="send"
            onClick={handleSubmit}
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 text-black/70 transition-colors hover:bg-neutral-100 sm:h-12 sm:w-12 sm:rounded-2xl dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            <motion.div
              animate={{ rotate: inputValue.length > 0 ? 90 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <ArrowLeft
                size={20}
                className="sm:size-[22px]"
                strokeWidth={2.5}
              />
            </motion.div>
          </button>
        </div>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center rounded-[28px] bg-white/60 backdrop-blur-[1px] dark:bg-neutral-900/60"
          />
        )}
      </motion.div>
    </div>
  );
};

interface AiInput002Props {
  initialMessages?: MessageReply[];
  aiResponseFn?: () => Promise<string>;
  placeholderText?: string;
}

export const AiInput002: React.FC<AiInput002Props> = ({
  initialMessages = [],
  aiResponseFn = defaultAiResponse,
  placeholderText = 'Send Message',
}) => {
  const [messages, setMessages] = useState<MessageReply[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    setMessages((p) => [
      ...p,
      {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      },
    ]);

    setIsLoading(true);
    const reply = await aiResponseFn();

    setMessages((p) => [
      ...p,
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      },
    ]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen flex-col bg-[#F8F9FA] transition-colors duration-300 dark:bg-neutral-950">
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col overflow-y-auto px-3 sm:px-4"
      >
        <div className="flex-grow" />
        <div className="mx-auto w-full max-w-2xl pb-4">
          <AnimatePresence>
            {messages.map((m) => (
              <ChatBubble key={m.id} {...m} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mb-0 flex items-center justify-center sm:mb-6">
        <AiInputBar
          onSend={handleSend}
          isLoading={isLoading}
          placeholderText={placeholderText}
        />
      </div>
    </div>
  );
};
