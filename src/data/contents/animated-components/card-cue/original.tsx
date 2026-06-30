'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, X } from 'lucide-react';

export default function CardCue() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [isErrorAnimation, setIsErrorAnimation] = useState(false);
  const [cardNumberFocused, setCardNumberFocused] = useState(false);

  const cardNumberRef = useRef<HTMLInputElement>(null);

  const handleAddCard = () => {
    if (!cardNumber.trim()) {
      setIsErrorAnimation(true);
      setCardNumberFocused(true);
      cardNumberRef.current?.focus();
      setTimeout(() => setIsErrorAnimation(false), 200);
    } else {
      console.log('Card added', { cardNumber, expiration, cvv });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6 rounded-3xl bg-white p-6 dark:bg-zinc-950/50 border border-border">
        <div className="flex items-center justify-between">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 focus:outline-none dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Add Card
          </h2>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 focus:outline-none dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <motion.div
            animate={
              isErrorAnimation
                ? {
                    scale: 1.1,
                  }
                : { scale: 1 }
            }
            transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
            className="rounded-2xl"
          >
            <input
              ref={cardNumberRef}
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              onFocus={() => setCardNumberFocused(true)}
              onBlur={() => setCardNumberFocused(false)}
              className={`h-14 w-full rounded-2xl bg-zinc-100 px-4 text-base text-zinc-900 ring-3 transition-all outline-none placeholder:text-zinc-400 focus:bg-white dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-950 ${
                cardNumberFocused
                  ? 'ring-zinc-900 dark:ring-zinc-100'
                  : 'ring-transparent'
              }`}
            />
          </motion.div>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Expiration"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              className="h-14 w-full rounded-2xl bg-zinc-100 px-4 text-base text-zinc-900 ring-3 ring-transparent transition-all outline-none placeholder:text-zinc-400 focus:bg-white focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-950 dark:focus:ring-zinc-100"
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="h-14 w-full rounded-2xl bg-zinc-100 px-4 text-base text-zinc-900 ring-3 ring-transparent transition-all outline-none placeholder:text-zinc-400 focus:bg-white focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-950 dark:focus:ring-zinc-100"
            />
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddCard}
          className="mt-2 w-full rounded-2xl bg-zinc-900 py-4 text-base font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Add Card
        </motion.button>
      </div>
    </div>
  );
}
