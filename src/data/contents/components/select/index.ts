import { category } from './config.ts';

import Select1 from './variant-1';
import Select2 from './variant-2';
import Select3 from './variant-3';
import Select4 from './variant-4';
import Select5 from './variant-5';
import Select6 from './variant-6';
import Select7 from './variant-7';
import Select8 from './variant-8';
import Select9 from './variant-9';
import Select10 from './variant-10';
import Select11 from './variant-11';
import Select12 from './variant-12';
import Select13 from './variant-13';
import Select14 from './variant-14';
import Select15 from './variant-15';
import Select16 from './variant-16';
import Select17 from './variant-17';
import Select18 from './variant-18';
import Select19 from './variant-19';
import Select20 from './variant-20';
import Select21 from './variant-21';
import Select22 from './variant-22';
import Select23 from './variant-23';
import Select24 from './variant-24';
import Select25 from './variant-25';
import Select26 from './variant-26';
import Select27 from './variant-27';
import Select28 from './variant-28';
import Select29 from './variant-29';
import Select30 from './variant-30';
import Select31 from './variant-31';
import Select32 from './variant-32';
import Select33 from './variant-33';
import Select34 from './variant-34';
import Select35 from './variant-35';
import Select36 from './variant-36';

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
import code16 from './variant-16.tsx?raw';
import code17 from './variant-17.tsx?raw';
import code18 from './variant-18.tsx?raw';
import code19 from './variant-19.tsx?raw';
import code20 from './variant-20.tsx?raw';
import code21 from './variant-21.tsx?raw';
import code22 from './variant-22.tsx?raw';
import code23 from './variant-23.tsx?raw';
import code24 from './variant-24.tsx?raw';
import code25 from './variant-25.tsx?raw';
import code26 from './variant-26.tsx?raw';
import code27 from './variant-27.tsx?raw';
import code28 from './variant-28.tsx?raw';
import code29 from './variant-29.tsx?raw';
import code30 from './variant-30.tsx?raw';
import code31 from './variant-31.tsx?raw';
import code32 from './variant-32.tsx?raw';
import code33 from './variant-33.tsx?raw';
import code34 from './variant-34.tsx?raw';
import code35 from './variant-35.tsx?raw';
import code36 from './variant-36.tsx?raw';

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'select-01',
    title: 'Select 1',
    description: "Native HTML select with a label and rounded border for picking an account role.",
    component: Select1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-1.json',
    code: code1,
  },
  {
    id: 'select-02',
    title: 'Select 2',
    description: "Native select that opens on a disabled placeholder option until a choice is made.",
    component: Select2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-2.json',
    code: code2,
  },
  {
    id: 'select-03',
    title: 'Select 3',
    description: "Native select with a database icon placed inside the field on the left.",
    component: Select3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-3.json',
    code: code3,
  },
  {
    id: 'select-04',
    title: 'Select 4',
    description: "Native select with a muted helper text line below explaining the choice.",
    component: Select4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-4.json',
    code: code4,
  },
  {
    id: 'select-05',
    title: 'Select 5',
    description: "Native select in an invalid state with a red border and red error message.",
    component: Select5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-5.json',
    code: code5,
  },
  {
    id: 'select-06',
    title: 'Select 6',
    description: "Required native select with a red asterisk next to its label.",
    component: Select6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-6.json',
    code: code6,
  },
  {
    id: 'select-07',
    title: 'Select 7',
    description: "Native select with options split into labelled optgroup sections.",
    component: Select7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-7.json',
    code: code7,
  },
  {
    id: 'select-08',
    title: 'Select 8',
    description: "Native select with a floating label that sits on the top border and darkens on focus.",
    component: Select8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-8.json',
    code: code8,
  },
  {
    id: 'select-09',
    title: 'Select 9',
    description: "Native select inside a bordered box with a small uppercase label above the value.",
    component: Select9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-9.json',
    code: code9,
  },
  {
    id: 'select-10',
    title: 'Select 10',
    description: "Custom dropdown select with a preselected value and a labelled group heading in the menu.",
    component: Select10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-10.json',
    code: code10,
  },
  {
    id: 'select-11',
    title: 'Select 11',
    description: "Custom dropdown that shows placeholder text until a grouped option is picked.",
    component: Select11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-11.json',
    code: code11,
  },
  {
    id: 'select-12',
    title: 'Select 12',
    description: "Custom dropdown with a desktop icon shown before the selected value in the trigger.",
    component: Select12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-12.json',
    code: code12,
  },
  {
    id: 'select-13',
    title: 'Select 13',
    description: "Custom dropdown select with a muted description line underneath the field.",
    component: Select13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-13.json',
    code: code13,
  },
  {
    id: 'select-14',
    title: 'Select 14',
    description: "Custom dropdown in an amber warning state with a matching border and alert message.",
    component: Select14,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-14.json',
    code: code14,
  },
  {
    id: 'select-15',
    title: 'Select 15',
    description: "Three stacked dropdowns showing small, default and large trigger sizes.",
    component: Select15,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-15.json',
    code: code15,
  },
  {
    id: 'select-16',
    title: 'Select 16',
    description: "Custom dropdown for picking a P1 to P4 priority level with a soft focus ring.",
    component: Select16,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-16.json',
    code: code16,
  },
  {
    id: 'select-17',
    title: 'Select 17',
    description: "Filled dropdown with a light gray background and no shadow instead of a white field.",
    component: Select17,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-17.json',
    code: code17,
  },
  {
    id: 'select-18',
    title: 'Select 18',
    description: "Borderless ghost dropdown with a transparent trigger that only tints on hover.",
    component: Select18,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-18.json',
    code: code18,
  },
  {
    id: 'select-19',
    title: 'Select 19',
    description: "Disabled dropdown that is faded and locked to its preselected value.",
    component: Select19,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-19.json',
    code: code19,
  },
  {
    id: 'select-20',
    title: 'Select 20',
    description: "Dropdown where some options are disabled and greyed out as full or offline.",
    component: Select20,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-20.json',
    code: code20,
  },
  {
    id: 'select-21',
    title: 'Select 21',
    description: "Required custom dropdown with a red asterisk beside the label.",
    component: Select21,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-21.json',
    code: code21,
  },
  {
    id: 'select-22',
    title: 'Select 22',
    description: "Dropdown menu with options organised under two labelled groups.",
    component: Select22,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-22.json',
    code: code22,
  },
  {
    id: 'select-23',
    title: 'Select 23',
    description: "Grouped dropdown menu with a divider line separating the two option groups.",
    component: Select23,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-23.json',
    code: code23,
  },
  {
    id: 'select-24',
    title: 'Select 24',
    description: "Custom dropdown with a floating label resting on the top border of the trigger.",
    component: Select24,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-24.json',
    code: code24,
  },
  {
    id: 'select-25',
    title: 'Select 25',
    description: "Dropdown nested in a bordered card with an uppercase label and borderless trigger.",
    component: Select25,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-25.json',
    code: code25,
  },
  {
    id: 'select-26',
    title: 'Select 26',
    description: "Dropdown with read and write permission groups for choosing an API access scope.",
    component: Select26,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-26.json',
    code: code26,
  },
  {
    id: 'select-27',
    title: 'Select 27',
    description: "Dropdown where each option shows a small icon before its label.",
    component: Select27,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-27.json',
    code: code27,
  },
  {
    id: 'select-28',
    title: 'Select 28',
    description: "Dropdown whose trigger shows a fixed prefix label before the selected value.",
    component: Select28,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-28.json',
    code: code28,
  },
  {
    id: 'select-29',
    title: 'Select 29',
    description: "Dropdown with colored status dots for draft, live, archived and legacy states.",
    component: Select29,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-29.json',
    code: code29,
  },
  {
    id: 'select-30',
    title: 'Select 30',
    description: "Dropdown listing regions with country flag images beside each option.",
    component: Select30,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-30.json',
    code: code30,
  },
  {
    id: 'select-31',
    title: 'Select 31',
    description: "Dropdown for assigning a team member with an avatar beside each name.",
    component: Select31,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-31.json',
    code: code31,
  },
  {
    id: 'select-32',
    title: 'Select 32',
    description: "Multi-select popover with checkmarks that shows a count once several items are chosen.",
    component: Select32,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-32.json',
    code: code32,
  },
  {
    id: 'select-33',
    title: 'Select 33',
    description: "Multi-select popover for notification channels with a helper note under the field.",
    component: Select33,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-33.json',
    code: code33,
  },
  {
    id: 'select-34',
    title: 'Select 34',
    description: "Native multiple select showing all options in a tall list box with a Cmd or Ctrl hint.",
    component: Select34,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-34.json',
    code: code34,
  },
  {
    id: 'select-35',
    title: 'Select 35',
    description: "Always-visible single-select list box with a description under each option and a disabled item.",
    component: Select35,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-35.json',
    code: code35,
  },
  {
    id: 'select-36',
    title: 'Select 36',
    description: "Always-visible multi-select list box with two headed sections, a divider and checkmarks.",
    component: Select36,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/select-36.json',
    code: code36,
  },
];

export { category };
