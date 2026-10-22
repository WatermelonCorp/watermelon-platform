import { category } from './config.ts';

import Table1 from './variant-1'
import Table2 from './variant-2';
import Table3 from './variant-3';
import Table4 from './variant-4';
import Table5 from './variant-5';
import Table6 from './variant-6';
import Table7 from './variant-7';
import Table8 from './variant-8';
import Table9 from './variant-9';
import Table10 from './variant-10';
import Table11 from './variant-11';
import Table12 from './variant-12';
import Table13 from './variant-13';
import Table14 from './variant-14';
import Table15 from './variant-15';
import Table16 from './variant-16';

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

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'table-01',
    title: 'Table 1',
    description: "Recent orders table with a cart icon per order, coloured status icons and a revenue total footer.",
    component: Table1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-1.json',
    code: code1,
    colSpan: 2,
  },
  {
    id: 'table-02',
    title: 'Table 2',
    description: "User subscription table with vertical cell borders, a shaded header and icon-led status column.",
    component: Table2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-2.json',
    code: code2,
    colSpan: 2,
  },
  {
    id: 'table-03',
    title: 'Table 3',
    description: "Product inventory table with zebra-striped alternating rows and a total value footer.",
    component: Table3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-3.json',
    code: code3,
    colSpan: 2,
  },
  {
    id: 'table-04',
    title: 'Table 4',
    description: "Project tracking table with striped rows and colour-coded status badges for each project.",
    component: Table4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-4.json',
    code: code4,
    colSpan: 2,
  },
  {
    id: 'table-05',
    title: 'Table 5',
    description: "Orders table with an icon next to every column heading, inside a rounded bordered card.",
    component: Table5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-5.json',
    code: code5,
    colSpan: 2,
  },
  {
    id: 'table-06',
    title: 'Table 6',
    description: "Rounded card table with a soft inset shadow on the shaded header and footer rows.",
    component: Table6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-6.json',
    code: code6,
    colSpan: 2,
  },
  {
    id: 'table-07',
    title: 'Table 7',
    description: "Transactions table where clicking a row highlights it and clicking again clears the selection.",
    component: Table7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-7.json',
    code: code7,
    colSpan: 2,
  },
  {
    id: 'table-08',
    title: 'Table 8',
    description: "Product table with striped columns instead of rows, shading every other column.",
    component: Table8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-8.json',
    code: code8,
    colSpan: 2,
  },
  {
    id: 'table-09',
    title: 'Table 9',
    description: "Scrollable transactions table with a fixed-height body and a sticky gradient header row.",
    component: Table9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-9.json',
    code: code9,
    colSpan: 2,
  },
  {
    id: 'table-10',
    title: 'Table 10',
    description: "Scrollable orders table where both the header row and the total footer stay pinned.",
    component: Table10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-10.json',
    code: code10,
    colSpan: 2,
  },
  {
    id: 'table-11',
    title: 'Table 11',
    description: "Two-column key and value table showing product details, with an icon beside each label.",
    component: Table11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-11.json',
    code: code11,
    colSpan: 2,
  },
  {
    id: 'table-12',
    title: 'Table 12',
    description: "Wide employee table that scrolls sideways while the ID and name columns stay fixed on the left.",
    component: Table12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-12.json',
    code: code12,
    colSpan: 2,
  },
  {
    id: 'table-13',
    title: 'Table 13',
    description: "Accounts table with row checkboxes, select-all, rounded status pills and highlighted selected rows.",
    component: Table13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-13.json',
    code: code13,
    colSpan: 2,
  },
  {
    id: 'table-14',
    title: 'Table 14',
    description: "Project management table with row selection, status dot labels and edit and delete icon buttons.",
    component: Table14,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-14.json',
    code: code14,
    colSpan: 2,
  },
  {
    id: 'table-15',
    title: 'Table 15',
    description: "Developer leaderboard table with ranked rows, avatars with online status dots and commit counts.",
    component: Table15,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-15.json',
    code: code15,
    colSpan: 2,
  },
  {
    id: 'table-16',
    title: 'Table 16',
    description: "Hiring pipeline table with colour-coded stage badges, star ratings and pagination below.",
    component: Table16,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/table-16.json',
    code: code16,
    colSpan: 2,
  },
];
export { category };
