import { FaInfinity } from "react-icons/fa6";
import { Footer1 } from "./index";

export default function Footer1Demo() {
  const linkGroups = [
    {
      title: "Solutions",
      links: [
        { label: "Analytics", href: "#" },
        { label: "Marketing", href: "#" },
        { label: "Commerce", href: "#" },
        { label: "Insights", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Guides", href: "#" },
        { label: "API Status", href: "#" },
        { label: "Community", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Twitter", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "GitHub", href: "#" },
        { label: "Discord", href: "#" },
      ],
    },
  ];

  return (
    <div className="w-full">
      <Footer1
        logo={<FaInfinity className="w-6 h-6" />}
        brandName="Lumina"
        newsletterTitle="Stay in the loop."
        newsletterDescription="By subscribing you agree to our Terms & Conditions and Privacy Policy. You can unsubscribe at any time."
        newsletterPlaceholder="Enter your email"
        newsletterButtonText="Subscribe"
        linkGroups={linkGroups}
        copyright="© 2026 Lumina Inc. All rights reserved."
      />
    </div>
  );
}
