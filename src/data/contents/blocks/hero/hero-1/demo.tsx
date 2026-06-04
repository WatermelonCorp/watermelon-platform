import Hero1 from "./index";

export default function Hero1Demo() {
  const customNavLinks = [
    { label: "Platform", href: "#", active: true },
    { label: "Solutions", href: "#" },
    { label: "Registry", href: "#" },
    { label: "Pricing", href: "#" },
  ];

  const customSocialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com/company/watermelon" },
    { label: "Twitter", href: "https://twitter.com/watermelon" },
    { label: "GitHub", href: "https://github.com/watermelon" },
  ];

  return (
    <div className="bg-background flex min-h-screen w-full flex-col justify-center">
      <Hero1
        brand="Watermelon"
        navLinks={customNavLinks}
        headline={
          <>
            The registry is the code,
            <br />
            delivery is the speed.
          </>
        }
        ctaLabel="Explore Watermelon Platform"
        ctaHref="#"
        description={"Premium UI components and building blocks that accelerate developers' workflows\n and elevate user experiences to next-generation heights."}
        socialLinks={customSocialLinks}
        signInLabel="Sign in"
        signInHref="#"
      />
    </div>
  );
}
