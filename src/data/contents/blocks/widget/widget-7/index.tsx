"use client";

import { useState, useRef, useEffect } from 'react';
import { Eye, ChevronDown, ArrowDownToLine, ArrowRightLeft, ArrowUpFromLine, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Currency = {
  code: string;
  symbol: string;
  balance: string;
  growth: string;
};

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', balance: '8,459.50', growth: '+$342.10' },
  { code: 'INR', symbol: '₹', balance: '706,450.00', growth: '+₹28,500.00' },
  { code: 'USDC', symbol: 'USDC', balance: '8,459.50', growth: '+USDC 342.10' },
  { code: 'EUR', symbol: '€', balance: '7,890.25', growth: '+€310.50' },
];

export function AccountBalanceWidget() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const chartPath = "M 0 120 C 50 110, 80 120, 130 85 C 170 55, 210 70, 260 35 C 290 15, 320 20, 320 20";
  const fillPath = `${chartPath} L 320 160 L 0 160 Z`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full max-w-[420px]">
      {/* Main Card */}
      <div className="bg-card border-border w-full rounded-[2rem] border p-6 shadow-sm relative overflow-hidden flex flex-col min-h-[320px]">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium">Available Funds</span>
            <Eye className="h-4 w-4" />
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-card-foreground hover:bg-muted/50 transition-colors"
            >
              {selectedCurrency.code} 
              <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-32 rounded-xl border border-border bg-popover p-1 shadow-md z-50"
                >
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setIsDropdownOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-popover-foreground hover:bg-muted transition-colors"
                    >
                      <span>{currency.code}</span>
                      {selectedCurrency.code === currency.code && (
                        <Check className="h-3 w-3 text-primary" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Balance */}
        <div className="mb-2 flex items-baseline gap-1 relative z-10">
          <span className={`font-semibold text-muted-foreground ${selectedCurrency.code === 'USDC' ? 'text-xl mr-1' : 'text-3xl'}`}>
            {selectedCurrency.symbol}
          </span>
          <motion.span 
            key={selectedCurrency.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-card-foreground text-5xl font-bold tracking-tighter"
          >
            {selectedCurrency.balance}
          </motion.span>
        </div>

        {/* Growth */}
        <div className="mb-8 flex items-center gap-3 relative z-10">
          <motion.span 
            key={selectedCurrency.growth}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-primary font-medium text-sm"
          >
            {selectedCurrency.growth}
          </motion.span>
          <div className="bg-primary/10 text-primary flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            4.2%
          </div>
        </div>

        <div className="flex-1" />

        {/* Chart */}
        <div className="absolute left-0 right-0 bottom-0 h-[180px] pointer-events-none opacity-80">
          <svg viewBox="0 0 320 160" className="w-full h-full text-primary" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              key={`fill-${selectedCurrency.code}`}
              d={fillPath}
              fill="url(#fillGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
            />
            <motion.path
              key={`chart-${selectedCurrency.code}`}
              d={chartPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Time Filters */}
        <div className="relative z-10 flex justify-center gap-2 pt-8">
          {['1D', '1W', '1M', '1Y'].map((period) => (
            <button
              key={period}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                period === '1W'
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Deposit', icon: ArrowDownToLine },
          { label: 'Transfer', icon: ArrowRightLeft },
          { label: 'Withdraw', icon: ArrowUpFromLine },
        ].map((action, i) => (
          <button
            key={i}
            className="bg-card border-border flex flex-col items-center justify-center gap-3 rounded-2xl border py-4 shadow-sm transition-colors hover:bg-muted/50"
          >
            <div className="bg-foreground text-background rounded-full p-3">
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-card-foreground text-sm font-semibold">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
