
import LogoIcon from '@/assets/logo-icon';
import { Footer29 } from './index';

export default function Footer29Demo() {
  return (
    <div className="w-full">
      <Footer29
        logo={ <LogoIcon className="h-6 w-6 text-olive-600" />}
        brandName="Watermelon"
        newsletterPlaceholder="Enter Your Email"
        newsletterButtonText="Subscribe"
        backgroundImage="https://assets.watermelon.sh/bg-footer-29.avif"
        linkGroups={[
          {
            title: 'SOLUTIONS',
            links: [
              { label: 'Transactional Emails', href: '#' },
              { label: 'Marketing Emails', href: '#' },
              { label: 'Email Automation', href: '#' },
              { label: 'SMTP', href: '#' },
              { label: 'Email Builder', href: '#' },
            ],
          },
          {
            title: 'DOCS',
            links: [
              { label: 'Getting Started', href: '#' },
              { label: 'API Reference', href: '#' },
              { label: 'Guides', href: '#' },
              { label: 'Transactional Emails', href: '#' },
              { label: 'Phishing Emails', href: '#' },
            ],
          },
          {
            title: 'RESOURCES',
            links: [
              { label: 'FAQ', href: '#' },
              { label: 'Blog', href: '#' },
              { label: 'Glossary', href: '#' },
              { label: 'Changelog', href: '#' },
            ],
          },
          {
            title: 'LEGAL',
            links: [
              { label: 'Fair Use', href: '#' },
              { label: 'Privacy Policy', href: '#' },
              { label: 'Terms & Conditions', href: '#' },
              { label: 'Subprocessors', href: '#' },
            ],
          },
        ]}
      />
    </div>
  );
}
