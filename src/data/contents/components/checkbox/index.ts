import { category } from "./config";
import Checkbox1 from "./variant-1";
import Checkbox2 from "./variant-2";
import Checkbox3 from "./variant-3";
import Checkbox4 from "./variant-4";
import Checkbox5 from "./variant-5";
import Checkbox6 from "./variant-6";
import Checkbox7 from "./variant-7";
import Checkbox8 from "./variant-8";
import Checkbox9 from "./variant-9";
import Checkbox10 from "./variant-10";
import Checkbox11 from "./variant-11";
import Checkbox12 from "./variant-12";
import Checkbox13 from "./variant-13";
import Checkbox14 from "./variant-14";
import Checkbox15 from "./variant-15";
import Checkbox16 from "./variant-16";
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
    id: "checkbox-01",
    title: "Checkbox 1",
    description: "Basic checkbox with a sky blue checked state and a clickable label beside it.",
    component: Checkbox1,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-1.json",
    code: code1,
  },
  {
    id: "checkbox-02",
    title: "Checkbox 2",
    description: "Checkbox that starts in an indeterminate state with a minus sign, plus a label and helper text.",
    component: Checkbox2,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-2.json",
    code: code2,
  },
  {
    id: "checkbox-03",
    title: "Checkbox 3",
    description: "Checkbox with a dashed border that fills sky blue when checked.",
    component: Checkbox3,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-3.json",
    code: code3,
  },
  {
    id: "checkbox-04",
    title: "Checkbox 4",
    description: "To-do style checkbox that strikes through and greys out its label when checked.",
    component: Checkbox4,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-4.json",
    code: code4,
  },
  {
    id: "checkbox-05",
    title: "Checkbox 5",
    description: "Three checkboxes side by side in default, medium and large sizes.",
    component: Checkbox5,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-5.json",
    code: code5,
  },
  {
    id: "checkbox-06",
    title: "Checkbox 6",
    description: "Selectable chip checkboxes for snack options, where the tick only appears inside selected chips.",
    component: Checkbox6,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-6.json",
    code: code6,
  },
  {
    id: "checkbox-07",
    title: "Checkbox 7",
    description: "Checkbox with a bold label and a smaller terms description underneath it.",
    component: Checkbox7,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-7.json",
    code: code7,
  },
  {
    id: "checkbox-08",
    title: "Checkbox 8",
    description: "Horizontal group of checkboxes under a Team roles heading for picking several options.",
    component: Checkbox8,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-8.json",
    code: code8,
  },
  {
    id: "checkbox-09",
    title: "Checkbox 9",
    description: "Vertical checkbox list of focus areas with an icon next to each option label.",
    component: Checkbox9,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-9.json",
    code: code9,
  },
  {
    id: "checkbox-10",
    title: "Checkbox 10",
    description: "Three slightly larger checkboxes in red, sky blue and green for destructive, info and success.",
    component: Checkbox10,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-10.json",
    code: code10,
  },
  {
    id: "checkbox-11",
    title: "Checkbox 11",
    description: "Icon checkboxes using triangle, diamond and hexagon shapes that fill with colour when checked.",
    component: Checkbox11,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-11.json",
    code: code11,
  },
  {
    id: "checkbox-12",
    title: "Checkbox 12",
    description: "Round coloured checkboxes in red, blue and green that show a white circle check when ticked.",
    component: Checkbox12,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-12.json",
    code: code12,
  },
  {
    id: "checkbox-13",
    title: "Checkbox 13",
    description: "Settings option cards with a checkbox, label and description that tint blue when selected.",
    component: Checkbox13,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-13.json",
    code: code13,
  },
  {
    id: "checkbox-14",
    title: "Checkbox 14",
    description: "Bordered list of skills with an icon and label on the left and a checkbox on the right.",
    component: Checkbox14,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-14.json",
    code: code14,
  },
  {
    id: "checkbox-15",
    title: "Checkbox 15",
    description: "Parent and child checkbox tree where Select all shows an indeterminate state for partial picks.",
    component: Checkbox15,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-15.json",
    code: code15,
  },
  {
    id: "checkbox-16",
    title: "Checkbox 16",
    description: "Consent checkbox with a description and Reset and Continue buttons, Continue disabled until checked.",
    component: Checkbox16,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/checkbox-16.json",
    code: code16,
  }
];

export { category };
