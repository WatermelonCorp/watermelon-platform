'use client';

import Blog1 from '.';

const samplePosts = [
  {
    date: 'Mar 18',
    title: 'Streamlining team onboarding with automated workflow pipelines.',
    author: {
      name: 'Elena Marsh',
      role: 'Head of Operations',
    },
    href: '#',
  },
  {
    date: 'Apr 2',
    title: 'Why collaborative dashboards are replacing static reports.',
    author: {
      name: 'Daniel Reeves',
      role: 'Product Lead, Helix',
    },
    href: '#',
  },
  {
    date: 'Apr 14',
    title: 'Scaling customer success through proactive, data-informed outreach.',
    author: {
      name: 'Priya Nair',
      role: 'Growth Strategist',
    },
    href: '#',
  },
];

export default function Blog1Demo() {
  return (
    <Blog1
      header={{
        badge: 'From our journal',
        heading: 'Insights that sharpen your strategy',
        description:
          'Actionable perspectives on growth, tooling, and modern team culture.',
        ctaText: 'Browse all articles',
        ctaHref: '#',
      }}
      posts={samplePosts}
    />
  );
}
