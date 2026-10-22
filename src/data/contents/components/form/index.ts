import { category } from './config.ts';

import Form1 from './variant-1';
import Form2 from './variant-2';
import Form3 from './variant-3';
import Form4 from './variant-4';
import Form5 from './variant-5';
import Form6 from './variant-6';
import Form7 from './variant-7';
import Form8 from './variant-8';
import Form9 from './variant-9';
import Form10 from './variant-10';

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

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'form-01',
    title: 'Form 1',
    description: "Verification form with a six-digit OTP field, zod validation for a complete code and a success toast.",
    component: Form1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-1.json',
    code: code1,
  },
  {
    id: 'form-02',
    title: 'Form 2',
    description: "Account recovery form with a select listing accounts by avatar and email, validated with zod.",
    component: Form2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-2.json',
    code: code2,
  },
  {
    id: 'form-03',
    title: 'Form 3',
    description: "Birth date form with a calendar popover that blocks future dates and dates before 1900.",
    component: Form3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-3.json',
    code: code3,
  },
  {
    id: 'form-04',
    title: 'Form 4',
    description: "Mode picker form with radio option cards and an error if submitted without a choice.",
    component: Form4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-4.json',
    code: code4,
  },
  {
    id: 'form-05',
    title: 'Form 5',
    description: "Consent form with a bordered checkbox card that must be ticked before Get Started succeeds.",
    component: Form5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-5.json',
    code: code5,
  },
  {
    id: 'form-06',
    title: 'Form 6',
    description: "Settings form with a switch in a bordered row that must be turned on to continue.",
    component: Form6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-6.json',
    code: code6,
  },
  {
    id: 'form-07',
    title: 'Form 7',
    description: "Feedback form with a textarea validated to between 30 and 300 characters.",
    component: Form7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-7.json',
    code: code7,
  },
  {
    id: 'form-08',
    title: 'Form 8',
    description: "Category form with a searchable combobox, an icon for each option and a check on the chosen one.",
    component: Form8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-8.json',
    code: code8,
  },
  {
    id: 'form-09',
    title: 'Form 9',
    description: "Invite form with a single email input validated for a correct address before sending.",
    component: Form9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-9.json',
    code: code9,
  },
  {
    id: 'form-10',
    title: 'Form 10',
    description: "Project setup card form with email, project type select, goal toggles and a brief textarea, all validated.",
    component: Form10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/form-10.json',
    code: code10,
  },
];

export { category };
