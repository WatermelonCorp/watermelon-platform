import { GooeyMenu } from './index';
const data = [
  {
    key: 'title',
    label: 'Next.js',
    value: 'v13.4.8',
    labelClass: 'text-sm font-medium text-neutral-500',
    valueClass: 'text-sm text-neutral-500',
  },
  {
    key: 'errors',
    label: 'Errors',
    value: '20',
    labelClass: 'text-sm font-medium',
    valueClass:
      'text-sm flex items-center justify-center rounded-full border border-[#EB5757]/10 bg-[#EB5757]/15 p-1 px-2 font-mono text-red-500 bg-red-500/20',
  },
  {
    key: 'route',
    label: 'Route',
    value: 'Static',
    labelClass: 'text-sm font-medium',
    valueClass: 'text-sm text-[#a09f9f]',
  },
];
export default function GooeyMenuDemo() {
  return <GooeyMenu data={data} />;
}
