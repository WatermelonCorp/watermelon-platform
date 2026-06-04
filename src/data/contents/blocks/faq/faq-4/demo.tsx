import { Faq4 } from './index';

const faqs = [
  {
    id: 'item-1',
    question: 'What technologies do you specialize in?',
    answer:
      'We specialize in modern frontend and full-stack technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, Hono, and scalable design systems. Our team also works with real-time applications, authentication systems, and cloud deployments.',
  },
  {
    id: 'item-2',
    question: 'Can you build fully custom base-ui components?',
    answer:
      'Yes. We design and develop fully custom base-ui systems tailored to your product requirements. From dashboards and landing pages to complex SaaS interfaces, every component is built with accessibility, responsiveness, and scalability in mind.',
    date: '11 May, 2026',
  },
  {
    id: 'item-3',
    question: 'Do you work with startups and early-stage products?',
    answer:
      'Absolutely. We frequently collaborate with startups to help validate ideas, design MVPs, and launch production-ready applications quickly. We focus on fast iteration without compromising code quality or user experience.',
  },
  {
    id: 'item-4',
    question: 'How do you handle project communication?',
    answer:
      'We maintain clear and transparent communication through regular updates, progress tracking, and collaborative feedback cycles. Depending on the project, we typically use Slack, Discord, Linear, Notion, or email for coordination.',
  },
  {
    id: 'item-5',
    question: 'Can existing applications be redesigned or optimized?',
    answer:
      'Yes. We can modernize outdated interfaces, improve UX flows, optimize frontend performance, and refactor codebases for better maintainability. Our process includes design audits, accessibility improvements, and performance analysis.',
  },
  {
    id: 'item-6',
    question: 'Do you provide ongoing maintenance and support?',
    answer:
      'We offer ongoing support for bug fixes, feature development, infrastructure improvements, and long-term scaling. Whether you need occasional updates or a dedicated development partner, we can tailor support to your workflow.',
  },
];

export default function Faq4Demo() {
  return (
    <div className="bg-background w-full">
      <Faq4
        badge="/ FAQs"
        title="Frequently asked question"
        description="here's everything you need to know to get started, manage your account, and troubleshoot the most frequent issues."
        buttonText="View all"
        buttonHref="#"
        faqs={faqs}
      />
    </div>
  );
}
