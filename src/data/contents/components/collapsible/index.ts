import { category } from "./config";
import Collapsible1 from "./variant-1";
import Collapsible2 from "./variant-2";
import Collapsible3 from "./variant-3";
import Collapsible4 from "./variant-4";
import Collapsible5 from "./variant-5";
import Collapsible6 from "./variant-6";
import Collapsible7 from "./variant-7";
import Collapsible8 from "./variant-8";
import Collapsible9 from "./variant-9";
import code1 from "./variant-1.tsx?raw";
import code2 from "./variant-2.tsx?raw";
import code3 from "./variant-3.tsx?raw";
import code4 from "./variant-4.tsx?raw";
import code5 from "./variant-5.tsx?raw";
import code6 from "./variant-6.tsx?raw";
import code7 from "./variant-7.tsx?raw";
import code8 from "./variant-8.tsx?raw";
import code9 from "./variant-9.tsx?raw";
import type { UiVariant } from "@/data/components-registry";

export const variants: UiVariant[] = [
  {
    id: "collapsible-01",
    title: "Collapsible 1",
    component: Collapsible1,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/collapsible-1.json",
    code: code1,
  },
  {
    id: "collapsible-02",
    title: "Collapsible 2",
    component: Collapsible2,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/collapsible-2.json",
    code: code2,
  },
  {
    id: "collapsible-03",
    title: "Collapsible 3",
    component: Collapsible3,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/collapsible-3.json",
    code: code3,
  },
  {
    id: "collapsible-04",
    title: "Collapsible 4",
    component: Collapsible4,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/collapsible-4.json",
    code: code4,
  },
  {
    id: "collapsible-05",
    title: "Collapsible 5",
    component: Collapsible5,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/collapsible-5.json",
    code: code5,
  },
  {
    id: "collapsible-06",
    title: "Collapsible 6",
    component: Collapsible6,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/collapsible-6.json",
    code: code6,
  },
  {
    id: "collapsible-07",
    title: "Collapsible 7",
    component: Collapsible7,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/collapsible-7.json",
    code: code7,
  },
  {
    id: "collapsible-08",
    title: "Collapsible 8",
    component: Collapsible8,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/collapsible-8.json",
    code: code8,
  },
  {
    id: "collapsible-09",
    title: "Collapsible 9",
    component: Collapsible9,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/collapsible-9.json",
    code: code9,
  },
];

export { category };
