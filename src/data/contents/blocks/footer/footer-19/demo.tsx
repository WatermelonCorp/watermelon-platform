import Footer19 from "./index";
import LogoIcon from "@/assets/logo-icon";

export default function Footer19Demo() {
  const customNavColumns = [
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: "#" },
        { label: "Our Story", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
    {
      title: "PLATFORM",
      links: [
        { label: "UI Blocks", href: "#" },
        { label: "Vite App Templates", href: "#" },
        { label: "Framer Motion", href: "#" },
        { label: "Pricing Plan", href: "#" },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Contact Sales", href: "#" },
        { label: "System Status", href: "#" },
        { label: "Registry API", href: "#" },
      ],
    },
  ];

  const customSocialLinks = [
    { label: "Instagram", href: "https://instagram.com/watermelon" },
    { label: "Linkedin", href: "https://linkedin.com/company/watermelon" },
    { label: "Github", href: "https://github.com/watermelon" },
  ];

  return (
    <div className="flex w-full items-end bg-neutral-950">
      <Footer19
        badgeText="ENGINEERED FOR MODERN TEAMS"
        newsletterHeading={"The latest blocks,\ncomponents, and updates,\nin your inbox weekly."}
        newsletterPlaceholder="Enter your developer email"
        newsletterButtonText="Stay Updated"
        brandName="Watermelon"
        brandLogo={
          <LogoIcon className="text-violet-500 size-8" />
        }
        navColumns={customNavColumns}
        copyright="© 2026 Watermelon Labs, Inc. All rights reserved."
        location="Brooklyn, NY"
        time="10:45:00 AM"
        socialLinks={customSocialLinks}
      />
    </div>
  );
}
