import ChangeablePricingSection, { type Plan } from '.';

const demoPlans: Plan[] = [
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for individuals & small teams',
    priceMonthly: '$4.99',
    priceYearly: '$3.99',
    featuresLabel: 'CORE FEATURES:',
    features: [
      { text: 'Up to 10 users', hasInfo: false },
      { text: 'Basic reporting', hasInfo: false },
      { text: 'Standard support', hasInfo: false },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Best for mid-sized teams',
    priceMonthly: '$9.99',
    priceYearly: '$7.99',
    badge: 'POPULAR',
    featuresLabel: 'EVERYTHING IN PRO, PLUS:',
    features: [
      { text: 'Custom workflows & task statuses', hasInfo: false },
      { text: 'Role-based permissions', hasInfo: false },
      { text: 'Automations', hasInfo: true },
      { text: 'Advanced dashboards', hasInfo: true },
      { text: 'Integrations', hasInfo: true },
      { text: 'Priority support', hasInfo: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Best for large organizations & regulated industries',
    priceMonthly: '$39.99',
    priceYearly: '$31.99',
    featuresLabel: 'EVERYTHING IN BUSINESS, PLUS:',
    features: [
      { text: 'Unlimited users', hasInfo: false },
      { text: 'Dedicated success manager', hasInfo: false },
      { text: 'Custom SLAs & advanced security', hasInfo: false },
    ],
  },
];

export default function ChangeablePricingSectionDemo() {
  return (
    <div className="relative flex max-h-screen flex-col items-center justify-center gap-10 bg-background p-10 transition-colors duration-300 dark:bg-neutral-950">
      <ChangeablePricingSection
        plans={demoPlans}
        defaultPlanId="business"
        onContinue={(planId, cycle) =>
          console.log(`Selected: ${planId}, Cycle: ${cycle}`)
        }
      />
    </div>
  );
}
