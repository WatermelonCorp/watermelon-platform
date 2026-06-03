import { Hero5 } from '.';

export default function Hero5Demo() {
  return (
    <div className="flex min-h-screen w-full flex-col justify-center bg-black">
      <Hero5
        logoText="Apex Creative"
        navItems={[
          { label: 'Services', href: '#', hasDropdown: true },
          { label: 'Plans', href: '#', hasDropdown: true },
          { label: 'Company', href: '#' },
          { label: 'Insights', href: '#' },
          { label: 'Help', href: '#' },
        ]}
        loginText="Login"
        loginHref="#"
        titleLine1="Where Vision Shapes"
        titleLine2Accent="Lasting Impressions"
        description="Crafting digital experiences through bold innovation that captivates audiences, elevates brands, and drives meaningful results."
        primaryCtaText="Discover More"
        primaryCtaHref="#"
        secondaryCtaText="Begin Now"
        secondaryCtaHref="#"
        backgroundImage="https://assets.watermelon.sh/hero-5-bg.avif"
        trustedTitle="Trusted By Leading Brands"
        trustedBrands={[
          { name: 'Google' },
          { name: 'Adobe' },
          { name: 'Microsoft' },
          { name: 'Stripe' },
        ]}
      />
    </div>
  );
}
