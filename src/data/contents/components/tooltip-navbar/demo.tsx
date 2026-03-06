import {
  MessageCircle,
  Inbox,
  Circle,
  Crosshair,
  Download,
  Menu,
} from 'lucide-react';
import { TooltipNavbar } from './index';


const items = [
  {
    icon: <MessageCircle className="h-full w-full" />,
    label: 'Comment',
    labelHasKeyword: ['C'],
    hasBadge: false,
  },
  {
    icon: <Inbox className="h-full w-full" />,
    label: 'Inbox',
    labelHasKeyword: ['I'],
    hasBadge: true,
  },
  {
    icon: <Circle className="h-full w-full" />,
    label: 'Record',
    labelHasKeyword: ['R'],
    hasBadge: false,
  },
  {
    icon: <Crosshair className="h-full w-full" />,
    label: 'Focus Mode',
    labelHasKeyword: ['F'],
    hasBadge: false,
  },
  {
    icon: <Download className="h-full w-full" />,
    label: 'Share',
    labelHasKeyword: ['S'],
    hasBadge: false,
  },
  {
    icon: <Menu className="h-full w-full" />,
    label: 'Menu',
    labelHasKeyword: ['M'],
    hasBadge: false,
  },
];
export default function TooltipNavbarDemo() {
  return <TooltipNavbar items={items} />;
}
