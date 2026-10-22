import { category } from "./config";
import Combobox1 from "./variant-1";
import Combobox2 from "./variant-2";
import Combobox3 from "./variant-3";
import Combobox4 from "./variant-4";
import Combobox5 from "./variant-5";
import Combobox6 from "./variant-6";
import Combobox7 from "./variant-7";
import Combobox8 from "./variant-8";
import Combobox9 from "./variant-9";
import Combobox10 from "./variant-10";
import Combobox11 from "./variant-11";
import Combobox12 from "./variant-12";
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
    id: "combobox-01",
    title: "Combobox 1",
    description: "Searchable team picker with no field label, where selecting the current option again clears it.",
    component: Combobox1,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-1.json",
    code: code1,
  },
  {
    id: "combobox-02",
    title: "Combobox 2",
    description: "Searchable combobox with options grouped under Product, Design and Operations headings.",
    component: Combobox2,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-2.json",
    code: code2,
  },
  {
    id: "combobox-03",
    title: "Combobox 3",
    description: "Grouped combobox for workspace sections where some options are greyed out and cannot be selected.",
    component: Combobox3,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-3.json",
    code: code3,
  },
  {
    id: "combobox-04",
    title: "Combobox 4",
    description: "Pill-shaped combobox with an icon beside each team area, also shown in the trigger once picked.",
    component: Combobox4,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-4.json",
    code: code4,
  },
  {
    id: "combobox-05",
    title: "Combobox 5",
    description: "Labelled workflow stage combobox with search, a no results message and click again to deselect.",
    component: Combobox5,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-5.json",
    code: code5,
  },
  {
    id: "combobox-06",
    title: "Combobox 6",
    description: "Workspace picker with a preselected value and a New workspace button at the bottom of the list.",
    component: Combobox6,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-6.json",
    code: code6,
  },
  {
    id: "combobox-07",
    title: "Combobox 7",
    description: "Timezone combobox built from the browser's timezone list, sorted and labelled by GMT offset.",
    component: Combobox7,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-7.json",
    code: code7,
  },
  {
    id: "combobox-08",
    title: "Combobox 8",
    description: "Assignee picker showing avatars with status dots, names and emails in a searchable list.",
    component: Combobox8,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-8.json",
    code: code8,
  },
  {
    id: "combobox-09",
    title: "Combobox 9",
    description: "Country picker with flag images in the list and next to the selected country.",
    component: Combobox9,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-9.json",
    code: code9,
  },
  {
    id: "combobox-10",
    title: "Combobox 10",
    description: "Multi-select combobox that shows chosen tags as removable badges inside the trigger.",
    component: Combobox10,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-10.json",
    code: code10,
  },
  {
    id: "combobox-11",
    title: "Combobox 11",
    description: "Multi-select tag combobox that shows two badges and a +N more toggle to expand the rest.",
    component: Combobox11,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-11.json",
    code: code11,
  },
  {
    id: "combobox-12",
    title: "Combobox 12",
    description: "Multi-select combobox whose trigger shows a count of selected tags instead of badges.",
    component: Combobox12,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/combobox-12.json",
    code: code12,
  }
];

export { category };
