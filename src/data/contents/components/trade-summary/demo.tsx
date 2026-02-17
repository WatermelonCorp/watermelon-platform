"use client";

import { TradeSummary } from "./index";

/* ---------- TYPES  ---------- */

type TradeSide = "LONG" | "SHORT";

type Trade = {
  id: string;
  asset: string;
  session:
    | "MORNING SESSION"
    | "EARLY SESSION"
    | "MID-MORNING";
  market:
    | "US EQUITIES"
    | "HIGH VOLATILITY"
    | "TREND ENVIRONMENT";
  strategy: string;
  description: string;
  pnl: number;
  sparklineData: number[];
  tags: string[];
  contracts: number;
  side: TradeSide;
};

/* ---------- MOCK DATA ---------- */

const MOCK_TRADES: Trade[] = [
  {
    id: "1",
    asset: "E-Mini S&P 500",
    session: "MORNING SESSION",
    market: "US EQUITIES",
    strategy: "Opening Range Breakout",
    description:
      "Strong follow-through after the first 15-minute range break.",
    pnl: 380.4,
    sparklineData: [20, 35, 25, 45, 40, 55, 50, 65],
    tags: ["Good Read", "Momentum", "Trend Day"],
    contracts: 3,
    side: "LONG",
  },
  {
    id: "2",
    asset: "S&P 500 Futures",
    session: "EARLY SESSION",
    market: "HIGH VOLATILITY",
    strategy: "Opening Range Breakout",
    description:
      "Breakout lacked volume confirmation. Price stalled near VWAP and reversed quickly.",
    pnl: -218.75,
    sparklineData: [50, 45, 60, 55, 40, 35, 30, 25],
    tags: ["Low Volume", "Chop", "Discipline"],
    contracts: 2,
    side: "LONG",
  },
  {
    id: "3",
    asset: "E-Mini S&P 500",
    session: "MID-MORNING",
    market: "TREND ENVIRONMENT",
    strategy: "ORB Pullback Continuation",
    description:
      "Strong follow-through after the first 15-minute range break.",
    pnl: 1149.8,
    sparklineData: [10, 20, 15, 30, 45, 40, 60, 75],
    tags: ["Patience", "Trend", "Higher Low"],
    contracts: 4,
    side: "LONG",
  },
];

export default function TradeSummaryDemo() {
  return (
    <TradeSummary
      date="JAN 12, 2026"
      trades={MOCK_TRADES}
      onAddTrade={() => console.log("Add trade clicked")}
    />
  );
}
