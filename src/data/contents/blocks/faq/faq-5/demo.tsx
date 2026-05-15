import { Faq5 } from './index';

export default function Faq5Demo() {
  const categories = [
    {
      title: 'Frontend Development',
      description: (
        <>
          Learn how we build scalable frontend applications, reusable component
          systems, and polished user experiences. Need help with a custom
          project?{' '}
          <a
            href="#"
            className="text-foreground hover:text-primary font-medium underline transition-colors"
          >
            Talk to our team
          </a>
          .
        </>
      ),
      items: [
        {
          question: 'What frontend technologies do you specialize in?',
          answer:
            'We primarily work with React, Next.js, TypeScript, Tailwind CSS, and shadcn/base-ui. Our focus is on building scalable, performant, and maintainable frontend systems.',
        },
        {
          question: 'Can you create reusable design systems?',
          answer:
            'Yes. We build modular component libraries with semantic theming, shared tokens, accessibility standards, and scalable architecture for long-term product growth.',
        },
        {
          question: 'Do you support responsive and mobile-first design?',
          answer:
            'Absolutely. Every interface is designed mobile-first and optimized for desktop, tablet, and smaller devices to ensure a seamless cross-platform experience.',
        },
        {
          question: 'Can existing applications be redesigned?',
          answer:
            'Yes. We modernize outdated interfaces, improve UX flows, optimize layouts, and refactor frontend architecture without disrupting existing business logic.',
        },
      ],
    },
    {
      title: 'Backend & Infrastructure',
      description: (
        <>
          Explore how we handle APIs, realtime systems, authentication, and
          scalable infrastructure. Looking for enterprise-level solutions?{' '}
          <a
            href="#"
            className="text-foreground hover:text-primary font-medium underline transition-colors"
          >
            Contact engineering
          </a>
          .
        </>
      ),
      items: [
        {
          question: 'What backend technologies do you use?',
          answer:
            'We commonly develop backend systems using Node.js, Hono, PostgreSQL, Prisma, WebSockets, and serverless deployment platforms for modern scalable applications.',
        },
        {
          question: 'Can you build realtime applications?',
          answer:
            'Yes. We create realtime experiences including chat systems, collaborative workspaces, multiplayer applications, and live analytics dashboards.',
        },
        {
          question: 'How do you handle authentication and security?',
          answer:
            'We implement secure authentication flows using BetterAuth, Clerk, OAuth providers, protected API routes, encrypted sessions, and role-based access control systems.',
        },
        {
          question: 'Do you provide deployment and maintenance support?',
          answer:
            'Yes. We help with deployments, CI/CD pipelines, monitoring, scaling strategies, bug fixes, and long-term maintenance after launch.',
        },
      ],
    },
  ];

  return <Faq5 categories={categories} />;
}
