import { FiLayout, FiCode } from 'react-icons/fi';

import FAQ2 from '../faq-2';

const demoCategories = [
  {
    id: 'development',
    label: 'Development',
    icon: <FiCode />,
    items: [
      {
        question: 'What technologies do you use for frontend development?',
        answer:
          'We primarily build with React, Next.js, TypeScript, Tailwind CSS, and shadcn/base-ui. Our focus is on scalable architecture, responsive design, and maintainable component systems.',
      },
      {
        question: 'Can you build real-time applications?',
        answer:
          'Yes — we develop real-time applications using WebSockets, Pusher, and modern backend architectures. This includes chat systems, collaborative tools, multiplayer experiences, and live dashboards.',
      },
      {
        question: 'Do you work with monorepos?',
        answer:
          'Absolutely. We frequently work with Turborepo-based architectures for managing frontend, backend, shared packages, and design systems efficiently.',
      },
      {
        question: 'Can you integrate authentication systems?',
        answer:
          'Yes. We integrate secure authentication flows using BetterAuth, Clerk, OAuth providers, magic links, and custom session-based systems.',
      },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    icon: <FiLayout />,
    items: [
      {
        question: 'Do you create fully custom base-ui designs?',
        answer:
          'Yes. Every interface is designed specifically for the product’s goals and users. We focus on clean hierarchy, accessibility, responsive layouts, and polished interactions.',
      },
      {
        question: 'Can you redesign existing products?',
        answer:
          'We can modernize outdated interfaces, improve usability, and rebuild design systems while preserving your existing workflows and branding.',
      },
      {
        question: 'Do you support dark mode and theming?',
        answer:
          'Yes — we build flexible theme systems using semantic color tokens and scalable design foundations for light, dark, and custom brand themes.',
      },
    ],
  },
];

export default function FAQDemo() {
  return (
    <FAQ2
      badge="Need help?"
      title="Frequently asked questions"
      subtitle="Find quick answers about our pricing, onboarding, and performance tracking tools."
      categories={demoCategories}
    />
  );
}
