import { category } from './config.ts';

import RadioGroup1 from './variant-1';
import RadioGroup2 from './variant-2';
import RadioGroup3 from './variant-3';
import RadioGroup4 from './variant-4';
import RadioGroup5 from './variant-5';
import RadioGroup6 from './variant-6';
import RadioGroup7 from './variant-7';
import RadioGroup8 from './variant-8';
import RadioGroup9 from './variant-9';
import RadioGroup10 from './variant-10';
import RadioGroup11 from './variant-11';
import RadioGroup12 from './variant-12';
import RadioGroup13 from './variant-13';

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

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'radio-group-01',
    title: 'Radio Group 1',
    component: RadioGroup1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-1.json',
    code: code1,
  },
  {
    id: 'radio-group-02',
    title: 'Radio Group 2',
    component: RadioGroup2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-2.json',
    code: code2,
  },
  {
    id: 'radio-group-03',
    title: 'Radio Group 3',
    component: RadioGroup3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-3.json',
    code: code3,
  },
  {
    id: 'radio-group-04',
    title: 'Radio Group 4',
    component: RadioGroup4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-4.json',
    code: code4,
  },
  {
    id: 'radio-group-05',
    title: 'Radio Group 5',
    component: RadioGroup5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-5.json',
    code: code5,
  },
  {
    id: 'radio-group-06',
    title: 'Radio Group 6',
    component: RadioGroup6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-6.json',
    code: code6,
  },
  {
    id: 'radio-group-07',
    title: 'Radio Group 7',
    component: RadioGroup7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-7.json',
    code: code7,
  },
  {
    id: 'radio-group-08',
    title: 'Radio Group 8',
    component: RadioGroup8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-8.json',
    code: code8,
  },
  {
    id: 'radio-group-09',
    title: 'Radio Group 9',
    component: RadioGroup9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-9.json',
    code: code9,
  },
  {
    id: 'radio-group-10',
    title: 'Radio Group 10',
    component: RadioGroup10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-10.json',
    code: code10,
  },
  {
    id: 'radio-group-11',
    title: 'Radio Group 11',
    component: RadioGroup11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-11.json',
    code: code11,
  },
  {
    id: 'radio-group-12',
    title: 'Radio Group 12',
    component: RadioGroup12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-12.json',
    code: code12,
  },
  {
    id: 'radio-group-13',
    title: 'Radio Group 13',
    component: RadioGroup13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/radio-group-13.json',
    code: code13,
  },
];

export { category };
