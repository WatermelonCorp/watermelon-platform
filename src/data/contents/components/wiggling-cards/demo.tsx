import { BarChart3, CreditCard, ShoppingCart, Users } from 'lucide-react';
import { WigglingCards } from '.';



const customCards = [
  {
    id: 0,
    icon: CreditCard,
    percentage: '2.15%',
    value: '$2,374',
    label: 'Weekly Expense',
  },
  {
    id: 1,
    icon: ShoppingCart,
    percentage: '1.20%',
    value: '$1,589',
    label: 'Weekly Orders',
  },
  {
    id: 2,
    icon: Users,
    percentage: '2.33%',
    value: '$976',
    label: 'Weekly Users',
  },
  {
    id: 3,
    icon: BarChart3,
    percentage: '3.82%',
    value: '$46,748',
    label: 'Weekly Sales',
  },
];

export default function WigglingCardsDemo() {
  return <WigglingCards cards={customCards} />;
}
