'use client';

import { useState } from 'react';
import { ArrowUpRight, Plus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const accounts = [
  { id: 0, name: 'Main Vault', number: '•••• 8092', balance: '5 240', cents: '.00' },
  { id: 1, name: 'Checking', number: '•••• 3762', balance: '1 480', cents: '.24' },
  { id: 2, name: 'Savings', number: '•••• 9104', balance: '12 850', cents: '.50' },
  { id: 3, name: 'Business', number: '•••• 5521', balance: '8 420', cents: '.90' },
];

export function PortfolioPerformanceWidget() {
  const [activeDot, setActiveDot] = useState(0);
  const activeAccount = accounts[activeDot];

  return (
    <div className="bg-muted border-border/30 w-full max-w-[380px] rounded-[3rem] border p-2.5 shadow-sm">
      {/* Top White Card */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-card border-border/50 rounded-[2.5rem] border p-8 pb-10 shadow-sm overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAccount.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            <div className="mb-10 flex items-center justify-between">
              <span className="text-muted-foreground/80 text-[1.1rem] font-medium">
                {activeAccount.name}
              </span>
              <span className="text-muted-foreground/60 text-[1.1rem] font-medium tracking-widest">
                {activeAccount.number}
              </span>
            </div>

            <div className="flex items-end justify-between">
              <div className="text-card-foreground text-5xl font-bold tracking-tight">
                ${activeAccount.balance}
                <span className="text-muted-foreground/80 text-4xl font-semibold">
                  {activeAccount.cents}
                </span>
              </div>
              <button className="text-muted-foreground/40 hover:text-foreground mb-1 p-1 transition-colors">
                <ArrowUpRight className="h-8 w-8" strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 py-6">
        {accounts.map((acc, idx) => (
          <button
            key={acc.id}
            onClick={() => setActiveDot(idx)}
            className="relative flex h-4 cursor-pointer items-center justify-center"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <motion.div
              layout
              className={`rounded-full ${
                activeDot === idx
                  ? 'bg-foreground/40 h-1.5 w-5'
                  : 'bg-foreground/20 h-1.5 w-1.5'
              }`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 px-4 pt-1 pb-6">
        {[
          { label: 'Send', icon: ArrowUpRight },
          { label: 'Deposit', icon: Plus },
          { label: 'Transfer', icon: ArrowRight },
        ].map((action, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.92 }}
            transition={{
              opacity: { duration: 0.4, delay: 0.15 + i * 0.1 },
              y: { duration: 0.4, delay: 0.15 + i * 0.1 },
              scale: { duration: 0.1 },
            }}
            className="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="bg-card border-border/50 text-foreground group-hover:bg-foreground group-hover:text-background flex h-16 w-16 items-center justify-center rounded-full border shadow-sm transition-all duration-300">
              <action.icon className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <span className="text-foreground/80 group-hover:text-foreground text-[15px] font-medium transition-colors">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
