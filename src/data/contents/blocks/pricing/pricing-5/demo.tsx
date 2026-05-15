
import { Pricing5 } from './index';

export default function Pricing5Demo() {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Ideal for individuals getting started.',
      monthlyPrice: 19,
      yearlyPrice: 190,
      currency: '$',
      features: [
        { name: '1 User Account' },
        { name: '5GB Storage' },
        { name: 'Basic Support' },
        { name: 'Standard Analytics' },
      ],
      buttonText: 'Get Started',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Perfect for growing teams and businesses.',
      monthlyPrice: 49,
      yearlyPrice: 490,
      currency: '$',
      badge: 'Most Popular',
      features: [
        { name: 'Up to 10 Users' },
        { name: '50GB Storage' },
        { name: 'Priority Support' },
        { name: 'Advanced Analytics' },
        { name: 'Custom Integrations' },
      ],
      buttonText: 'Start Free Trial',
      isPopular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large scale operations and advanced needs.',
      monthlyPrice: 99,
      yearlyPrice: 990,
      currency: '$',
      features: [
        { name: 'Unlimited Users' },
        { name: '500GB Storage' },
        { name: '24/7 Dedicated Support' },
        { name: 'Custom Reporting' },
        { name: 'SLA Guarantee' },
      ],
      buttonText: 'Contact Sales',
    },
  ];

  return (
    <Pricing5
      heading="Flexible Plans for Every Team"
      subheading="Choose the right plan to accelerate your growth. All plans come with a 14-day free trial."
      monthlyLabel="Monthly Billing"
      yearlyLabel="Annual Billing"
      plans={plans}
    />
  );
}
