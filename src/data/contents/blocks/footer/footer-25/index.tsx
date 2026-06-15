import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

export default function Footer25() {
  return (
    <footer className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-black text-[#FAFAFA] font-sans antialiased selection:bg-[#FAFAFA] selection:text-black">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://assets.watermelon.sh/footer-24.avif"
          alt="Vibrant Gradient Background"
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />
        {/* Gradient overlay to smoothly transition the black top into the vibrant bottom */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/60 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-6 py-16 md:px-12 md:py-20 lg:py-24">
        
        {/* Top Section */}
        <div className="flex flex-col gap-16 md:flex-row md:justify-between lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <a href="#" className="text-3xl font-semibold tracking-tight transition-opacity hover:opacity-70 sm:text-4xl">Work</a>
            <a href="#" className="text-3xl font-semibold tracking-tight transition-opacity hover:opacity-70 sm:text-4xl">Studio</a>
            <a href="#" className="text-3xl font-semibold tracking-tight transition-opacity hover:opacity-70 sm:text-4xl">Contact</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full max-w-sm flex-col md:max-w-md"
          >
            <p className="mb-8 text-xl text-zinc-200 md:text-2xl">
              Get industry insights and creative <br className="hidden sm:block" /> inspiration straight to your inbox.
            </p>
            <form className="relative flex items-center justify-between border-b border-white/20 pb-4 transition-colors focus-within:border-white">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent text-lg text-white placeholder-zinc-500 outline-none"
              />
              <button
                type="submit"
                className="text-zinc-400 transition-colors hover:text-white"
              >
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-6" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Middle Section (Socials) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 mb-16 flex items-center justify-between"
        >
          {/* Horizontal line extending from the left */}
          <div className="hidden h-px flex-1 bg-white/20 md:block md:mr-16 lg:mr-32" />
          
          <div className="flex w-full flex-wrap items-center justify-between gap-6 md:w-auto md:justify-end sm:gap-8 lg:gap-12">
            {["INSTAGRAM", "FACEBOOK", "TWITTER", "BEHANCE"].map((social) => (
              <a
                key={social}
                href="#"
                className="group flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-zinc-200 transition-colors hover:text-white sm:text-sm"
              >
                {social}
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section (Massive Logo) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-auto mb-10 w-full"
        >
          <svg 
            viewBox="0 0 1040 200" 
            className="h-auto w-full fill-current text-white" 
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M0 0 H200 V200 H160 V68 L28 200 L0 172 L132 40 H0 V0 Z" />
            <text 
              x="245" 
              y="185" 
              fontSize="230" 
              fontWeight="bold" 
              fontFamily="inherit" 
              letterSpacing="-0.02em"
              textLength="795"
            >
              MELON
            </text>
          </svg>
          <h1 className="sr-only">MELON</h1>
        </motion.div>

        {/* Footer Meta */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start justify-between gap-4 text-white md:flex-row md:items-end"
        >
          <p className="max-w-3xl leading-relaxed">
            © 2026 Melon Inc. <br /> Registered with FLAREON cards issued by Peoples Trust Company and Community <br className="hidden lg:block" />
            FLAREON Savings Bank (USA) under license from Visa.
          </p>
          <div className="flex items-center gap-8 whitespace-nowrap font-medium">
            <a href="#" className="transition-colors hover:text-white">Press and Media</a>
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}