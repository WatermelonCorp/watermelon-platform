import { category } from "./config";
import Accordion1 from "./variant-1";
import Accordion2 from "./variant-2";
import Accordion3 from "./variant-3";
import Accordion4 from "./variant-4";
import Accordion5 from "./variant-5";
import Accordion6 from "./variant-6";
import Accordion7 from "./variant-7";
import Accordion8 from "./variant-8";
import Accordion9 from "./variant-9";
import Accordion10 from "./variant-10";
import Accordion11 from "./variant-11";
import Accordion12 from "./variant-12";
import Accordion13 from "./variant-13";
import Accordion14 from "./variant-14";
import Accordion15 from "./variant-15";
import Accordion16 from "./variant-16";
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
import code14 from "./variant-14.tsx?raw";
import code15 from "./variant-15.tsx?raw";
import code16 from "./variant-16.tsx?raw";
import type { UiVariant } from "@/data/components-registry";

export const variants: UiVariant[] = [
  {
    id: "accordion-01",
    title: "Accordion 1",
    description: "FAQ accordion with the chevron moved to the left of each question and indented answers.",
    component: Accordion1,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-1.json",
    code: code1,
  },
  {
    id: "accordion-02",
    title: "Accordion 2",
    description: "Accordion of separate card panels with soft shadows that deepen when a panel is open.",
    component: Accordion2,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-2.json",
    code: code2,
  },
  {
    id: "accordion-03",
    title: "Accordion 3",
    description: "Payments FAQ accordion with a muted icon before each question, such as wallet and shield.",
    component: Accordion3,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-3.json",
    code: code3,
  },
  {
    id: "accordion-04",
    title: "Accordion 4",
    description: "Card-style accordion panels using a plus icon that switches to a minus when expanded.",
    component: Accordion4,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-4.json",
    code: code4,
  },
  {
    id: "accordion-05",
    title: "Accordion 5",
    description: "Accordion that turns the open item's title, chevron and bottom border blue.",
    component: Accordion5,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-5.json",
    code: code5,
  },
  {
    id: "accordion-06",
    title: "Accordion 6",
    description: "Healthcare FAQ accordion with a leading plus or minus toggle followed by a topic icon.",
    component: Accordion6,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-6.json",
    code: code6,
  },
  {
    id: "accordion-07",
    title: "Accordion 7",
    description: "Team accordion where each row shows an avatar, name and role, revealing a note when opened.",
    component: Accordion7,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-7.json",
    code: code7,
  },
  {
    id: "accordion-08",
    title: "Accordion 8",
    description: "Accordion with a boxed icon, title and subtitle per row and a plus that rotates into an X.",
    component: Accordion8,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-8.json",
    code: code8,
  },
  {
    id: "accordion-09",
    title: "Accordion 9",
    description: "Bordered card accordion with a right-pointing chevron on the left that turns down when open.",
    component: Accordion9,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-9.json",
    code: code9,
  },
  {
    id: "accordion-10",
    title: "Accordion 10",
    description: "Single bordered accordion box with plus and minus toggles and a blue title for open items.",
    component: Accordion10,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-10.json",
    code: code10,
  },
  {
    id: "accordion-11",
    title: "Accordion 11",
    description: "Accordion of bordered panels that get a light grey fill and up chevron when expanded.",
    component: Accordion11,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-11.json",
    code: code11,
  },
  {
    id: "accordion-12",
    title: "Accordion 12",
    description: "Borderless accordion panels that gain a border and shadow only while they are open.",
    component: Accordion12,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-12.json",
    code: code12,
  },
  {
    id: "accordion-13",
    title: "Accordion 13",
    description: "Accordion with round icon badges where each opened item reveals text and a cover image.",
    component: Accordion13,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-13.json",
    code: code13,
  },
  {
    id: "accordion-14",
    title: "Accordion 14",
    description: "Accordion panels with a circular outlined button that switches from plus to X when open.",
    component: Accordion14,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-14.json",
    code: code14,
  },
  {
    id: "accordion-15",
    title: "Accordion 15",
    description: "Two-level FAQ accordion with icon categories, each holding its own collapsible questions.",
    component: Accordion15,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-15.json",
    code: code15,
  },
  {
    id: "accordion-16",
    title: "Accordion 16",
    description: "Nested FAQ accordion of plain categories with inner questions that highlight grey when open.",
    component: Accordion16,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/accordion-16.json",
    code: code16,
  }
];

export { category };
