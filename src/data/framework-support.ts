/**
 * Framework compatibility, shared by the /framework-support page and the
 * Worker's crawlable copy so the two cannot drift apart.
 */
export type FrameworkStatus = 'full' | 'partial' | 'coming';

export interface Framework {
  name: string;
  version: string;
  status: FrameworkStatus;
  notes: string;
}

export const frameworks: Framework[] = [
  {
    name: 'Next.js',
    version: '14+',
    status: 'full',
    notes: 'Full support including App Router and Server Components.',
  },
  {
    name: 'Vite + React',
    version: '5+',
    status: 'full',
    notes: 'Recommended setup — this is what Watermelon UI is built with.',
  },
];

export const requirements = [
  { label: 'React', value: '18 or 19', desc: 'Hooks & Suspense required' },
  { label: 'Tailwind CSS', value: 'v4', desc: 'CSS-first config via @import' },
  { label: 'shadcn/ui', value: 'Latest', desc: 'Component primitives layer' },
];
