import { Footer11 } from '.';

export default function Footer11Demo() {
  const navLinks = [
    { label: 'Products', href: '#' },
    { label: 'Company', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <div className="flex  w-full items-end justify-center bg-zinc-950">
      <Footer11
        badgeText="Loved by Creators"
        heading="Want to collaborate with us, explore our tools or just curious to know more?"
        contactLabel="Reach out at:"
        contactEmail="hello@watermelon.io"
        contactEmailHref="mailto:hello@watermelon.io"
        navLinks={navLinks}
        brandName="Watermelon"
      />
    </div>
  );
}
