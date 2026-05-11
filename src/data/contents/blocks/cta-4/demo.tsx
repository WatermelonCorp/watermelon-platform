import { PerformanceOverview } from './'

const dashboardData = [
  {
    id: 'week',
    label: 'Weekly',
    metrics: [
      {
        id: 'm1',
        label: 'Revenue',
        value: '$48,200',
        changePercent: 12.5,
        icon: 'finance' as const,
      },
      {
        id: 'm2',
        label: 'Visitors',
        value: '8,430',
        changePercent: 8.2,
        icon: 'users' as const,
      },
      {
        id: 'm3',
        label: 'Orders',
        value: '1,205',
        changePercent: -3.1,
        icon: 'product' as const,
      },
      {
        id: 'm4',
        label: 'Growth',
        value: '24.8%',
        changePercent: 4.6,
        icon: 'chart' as const,
      },
    ],
    activities: [
      {
        id: 'a1',
        title: 'Enterprise plan renewal',
        timestamp: '2 hours ago',
        value: '+$2,400',
        isPositive: true,
      },
      {
        id: 'a2',
        title: 'Refund processed',
        timestamp: '5 hours ago',
        value: '-$180',
        isPositive: false,
      },
    ],
  },
  {
    id: 'month',
    label: 'Monthly',
    metrics: [
      {
        id: 'm1',
        label: 'Revenue',
        value: '$192,000',
        changePercent: 18.3,
        icon: 'finance' as const,
      },
      {
        id: 'm2',
        label: 'Visitors',
        value: '34,100',
        changePercent: 14.7,
        icon: 'users' as const,
      },
      {
        id: 'm3',
        label: 'Orders',
        value: '5,840',
        changePercent: 6.2,
        icon: 'product' as const,
      },
      {
        id: 'm4',
        label: 'Growth',
        value: '31.2%',
        changePercent: 9.1,
        icon: 'chart' as const,
      },
    ],
    activities: [
      {
        id: 'a1',
        title: 'Q2 invoice paid',
        timestamp: '1 day ago',
        value: '+$12,000',
        isPositive: true,
      },
      {
        id: 'a2',
        title: 'Ad spend adjustment',
        timestamp: '2 days ago',
        value: '-$850',
        isPositive: false,
      },
    ],
  },
];

export default function HomePage() {
  return (
    <PerformanceOverview
      title="Elevate Your"
      accentWord="Business Intelligence"
      subtitle="Unlock real-time insights and make data-driven decisions with our unified analytics platform. Start optimizing your operations today."
      ctaLabel="Start Free Trial"
      onCtaClick={() => console.log('CTA clicked')}
      periods={dashboardData}
      defaultPeriodId="week"
    />
  );
}
