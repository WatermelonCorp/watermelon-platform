import { Footer11 } from '.';

export default function Footer11Demo() {
  const navLinks = [
    { label: 'Products', href: '#' },
    { label: 'Company', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <div className="flex w-full items-end justify-center bg-zinc-950">
      <Footer11
        badgeText="Loved by Creators"
        heading="Want to collaborate with us, explore our tools or just curious to know more?"
        contactLabel="Reach out at:"
        contactEmail="hello@novacrest.io"
        contactEmailHref="mailto:hello@novacrest.io"
        navLinks={navLinks}
        brandName="novacrest.io"
      />
    </div>
  );
}
