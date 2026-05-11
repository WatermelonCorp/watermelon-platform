'use client';

import { Pencil } from 'lucide-react';
import Blog3 from '.';

const samplePosts = [
  {
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=faces',
    imageAlt: 'Team collaborating around a shared workspace',
    readingTime: '3 min read',
    title: 'Building async-first cultures that actually scale',
    description:
      'Explore how distributed teams reduce meeting fatigue, document decisions better, and maintain velocity without constant check-ins.',
    cardCtaLabel: 'Read more',
    href: '#',
  },
  {
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces',
    imageAlt: 'Professional reviewing analytics on screen',
    readingTime: '5 min read',
    title: 'Rethinking feedback loops in product development',
    description:
      'Why the best product teams treat user signals as system inputs — and how tighter loops accelerate iteration cycles.',
    cardCtaLabel: 'Read more',
    href: '#',
  },
  {
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces',
    imageAlt: 'Engineer working on technical architecture',
    readingTime: '4 min read',
    title: 'The case for incremental architecture decisions',
    description:
      'Discover why small, reversible technical bets outperform big-bang rewrites — and how to bake this mindset into your roadmap.',
    cardCtaLabel: 'Read more',
    href: '#',
  },
];

export default function Blog3Demo() {
  return (
    <Blog3
      header={{
        badge: 'Perspectives & Playbooks',
        badgeIcon: <Pencil className="size-3" />,
        heading: 'Practical thinking for modern builders',
        description:
          'Deep dives into engineering culture, product strategy, and the workflows that keep high-output teams moving.',
      }}
      posts={samplePosts}
      footer={{
        ctaText: 'View all articles',
        ctaHref: '#',
      }}
    />
  );
}
