'use client';

import { CommandSearch, type CommandItem } from './original';
import {
  User,
  Bell,
  HelpCircle,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

const command: CommandItem[] = [
  {
    id: '1',
    title: 'Calendar',
    section: 'Suggestions',
    icon: <ArrowRight size={16} />,
    action: () => console.log('Calendar'),
  },
  {
    id: '2',
    title: 'Search Emoji',
    section: 'Suggestions',
    icon: <ArrowRight size={16} />,
    action: () => console.log('Emoji'),
  },
  {
    id: '3',
    title: 'Calculator',
    section: 'Suggestions',
    icon: <ArrowRight size={16} />,
    action: () => console.log('Calculator'),
  },
  {
    id: '4',
    title: 'Documents',
    section: 'Suggestions',
    icon: <ArrowRight size={16} />,
    action: () => console.log('Docs'),
  },
  {
    id: '5',
    title: 'Images',
    section: 'Suggestions',
    icon: <ArrowRight size={16} />,
    action: () => console.log('Images'),
  },
  {
    id: '6',
    title: 'Music',
    section: 'Suggestions',
    icon: <ArrowRight size={16} />,
    action: () => console.log('Music'),
  },
  {
    id: '7',
    title: 'Profile',
    section: 'Settings',
    icon: <User size={16} />,
    shortcut: '⌘ P',
    action: () => console.log('Profile'),
  },
  {
    id: '8',
    title: 'Notifications',
    section: 'Settings',
    icon: <Bell size={16} />,
    shortcut: '⌘ N',
    action: () => console.log('Notifications'),
  },
  {
    id: '9',
    title: 'Messages',
    section: 'Settings',
    icon: <MessageSquare size={16} />,
    shortcut: '⌘ M',
    action: () => console.log('Messages'),
  },
  {
    id: '10',
    title: 'FAQ',
    section: 'Help',
    icon: <HelpCircle size={16} />,
    action: () => console.log('FAQ'),
  },
];

export default function CommandSearchDemo() {
  return (
    <div className="relative flex h-[550px] w-full flex-col items-center justify-center">
      <div className="z-10 flex w-full flex-col items-center gap-4">
        <CommandSearch items={command} />
      </div>
    </div>
  );
}
