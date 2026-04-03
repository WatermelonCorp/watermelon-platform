import {
  MessageCircle,
  Inbox,
  Circle,
} from 'lucide-react';
import { TooltipVerticalNavbar } from './base';

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
];

export default function VerticalTooltipNavbarDemo() {
  return <TooltipVerticalNavbar items={items} />;
}
