import { category } from './config.ts';

import DropdownMenu1 from './variant-1';
import DropdownMenu2 from './variant-2';
import DropdownMenu3 from './variant-3';
import DropdownMenu4 from './variant-4';
import DropdownMenu5 from './variant-5';
import DropdownMenu6 from './variant-6';
import DropdownMenu7 from './variant-7';
import DropdownMenu8 from './variant-8';
import DropdownMenu9 from './variant-9';
import DropdownMenu10 from './variant-10';
import DropdownMenu11 from './variant-11';
import DropdownMenu12 from './variant-12';
import DropdownMenu13 from './variant-13';
import DropdownMenu14 from './variant-14';

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

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'dropdown-menu-01',
    title: 'Dropdown Menu 1',
    component: DropdownMenu1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-1.json',
    code: code1,
  },
  {
    id: 'dropdown-menu-02',
    title: 'Dropdown Menu 2',
    component: DropdownMenu2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-2.json',
    code: code2,
  },
  {
    id: 'dropdown-menu-03',
    title: 'Dropdown Menu 3',
    component: DropdownMenu3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-3.json',
    code: code3,
  },
  {
    id: 'dropdown-menu-04',
    title: 'Dropdown Menu 4',
    component: DropdownMenu4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-4.json',
    code: code4,
  },
  {
    id: 'dropdown-menu-05',
    title: 'Dropdown Menu 5',
    component: DropdownMenu5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-5.json',
    code: code5,
  },
  {
    id: 'dropdown-menu-06',
    title: 'Dropdown Menu 6',
    component: DropdownMenu6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-6.json',
    code: code6,
  },
  {
    id: 'dropdown-menu-07',
    title: 'Dropdown Menu 7',
    component: DropdownMenu7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-7.json',
    code: code7,
  },
  {
    id: 'dropdown-menu-08',
    title: 'Dropdown Menu 8',
    component: DropdownMenu8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-8.json',
    code: code8,
  },
  {
    id: 'dropdown-menu-09',
    title: 'Dropdown Menu 9',
    component: DropdownMenu9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-9.json',
    code: code9,
  },
  {
    id: 'dropdown-menu-10',
    title: 'Dropdown Menu 10',
    component: DropdownMenu10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-10.json',
    code: code10,
  },
  {
    id: 'dropdown-menu-11',
    title: 'Dropdown Menu 11',
    component: DropdownMenu11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-11.json',
    code: code11,
  },
  {
    id: 'dropdown-menu-12',
    title: 'Dropdown Menu 12',
    component: DropdownMenu12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-12.json',
    code: code12,
  },
  {
    id: 'dropdown-menu-13',
    title: 'Dropdown Menu 13',
    component: DropdownMenu13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-13.json',
    code: code13,
  },
  {
    id: 'dropdown-menu-14',
    title: 'Dropdown Menu 14',
    component: DropdownMenu14,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/dropdown-menu-14.json',
    code: code14,
  },
];

export { category };
