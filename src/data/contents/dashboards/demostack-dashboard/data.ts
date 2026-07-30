import type { ComponentType, SVGProps } from 'react';
import { ChartNoAxesCombined, Palette, Plug, Settings } from 'lucide-react';
import {
  DemostacksIcon,
  GroupGenericIcon,
  HomeIcon,
  NavTitleIcon,
  ShowcasesIcon,
  VideosIcon,
} from './components/demostack/icons';

export type Demostack = {
  id: string;
  title: string;
  author: string;
  avatar: string;
  image: string;
};

export const demostacks: Demostack[] = [
  {
    id: 'monitor-demo-performance',
    title: 'Stockroom Inventory Onboarding',
    author: 'Abiola Ahmed',
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=96&h=96',
    image: 'https://assets.watermelon.sh/components/stockroom-tour.png',
  },
  {
    id: 'introduction-to-app',
    title: 'Gridwise Platform Tour',
    author: 'Vansh P.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=96&h=96',
    image: 'https://assets.watermelon.sh/components/gridwise-tour.png',
  },
  {
    id: 'monitor-detail-performance',
    title: 'Resolve a Support Request',
    author: 'Ava C',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=96&h=96',
    image:
      'https://assets.watermelon.sh/components/support-request-tour.png',
  },
];

export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavigationItem = {
  name: string;
  href: string;
  icon: SvgIcon;
  badge?: string;
};

export const companies = [
  { name: 'My Company', role: 'Admin' },
  { name: 'Acme Corporation', role: 'Member' },
  { name: 'Tiktok Inc', role: 'Admin' },
] as const;

export const workspaceNavigation: NavigationItem[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Demostacks', href: '/demostacks', icon: DemostacksIcon },
  { name: 'Showcases', href: '/showcases', icon: ShowcasesIcon },
  { name: 'Videos', href: '/videos', icon: VideosIcon, badge: 'Beta' },
  { name: 'Demo Hub', href: '/demo-hub', icon: GroupGenericIcon },
];

export const adminNavigation: NavigationItem[] = [
  { name: 'Analytics', href: '/analytics', icon: ChartNoAxesCombined },
  { name: 'Theme', href: '/theme', icon: Palette },
  { name: 'Integration', href: '/integration', icon: Plug },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const pageDetails = {
  '/': { title: 'Home', icon: NavTitleIcon },
  '/demostacks': { title: 'Demostacks', icon: DemostacksIcon },
  '/showcases': { title: 'Showcases', icon: ShowcasesIcon },
  '/videos': { title: 'Videos', icon: VideosIcon },
  '/demo-hub': { title: 'Demo Hub', icon: GroupGenericIcon },
  '/analytics': { title: 'Analytics', icon: ChartNoAxesCombined },
  '/theme': { title: 'Theme', icon: Palette },
  '/integration': { title: 'Integration', icon: Plug },
  '/settings': { title: 'Settings', icon: Settings },
} as const;
