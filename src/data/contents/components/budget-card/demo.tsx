"use client";

import { BudgetCard } from './index';

export default function BudgetCardDemo() {
  const budgetData = {
    month: "July",
    totalBudget: 10354,
    spentAmount: 4605,
    breakdown: [
      { 
        label: "Rent & Utilities", 
        amount: 1600, 
        color: "linear-gradient(90deg, #7C3AED, #9F7AEA)" 
      },
      { 
        label: "Groceries", 
        amount: 1350, 
        color: "linear-gradient(90deg, #D97706, #ECC94B)" 
      },
      { 
        label: "Other", 
        amount: 1355, 
        color: "linear-gradient(90deg, #2563EB, #4299E1)" 
      },
    ]
  };

  return (
    <BudgetCard {...budgetData} />
  );
}