import Footer18 from "./index";

export default function Footer18Demo() {
  const customFeatures = [
    { label: "Component Registry", href: "#" },
    { label: "Core Blocks", href: "#" },
    { label: "Framer Motion Templates", href: "#" },
    { label: "Vite Infrastructure", href: "#" },
    { label: "Tailwind V4 Styling", href: "#" },
    { label: "Integrations", href: "#" },
  ];

  const customRecites = [
    { label: "Platform Blog", href: "#" },
    { label: "Developer Docs", href: "#" },
    { label: "Design Guide", href: "#" },
    { label: "Changelog", href: "#" },
  ];

  const customPricing = [
    { label: "Enterprise Pricing", href: "#" },
    { label: "Security & SLA", href: "#" },
  ];

  const customBottomNav = [
    { label: "COMPONENTS", href: "#" },
    { label: "BLOCKS", href: "#" },
    { label: "DOCUMENTATION", href: "#" },
    { label: "SHOWCASE", href: "#" },
    { label: "SUPPORT", href: "#" },
  ];

  const customSocialLinks = [
    { label: "LINKEDIN", href: "https://linkedin.com/company/watermelon" },
    { label: "TWITTER", href: "https://twitter.com/watermelon" },
    { label: "GITHUB", href: "https://github.com/watermelon" },
  ];

  return (
    <div className="flex w-full items-end bg-neutral-950">
      <Footer18
        newsletterHeading={"Subscribe to our\nnewsletter"}
        newsletterPlaceholder="Email address"
        brandName="Watermelon"
        features={customFeatures}
        recites={customRecites}
        pricing={customPricing}
        exploreText="Explore Registry"
        exploreHref="#"
        trialText="Start Free Trial"
        trialHref="#"
        address={
          <>
            606 4th Street SW, Suite 1100<br />
            Calgary, Alberta, T2P 1T1, Canada
          </>
        }
        bottomNav={customBottomNav}
        socialLinks={customSocialLinks}
      />
    </div>
  );
}
