import FAQ3 from '.';

const demoFAQs = [
  {
    question: 'Can you build fully custom dashboards and admin panels?',
    answer:
      'Yes — we create custom dashboards tailored to your product workflow, including analytics, role management, realtime updates, and advanced filtering experiences.',
  },
  {
    question: 'Do you support scalable component architecture?',
    answer:
      'Absolutely. We build reusable component systems with consistent patterns, semantic theming, shared utilities, and maintainable design foundations for long-term scalability.',
  },
  {
    question: 'Can existing React or Next.js projects be improved?',
    answer:
      'Yes. We can refactor existing codebases, improve performance, modernize base-ui systems, optimize state management, and restructure applications for better maintainability.',
  },
  {
    question: 'How quickly can a new project get started?',
    answer:
      'Most projects can begin within a few days after planning and scope alignment. We usually start with architecture setup, design direction, and core feature implementation.',
  },
  {
    question: 'Do you build realtime experiences?',
    answer:
      'Yes — we develop realtime systems including chat applications, collaborative platforms, multiplayer interactions, live dashboards, and synchronized workspace experiences.',
  },
  {
    question: 'Is mobile responsiveness included by default?',
    answer:
      'Absolutely. Every interface is designed and tested for responsiveness across desktop, tablet, and mobile devices to ensure a seamless experience everywhere.',
  },
  {
    question: 'Can you work with existing APIs and backend systems?',
    answer:
      'Yes. We regularly integrate with existing APIs, databases, authentication systems, CMS platforms, and third-party services while maintaining clean frontend architecture.',
  },
];

export default function FAQDemo() {
  return (
    <FAQ3
      badge="Frequently asked questions"
      heading="Everything you need to know"
      subheading="Find answers about plans, onboarding, roles, and how teams use our tool every day."
      items={demoFAQs}
    />
  );
}
