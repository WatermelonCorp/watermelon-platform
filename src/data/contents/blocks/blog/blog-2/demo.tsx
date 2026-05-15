'use client';

import Blog2 from '.';

const samplePosts = [
  {
    meta: '5 min read',
    title: 'How to give clear feedback that actually helps your team',
    author: {
      name: 'Guillermo Rauch',
      role: 'CEO @ Vercel',
      avatar: 'https://github.com/rauchg.png',
    },
    href: 'https://github.com/rauchg',
  },
  {
    meta: '8 min read',
    title: '5 small changes to improve your team\'s daily wellbeing',
    author: {
      name: 'Dan Abramov',
      role: 'React Core',
      avatar: 'https://github.com/gaearon.png',
    },
    href: 'https://github.com/gaearon',
  },
  {
    meta: '3 min read',
    title: 'What new hires really need on their first day',
    author: {
      name: 'Lee Robinson',
      role: 'VP of Product @ Vercel',
      avatar: 'https://github.com/leerob.png',
    },
    href: 'https://github.com/leerob',
  },
  {
    meta: '6 min read',
    title: 'Mastering async communication across timezones',
    author: {
      name: 'Ryan Florence',
      role: 'Remix Creator',
      avatar: 'https://github.com/ryanflorence.png',
    },
    href: 'https://github.com/ryanflorence',
  },
  {
    meta: '4 min read',
    title: 'The art of running effective 1-on-1 meetings',
    author: {
      name: 'Evan You',
      role: 'Vue.js Creator',
      avatar: 'https://github.com/yyx990803.png',
    },
    href: 'https://github.com/yyx990803',
  },
  {
    meta: '7 min read',
    title: 'Building a culture of continuous learning',
    author: {
      name: 'Rich Harris',
      role: 'Svelte Creator',
      avatar: 'https://github.com/Rich-Harris.png',
    },
    href: 'https://github.com/Rich-Harris',
  },
];

export default function Blog2Demo() {
  return (
    <Blog2
      header={{
        heading: 'Elevate your team with actionable insights',
        description:
          'Practical strategies to streamline operations, boost morale, and build a thriving workplace culture.',
        ctaText: 'See all guides',
        ctaHref: '#',
      }}
      posts={samplePosts}
    />
  );
}
