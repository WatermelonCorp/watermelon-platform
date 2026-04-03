import { FloatingDisclosure } from './original';
import { BsFileTextFill } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa6';
import { TbFileFilled } from 'react-icons/tb';
import { IoIosFolder } from 'react-icons/io';

export const items = [
  {
    title: 'Task',
    description: 'Create a new task',
    icon: BsFileTextFill,
  },
  {
    title: 'Reminder',
    description: 'Create reminders',
    icon: FaBell,
  },
  {
    title: 'Note',
    description: 'Capture ideas',
    icon: TbFileFilled,
  },
  {
    title: 'Project',
    description: 'Organise projects',
    icon: IoIosFolder,
  },
];

export default function FloatingDisclosureDemo() {
  return <FloatingDisclosure items={items} />;
}
