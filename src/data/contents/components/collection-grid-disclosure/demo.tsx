import { DisclosureCard } from '.';
import { FaCarrot, FaGraduationCap, FaPills, FaPlug } from 'react-icons/fa';
import { TbHomeFilled, TbPlayerPlayFilled } from 'react-icons/tb';
import { FaBottleWater } from 'react-icons/fa6';
import { MdWifi } from 'react-icons/md';
import { BsFillMouse2Fill } from 'react-icons/bs';
import { IoGameController } from 'react-icons/io5';
import { Coffee } from 'lucide-react';

const items = [
  {
    id: 'utilities',
    name: 'Utilities',
    items: [
      {
        id: 'u-1',
        name: 'Electricity',
        price: 150,
        icon: FaPlug,
      },
      {
        id: 'u-2',
        name: 'Water',
        price: 50,
        icon: FaBottleWater,
      },
      {
        id: 'u-3',
        name: 'Internet',
        price: 100,
        icon: MdWifi,
      },
    ],
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    items: [
      {
        id: 's-1',
        name: 'Streaming',
        price: 80,
        icon: TbPlayerPlayFilled,
      },
      {
        id: 's-2',
        name: 'Courses',
        price: 100,
        icon: FaGraduationCap,
      },
      {
        id: 's-3',
        name: 'Software & Apps',
        price: 120,
        icon: BsFillMouse2Fill,
      },
      {
        id: 's-4',
        name: 'Games',
        price: 50,
        icon: IoGameController,
      },
    ],
  },
  {
    id: 'daily-needs',
    name: 'Daily Needs',
    items: [
      {
        id: 'dn-1',
        name: 'Groceries',
        price: 500.56,
        icon: FaCarrot,
      },
      {
        id: 'dn-2',
        name: 'Snacks',
        price: 45.2,
        icon: Coffee,
      },
      {
        id: 'dn-3',
        name: 'Essentials',
        price: 120.34,
        icon: TbHomeFilled,
      },
      {
        id: 'dn-4',
        name: 'Health',
        price: 75.8,
        icon: FaPills,
      },
    ],
  },
];

function DisclosureCardDemo() {
  return <DisclosureCard collections={items} />;
}

export default DisclosureCardDemo;