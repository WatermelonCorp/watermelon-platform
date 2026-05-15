import { Footer2 } from './index';
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { Hexagon } from 'lucide-react';

export default function Footer2Demo() {
  return (
    <div className="w-full">
      <Footer2
        logo={<Hexagon className="h-6 w-6 fill-current" />}
        brandName="Nexus"
        tagline="Elevating teamwork to unprecedented heights."
        socialText="Connect with us"
        socialLinks={[
          {
            icon: <FaDiscord className="h-4 w-4" />,
            href: '#',
            label: 'Discord',
          },
          {
            icon: <FaXTwitter className="h-4 w-4" />,
            href: '#',
            label: 'X (Twitter)',
          },
          {
            icon: <FaLinkedin className="h-4 w-4" />,
            href: '#',
            label: 'LinkedIn',
          },
          {
            icon: <FaGithub className="h-4 w-4" />,
            href: '#',
            label: 'GitHub',
          },
        ]}
        linkGroups={[
          {
            title: 'Explore',
            links: [
              { label: 'Platform', href: '#' },
              { label: 'Solutions', href: '#' },
              { label: 'Integrations', href: '#' },
              { label: 'Pricing', href: '#' },
              { label: 'Changelog', href: '#' },
            ],
          },
          {
            title: 'Organization',
            links: [
              { label: 'About Us', href: '#' },
              { label: 'Careers', href: '#' },
              { label: 'Legal', href: '#' },
              { label: 'Privacy Policy', href: '#' },
            ],
          },
        ]}
        newsletterSubtitle="The future of work is here."
        newsletterTitle="Join the Nexus platform."
        newsletterPlaceholder="Enter email address"
        newsletterButtonText="Subscribe"
        copyright="© 2026 Nexus Inc. All rights reserved."
        floatingIcon={<Hexagon className="h-full w-full fill-current" />}
      />
    </div>
  );
}
