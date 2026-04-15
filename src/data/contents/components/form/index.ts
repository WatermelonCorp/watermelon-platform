import { category } from './config.ts';

import Form1 from './variant-1';
import Form2 from './variant-2';
import Form3 from './variant-3';
import Form4 from './variant-4';
import Form5 from './variant-5';
import Form6 from './variant-6';
import Form7 from './variant-7';
import Form8 from './variant-8';
import Form9 from './variant-9';
import Form10 from './variant-10';

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

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'form-01',
    title: 'Form 1',
    component: Form1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-1.json',
    code: code1,
  },
  {
    id: 'form-02',
    title: 'Form 2',
    component: Form2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-2.json',
    code: code2,
  },
  {
    id: 'form-03',
    title: 'Form 3',
    component: Form3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-3.json',
    code: code3,
  },
  {
    id: 'form-04',
    title: 'Form 4',
    component: Form4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-4.json',
    code: code4,
  },
  {
    id: 'form-05',
    title: 'Form 5',
    component: Form5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-5.json',
    code: code5,
  },
  {
    id: 'form-06',
    title: 'Form 6',
    component: Form6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-6.json',
    code: code6,
  },
  {
    id: 'form-07',
    title: 'Form 7',
    component: Form7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-7.json',
    code: code7,
  },
  {
    id: 'form-08',
    title: 'Form 8',
    component: Form8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-8.json',
    code: code8,
  },
  {
    id: 'form-09',
    title: 'Form 9',
    component: Form9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-9.json',
    code: code9,
  },
  {
    id: 'form-10',
    title: 'Form 10',
    component: Form10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-10.json',
    code: code10,
  },
];

export { category };
