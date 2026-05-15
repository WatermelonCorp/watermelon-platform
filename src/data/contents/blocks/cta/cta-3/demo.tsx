'use client';

import Cta3 from './index';
import {
  MdDashboard,
  MdGroup,
  MdCode,
  MdForum,
  MdTrendingUp,
  MdVerifiedUser,
} from 'react-icons/md';

export default function DemoPage() {
  return (
    <Cta3
      badgeText="Just launched"
      headline={
        <>
          Design systems that <span className="text-primary">scale</span>.
        </>
      }
      subtitle="Ship faster with a unified toolkit built for modern product teams."
      primaryCta={{
        label: 'Get started',
        onClick: () => alert('Primary CTA clicked'),
      }}
      secondaryCta={{
        label: 'View demo',
        onClick: () => alert('Secondary CTA clicked'),
      }}
      products={[
        {
          id: 'canvas',
          name: 'Canvas',
          icon: MdDashboard,
        },
        {
          id: 'team',
          name: 'Team',
          icon: MdGroup,
        },
        {
          id: 'dev',
          name: 'DevTools',
          icon: MdCode,
        },
        {
          id: 'chat',
          name: 'Chat',
          icon: MdForum,
        },
        {
          id: 'analytics',
          name: 'Analytics',
          icon: MdTrendingUp,
        },
        {
          id: 'security',
          name: 'Security',
          icon: MdVerifiedUser,
        },
      ]}
    />
  );
}
