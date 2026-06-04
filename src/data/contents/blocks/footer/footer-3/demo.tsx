import { FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { Footer3 } from "./index";
import LogoIcon from "@/assets/logo-icon";

export default function Footer3Demo() {
  const socialLinks = [
    { icon: <FaLinkedinIn className="w-4 h-4" />, href: "#" },
    { icon: <FaXTwitter className="w-4 h-4" />, href: "#" },
    { icon: <FaInstagram className="w-4 h-4" />, href: "#" },
  ];

  const linkGroups = [
    {
      title: "Platform",
      links: [
        { label: "Overview", href: "#" },
        { label: "Features", href: "#" },
        { label: "Integrations", href: "#" },
        { label: "Pricing", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "Webinars", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Partners", href: "#" },
      ],
    },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookies", href: "#" },
  ];

  return (
    <div className="w-full ">
      <Footer3
        logo={<LogoIcon className="size-8" />}
        brandName="Watermelon"
        description="Accelerate your digital transformation with our cutting-edge cloud infrastructure and tools."
        socialLinks={socialLinks}
        linkGroups={linkGroups}
        copyright="© 2026 Watermelon. All rights reserved."
        legalLinks={legalLinks}
      />
    </div>
  );
}
