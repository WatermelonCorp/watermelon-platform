import Footer17 from "./index";

export default function Footer17Demo() {
  const customNavColumns = [
    {
      title: "Menu",
      links: [
        { label: "About Us", href: "#" },
        { label: "Our Platform", href: "#" },
        { label: "Core Philosophy", href: "#" },
        { label: "Contact Sales", href: "#" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "UI Registry", href: "#" },
        { label: "Design System", href: "#" },
        { label: "Vite Templates", href: "#" },
        { label: "Documentation", href: "#" },
      ],
    },
    {
      title: "Office",
      links: [
        { label: "26 Broadway, 8th floor", href: "#" },
        { label: "New York, NY 10004", href: "#" },
        { label: "United States", href: "#" },
      ],
    },
  ];

  const customSocialLinks = [
    { label: "LINKEDIN", href: "https://linkedin.com/company/watermelon" },
    { label: "TWITTER", href: "https://twitter.com/watermelon" },
    { label: "GITHUB", href: "https://github.com/watermelon" },
    { label: "DRIBBBLE", href: "#" },
  ];

  const customBottomLinks = [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Security", href: "#" },
  ];

  return (
    <div className="flex w-full items-end bg-neutral-950">
      <Footer17
        heading={"Connect\nwith us."}
        brandName="Watermelon"
        navColumns={customNavColumns}
        socialLinks={customSocialLinks}
        legalText="© 2026 Watermelon Corp. — Premium UI components and building blocks that accelerate developer workflows. All rights reserved."
        bottomLinks={customBottomLinks}
      />
    </div>
  );
}
