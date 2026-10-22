import { category } from './config';
import Tabs1 from './variant-1';
import Tabs2 from './variant-2';
import Tabs3 from './variant-3';
import Tabs4 from './variant-4';
import Tabs5 from './variant-5';
import Tabs6 from './variant-6';
import Tabs7 from './variant-7';
import Tabs8 from './variant-8';
import Tabs9 from './variant-9';
import Tabs10 from './variant-10';
import Tabs11 from './variant-11';
import Tabs12 from './variant-12';
import Tabs13 from './variant-13';
import Tabs14 from './variant-14';
import Tabs15 from './variant-15';
import Tabs16 from './variant-16';
import Tabs17 from './variant-17';
import Tabs18 from './variant-18';
import Tabs19 from './variant-19';
import Tabs20 from './variant-20';
import Tabs21 from './variant-21';
import Tabs22 from './variant-22';
import Tabs23 from './variant-23';
import Tabs24 from './variant-24';
import Tabs25 from './variant-25';
import Tabs26 from './variant-26';

import code1 from './variant-1.tsx?raw';
import code2 from './variant-2.tsx?raw';
import code3 from './variant-3.tsx?raw';
import code4 from './variant-4.tsx?raw';
import code5 from './variant-5.tsx?raw';
import code6 from './variant-6.tsx?raw';
import code7 from './variant-7.tsx?raw';
import code8 from './variant-8.tsx?raw';
import code9 from './variant-9.tsx?raw';
import code10 from './variant-10.tsx?raw';
import code11 from './variant-11.tsx?raw';
import code12 from './variant-12.tsx?raw';
import code13 from './variant-13.tsx?raw';
import code14 from './variant-14.tsx?raw';
import code15 from './variant-15.tsx?raw';
import code16 from './variant-16.tsx?raw';
import code17 from './variant-17.tsx?raw';
import code18 from './variant-18.tsx?raw';
import code19 from './variant-19.tsx?raw';
import code20 from './variant-20.tsx?raw';
import code21 from './variant-21.tsx?raw';
import code22 from './variant-22.tsx?raw';
import code23 from './variant-23.tsx?raw';
import code24 from './variant-24.tsx?raw';
import code25 from './variant-25.tsx?raw';
import code26 from './variant-26.tsx?raw';

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'tabs-01',
    title: 'Tabs 1',
    description: "Segmented tabs on a muted rounded track where the active tab lifts onto a white pill.",
    component: Tabs1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-1.json',
    code: code1,
  },
  {
    id: 'tabs-02',
    title: 'Tabs 2',
    description: "Outlined tab track where the active tab fills solid with the primary color.",
    component: Tabs2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-2.json',
    code: code2,
  },
  {
    id: 'tabs-03',
    title: 'Tabs 3',
    description: "Pill-shaped tab bar with icons whose labels hide on mobile, leaving icon-only tabs.",
    component: Tabs3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-3.json',
    code: code3,
  },
  {
    id: 'tabs-04',
    title: 'Tabs 4',
    description: "Horizontally scrollable pill tabs with a small numeric count badge beside each label.",
    component: Tabs4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-4.json',
    code: code4,
  },
  {
    id: 'tabs-05',
    title: 'Tabs 5',
    description: "Settings tabs with stacked icons and uppercase labels above a titled content panel.",
    component: Tabs5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-5.json',
    code: code5,
  },
  {
    id: 'tabs-06',
    title: 'Tabs 6',
    description: "Analytics tabs with a count badge stacked above each label and a metric heading below.",
    component: Tabs6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-6.json',
    code: code6,
  },
  {
    id: 'tabs-07',
    title: 'Tabs 7',
    description: "Round icon-only tabs that show the section name in a tooltip on hover.",
    component: Tabs7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-7.json',
    code: code7,
  },
  {
    id: 'tabs-08',
    title: 'Tabs 8',
    description: "Uppercase pill tabs that turn solid indigo when active, with an italic indigo heading.",
    component: Tabs8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-8.json',
    code: code8,
  },
  {
    id: 'tabs-09',
    title: 'Tabs 9',
    description: "Pricing tier tabs with a solid primary active pill and a dashed bordered content card.",
    component: Tabs9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-9.json',
    code: code9,
  },
  {
    id: 'tabs-10',
    title: 'Tabs 10',
    description: "Uppercase tabs that gain a thin outline border when active, with a breadcrumb-style heading.",
    component: Tabs10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-10.json',
    code: code10,
  },
  {
    id: 'tabs-11',
    title: 'Tabs 11',
    description: "Underline tabs with large icons above labels and a dashed card showing operational metrics.",
    component: Tabs11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-11.json',
    code: code11,
  },
  {
    id: 'tabs-12',
    title: 'Tabs 12',
    description: "Underline tabs with an icon and uppercase label, active tab tinted in the primary color.",
    component: Tabs12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-12.json',
    code: code12,
  },
  {
    id: 'tabs-13',
    title: 'Tabs 13',
    description: "Folder-style tabs with flat bottoms and icon labels over a bordered content card.",
    component: Tabs13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-13.json',
    code: code13,
  },
  {
    id: 'tabs-14',
    title: 'Tabs 14',
    description: "Scrollable category chip tabs with icons, sliding content in from the right on change.",
    component: Tabs14,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-14.json',
    code: code14,
  },
  {
    id: 'tabs-15',
    title: 'Tabs 15',
    description: "Vertical tabs with a left rail line that animates in beside the active item.",
    component: Tabs15,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-15.json',
    code: code15,
  },
  {
    id: 'tabs-16',
    title: 'Tabs 16',
    description: "Vertical tabs on a muted panel beside an indigo card with a Deploy Service button.",
    component: Tabs16,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-16.json',
    code: code16,
  },
  {
    id: 'tabs-17',
    title: 'Tabs 17',
    description: "Vertical tabs with emerald highlights beside a doctor card with Book Session and View Profile actions.",
    component: Tabs17,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-17.json',
    code: code17,
  },
  {
    id: 'tabs-18',
    title: 'Tabs 18',
    description: "Vertical task board tabs with colored count chips and a queue card with item totals.",
    component: Tabs18,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-18.json',
    code: code18,
  },
  {
    id: 'tabs-19',
    title: 'Tabs 19',
    description: "Vertical travel tabs with an amber left border and a glowing card with an Explore button.",
    component: Tabs19,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-19.json',
    code: code19,
  },
  {
    id: 'tabs-20',
    title: 'Tabs 20',
    description: "Vertical tabs with a rose left border beside a now playing card with a progress bar.",
    component: Tabs20,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-20.json',
    code: code20,
  },
  {
    id: 'tabs-21',
    title: 'Tabs 21',
    description: "Vertical icon-only tabs with side tooltips beside documentation text with an accent rule.",
    component: Tabs21,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-21.json',
    code: code21,
  },
  {
    id: 'tabs-22',
    title: 'Tabs 22',
    description: "Vertical changelog tabs with git icons that switch between release notes bullet lists.",
    component: Tabs22,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-22.json',
    code: code22,
  },
  {
    id: 'tabs-23',
    title: 'Tabs 23',
    description: "Vertical inbox tabs with unread count badges and a message timeline with avatar initials.",
    component: Tabs23,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-23.json',
    code: code23,
  },
  {
    id: 'tabs-24',
    title: 'Tabs 24',
    description: "Vertical analytics tabs showing a stat grid with green, red or neutral trend arrows.",
    component: Tabs24,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-24.json',
    code: code24,
  },
  {
    id: 'tabs-25',
    title: 'Tabs 25',
    description: "Team tabs listing members with online, busy or offline dots and hover action buttons.",
    component: Tabs25,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-25.json',
    code: code25,
  },
  {
    id: 'tabs-26',
    title: 'Tabs 26',
    description: "Underline product detail tabs that show specification rows as label and value pairs.",
    component: Tabs26,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tabs-26.json',
    code: code26,
  },
];

export { category };
