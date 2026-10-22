import { category } from './config.ts';

import Textarea1 from './variant-1';
import Textarea2 from './variant-2';
import Textarea3 from './variant-3';
import Textarea4 from './variant-4';
import Textarea5 from './variant-5';
import Textarea6 from './variant-6';
import Textarea7 from './variant-7';
import Textarea8 from './variant-8';
import Textarea9 from './variant-9';
import Textarea10 from './variant-10';
import Textarea11 from './variant-11';
import Textarea12 from './variant-12';
import Textarea13 from './variant-13';
import Textarea14 from './variant-14';
import Textarea15 from './variant-15';
import Textarea16 from './variant-16';
import Textarea17 from './variant-17';
import Textarea18 from './variant-18';
import Textarea19 from './variant-19';
import Textarea20 from './variant-20';
import Textarea21 from './variant-21';

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

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'textarea-01',
    title: 'Textarea 1',
    description: "Plain textarea with no label, a soft primary focus ring and slightly rounded corners.",
    component: Textarea1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-1.json',
    code: code1,
  },
  {
    id: 'textarea-02',
    title: 'Textarea 2',
    description: "Basic textarea with a visible label above it and a soft primary focus ring.",
    component: Textarea2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-2.json',
    code: code2,
  },
  {
    id: 'textarea-03',
    title: 'Textarea 3',
    description: "Labelled textarea with a small right-aligned helper note shown underneath the field.",
    component: Textarea3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-3.json',
    code: code3,
  },
  {
    id: 'textarea-04',
    title: 'Textarea 4',
    description: "Required textarea with a red asterisk on the label for mandatory issue descriptions.",
    component: Textarea4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-4.json',
    code: code4,
  },
  {
    id: 'textarea-05',
    title: 'Textarea 5',
    description: "Labelled textarea that shows an emerald green border and ring when focused.",
    component: Textarea5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-5.json',
    code: code5,
  },
  {
    id: 'textarea-06',
    title: 'Textarea 6',
    description: "Note textarea with a pen icon placed inside the field at the top left.",
    component: Textarea6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-6.json',
    code: code6,
  },
  {
    id: 'textarea-07',
    title: 'Textarea 7',
    description: "Idea textarea with a lightbulb icon placed inside the field at the top right.",
    component: Textarea7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-7.json',
    code: code7,
  },
  {
    id: 'textarea-08',
    title: 'Textarea 8',
    description: "Textarea in an error state with a red border and an inline validation message below.",
    component: Textarea8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-8.json',
    code: code8,
  },
  {
    id: 'textarea-09',
    title: 'Textarea 9',
    description: "Labelled textarea with an Optional tag aligned to the right of the label.",
    component: Textarea9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-9.json',
    code: code9,
  },
  {
    id: 'textarea-10',
    title: 'Textarea 10',
    description: "Textarea with its label sitting on the top border line, like an outlined field.",
    component: Textarea10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-10.json',
    code: code10,
  },
  {
    id: 'textarea-11',
    title: 'Textarea 11',
    description: "Textarea with a floating label that moves up onto the border on focus or input.",
    component: Textarea11,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-11.json',
    code: code11,
  },
  {
    id: 'textarea-12',
    title: 'Textarea 12',
    description: "Disabled textarea with dimmed styling and a not-allowed cursor for auto-generated content.",
    component: Textarea12,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-12.json',
    code: code12,
  },
  {
    id: 'textarea-13',
    title: 'Textarea 13',
    description: "Read-only textarea with a muted background showing pre-filled output that cannot be edited.",
    component: Textarea13,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-13.json',
    code: code13,
  },
  {
    id: 'textarea-14',
    title: 'Textarea 14',
    description: "Auto-growing textarea that expands with its content up to a set maximum height.",
    component: Textarea14,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-14.json',
    code: code14,
  },
  {
    id: 'textarea-15',
    title: 'Textarea 15',
    description: "Fixed-size textarea with the resize handle turned off so users cannot drag it.",
    component: Textarea15,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-15.json',
    code: code15,
  },
  {
    id: 'textarea-16',
    title: 'Textarea 16',
    description: "Textarea with the label placed inside the same bordered box, above the text area.",
    component: Textarea16,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-16.json',
    code: code16,
  },
  {
    id: 'textarea-17',
    title: 'Textarea 17',
    description: "Reply textarea with a small Post Reply button underneath, suited to comment threads.",
    component: Textarea17,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-17.json',
    code: code17,
  },
  {
    id: 'textarea-18',
    title: 'Textarea 18',
    description: "Textarea with a 200 character limit and a live counter of characters remaining.",
    component: Textarea18,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-18.json',
    code: code18,
  },
  {
    id: 'textarea-19',
    title: 'Textarea 19',
    description: "Three stacked textareas showing compact, standard and expanded height sizes.",
    component: Textarea19,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-19.json',
    code: code19,
  },
  {
    id: 'textarea-20',
    title: 'Textarea 20',
    description: "Project details textarea with left-aligned hint text below suggesting what to include.",
    component: Textarea20,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-20.json',
    code: code20,
  },
  {
    id: 'textarea-21',
    title: 'Textarea 21',
    description: "Filled textarea with a muted background and no visible border until focused.",
    component: Textarea21,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/textarea-21.json',
    code: code21,
  },
];

export { category };
