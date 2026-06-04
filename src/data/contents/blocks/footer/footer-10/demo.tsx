import { Footer10 } from './index';

export default function Footer10Demo() {
  const linkColumns = [
    {
      title: 'Platform',
      links: [
        { label: 'Overview', href: '#' },
        { label: 'Features', href: '#' },
        { label: 'Integrations', href: '#' },
        { label: 'Pricing', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Support', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
    },
  ];

  return (
    <div className="bg-background flex w-full flex-col justify-end">
      <Footer10
        bannerBackgroundImage="https://assets.watermelon.sh/footer-10-bg.avif"
        linkColumns={linkColumns}
        onSubscribe={(email) => console.log('Subscribed:', email)}
      />
    </div>
  );
}
