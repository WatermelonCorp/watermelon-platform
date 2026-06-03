import {
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeadset,
} from "react-icons/fa6";
import { Footer5 } from "./index";
import LogoIcon from "@/assets/logo-icon";

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
    <div className="w-full h-full flex items-center justify-center">
      <Footer5
        logo={<LogoIcon className="size-8 " />}
        brandName="Melon"
        topNavLabel="Connect"
        socialLinks={socialLinks}
        contactCta={contactCta}
        linkGroups={linkGroups}
        brandWatermark="Melon"
        copyright="© 2026 Watermelon. All rights reserved."
        legalLinks={legalLinks}
      />
    </div>
  );
}
