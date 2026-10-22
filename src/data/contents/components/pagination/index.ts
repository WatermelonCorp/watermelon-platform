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
    description: "Numbered pagination with Back and Next text links and an enlarged, shadowed active page.",
    component: Pagination1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-1.json',
    code: code1,
  },
  {
    id: 'pagination-02',
    title: 'Pagination 2',
    description: "Pagination with chevron icon arrows on soft grey tiles around borderless rounded page numbers.",
    component: Pagination2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-2.json',
    code: code2,
  },
  {
    id: 'pagination-03',
    title: 'Pagination 3',
    description: "Pagination with a glowing orange active page and Prev and Next links that turn orange on hover.",
    component: Pagination3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-3.json',
    code: code3,
  },
  {
    id: 'pagination-04',
    title: 'Pagination 4',
    description: "Pagination with an emerald tinted active page between green Back and Forward text links.",
    component: Pagination4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-4.json',
    code: code4,
  },
  {
    id: 'pagination-05',
    title: 'Pagination 5',
    description: "Joined pagination bar with dividers between square cells and a solid dark active page.",
    component: Pagination5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-5.json',
    code: code5,
  },
  {
    id: 'pagination-06',
    title: 'Pagination 6',
    description: "Pagination with bordered grey Prev and Next buttons and lightly shadowed rounded page numbers.",
    component: Pagination6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-6.json',
    code: code6,
  },
  {
    id: 'pagination-07',
    title: 'Pagination 7',
    description: "Pagination in a grey tray with first, previous, next and last icon buttons around the pages.",
    component: Pagination7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-7.json',
    code: code7,
  },
  {
    id: 'pagination-08',
    title: 'Pagination 8',
    description: "Pagination with an ellipsis item that shows a Search 10+ more tooltip on hover.",
    component: Pagination8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-8.json',
    code: code8,
  },
  {
    id: 'pagination-09',
    title: 'Pagination 9',
    description: "Minimal pagination where the active page is marked by an indigo underline bar instead of a box.",
    component: Pagination9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-9.json',
    code: code9,
  },
  {
    id: 'pagination-10',
    title: 'Pagination 10',
    description: "Pagination wrapped in a floating translucent card with a blurred backdrop and a deep shadow.",
    component: Pagination10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-10.json',
    code: code10,
  },
  {
    id: 'pagination-11',
    title: 'Pagination 11',
    description: "Previous and Next Step buttons spread across a dashed container with no page numbers, suited to step flows.",
    component: Pagination11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-11.json',
    code: code11,
  },
  {
    id: 'pagination-12',
    title: 'Pagination 12',
    description: "Previous and next buttons at either end with a centred Page 02 / 05 counter pill.",
    component: Pagination12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-12.json',
    code: code12,
  },
  {
    id: 'pagination-13',
    title: 'Pagination 13',
    description: "Compact pill pagination with round arrow buttons on each side of a 2 / 5 page counter.",
    component: Pagination13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-13.json',
    code: code13,
  },
  {
    id: 'pagination-14',
    title: 'Pagination 14',
    description: "Pagination with first and last buttons and a select dropdown to jump straight to any of 10 pages.",
    component: Pagination14,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-14.json',
    code: code14,
  },
  {
    id: 'pagination-15',
    title: 'Pagination 15',
    description: "Table footer pagination with a rows per page select, a Showing 1-10 of 100 label and jump buttons.",
    component: Pagination15,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/pagination-15.json',
    code: code15,
    colSpan: 2,
  },
];

export { category };
