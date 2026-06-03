import {  FaArrowRight } from 'react-icons/fa6';
import { Footer7 } from '.';
import LogoIcon from '@/assets/logo-icon';

export default function Footer7Demo() {
  const linkGroups = [
    {
      title: 'COMPANY',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press Kit', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'SOLUTIONS',
      links: [
        { label: 'Analytics', href: '#' },
        { label: 'Automation', href: '#' },
        { label: 'Integrations', href: '#' },
        { label: 'Enterprise', href: '#' },
      ],
    },
    {
      title: 'SUPPORT',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Documentation', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Status', href: '#' },
      ],
    },
  ];

  return (
    <div className="bg-background flex w-full items-center justify-center">
      <Footer7
        logo={<LogoIcon className="size-8" />}
        brandName="Watermelon"
        badgeText="Loved by Creators"
        headline="Fresh insights, tutorials, and updates delivered to your inbox."
        inputPlaceholder="Enter your email"
        buttonText="Stay Updated"
        buttonIcon={<FaArrowRight />}
        backgroundImage="https://assets.watermelon.sh/footer-7-bg.avif"
        linkGroups={linkGroups}
        brandWatermark="Watermelon."
      />
    </div>
  );
}
