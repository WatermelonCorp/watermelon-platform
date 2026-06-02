import { Footer8 } from '.';

export default function Footer8Demo() {
  const linkColumns = [
    {
      links: [
        { label: 'About', href: '#' },
        { label: 'Work', href: '#' },
        { label: 'Services', href: '#' },
        { label: 'Testimonials', href: '#' },
      ],
    },
    {
      links: [
        { label: 'Linkedin', href: '#' },
        { label: 'X (Twitter)', href: '#' },
        { label: 'Instagram', href: '#' },
      ],
    },
  ];

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center">
      <Footer8
        tagline="Let's build something great"
        email="contact@novacraft.io"
        emailHref="mailto:contact@novacraft.io"
        backgroundImage="https://assets.watermelon.sh/footer-8-bg.avif"
        personInfo={{
          name: 'Elena Vasquez',
          role: 'Creative Director',
          location: 'Brooklyn, NY',
        }}
        linkColumns={linkColumns}
        copyright="© 2026 novacraft"
      />
    </div>
  );
}
