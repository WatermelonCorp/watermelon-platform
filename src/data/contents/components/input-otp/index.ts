import { category } from './config.ts';

import InputOtp1 from './variant-1';
import InputOtp2 from './variant-2';
import InputOtp3 from './variant-3';
import InputOtp4 from './variant-4';
import InputOtp5 from './variant-5';
import InputOtp6 from './variant-6';
import InputOtp7 from './variant-7';
import InputOtp8 from './variant-8';
import InputOtp9 from './variant-9';
import InputOtp10 from './variant-10';

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
    id: 'input-otp-01',
    title: 'Input OTP 1',
    component: InputOtp1,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-otp-1.json',
    code: code1,
  },
  {
    id: 'input-otp-02',
    title: 'Input OTP 2',
    component: InputOtp2,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-otp-2.json',
    code: code2,
  },
  {
    id: 'input-otp-03',
    title: 'Input OTP 3',
    component: InputOtp3,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-otp-3.json',
    code: code3,
  },
  {
    id: 'input-otp-04',
    title: 'Input OTP 4',
    component: InputOtp4,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-otp-4.json',
    code: code4,
  },
  {
    id: 'input-otp-05',
    title: 'Input OTP 5',
    component: InputOtp5,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-otp-5.json',
    code: code5,
  },
  {
    id: 'input-otp-06',
    title: 'Input OTP 6',
    component: InputOtp6,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-otp-6.json',
    code: code6,
  },
  {
    id: 'input-otp-07',
    title: 'Input OTP 7',
    component: InputOtp7,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-otp-7.json',
    code: code7,
  },
  {
    id: 'input-otp-08',
    title: 'Input OTP 8',
    component: InputOtp8,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-otp-8.json',
    code: code8,
  },
  {
    id: 'input-otp-09',
    title: 'Input OTP 9',
    component: InputOtp9,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-otp-9.json',
    code: code9,
  },
  {
    id: 'input-otp-10',
    title: 'Input OTP 10',
    component: InputOtp10,
    cli: 'npx shadcn@latest add https://registry.watermelon.sh/r/input-otp-10.json',
    code: code10,
  },
];

export { category };
