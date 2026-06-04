import Hero4 from "./index";

export default function Hero13Demo() {
  const customNavLinks = [
    { label: "Solutions", href: "#", hasDropdown: true },
    { label: "Pricing", href: "#", hasDropdown: true },
    { label: "About", href: "#" },
    { label: "Resources", href: "#" },
    { label: "Integration", href: "#" },
  ];

  return (
    <div className="bg-background flex min-h-screen w-full flex-col justify-center">
      <Hero4
        brandName="Watermelon"
        navLinks={customNavLinks}
        loginLabel="Sign in"
        loginHref="#"
        badgeText="✦  Trusted by industry leaders"
        headingLine1="Scale Without"
        headingLine2="The Overhead."
        description="Watermelon empowers modern development teams to build, deploy, and scale serverless infrastructure with premium UI registry components."
        primaryCtaLabel="Get Started"
        primaryCtaHref="#"
        secondaryCtaLabel="Watch Demo"
        secondaryCtaHref="#"
        achievementText="We've completed over 100+ landmark projects"
        backgroundImage="https://assets.watermelon.sh/hero-5.avif"
      />
    </div>
  );
}
