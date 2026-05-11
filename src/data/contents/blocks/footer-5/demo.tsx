import {
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeadset,
  FaInfinity,
} from "react-icons/fa6";
import { Footer5 } from "./index";

export default function Footer5Demo() {
  const socialLinks = [
    { icon: <FaXTwitter className="w-4 h-4" />, href: "#", label: "Twitter" },
    {
      icon: <FaInstagram className="w-4 h-4" />,
      href: "#",
      label: "Instagram",
    },
    {
      icon: <FaLinkedinIn className="w-4 h-4" />,
      href: "#",
      label: "LinkedIn",
    },
  ];

  const contactCta = {
    icon: <FaHeadset className="w-5 h-5" />,
    title: "Talk to our sales team",
    description: "Our specialists typically respond within 2 hours.",
    href: "#",
  };

  const linkGroups = [
    {
      title: "Products",
      links: [
        { label: "Workflow Engine", href: "#" },
        { label: "Data Pipeline", href: "#" },
        { label: "Analytics Suite", href: "#" },
      ],
    },
    {
      title: "Learn",
      links: [
        { label: "Tutorials", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "API Docs", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQ", href: "#" },
        { label: "Live Chat", href: "#" },
        { label: "Status Page", href: "#" },
      ],
    },
  ];

  const legalLinks = [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ];

  return (
    <div className="w-full">
      <Footer5
        logo={<FaInfinity className="w-6 h-6" />}
             brandName="Lumina"
        topNavLabel="Connect"
        socialLinks={socialLinks}
        contactCta={contactCta}
        linkGroups={linkGroups}
        brandWatermark="orbitra"
        copyright="© 2026 Orbitra Systems. All rights reserved."
        legalLinks={legalLinks}
      />
    </div>
  );
}
