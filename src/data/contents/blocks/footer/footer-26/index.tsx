import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Facebook01Icon,
  TwitterIcon,
  InstagramIcon,
  Linkedin01Icon,
  Moon02Icon,
} from "@hugeicons/core-free-icons";

const footerLinks = [
  {
    title: "SOLUTIONS",
    links: [
      "Transactional Emails",
      "Marketing Emails",
      "Email Automation",
      "Email Builder",
      "SMTP",
    ],
  },
  {
    title: "DOCS",
    links: [
      "Getting Started",
      "API Reference",
      "Guides",
      "Transactional Emails",
    ],
  },
  {
    title: "RESOURCES",
    links: ["FAQ", "Blog", "Glossary", "Changelog"],
  },
  {
    title: "Legal",
    links: [
      "Fair Use",
      "Terms & Conditions",
      "Subprocessors",
      "Privacy Policy",
    ],
  },
];

export default function Footer26() {
  return (
    <footer className="relative flex min-h-screen w-full flex-col bg-[#01132A] text-[#94A3B8] font-sans antialiased selection:bg-[#FAFAFA] selection:text-[#01132A]">
      {/* Immersive Background Section */}
      <div className="relative flex-1 flex flex-col justify-end w-full">
        <div className="relative w-full">
          <img
            src="https://assets.watermelon.sh/footer-25.avif"
            alt="Sunset over the ocean"
            className="h-auto w-full object-cover"
          />
          {/* Gradient overlay to smoothly blend the bottom of the image into the solid navy footer background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#01132A]/10 to-[#01132A]" />
        </div>
      </div>

      {/* Footer Content Section */}
      <div className="relative z-10 w-full bg-[#01132A]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col px-6 pt-4 pb-6 md:px-12">
          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {/* Left Branding Block (Spans 3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:col-span-3"
            >
              <span className="text-3xl font-serif font-semibold tracking-tight">
                Melon
              </span>
              <p className="mb-6 text-sm leading-relaxed max-w-sm">
                Crafting experiences that inspire and leave a lasting impact
              </p>
              <button className="group flex w-fit items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-[#01132A] hover:border-white">
                Let&apos;s Connect
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </motion.div>

            {/* Center Link Columns (Span 6 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-6 lg:ml-12"
            >
              {footerLinks.map((column) => (
                <div key={column.title} className="flex flex-col gap-4">
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    {column.title}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm transition-colors hover:text-white"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Right 'Stay Connected' Block (Spans 3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col lg:col-span-3 lg:items-start"
            >
              <h3 className="mb-6 text-2xl font-serif text-white">
                Stay Connected
              </h3>
              <p className="mb-8 text-sm leading-relaxed">
                Follow us for updates, insights and a dose of inpiration
              </p>
              <div className="flex gap-4">
                {[
                  Facebook01Icon,
                  TwitterIcon,
                  InstagramIcon,
                  Linkedin01Icon,
                ].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex size-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Social Link"
                  >
                    <HugeiconsIcon icon={Icon} className="size-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm md:flex-row"
          >
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Moon02Icon} className="size-4" />
              <span>We create. You grow.</span>
            </div>

            <p className="text-center">
              © 2026 Watermelon Inc. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <span className="text-white/20">|</span>
              <a href="#" className="transition-colors hover:text-white">
                Terms & Conditions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
