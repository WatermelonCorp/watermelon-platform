import {
  FigGraduationIcon,
  FigLightbulbIcon,
  FigPlayIcon,
  FigSparkleIcon,
} from './assets/icons';

const dashboardAssetPath = '/content/dashboards/demostack-dashboard';

const inspireOne = `${dashboardAssetPath}/inspire-one.svg`;
const inspireTwo = `${dashboardAssetPath}/inspire-two.svg`;
const inspireThree = `${dashboardAssetPath}/inspire-three.svg`;
const inspireFour = `${dashboardAssetPath}/inspire-four.svg`;
const appIntroduction = `${dashboardAssetPath}/app-introduction.webp`;
const teamDemo = `${dashboardAssetPath}/team-demo.webp`;

export type Demostack = {
  id: string;
  title: string;
  author: string;
  initials: string;
  avatar: string;
  image: string;
};

export const dashboardResources = [
  { label: 'Learning Academy', icon: FigGraduationIcon },
  { label: 'Knowledge Base', icon: FigLightbulbIcon },
  { label: 'How we use Demostack', icon: FigPlayIcon },
  { label: 'Product Updates', icon: FigSparkleIcon },
] as const;

export const inspiredDemos = [
  { title: 'Mobile App Demo', image: inspireOne },
  { title: 'Payment Flow Demo', image: inspireTwo },
  { title: 'Team Workspace Demo', image: inspireThree },
  { title: 'Analytics Platform Demo', image: inspireFour },
] as const;

export const demostacks: Demostack[] = [
  {
    id: 'monitor-demo-performance',
    title: 'Manage Product De...',
    author: 'Abiola Ahmed',
    initials: 'AA',
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=96&h=96',
    image: teamDemo,
  },
  {
    id: 'introduction-to-app',
    title: 'Introduction to app in...',
    author: 'Vansh P.',
    initials: 'VP',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=96&h=96',
    image: appIntroduction,
  },
  {
    id: 'monitor-detail-performance',
    title: 'Monitor detail per...',
    author: 'Ava C',
    initials: 'AC',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=96&h=96',
    image: teamDemo,
  },
  {
    id: 'use-case-tips',
    title: 'Use case tips from t...',
    author: 'Vansh P.',
    initials: 'VP',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=96&h=96',
    image: appIntroduction,
  },
];

export const demostackAuthors = [
  ...new Set(demostacks.map((demostack) => demostack.author)),
];

export const sortLabels = {
  recent: 'Recent',
  ascending: 'Title A-Z',
  descending: 'Title Z-A',
} as const;

export type SortMode = keyof typeof sortLabels;
export type ViewMode = 'grid' | 'list';
