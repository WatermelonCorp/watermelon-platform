import { Hero3 } from '.';

export default function Hero3Demo() {
  const customNavItems = [
    { label: 'Solutions', href: '#', hasDropdown: true },
    { label: 'Technology', href: '#', hasDropdown: true },
    { label: 'Documentation', href: '#' },
    { label: 'Community', href: '#' },
  ];

  const customStats = [
    { value: '250+', label: 'Nodes Deployed' },
    { value: '1.2B', label: 'Queries Processed' },
    { value: '99.9%', label: 'Uptime Guaranteed' },
  ];

  return (
    <div className="bg-background flex  w-full flex-col justify-center">
      <Hero3
        logoText="Watermelon"
        navItems={customNavItems}
        signInText="Sign in"
        signInHref="#"
        tagline="Quantum-powered. Designed for scale."
        titleLine1="Unleashing Potential"
        titleLine2="Across The Cosmos."
        description="We engineer decentralized infrastructure and quantum applications that accelerate compute speeds and unlock next-generation solutions."
        primaryCtaText="Explore Platform"
        primaryCtaHref="#"
        secondaryCtaText="Request Access"
        secondaryCtaHref="#"
        backgroundImage="https://assets.watermelon.sh/hero-3-bg.avif"
        stats={customStats}
        scrollText="Scroll to Discover"
        scrollHref="#"
      />
    </div>
  );
}
