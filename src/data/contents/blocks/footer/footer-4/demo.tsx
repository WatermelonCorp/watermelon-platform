import {
  FaBoltLightning,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { Footer4 } from './index';
import LogoIcon from '@/assets/logo-icon';

export default function Footer4Demo() {
  const linkGroups = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Integrations', href: '#' },
        { label: 'Changelog', href: '#' },
        { label: 'Roadmap', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press Kit', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'Status', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaXTwitter className="h-4 w-4" />, href: '#', label: 'X' },
    { icon: <FaGithub className="h-4 w-4" />, href: '#', label: 'GitHub' },
    {
      icon: <FaLinkedinIn className="h-4 w-4" />,
      href: '#',
      label: 'LinkedIn',
    },
    { icon: <FaYoutube className="h-4 w-4" />, href: '#', label: 'YouTube' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Settings', href: '#' },
  ];

  return (
    <div className="w-full ">
      <Footer4
        logo={<LogoIcon className="size-8" />}
        brandName="Watermelon"
        badge={{
          icon: <FaBoltLightning className="h-3 w-3" />,
          label: 'Now in public beta',
        }}
        tagline="Ship faster. Break nothing. Scale fearlessly."
        description="Stratum gives every engineering team the observability, deployment pipelines, and incident tooling they need to move at full speed — safely."
        newsletterTitle="Stay in the loop"
        newsletterSubtitle="Get product updates, engineering deep-dives, and early feature access."
        newsletterPlaceholder="you@watermelon.com"
        newsletterButtonLabel="Subscribe"
        linkGroups={linkGroups}
        socialLinks={socialLinks}
        legalLinks={legalLinks}
        copyright="© 2026 Watermelon, Inc. All rights reserved."
      />
    </div>
  );
}
