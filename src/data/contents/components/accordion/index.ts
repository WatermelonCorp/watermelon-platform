import { category } from "./config";
import AccordionVariant1 from "./variant-1";
import AccordionVariant2 from "./variant-2";
import AccordionVariant3 from "./variant-3";
import AccordionVariant4 from "./variant-4";
import code1 from "./variant-1.tsx?raw";
import code2 from "./variant-2.tsx?raw";
import code3 from "./variant-3.tsx?raw";
import code4 from "./variant-4.tsx?raw";
import type { UiVariant } from "@/data/components-registry";

export const variants: UiVariant[] = [
  {
    id: "accordion-01",
    title: "Accordion 1",
    component: AccordionVariant1,
    cli: "npx shadcn@latest add accordion",
    code: code1,
  },
  {
    id: "accordion-02",
    title: "Accordion 2",
    component: AccordionVariant2,
    cli: "npx shadcn@latest add accordion",
    code: code2,
  },
  {
    id: "accordion-03",
    title: "Accordion 3",
    component: AccordionVariant3,
    cli: "npx shadcn@latest add accordion",
    code: code3,
  },
  {
    id: "accordion-04",
    title: "Accordion 4",
    component: AccordionVariant4,
    cli: "npx shadcn@latest add accordion",
    code: code4,
  }
];

export { category };
