import {
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTerminal,
} from 'react-icons/fa6';
import { Footer6 } from '.';

export default function Footer6Demo() {
  const socialLinks = [
    { icon: <FaXTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
    { icon: <FaGithub />, href: '#', label: 'GitHub' },
  ];

  const linkGroups = [
    {
      title: 'ARCHITECTURE',
      links: [
        { label: 'Core Platform', href: '#' },
        { label: 'Developer SDK', href: '#' },
        { label: 'UI Block Library', href: '#' },
        { label: 'CLI Tools', href: '#' },
        { label: 'Security & Audits', href: '#' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Quickstarts', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'Changelog', href: '#' },
        { label: 'System Status', href: '#' },
      ],
    },
    {
      title: 'CONNECT',
      links: [
        { label: 'Discord Server', href: '#' },
        { label: 'GitHub Org', href: '#' },
        { label: 'Developer Forum', href: '#' },
        { label: 'X Community', href: '#' },
        { label: 'Events & Meetups', href: '#' },
      ],
    },
    {
      title: 'ORGANIZATION',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact Sales', href: '#' },
        { label: 'Press Kit', href: '#' },
        { label: 'Brand Assets', href: '#' },
      ],
    },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ];

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center py-12">
      <Footer6
        logo={<FaTerminal className="text-primary h-5 w-5" />}
        brandName="Watermelon"
        tagLine="WATERMELON CORP"
        headline="Building the foundation for modular web architectures."
        description="Watermelon is the open-source block ecosystem for modern web applications. Engineered for exceptional performance, absolute type-safety, and seamless dark and light mode adaptiveness."
        inputPlaceholder="Enter your email"
        buttonText="Stay Updated"
        statusText="ENGINE POWERED BY WATERMELON PROTOCOL."
        statusTag="WATERMELON CORP"
        brandSubtitle="The architectural layer for high-end React UI blocks. Fast, customizable, and enterprise-grade."
        copyright="© 2026 Watermelon Labs, Inc. All rights reserved."
        linkGroups={linkGroups}
        legalLinks={legalLinks}
        socialLinks={socialLinks}
      />
    </div>
  );
}
