"use client";

import { motion, useMotionValue, type PanInfo } from "framer-motion";
import React, { useState } from "react";

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
    label: "Credit Card",
    date: "Wed, 13 May",
    amount: "$1,200",
    accentColor: "#ef4444",
  },
  {
    id: 2,
    z: 3,
    label: "Home Loan",
    date: "Wed, 13 May",
    amount: "$2,700",
    accentColor: "#ef4444",
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
      whileTap={{ cursor: "grabbing" }}
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
    <div className="flex min-h-screen items-center justify-center font-sans">
      <div className="relative h-[300px] w-[300px]">
        {cards.map((card, index) => (
          <Card key={card.id} updatePosition={() => updatePosition(card.id)}>
            <motion.div
              style={{
                borderRadius: "32px",
                transformOrigin: "0% 100%",
              }}
              animate={{
                rotateZ: -(cards.length - index - 1) * 10,
                scale: 1 + index * 0.1 - cards.length * 0.1,
              }}
              initial={false}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className="size-full overflow-hidden bg-white dark:bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.03),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.06),0px_2px_8px_0px_rgba(0,0,0,0.4)] flex flex-col p-2"
            >
              <div className="flex-1 flex h-full select-none flex-col p-4 pointer-events-none box-border">
                <p className="text-lg font-normal tracking-wide text-zinc-400 dark:text-zinc-500">
                  {card.label}
                </p>

                <p
                  className="text-2xl font-bold leading-tight"
                  style={{ color: card.accentColor }}
                >
                  {card.date}
                </p>

                <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {card.amount}
                </p>

                <div className="flex-1" />

                <div
                  className="pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                ></div>
              </div>
              <button className="w-full cursor-pointer rounded-full bg-zinc-900 dark:bg-zinc-50 py-4 text-base font-semibold tracking-wide text-white dark:text-zinc-900 border-none">
                Pay Now
              </button>
            </motion.div>
          </Card>
        ))}
      </div>
    </div>
  );
}
