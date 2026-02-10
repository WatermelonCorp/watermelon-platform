import { DiscreteTabs } from '.';
import { FaBell } from 'react-icons/fa6';
import { HiCalendarDays } from 'react-icons/hi2';
import { MdMailOutline } from 'react-icons/md';



const tabs = [
  {
    id: 'mail',
    icon: <MdMailOutline size={24} />,
    label: 'Inbox',
    activeColor: 'text-blue-500',
  },
  {
    id: 'planner',
    icon: <HiCalendarDays size={24} />,
    label: 'Planner',
    activeColor: 'text-yellow-500',
  },
  {
    id: 'mail2',
    icon: <FaBell size={24} />,
    label: 'Alerts',
    activeColor: 'text-red-500',
  },
];

function DiscreteTabsDemo() {
  return (
    <div className="flex  flex-col items-center justify-center gap-10 bg-transparent p-10">
      <DiscreteTabs tabs={tabs} defaultTab="mail" />
    </div>
  );
}

export default DiscreteTabsDemo;
