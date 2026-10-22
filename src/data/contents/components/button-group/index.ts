import { category } from "./config";
import ButtonGroup1 from "./variant-1";
import ButtonGroup2 from "./variant-2";
import ButtonGroup3 from "./variant-3";
import ButtonGroup4 from "./variant-4";
import ButtonGroup5 from "./variant-5";
import ButtonGroup6 from "./variant-6";
import ButtonGroup7 from "./variant-7";
import ButtonGroup8 from "./variant-8";
import ButtonGroup9 from "./variant-9";
import ButtonGroup10 from "./variant-10";
import ButtonGroup11 from "./variant-11";
import ButtonGroup12 from "./variant-12";
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
import type { UiVariant } from "@/data/components-registry";

export const variants: UiVariant[] = [
  {
    id: "button-group-01",
    title: "ButtonGroup 1",
    description: "Upload button joined to a static count segment that reads 24 files.",
    component: ButtonGroup1,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-1.json",
    code: code1,
  },
  {
    id: "button-group-02",
    title: "ButtonGroup 2",
    description: "Save button with a counter segment, where clicking fills the bookmark icon and updates the count.",
    component: ButtonGroup2,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-2.json",
    code: code2,
  },
  {
    id: "button-group-03",
    title: "ButtonGroup 3",
    description: "Toolbar of five outline icon buttons for layers, comment, style, trim and enhance, each with a tooltip.",
    component: ButtonGroup3,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-3.json",
    code: code3,
  },
  {
    id: "button-group-04",
    title: "ButtonGroup 4",
    description: "Pill-shaped filled media control group with restart, play, pause and next icon buttons and tooltips.",
    component: ButtonGroup4,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-4.json",
    code: code4,
  },
  {
    id: "button-group-05",
    title: "ButtonGroup 5",
    description: "Round-ended row of colour-coded icon links that tint their background in a matching colour on hover.",
    component: ButtonGroup5,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-5.json",
    code: code5,
  },
  {
    id: "button-group-06",
    title: "ButtonGroup 6",
    description: "Quantity stepper with minus and plus buttons around a count limited from 0 to 5.",
    component: ButtonGroup6,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-6.json",
    code: code6,
  },
  {
    id: "button-group-07",
    title: "ButtonGroup 7",
    description: "Filled width stepper that adjusts a pixel value in steps of 8 between 120 and 320.",
    component: ButtonGroup7,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-7.json",
    code: code7,
  },
  {
    id: "button-group-08",
    title: "ButtonGroup 8",
    description: "Open preview link button joined to an icon button that opens the preview in a new tab.",
    component: ButtonGroup8,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-8.json",
    code: code8,
  },
  {
    id: "button-group-09",
    title: "ButtonGroup 9",
    description: "Pill-shaped group of outline buttons with icons and labels for customize, clone and archive.",
    component: ButtonGroup9,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-9.json",
    code: code9,
  },
  {
    id: "button-group-10",
    title: "ButtonGroup 10",
    description: "Dark rounded pair of icon buttons for rotating left and right.",
    component: ButtonGroup10,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-10.json",
    code: code10,
  },
  {
    id: "button-group-11",
    title: "ButtonGroup 11",
    description: "Split button whose chevron opens a menu to choose the send action, each with a description.",
    component: ButtonGroup11,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-11.json",
    code: code11,
  },
  {
    id: "button-group-12",
    title: "ButtonGroup 12",
    description: "Compact segmented bar of ghost buttons with small icons and labels inside a ringed tray.",
    component: ButtonGroup12,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/button-group-12.json",
    code: code12,
  }
];

export { category };
