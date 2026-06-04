import { Hero2 } from "./index";

export default function Hero2Demo() {
  const customNavLinks = [
    { label: "Home", href: "#", active: true },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" },
    { label: "FAQs", href: "#" },
  ];

  const customSocialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com/company/watermelon" },
    { label: "Twitter", href: "https://twitter.com/watermelon" },
    { label: "GitHub", href: "https://github.com/watermelon" },
  ];

  return (
    <div className="bg-background flex min-h-screen w-full flex-col justify-center">
      <Hero2
        brand="Watermelon"
        navLinks={customNavLinks}
        headline={
          <>
            Automate Smarter,<br />
            Work <span className="italic font-medium font-serif text-[oklch(0.6378_0.1051_172.72)]">Faster.</span>
          </>
        }
        description={"Say goodbye to repetitive tasks. Our AI-driven platform streamlines\nyour workflows so your team can focus on what really matters."}
        primaryCtaLabel="See It In Action"
        primaryCtaHref="#"
        secondaryCtaLabel="Book a demo"
        secondaryCtaHref="#"
        socialLinks={customSocialLinks}
        signInLabel="Sign in"
        signInHref="#"
      />
    </div>
  );
}
