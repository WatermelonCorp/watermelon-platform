import { category } from './config.ts';

import Badge1 from './variant-1';
import Badge2 from './variant-2';
import Badge3 from './variant-3';
import Badge4 from './variant-4';
import Badge5 from './variant-5';
import Badge6 from './variant-6';
import Badge7 from './variant-7';
import Badge8 from './variant-8';
import Badge9 from './variant-9';
import Badge10 from './variant-10';
import Badge11 from './variant-11';
import Badge12 from './variant-12';
import Badge13 from './variant-13';
import Badge14 from './variant-14';
import Badge15 from './variant-15';
import Badge16 from './variant-16';
import Badge17 from './variant-17';
import Badge18 from './variant-18';
import Badge19 from './variant-19';
import Badge20 from './variant-20';
import Badge21 from './variant-21';
import Badge22 from './variant-22';
import Badge23 from './variant-23';
import Badge24 from './variant-24';

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


import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'badge-01',
    title: 'Badge 1',
    description: "Solid badge in the primary color using the default shadcn badge variant.",
    component: Badge1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-1.json',
    code: code1,
  },
  {
    id: 'badge-02',
    title: 'Badge 2',
    description: "Muted label using the secondary variant for low-emphasis tags and metadata.",
    component: Badge2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-2.json',
    code: code2,
  },
  {
    id: 'badge-03',
    title: 'Badge 3',
    description: "Bordered label using the outline variant with a transparent background.",
    component: Badge3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-3.json',
    code: code3,
  },
  {
    id: 'badge-04',
    title: 'Badge 4',
    description: "Solid badge with small rounded corners instead of the default full pill shape.",
    component: Badge4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-4.json',
    code: code4,
  },
  {
    id: 'badge-05',
    title: 'Badge 5',
    description: "Larger solid badge with extra horizontal and vertical padding for more prominence.",
    component: Badge5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-5.json',
    code: code5,
  },
  {
    id: 'badge-06',
    title: 'Badge 6',
    description: "Compact solid badge with slightly increased padding for small text labels.",
    component: Badge6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-6.json',
    code: code6,
  },
  {
    id: 'badge-07',
    title: 'Badge 7',
    description: "Ghost badge with a small primary colored dot in front of the label.",
    component: Badge7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-7.json',
    code: code7,
  },
  {
    id: 'badge-08',
    title: 'Badge 8',
    description: "Red badge using the destructive variant for errors or removal states.",
    component: Badge8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-8.json',
    code: code8,
  },
  {
    id: 'badge-09',
    title: 'Badge 9',
    description: "Square-cornered numeric badge with tabular figures for showing counts.",
    component: Badge9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-9.json',
    code: code9,
  },
  {
    id: 'badge-10',
    title: 'Badge 10',
    description: "Solid badge with a leading star icon, suited to GitHub star labels.",
    component: Badge10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-10.json',
    code: code10,
  },
  {
    id: 'badge-11',
    title: 'Badge 11',
    description: "Dismissible tag with a small close button that removes the badge on click.",
    component: Badge11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-11.json',
    code: code11,
  },
  {
    id: 'badge-12',
    title: 'Badge 12',
    description: "Soft sky blue status pill with a dot indicator labelled In Progress.",
    component: Badge12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-12.json',
    code: code12,
  },
  {
    id: 'badge-13',
    title: 'Badge 13',
    description: "Soft red status pill with a dot indicator labelled Cancelled.",
    component: Badge13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-13.json',
    code: code13,
  },
  {
    id: 'badge-14',
    title: 'Badge 14',
    description: "Clickable link badge with an arrow that slides right on hover.",
    component: Badge14,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-14.json',
    code: code14,
  },
  {
    id: 'badge-15',
    title: 'Badge 15',
    description: "Soft green status pill with a dot indicator labelled Done.",
    component: Badge15,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-15.json',
    code: code15,
  },
  {
    id: 'badge-16',
    title: 'Badge 16',
    description: "Outline badge with a small square logo image beside the brand name.",
    component: Badge16,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-16.json',
    code: code16,
  },
  {
    id: 'badge-17',
    title: 'Badge 17',
    description: "Sky blue outlined status tag with an alert icon labelled Pending.",
    component: Badge17,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-17.json',
    code: code17,
  },
  {
    id: 'badge-18',
    title: 'Badge 18',
    description: "Green outlined status tag with a filled check circle labelled Done.",
    component: Badge18,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-18.json',
    code: code18,
  },
  {
    id: 'badge-19',
    title: 'Badge 19',
    description: "Red outlined status tag with a ban icon labelled Error.",
    component: Badge19,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-19.json',
    code: code19,
  },
  {
    id: 'badge-20',
    title: 'Badge 20',
    description: "Plain badge wrapped in an orange to fuchsia gradient border ring.",
    component: Badge20,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-20.json',
    code: code20,
  },
  {
    id: 'badge-21',
    title: 'Badge 21',
    description: "Badge filled with an orange, rose and fuchsia linear gradient and white text.",
    component: Badge21,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-21.json',
    code: code21,
  },
  {
    id: 'badge-22',
    title: 'Badge 22',
    description: "Toggleable chip that switches from outline to secondary with a green check when selected.",
    component: Badge22,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-22.json',
    code: code22,
  },
  {
    id: 'badge-23',
    title: 'Badge 23',
    description: "Square cart icon tile with a numeric count badge pinned to its top right corner.",
    component: Badge23,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-23.json',
    code: code23,
  },
  {
    id: 'badge-24',
    title: 'Badge 24',
    description: "Avatar with a green online status dot on its bottom right corner.",
    component: Badge24,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/badge-24.json',
    code: code24,
  },
];

export { category };
