import { Hero4 } from '.';

export default function Hero4Demo() {
  return (
    <div className="flex  w-full flex-col justify-center bg-slate-950">
      <Hero4
        logoText="Watermelon"
        navItems={[
          { label: 'Products', href: '#' },
          { label: 'Solutions', href: '#' },
          { label: 'Pricing', href: '#' },
          { label: 'Resources', href: '#' },
        ]}
        signInText="Sign in"
        signInHref="#"
        getStartedText="Get Started"
        getStartedHref="#"
        badgeText="CRAFTED FOR TOMORROW"
        titleLine1="Where Creativity"
        titleLine2Start="Meets"
        titleLine2Accent="Brilliance"
        description="Watermelon helps teams design, prototype, and ship with cutting-edge tools that turn bold ideas into lasting digital experiences."
        primaryCtaText="Get Started"
        primaryCtaHref="#"
        secondaryCtaText="Watch Demo"
        secondaryCtaHref="#"
        backgroundImage="https://assets.watermelon.sh/hero-4-bg.avif"
      />
    </div>
  );
}
