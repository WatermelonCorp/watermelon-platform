import { category } from "./config";
import Breadcrumb1 from "./variant-1";
import Breadcrumb2 from "./variant-2";
import Breadcrumb3 from "./variant-3";
import Breadcrumb4 from "./variant-4";
import Breadcrumb5 from "./variant-5";
import Breadcrumb6 from "./variant-6";
import Breadcrumb7 from "./variant-7";
import Breadcrumb8 from "./variant-8";
import code1 from "./variant-1.tsx?raw";
import code2 from "./variant-2.tsx?raw";
import code3 from "./variant-3.tsx?raw";
import code4 from "./variant-4.tsx?raw";
import code5 from "./variant-5.tsx?raw";
import code6 from "./variant-6.tsx?raw";
import code7 from "./variant-7.tsx?raw";
import code8 from "./variant-8.tsx?raw";
import type { UiVariant } from "@/data/components-registry";

export const variants: UiVariant[] = [
  {
    id: "breadcrumb-01",
    title: "Breadcrumb 1",
    component: Breadcrumb1,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/breadcrumb-1.json",
    code: code1,
  },
  {
    id: "breadcrumb-02",
    title: "Breadcrumb 2",
    component: Breadcrumb2,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/breadcrumb-2.json",
    code: code2,
  },
  {
    id: "breadcrumb-03",
    title: "Breadcrumb 3",
    component: Breadcrumb3,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/breadcrumb-3.json",
    code: code3,
  },
  {
    id: "breadcrumb-04",
    title: "Breadcrumb 4",
    component: Breadcrumb4,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/breadcrumb-4.json",
    code: code4,
  },
  {
    id: "breadcrumb-05",
    title: "Breadcrumb 5",
    component: Breadcrumb5,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/breadcrumb-5.json",
    code: code5,
  },
  {
    id: "breadcrumb-06",
    title: "Breadcrumb 6",
    component: Breadcrumb6,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/breadcrumb-6.json",
    code: code6,
  },
  {
    id: "breadcrumb-07",
    title: "Breadcrumb 7",
    component: Breadcrumb7,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/breadcrumb-7.json",
    code: code7,
  },
  {
    id: "breadcrumb-08",
    title: "Breadcrumb 8",
    component: Breadcrumb8,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/breadcrumb-8.json",
    code: code8,
  }
];

export { category };
