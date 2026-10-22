import { category } from "./config";
import DatePicker1 from "./variant-1";
import DatePicker2 from "./variant-2";
import DatePicker3 from "./variant-3";
import DatePicker4 from "./variant-4";
import DatePicker5 from "./variant-5";
import DatePicker6 from "./variant-6";
import DatePicker7 from "./variant-7";
import DatePicker8 from "./variant-8";
import DatePicker9 from "./variant-9";
import DatePicker10 from "./variant-10";
import DatePicker11 from "./variant-11";
import DatePicker12 from "./variant-12";
import DatePicker13 from "./variant-13";
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
    id: "date-picker-01",
    title: "DatePicker 1",
    description: "Single date picker with a rounded trigger and a popover calendar that closes once a day is picked.",
    component: DatePicker1,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-1.json",
    code: code1,
  },
  {
    id: "date-picker-02",
    title: "DatePicker 2",
    description: "Date range picker that shows the start and end dates in the trigger and highlights the days between.",
    component: DatePicker2,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-2.json",
    code: code2,
  },
  {
    id: "date-picker-03",
    title: "DatePicker 3",
    description: "Single date picker with a calendar icon shown inside the trigger next to the chosen date.",
    component: DatePicker3,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-3.json",
    code: code3,
  },
  {
    id: "date-picker-04",
    title: "DatePicker 4",
    description: "Typed date input with a calendar button, where pressing the down arrow key also opens the calendar.",
    component: DatePicker4,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-4.json",
    code: code4,
  },
  {
    id: "date-picker-05",
    title: "DatePicker 5",
    description: "Natural language date input that understands phrases like In 2 days and shows the scheduled date below.",
    component: DatePicker5,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-5.json",
    code: code5,
  },
  {
    id: "date-picker-06",
    title: "DatePicker 6",
    description: "Range picker preset to a five-day span, shown in the trigger as a short formatted date range.",
    component: DatePicker6,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-6.json",
    code: code6,
  },
  {
    id: "date-picker-07",
    title: "DatePicker 7",
    description: "Single date picker whose calendar hides the trailing days from the previous and next months.",
    component: DatePicker7,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-7.json",
    code: code7,
  },
  {
    id: "date-picker-08",
    title: "DatePicker 8",
    description: "Time input with hours, minutes and seconds in a rounded field.",
    component: DatePicker8,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-8.json",
    code: code8,
  },
  {
    id: "date-picker-09",
    title: "DatePicker 9",
    description: "Time input with a clock icon placed at the start of the field.",
    component: DatePicker9,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-9.json",
    code: code9,
  },
  {
    id: "date-picker-10",
    title: "DatePicker 10",
    description: "Date picker button and a separate time input placed side by side.",
    component: DatePicker10,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-10.json",
    code: code10,
  },
  {
    id: "date-picker-11",
    title: "DatePicker 11",
    description: "Date picker above a pair of From and To time inputs for choosing a time window.",
    component: DatePicker11,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-11.json",
    code: code11,
  },
  {
    id: "date-picker-12",
    title: "DatePicker 12",
    description: "Start and end date pickers, each with a time input, where end dates before the start are disabled.",
    component: DatePicker12,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-12.json",
    code: code12,
  },
  {
    id: "date-picker-13",
    title: "DatePicker 13",
    description: "Sales bar chart card with a date range picker that filters the January daily data shown.",
    component: DatePicker13,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/date-picker-13.json",
    code: code13,
    colSpan: 2,
  }
];

export { category };
