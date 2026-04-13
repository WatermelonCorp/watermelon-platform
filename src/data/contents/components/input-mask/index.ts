import { category } from './config.ts';

import InputMask1 from './variant-1';
import InputMask2 from './variant-2';
import InputMask3 from './variant-3';
import InputMask4 from './variant-4';
import InputMask5 from './variant-5';
import InputMask6 from './variant-6';

import code1 from './variant-1.tsx?raw';
import code2 from './variant-2.tsx?raw';
import code3 from './variant-3.tsx?raw';
import code4 from './variant-4.tsx?raw';
import code5 from './variant-5.tsx?raw';
import code6 from './variant-6.tsx?raw';

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'input-mask-01',
    title: 'Input Mask 1',
    component: InputMask1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-mask-1.json',
    code: code1,
  },
  {
    id: 'input-mask-02',
    title: 'Input Mask 2',
    component: InputMask2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-mask-2.json',
    code: code2,
  },
  {
    id: 'input-mask-03',
    title: 'Input Mask 3',
    component: InputMask3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-mask-3.json',
    code: code3,
  },
  {
    id: 'input-mask-04',
    title: 'Input Mask 4',
    component: InputMask4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-mask-4.json',
    code: code4,
  },
  {
    id: 'input-mask-05',
    title: 'Input Mask 5',
    component: InputMask5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-mask-5.json',
    code: code5,
  },
  {
    id: 'input-mask-06',
    title: 'Input Mask 6',
    component: InputMask6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-mask-6.json',
    code: code6,
  },
];

export { category };
