import { category } from './config.ts';

import Tooltip1 from './variant-1';
import Tooltip2 from './variant-2';
import Tooltip3 from './variant-3';
import Tooltip4 from './variant-4';
import Tooltip5 from './variant-5';
import Tooltip6 from './variant-6';
import Tooltip7 from './variant-7';
import Tooltip8 from './variant-8';
import Tooltip9 from './variant-9';
import Tooltip10 from './variant-10';
import Tooltip11 from './variant-11';
import Tooltip12 from './variant-12';
import Tooltip13 from './variant-13';
import Tooltip14 from './variant-14';
import Tooltip15 from './variant-15';

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

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'tooltip-01',
    title: 'Tooltip 1',
    description: "Default dark tooltip with a pointer arrow and a short message on button hover.",
    component: Tooltip1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-1.json',
    code: code1,
  },
  {
    id: 'tooltip-02',
    title: 'Tooltip 2',
    description: "Light neutral grey tooltip with dark text that keeps the same look across themes.",
    component: Tooltip2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-2.json',
    code: code2,
  },
  {
    id: 'tooltip-03',
    title: 'Tooltip 3',
    description: "Tooltip with the pointer arrow hidden, showing only the plain message box.",
    component: Tooltip3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-3.json',
    code: code3,
  },
  {
    id: 'tooltip-04',
    title: 'Tooltip 4',
    description: "Pricing tooltip showing a monthly per-user price next to a rounded Popular badge.",
    component: Tooltip4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-4.json',
    code: code4,
  },
  {
    id: 'tooltip-05',
    title: 'Tooltip 5',
    description: "Tooltip showing a small user avatar beside the person's name.",
    component: Tooltip5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-5.json',
    code: code5,
  },
  {
    id: 'tooltip-06',
    title: 'Tooltip 6',
    description: "Wider info tooltip with an icon, bold heading and a short paragraph of help text.",
    component: Tooltip6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-6.json',
    code: code6,
  },
  {
    id: 'tooltip-07',
    title: 'Tooltip 7',
    description: "Red warning tooltip with a white alert icon and a caution message.",
    component: Tooltip7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-7.json',
    code: code7,
  },
  {
    id: 'tooltip-08',
    title: 'Tooltip 8',
    description: "Tip tooltip with a yellow lightbulb icon before a keyboard shortcut hint.",
    component: Tooltip8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-8.json',
    code: code8,
  },
  {
    id: 'tooltip-09',
    title: 'Tooltip 9',
    description: "Pill-shaped tooltip with fully rounded ends instead of square corners.",
    component: Tooltip9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-9.json',
    code: code9,
  },
  {
    id: 'tooltip-10',
    title: 'Tooltip 10',
    description: "Four arrow buttons that show tooltips on the left, top, bottom and right sides.",
    component: Tooltip10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-10.json',
    code: code10,
  },
  {
    id: 'tooltip-11',
    title: 'Tooltip 11',
    description: "Hover card with a feature preview image, short description and a Learn more link.",
    component: Tooltip11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-11.json',
    code: code11,
  },
  {
    id: 'tooltip-12',
    title: 'Tooltip 12',
    description: "Hover card profile preview with an avatar, job title and active status line.",
    component: Tooltip12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-12.json',
    code: code12,
  },
  {
    id: 'tooltip-13',
    title: 'Tooltip 13',
    description: "Hover card listing four team members with avatars, roles and workload percentages.",
    component: Tooltip13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-13.json',
    code: code13,
  },
  {
    id: 'tooltip-14',
    title: 'Tooltip 14',
    description: "Project status hover card with a progress bar, start date, ETA and contributor avatars.",
    component: Tooltip14,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-14.json',
    code: code14,
  },
  {
    id: 'tooltip-15',
    title: 'Tooltip 15',
    description: "Centred security notice hover card with a shield icon in a circle and a reassurance message.",
    component: Tooltip15,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/tooltip-15.json',
    code: code15,
  },
];

export { category };