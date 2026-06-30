'use client';

import { motion, useMotionValue, type PanInfo } from 'framer-motion';
import React, { useState } from 'react';

type CardData = {
  id: number;
  z: number;
  label: string;
  date: string;
  amount: string;
  accentColor: string;
};

const INITIAL_CARDS: CardData[] = [
  {
    id: 1,
    z: 4,
    label: 'Credit Card',
    date: 'Wed, 13 May',
    amount: '$1,200',
    accentColor: '#ef4444',
  },
  {
    id: 2,
    z: 3,
    label: 'Home Loan',
    date: 'Wed, 13 May',
    amount: '$2,700',
    accentColor: '#ef4444',
  },
];

interface CardProps {
  children: React.ReactNode;
  updatePosition: () => void;
}

const MAX_DRAG = 150;

function Card({ children, updatePosition }: CardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (
      Math.abs(info.offset.x) > MAX_DRAG ||
      Math.abs(info.offset.y) > MAX_DRAG
    ) {
      updatePosition();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      style={{ x, y }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab"
    >
      {children}
    </motion.div>
  );
}

export default function SwipeableStackCards() {
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);

  const updatePosition = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div className="theme-injected  flex min-h-screen items-center justify-center font-sans">
      <div className="relative h-[300px] w-[300px]">
        {cards.map((card, index) => (
          <Card key={card.id} updatePosition={() => updatePosition(card.id)}>
            <motion.div
              style={{
                borderRadius: '32px',
                transformOrigin: '0% 100%',
              }}
              animate={{
                rotateZ: -(cards.length - index - 1) * 10,
                scale: 1 + index * 0.1 - cards.length * 0.1,
              }}
              initial={false}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
              className="border-border bg-card text-card-foreground flex size-full flex-col overflow-hidden rounded-[32px] border p-2 shadow-[0px_0px_0px_1px_hsl(var(--border)/0.5),0px_1px_2px_-1px_hsl(var(--foreground)/0.08),0px_2px_4px_0px_hsl(var(--foreground)/0.06)]"
            >
              <div className="pointer-events-none box-border flex h-full flex-1 flex-col p-4 select-none">
                <p className="text-muted-foreground text-lg font-normal tracking-wide">
                  {card.label}
                </p>

                <p
                  className="text-2xl leading-tight font-bold"
                  style={{ color: card.accentColor }}
                >
                  {card.date}
                </p>

                <p className="text-foreground text-xl font-semibold">
                  {card.amount}
                </p>

                <div className="flex-1" />

                <div
                  className="pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <button className="bg-primary text-primary-foreground w-full cursor-pointer rounded-full border-none py-4 text-base font-semibold tracking-wide">
                Pay Now
              </button>
            </motion.div>
          </Card>
        ))}
      </div>
    </div>
  );
}
