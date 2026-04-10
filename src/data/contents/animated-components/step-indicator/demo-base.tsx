import { StepIndicator } from './base';
import {
  FaCircleArrowDown,
  FaCircleArrowUp,
  FaCircleCheck,
} from 'react-icons/fa6';
import { BiSolidPieChartAlt2 } from 'react-icons/bi';

const steps = [
  { id: 'income', label: 'Income', icon: FaCircleArrowDown },
  { id: 'expense', label: 'Expense', icon: FaCircleArrowUp },
  { id: 'goals', label: 'Goals', icon: BiSolidPieChartAlt2 },
  { id: 'review', label: 'Review', icon: FaCircleCheck },
];

export default function StepIndicatorDemo() {
  return <StepIndicator steps={steps} onStepChange={() => {}} />;
}
