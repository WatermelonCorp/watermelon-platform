import { category } from './config.ts';

import Switch1 from './variant-1';
import Switch2 from './variant-2';
import Switch3 from './variant-3';
import Switch4 from './variant-4';
import Switch5 from './variant-5';
import Switch6 from './variant-6';
import Switch7 from './variant-7';
import Switch8 from './variant-8';
import Switch9 from './variant-9';
import Switch10 from './variant-10';
import Switch11 from './variant-11';
import Switch12 from './variant-12';
import Switch13 from './variant-13';
import Switch14 from './variant-14';
import Switch15 from './variant-15';
import Switch16 from './variant-16';
import Switch17 from './variant-17';
import Switch18 from './variant-18';
import Switch19 from './variant-19';
import Switch20 from './variant-20';

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

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'switch-01',
    title: 'Switch 1',
    description: "Basic toggle switch with a clickable Enable Notifications label beside it.",
    component: Switch1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-1.json',
    code: code1,
  },
  {
    id: 'switch-02',
    title: 'Switch 2',
    description: "Square-cornered switch with a square thumb instead of the usual pill shape.",
    component: Switch2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-2.json',
    code: code2,
  },
  {
    id: 'switch-03',
    title: 'Switch 3',
    description: "Four solid colour switches in red, teal, blue and amber for destructive, success, info and warning.",
    component: Switch3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-3.json',
    code: code3,
  },
  {
    id: 'switch-04',
    title: 'Switch 4',
    description: "Gradient switch whose track goes from yellow when off to blue and indigo when on.",
    component: Switch4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-4.json',
    code: code4,
  },
  {
    id: 'switch-05',
    title: 'Switch 5',
    description: "Outline switches in red, teal, blue and yellow with a tinted track and coloured thumb when on.",
    component: Switch5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-5.json',
    code: code5,
  },
  {
    id: 'switch-06',
    title: 'Switch 6',
    description: "Mini switch with a thin three pixel track and an oversized bordered thumb.",
    component: Switch6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-6.json',
    code: code6,
  },
  {
    id: 'switch-07',
    title: 'Switch 7',
    description: "Three switches side by side in small, medium and large sizes.",
    component: Switch7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-7.json',
    code: code7,
  },
  {
    id: 'switch-08',
    title: 'Switch 8',
    description: "Switch with check and X icons beside it that highlight to match the current state.",
    component: Switch8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-8.json',
    code: code8,
  },
  {
    id: 'switch-09',
    title: 'Switch 9',
    description: "Wide switch with check and X icons inside the track and a thumb that slides over them.",
    component: Switch9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-9.json',
    code: code9,
  },
  {
    id: 'switch-10',
    title: 'Switch 10',
    description: "Rounded-square theme switch with moon and sun icons inside and a half-width sliding thumb.",
    component: Switch10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-10.json',
    code: code10,
  },
  {
    id: 'switch-11',
    title: 'Switch 11',
    description: "Bordered settings card for Auto Sync with a description and a sync icon that rotates when on.",
    component: Switch11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-11.json',
    code: code11,
  },
  {
    id: 'switch-12',
    title: 'Switch 12',
    description: "Preference list of three switches for privacy, notifications and dark theme, each with an icon.",
    component: Switch12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-12.json',
    code: code12,
  },
  {
    id: 'switch-13',
    title: 'Switch 13',
    description: "Email updates settings card that gets a primary border and glow ring when switched on.",
    component: Switch13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-13.json',
    code: code13,
  },
  {
    id: 'switch-14',
    title: 'Switch 14',
    description: "Cloud backup card on a grey background that gains a dark ring and raised shadow when on.",
    component: Switch14,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-14.json',
    code: code14,
  },
  {
    id: 'switch-15',
    title: 'Switch 15',
    description: "Switch whose label text changes between Notifications On and Notifications Off.",
    component: Switch15,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-15.json',
    code: code15,
  },
  {
    id: 'switch-16',
    title: 'Switch 16',
    description: "Light and dark mode switch with clickable sun and moon icons on either side.",
    component: Switch16,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-16.json',
    code: code16,
  },
  {
    id: 'switch-17',
    title: 'Switch 17',
    description: "Switch with a single label icon that swaps between a moon and a sun as it toggles.",
    component: Switch17,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-17.json',
    code: code17,
  },
  {
    id: 'switch-18',
    title: 'Switch 18',
    description: "Yes or No switch with clickable text labels on both sides that dim when inactive.",
    component: Switch18,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-18.json',
    code: code18,
  },
  {
    id: 'switch-19',
    title: 'Switch 19',
    description: "Auto sync row on a muted panel with helper text that changes with the switch state.",
    component: Switch19,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-19.json',
    code: code19,
  },
  {
    id: 'switch-20',
    title: 'Switch 20',
    description: "Pill-shaped alerts toggle with a bell icon that swaps to a muted bell and text when paused.",
    component: Switch20,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/switch-20.json',
    code: code20,
  },
];

export { category };
