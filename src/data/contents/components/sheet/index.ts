import { category } from './config.ts';

import Sheet1 from './variant-1';
import Sheet2 from './variant-2';
import Sheet3 from './variant-3';
import Sheet4 from './variant-4';
import Sheet5 from './variant-5';
import Sheet6 from './variant-6';
import Sheet7 from './variant-7';

import code1 from './variant-1.tsx?raw';
import code2 from './variant-2.tsx?raw';
import code3 from './variant-3.tsx?raw';
import code4 from './variant-4.tsx?raw';
import code5 from './variant-5.tsx?raw';
import code6 from './variant-6.tsx?raw';
import code7 from './variant-7.tsx?raw';

import type { UiVariant } from '@/data/components-registry';

export const variants: UiVariant[] = [
  {
    id: 'sheet-01',
    title: 'Sheet 1',
    description: "Preferences side sheet with appearance, language and display name fields in shaded cards.",
    component: Sheet1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sheet-1.json',
    code: code1,
  },
  {
    id: 'sheet-02',
    title: 'Sheet 2',
    description: "Four icon buttons that open the same profile sheet from the top, right, bottom or left.",
    component: Sheet2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sheet-2.json',
    code: code2,
  },
  {
    id: 'sheet-03',
    title: 'Sheet 3',
    description: "Wide documentation sheet with a scrollable list of module cards and Export and Close buttons.",
    component: Sheet3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sheet-3.json',
    code: code3,
  },
  {
    id: 'sheet-04',
    title: 'Sheet 4',
    description: "Left navigation sheet with a nested menu where categories expand to reveal their pages.",
    component: Sheet4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sheet-4.json',
    code: code4,
  },
  {
    id: 'sheet-05',
    title: 'Sheet 5',
    description: "Non-modal sheet with a create workspace form for name, URL and owner email.",
    component: Sheet5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sheet-5.json',
    code: code5,
  },
  {
    id: 'sheet-06',
    title: 'Sheet 6',
    description: "Sign-up sheet with name, email, digits-only phone and password fields and an error toast if any are empty.",
    component: Sheet6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sheet-6.json',
    code: code6,
  },
  {
    id: 'sheet-07',
    title: 'Sheet 7',
    description: "Searchable user list with a New User sheet that adds a user with role and status selects.",
    component: Sheet7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/sheet-7.json',
    code: code7,
  },
];

export { category };
