import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Facebook01Icon,
  NewTwitterIcon,
  InstagramIcon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons";

const footerLinks = [
  {
    title: "SOLUTIONS",
    links: [
      { name: "Transactional Emails", href: "#" },
      { name: "Marketing Emails", href: "#" },
      { name: "Email Automation", href: "#" },
      { name: "Email Builder", href: "#" },
      { name: "SMTP", href: "#" },
    ],
  },
  {
    title: "DOCS",
    links: [
      { name: "Getting Started", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Guides", href: "#" },
      { name: "Transactional Emails", href: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { name: "FAQ", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Glossary", href: "#" },
      { name: "Changelog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Fair Use", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "Subprocessors", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

export default function Footer24() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0F4C3A] pb-8 pt-12 text-[#F2F0E6] antialiased md:pt-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"
        >
          <span className="text-2xl font-semibold tracking-wide">WATERMELON</span>
          
          <div className="flex items-center gap-2">
            {[Facebook01Icon, NewTwitterIcon, InstagramIcon, Linkedin01Icon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex size-10 items-center justify-center rounded-full text-[#F2F0E6] transition-all hover:text-white active:scale-[0.96]"
              >
                <HugeiconsIcon icon={Icon} className="size-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <hr className="mb-12 border-white/20" />

        {/* Links Section */}
        <div className="mb-12 flex flex-wrap justify-between gap-x-6 gap-y-10">
          {footerLinks.map((column, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5"
            >
              <h3 className="text-balance text-base font-semibold uppercase tracking-wider text-[#F2F0E6]">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="inline-block text-base text-[#F2F0E6] transition-all hover:text-white hover:underline active:scale-[0.96]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <hr className="border-white/20" />

        {/* Massive Brand Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full justify-center"
        >
          <svg
            className="h-auto w-full"
            viewBox="0 0 1000 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="currentColor"
              className="font-serif text-[280px] text-[#F2F0E6]"
            >
              MELON
            </text>
          </svg>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start justify-between gap-6 text-[#F2F0E6] md:flex-row md:items-end"
        >
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="inline-block text-base transition-all hover:text-white active:scale-[0.96]">Legal</a>
            <a href="#" className="inline-block text-base transition-all hover:text-white active:scale-[0.96]">Privacy Policy</a>
            <a href="#" className="inline-block text-base transition-all hover:text-white active:scale-[0.96]">Status</a>
          </div>
          
          <div className="text-left md:text-right">
            <p className="text-base">© 2026 Watermelon Inc.</p>
            <p className="text-base">All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}