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
    <div className="theme-injected  flex h-screen w-full items-center justify-center">
      <div className="border-border bg-card text-card-foreground mx-auto flex w-full max-w-sm flex-col gap-6 rounded-3xl border p-6">
        <div className="flex items-center justify-between">
          <button className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors focus:outline-none">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <h2 className="text-foreground text-lg font-semibold">Add Card</h2>

          <button className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors focus:outline-none">
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
              className={`bg-muted text-foreground placeholder:text-muted-foreground focus:bg-background h-14 w-full rounded-2xl px-4 text-base ring-3 transition-all outline-none ${
                cardNumberFocused ? 'ring-ring' : 'ring-transparent'
              }`}
            />
          </motion.div>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Expiration"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              className="bg-muted text-foreground placeholder:text-muted-foreground focus:bg-background focus:ring-ring h-14 w-full rounded-2xl px-4 text-base ring-3 ring-transparent transition-all outline-none"
            />

            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="bg-muted text-foreground placeholder:text-muted-foreground focus:bg-background focus:ring-ring h-14 w-full rounded-2xl px-4 text-base ring-3 ring-transparent transition-all outline-none"
            />
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddCard}
          className="bg-primary text-primary-foreground mt-2 w-full rounded-2xl py-4 text-base font-medium transition-colors hover:opacity-90 focus:outline-none"
        >
          Add Card
        </motion.button>
      </div>
    </div>
  );
}
