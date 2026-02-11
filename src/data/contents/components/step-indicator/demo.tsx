import { StepIndicator } from '.';
import {
  FaCircleArrowDown,
  FaCircleArrowUp,
  FaCircleCheck,
} from 'react-icons/fa6';
import { BiSolidPieChartAlt2 } from 'react-icons/bi';
import { useState } from 'react';

const steps = [
  { id: 'income', label: 'Income', icon: <FaCircleArrowDown /> },
  { id: 'expense', label: 'Expense', icon: <FaCircleArrowUp /> },
  { id: 'goals', label: 'Goals', icon: <BiSolidPieChartAlt2 /> },
  { id: 'review', label: 'Review', icon: <FaCircleCheck /> },
];

export default function StepIndicatorDemo() {
  const [current, setCurrent] = useState(0);

  return (
    <StepIndicator
      steps={steps}
      currentStep={current}
      onStepChange={(i) => setCurrent(i)}
    />
  );
}
