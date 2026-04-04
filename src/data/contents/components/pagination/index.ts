import { category } from './config';
import Pagination1 from './variant-1';
import Pagination2 from './variant-2';
import Pagination3 from './variant-3';
import Pagination4 from './variant-4';
import Pagination5 from './variant-5';
import Pagination6 from './variant-6';
import Pagination7 from './variant-7';
import Pagination8 from './variant-8';
import Pagination9 from './variant-9';
import Pagination10 from './variant-10';
import Pagination11 from './variant-11';
import Pagination12 from './variant-12';
import Pagination13 from './variant-13';
import Pagination14 from './variant-14';
import Pagination15 from './variant-15';

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
    id: 'pagination-01',
    title: 'Pagination 1',
    component: Pagination1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-1.json',
    code: code1,
  },
  {
    id: 'pagination-02',
    title: 'Pagination 2',
    component: Pagination2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-2.json',
    code: code2,
  },
  {
    id: 'pagination-03',
    title: 'Pagination 3',
    component: Pagination3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-3.json',
    code: code3,
  },
  {
    id: 'pagination-04',
    title: 'Pagination 4',
    component: Pagination4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-4.json',
    code: code4,
  },
  {
    id: 'pagination-05',
    title: 'Pagination 5',
    component: Pagination5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-5.json',
    code: code5,
  },
  {
    id: 'pagination-06',
    title: 'Pagination 6',
    component: Pagination6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-6.json',
    code: code6,
  },
  {
    id: 'pagination-07',
    title: 'Pagination 7',
    component: Pagination7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-7.json',
    code: code7,
  },
  {
    id: 'pagination-08',
    title: 'Pagination 8',
    component: Pagination8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-8.json',
    code: code8,
  },
  {
    id: 'pagination-09',
    title: 'Pagination 9',
    component: Pagination9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-9.json',
    code: code9,
  },
  {
    id: 'pagination-10',
    title: 'Pagination 10',
    component: Pagination10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-10.json',
    code: code10,
  },
  {
    id: 'pagination-11',
    title: 'Pagination 11',
    component: Pagination11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-11.json',
    code: code11,
  },
  {
    id: 'pagination-12',
    title: 'Pagination 12',
    component: Pagination12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-12.json',
    code: code12,
  },
  {
    id: 'pagination-13',
    title: 'Pagination 13',
    component: Pagination13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-13.json',
    code: code13,
  },
  {
    id: 'pagination-14',
    title: 'Pagination 14',
    component: Pagination14,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-14.json',
    code: code14,
  },
  {
    id: 'pagination-15',
    title: 'Pagination 15',
    component: Pagination15,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-15.json',
    code: code15,
    colSpan: 2,
  },
];

export { category };
