import { category } from "./config";
import DataTable1 from "./variant-1";
import DataTable2 from "./variant-2";
import DataTable3 from "./variant-3";
import DataTable4 from "./variant-4";
import DataTable5 from "./variant-5";
import DataTable6 from "./variant-6";
import DataTable7 from "./variant-7";
import DataTable8 from "./variant-8";
import DataTable9 from "./variant-9";
import DataTable10 from "./variant-10";
import DataTable11 from "./variant-11";
import DataTable12 from "./variant-12";
import DataTable13 from "./variant-13";
import code1 from "./variant-1.tsx?raw";
import code2 from "./variant-2.tsx?raw";
import code3 from "./variant-3.tsx?raw";
import code4 from "./variant-4.tsx?raw";
import code5 from "./variant-5.tsx?raw";
import code6 from "./variant-6.tsx?raw";
import code7 from "./variant-7.tsx?raw";
import code8 from "./variant-8.tsx?raw";
import code9 from "./variant-9.tsx?raw";
import code10 from "./variant-10.tsx?raw";
import code11 from "./variant-11.tsx?raw";
import code12 from "./variant-12.tsx?raw";
import code13 from "./variant-13.tsx?raw";
import type { UiVariant } from "@/data/components-registry";

export const variants: UiVariant[] = [
  {
    id: "data-table-01",
    title: "DataTable 1",
    description: "Invoice table with row checkboxes, a select all header checkbox and right-aligned currency amounts.",
    component: DataTable1,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-1.json",
    code: code1,
  },
  {
    id: "data-table-02",
    title: "DataTable 2",
    description: "Invoice table with a density select that switches rows between compact, standard and flexible spacing.",
    component: DataTable2,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-2.json",
    code: code2,
  },
  {
    id: "data-table-03",
    title: "DataTable 3",
    description: "Invoice table with a Columns dropdown to show or hide each column, searchable and resettable.",
    component: DataTable3,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-3.json",
    code: code3,
  },
  {
    id: "data-table-04",
    title: "DataTable 4",
    description: "Product table with a filter bar for name search, price and rating ranges and availability, plus thumbnails.",
    component: DataTable4,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-4.json",
    code: code4,
  },
  {
    id: "data-table-05",
    title: "DataTable 5",
    description: "Selectable client invoice table whose column visibility menu has a search box and a Reset option.",
    component: DataTable5,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-5.json",
    code: code5,
  },
  {
    id: "data-table-06",
    title: "DataTable 6",
    description: "Invoice table with drag-to-resize column edges that snap back to default width on double click.",
    component: DataTable6,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-6.json",
    code: code6,
  },
  {
    id: "data-table-07",
    title: "DataTable 7",
    description: "Product inventory table where any column can be pinned to the left or right edge from a header menu.",
    component: DataTable7,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-7.json",
    code: code7,
  },
  {
    id: "data-table-08",
    title: "DataTable 8",
    description: "Employee table with drag and drop column reordering and click-to-sort headers.",
    component: DataTable8,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-8.json",
    code: code8,
  },
  {
    id: "data-table-09",
    title: "DataTable 9",
    description: "Team table with expandable rows that open a nested table of each team's members.",
    component: DataTable9,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-9.json",
    code: code9,
  },
  {
    id: "data-table-10",
    title: "DataTable 10",
    description: "Sortable product table with a rows per page select, a range counter and first, previous, next and last buttons.",
    component: DataTable10,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-10.json",
    code: code10,
  },
  {
    id: "data-table-11",
    title: "DataTable 11",
    description: "Sortable product table with numbered page buttons, ellipses and a Page X of Y label.",
    component: DataTable11,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-11.json",
    code: code11,
  },
  {
    id: "data-table-12",
    title: "DataTable 12",
    description: "Payments table with search across all columns and export of selected or filtered rows to CSV, Excel or JSON.",
    component: DataTable12,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-12.json",
    code: code12,
  },
  {
    id: "data-table-13",
    title: "DataTable 13",
    description: "Editable table with inline text inputs, a status select and progress fields, plus a Refresh Data reset.",
    component: DataTable13,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/data-table-13.json",
    code: code13,
  }
];

export { category };
