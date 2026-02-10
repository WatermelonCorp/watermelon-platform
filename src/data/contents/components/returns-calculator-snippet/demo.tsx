import { ReturnsCalculator } from "./index"; 

export default function ReturnsCalculatorDemo() {
  return (
        <ReturnsCalculator 
          initialMonthly={50000} 
          initialRate={12} 
          initialYears={15} 
        />

  );
}