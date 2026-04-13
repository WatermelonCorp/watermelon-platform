import { category } from './config';
import Popover1 from './variant-1';
import Popover2 from './variant-2';
import Popover3 from './variant-3';
import Popover4 from './variant-4';
import Popover5 from './variant-5';
import Popover6 from './variant-6';
import Popover7 from './variant-7';
import Popover8 from './variant-8';
import Popover9 from './variant-9';
import Popover10 from './variant-10';
import Popover11 from './variant-11';
import Popover12 from './variant-12';

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

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'popover-01',
    title: 'Popover 1',
    component: Popover1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-1.json',
    code: code1,
  },
  {
    id: 'popover-02',
    title: 'Popover 2',
    component: Popover2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-2.json',
    code: code2,
  },
  {
    id: 'popover-03',
    title: 'Popover 3',
    component: Popover3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-3.json',
    code: code3,
  },
  {
    id: 'popover-04',
    title: 'Popover 4',
    component: Popover4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-4.json',
    code: code4,
  },
  {
    id: 'popover-05',
    title: 'Popover 5',
    component: Popover5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-5.json',
    code: code5,
  },
  {
    id: 'popover-06',
    title: 'Popover 6',
    component: Popover6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-6.json',
    code: code6,
  },
  {
    id: 'popover-07',
    title: 'Popover 7',
    component: Popover7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-7.json',
    code: code7,
  },
  {
    id: 'popover-08',
    title: 'Popover 8',
    component: Popover8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-8.json',
    code: code8,
  },
  {
    id: 'popover-09',
    title: 'Popover 9',
    component: Popover9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-9.json',
    code: code9,
  },
  {
    id: 'popover-10',
    title: 'Popover 10',
    component: Popover10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-10.json',
    code: code10,
  },
  {
    id: 'popover-11',
    title: 'Popover 11',
    component: Popover11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-11.json',
    code: code11,
  },
  {
    id: 'popover-12',
    title: 'Popover 12',
    component: Popover12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/popover-12.json',
    code: code12,
  },
];

export { category };
