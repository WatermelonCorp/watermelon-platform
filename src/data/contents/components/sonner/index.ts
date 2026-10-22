import { category } from './config.ts';

import Sonner1 from './variant-1';
import Sonner2 from './variant-2';
import Sonner3 from './variant-3';
import Sonner4 from './variant-4';
import Sonner5 from './variant-5';
import Sonner6 from './variant-6';
import Sonner7 from './variant-7';
import Sonner8 from './variant-8';
import Sonner9 from './variant-9';
import Sonner10 from './variant-10';
import Sonner11 from './variant-11';
import Sonner12 from './variant-12';
import Sonner13 from './variant-13';
import Sonner14 from './variant-14';
import Sonner15 from './variant-15';
import Sonner16 from './variant-16';
import Sonner17 from './variant-17';
import Sonner18 from './variant-18';
import Sonner19 from './variant-19';
import Sonner20 from './variant-20';

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
    id: 'sonner-01',
    title: 'Sonner 1',
    description: "Success toast for a deployment with a description and a green left border accent.",
    component: Sonner1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-1.json',
    code: code1,
  },
  {
    id: 'sonner-02',
    title: 'Sonner 2',
    description: "Plain event reminder toast with a meeting time description and a sky blue left border.",
    component: Sonner2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-2.json',
    code: code2,
  },
  {
    id: 'sonner-03',
    title: 'Sonner 3',
    description: "Custom delivery toast with a truck icon in an orange tile beside a title and subtitle.",
    component: Sonner3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-3.json',
    code: code3,
  },
  {
    id: 'sonner-04',
    title: 'Sonner 4',
    description: "Profile update toast with a user avatar on the left of the title and message.",
    component: Sonner4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-4.json',
    code: code4,
  },
  {
    id: 'sonner-05',
    title: 'Sonner 5',
    description: "Dismissible toast with a close button that can also auto-close on its own.",
    component: Sonner5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-5.json',
    code: code5,
  },
  {
    id: 'sonner-06',
    title: 'Sonner 6',
    description: "Archive notification toast with an Undo action button to reverse the change.",
    component: Sonner6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-6.json',
    code: code6,
  },
  {
    id: 'sonner-07',
    title: 'Sonner 7',
    description: "Promise toast that shows a loading message, then a success or error result after syncing.",
    component: Sonner7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-7.json',
    code: code7,
  },
  {
    id: 'sonner-08',
    title: 'Sonner 8',
    description: "Grid of six buttons that open a toast in each screen position, from top left to bottom right.",
    component: Sonner8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-8.json',
    code: code8,
  },
  {
    id: 'sonner-09',
    title: 'Sonner 9',
    description: "Soft info toast with a pale sky blue tint, blue text and a blue border.",
    component: Sonner9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-9.json',
    code: code9,
  },
  {
    id: 'sonner-10',
    title: 'Sonner 10',
    description: "Soft success toast with a pale green tint for a completed file upload.",
    component: Sonner10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-10.json',
    code: code10,
  },
  {
    id: 'sonner-11',
    title: 'Sonner 11',
    description: "Soft warning toast with a pale amber tint for a low storage alert.",
    component: Sonner11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-11.json',
    code: code11,
  },
  {
    id: 'sonner-12',
    title: 'Sonner 12',
    description: "Soft destructive toast with a pale red tint for a permanent deletion warning.",
    component: Sonner12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-12.json',
    code: code12,
  },
  {
    id: 'sonner-13',
    title: 'Sonner 13',
    description: "Outline info toast on the normal background with a sky blue border and text.",
    component: Sonner13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-13.json',
    code: code13,
  },
  {
    id: 'sonner-14',
    title: 'Sonner 14',
    description: "Outline success toast on the normal background with a green border for a received payment.",
    component: Sonner14,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-14.json',
    code: code14,
  },
  {
    id: 'sonner-15',
    title: 'Sonner 15',
    description: "Outline warning toast with an amber border and text for an unrecognised login attempt.",
    component: Sonner15,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-15.json',
    code: code15,
  },
  {
    id: 'sonner-16',
    title: 'Sonner 16',
    description: "Outline error toast with a red border and text for revoked account access.",
    component: Sonner16,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-16.json',
    code: code16,
  },
  {
    id: 'sonner-17',
    title: 'Sonner 17',
    description: "Solid info toast with a filled sky blue background and white text.",
    component: Sonner17,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-17.json',
    code: code17,
  },
  {
    id: 'sonner-18',
    title: 'Sonner 18',
    description: "Solid success toast with a filled green background and white text for a finished backup.",
    component: Sonner18,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-18.json',
    code: code18,
  },
  {
    id: 'sonner-19',
    title: 'Sonner 19',
    description: "Solid warning toast with a filled amber background and white text for unusual activity.",
    component: Sonner19,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-19.json',
    code: code19,
  },
  {
    id: 'sonner-20',
    title: 'Sonner 20',
    description: "Solid error toast with a filled red background and white text for a critical failure.",
    component: Sonner20,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sonner-20.json',
    code: code20,
  },
];

export { category };
