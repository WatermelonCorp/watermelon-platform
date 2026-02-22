import { AiFillSignal } from 'react-icons/ai';
import { HugeiconsIcon } from '@hugeicons/react';
import { Hamburger01Icon, Invoice02Icon } from '@hugeicons/core-free-icons';
import { TransactionList, type Transaction } from '.';

const data: Transaction[] = [
  {
    id: '1',
    name: 'Netflix',
    category: 'Subscription',
    amount: '-$6.99',
    icon: (
      <HugeiconsIcon
        icon={Invoice02Icon}
        size={34}
        color="#282825"
        fill="#F5F3EF"
        strokeWidth={1.5}
      />
    ),
    date: 'September 26',
    time: '12:01 am',
    transactionId: '67593',
    paymentMethod: 'Credit Card',
    cardNumber: '9342',
    cardType: 'VISA',
  },
  {
    id: '2',
    name: 'Verizon',
    category: 'Mobile Recharge',
    amount: '-$4.05',
    icon: (
      <AiFillSignal
        size={34}
        color="#282825"
        fill="#F5F3EF"
        strokeWidth={1.5}
      />
    ),
    date: 'September 24',
    time: '05:18 pm',
    transactionId: '67482',
    paymentMethod: 'Credit Card',
    cardNumber: '2316',
    cardType: 'MASTERCARD',
  },
  {
    id: '3',
    name: 'Rive',
    category: 'Subscription',
    amount: '-$32.00',
    icon: (
      <HugeiconsIcon
        icon={Invoice02Icon}
        size={34}
        color="#282825"
        fill="#F5F3EF"
        strokeWidth={1.5}
      />
    ),
    date: 'September 16',
    time: '02:11 pm',
    transactionId: '54635',
    paymentMethod: 'Credit Card',
    cardNumber: '9342',
    cardType: 'VISA',
  },
  {
    id: '4',
    name: 'Figma',
    category: 'Subscription',
    amount: '-$15.00',
    icon: (
      <HugeiconsIcon
        icon={Invoice02Icon}
        size={34}
        color="#282825"
        fill="#F5F3EF"
        strokeWidth={1.5}
      />
    ),
    date: 'September 15',
    time: '01:11 am',
    transactionId: '52363',
    paymentMethod: 'Credit Card',
    cardNumber: '9342',
    cardType: 'VISA',
  },
  {
    id: '5',
    name: 'Big Belly Burger',
    category: 'Restaurant',
    amount: '-$12.05',
    icon: (
      <HugeiconsIcon
        icon={Hamburger01Icon}
        size={34}
        color="#282825"
        fill="#F5F3EF"
        strokeWidth={1.5}
      />
    ),
    date: 'September 15',
    time: '01:11 am',
    transactionId: '52363',
    paymentMethod: 'Credit Card',
    cardNumber: '9342',
    cardType: 'VISA',
  },
];

export default function TransactionListDemo() {
  return <TransactionList transactions={data} />;
}
