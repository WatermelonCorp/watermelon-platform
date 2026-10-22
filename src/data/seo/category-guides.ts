/**
 * Short buying guides for component category pages: a direct answer, when to
 * reach for the component, what to use instead, and real questions people ask.
 *
 * Rendered visibly under the variants grid (component-category.tsx) and in the
 * Worker's crawlable copy, with an FAQPage block, so the two always match.
 * Keep this file free of React and Vite-only imports: the Worker bundles it.
 * Plain text only, no markup.
 */

export interface CategoryGuide {
  /** 40-80 words that fully answer "what is it and how do I add it". */
  answer: string;
  /** Concrete situations where this component is the right pick. */
  useWhen: string[];
  /** Sibling categories to use instead, by slug under /components. */
  instead: { slug: string; when: string }[];
  /** Questions people actually search, answered in the first sentence. */
  faq: { q: string; a: string }[];
}

export const componentGuides: Record<string, CategoryGuide> = {
  accordion: {
    answer:
      'A React accordion is a stack of headings that each expand to reveal a panel of content. Watermelon UI accordions are built on Radix UI primitives with Tailwind CSS, so they are keyboard accessible and support single or multiple open items. Add one with the shadcn CLI, then edit the Tailwind classes to match your design.',
    useWhen: [
      'FAQ sections where each answer should stay hidden until asked for.',
      'Settings or filter panels with groups the user only needs one at a time.',
      'Long documentation or changelog pages that need to scan quickly.',
    ],
    instead: [
      { slug: 'tabs', when: 'the sections are peers the user switches between, not a list to scan' },
      { slug: 'collapsible', when: 'there is a single show-more region rather than a list of items' },
      { slug: 'dialog', when: 'the hidden content needs the user’s full attention' },
    ],
    faq: [
      {
        q: 'How do I make a shadcn accordion open by default?',
        a: 'Pass the item value to defaultValue on the Accordion root, for example defaultValue="item-1". For type="multiple", pass an array of values instead.',
      },
      {
        q: 'Can more than one accordion item be open at once?',
        a: 'Yes. Set type="multiple" on the Accordion root; type="single" keeps only one item open, and collapsible lets the open one close again.',
      },
      {
        q: 'Is the accordion accessible?',
        a: 'Yes. It uses Radix UI, which handles the button and region roles, aria-expanded, and arrow, Home, and End key navigation between headers.',
      },
      {
        q: 'Does it work with Next.js?',
        a: 'Yes. The accordion is a client component, so it works in the Next.js App Router inside any file marked "use client", and in Vite, Remix, and Astro React islands.',
      },
    ],
  },
};

export function guideFaqSchema(guide: CategoryGuide) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
