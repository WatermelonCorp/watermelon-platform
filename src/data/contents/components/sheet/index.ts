import { category } from './config.ts';

import Sheet1 from './variant-1';
import Sheet2 from './variant-2';
import Sheet3 from './variant-3';
import Sheet4 from './variant-4';
import Sheet5 from './variant-5';
import Sheet6 from './variant-6';
import Sheet7 from './variant-7';

import code1 from './variant-1.tsx?raw';
import code2 from './variant-2.tsx?raw';
import code3 from './variant-3.tsx?raw';
import code4 from './variant-4.tsx?raw';
import code5 from './variant-5.tsx?raw';
import code6 from './variant-6.tsx?raw';
import code7 from './variant-7.tsx?raw';

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'sheet-01',
    title: 'Sheet 1',
    component: Sheet1,
    cli: 'npx shadcn@latest add sheet',
    code: code1,
  },
  {
    id: 'sheet-02',
    title: 'Sheet 2',
    component: Sheet2,
    cli: 'npx shadcn@latest add sheet',
    code: code2,
  },
  {
    id: 'sheet-03',
    title: 'Sheet 3',
    component: Sheet3,
    cli: 'npx shadcn@latest add sheet',
    code: code3,
  },
  {
    id: 'sheet-04',
    title: 'Sheet 4',
    component: Sheet4,
    cli: 'npx shadcn@latest add sheet',
    code: code4,
  },
  {
    id: 'sheet-05',
    title: 'Sheet 5',
    component: Sheet5,
    cli: 'npx shadcn@latest add sheet',
    code: code5,
  },
  {
    id: 'sheet-06',
    title: 'Sheet 6',
    component: Sheet6,
    cli: 'npx shadcn@latest add sheet',
    code: code6,
  },
  {
    id: 'sheet-07',
    title: 'Sheet 7',
    component: Sheet7,
    cli: 'npx shadcn@latest add sheet',
    code: code7,
  },
];

export { category };
