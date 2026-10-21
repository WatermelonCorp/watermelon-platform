import type { SeoPage } from './types';

export interface Reference {
  title: string;
  href: string;
}

/**
 * Official sites of the libraries and tools the SEO pages discuss. Each page
 * links the ones its heading or keyword names, so readers can check the
 * claims at the source. URLs point at pages that answer 200 without a
 * redirect (checked 2026-10-21).
 */
const officialSites: { match: RegExp; reference: Reference }[] = [
  { match: /shadcn/i, reference: { title: 'shadcn/ui documentation', href: 'https://ui.shadcn.com/docs' } },
  { match: /tailwind ui/i, reference: { title: 'Tailwind CSS (makers of Tailwind Plus, formerly Tailwind UI)', href: 'https://tailwindcss.com/' } },
  { match: /aceternity/i, reference: { title: 'Aceternity UI', href: 'https://ui.aceternity.com/' } },
  { match: /magic ui/i, reference: { title: 'Magic UI', href: 'https://magicui.design/' } },
  { match: /untitled ui/i, reference: { title: 'Untitled UI', href: 'https://www.untitledui.com/' } },
  { match: /daisyui/i, reference: { title: 'daisyUI', href: 'https://daisyui.com/' } },
  { match: /flowbite/i, reference: { title: 'Flowbite', href: 'https://flowbite.com/' } },
  { match: /preline/i, reference: { title: 'Preline UI', href: 'https://preline.co/' } },
  { match: /heroui/i, reference: { title: 'HeroUI', href: 'https://heroui.com/' } },
  { match: /cult ui/i, reference: { title: 'Cult UI', href: 'https://www.cult-ui.com/' } },
  { match: /origin ui/i, reference: { title: 'coss ui (formerly Origin UI)', href: 'https://coss.com/ui' } },
  { match: /material ui|\bmui\b/i, reference: { title: 'Material UI', href: 'https://mui.com/material-ui/' } },
  { match: /radix/i, reference: { title: 'Radix UI', href: 'https://www.radix-ui.com/' } },
  { match: /mantine/i, reference: { title: 'Mantine', href: 'https://mantine.dev/' } },
  { match: /bootstrap/i, reference: { title: 'Bootstrap', href: 'https://getbootstrap.com/' } },
  { match: /ant design/i, reference: { title: 'Ant Design', href: 'https://ant.design/' } },
  { match: /tailwind css/i, reference: { title: 'Tailwind CSS', href: 'https://tailwindcss.com/' } },
  { match: /registry|registries/i, reference: { title: 'shadcn registry documentation', href: 'https://ui.shadcn.com/docs/registry' } },
  { match: /\bcli\b/i, reference: { title: 'shadcn CLI documentation', href: 'https://ui.shadcn.com/docs/cli' } },
  { match: /\bmcp\b/i, reference: { title: 'Model Context Protocol on GitHub', href: 'https://github.com/modelcontextprotocol' } },
  { match: /animat/i, reference: { title: 'Motion for React', href: 'https://motion.dev/' } },
  { match: /modal|dialog|drawer|sheet/i, reference: { title: 'Radix UI Dialog primitive', href: 'https://www.radix-ui.com/primitives/docs/components/dialog' } },
];

const fallback: Reference = { title: 'React documentation', href: 'https://react.dev/' };

/** Up to four official references for a page, never none. */
export function seoPageReferences(page: Pick<SeoPage, 'h1' | 'title' | 'primaryKeyword'>): Reference[] {
  const text = `${page.h1} ${page.title} ${page.primaryKeyword}`;
  const matched = officialSites.filter((site) => site.match.test(text)).map((site) => site.reference);
  const unique = matched.filter((ref, i) => matched.findIndex((r) => r.href === ref.href) === i);
  return (unique.length ? unique : [fallback]).slice(0, 4);
}
