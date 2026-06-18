import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import LogoIcon from "@/assets/logo-icon";

// We'll use custom SVGs for the Call and Triangle icons to ensure perfect matching
// without relying on unpredictable Hugeicons exports for these specific shapes.
const CallOutlineIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="currentColor" strokeOpacity="0.2" />
    <path d="M15.05 13.9234L13.9167 15.0163C13.6893 15.2355 13.3364 15.2938 13.0456 15.1587C12.3925 14.8553 11.2335 14.1956 10.1558 13.1179C9.07809 12.0402 8.41846 10.8812 8.11497 10.2281C7.97992 9.93729 8.03824 9.58434 8.25739 9.35694L9.35032 8.22361C9.69614 7.86498 9.77128 7.33083 9.54462 6.88373L8.85213 5.51817C8.56306 4.94806 7.86018 4.71887 7.28475 4.97828L6.44498 5.35697C5.46194 5.79998 4.8876 6.84078 5.0934 7.91007C5.5539 10.3039 6.86173 13.4326 9.44883 16.0197C12.0359 18.6068 15.1646 19.9146 17.5584 20.3751C18.6277 20.5809 19.6685 20.0066 20.1115 19.0235L20.4902 18.1838C20.7496 17.6083 20.5204 16.9055 19.9503 16.6164L18.5848 15.9239C18.1377 15.6972 17.6035 15.7724 17.2449 16.1182L15.05 13.9234Z" fill="currentColor" />
  </svg>
);

const navLinks = [
  { name: "Features", hasDropdown: true },
  { name: "Pricing", hasDropdown: true },
  { name: "About", hasDropdown: false },
  { name: "Resources", hasDropdown: false },
  { name: "FAQs", hasDropdown: false },
];

export default function Cta5() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <footer className="relative w-full bg-[#111113] text-[#FAFAFA] font-sans antialiased selection:bg-[#E56A54] selection:text-white">
      {/* Outer wrapper */}
      <div className="mx-auto flex w-full max-w-[1400px] justify-center px-4 sm:px-8 xl:px-0">
        
        {/* Left Scale */}
        <div
          className="hidden w-8 shrink-0 border-l border-white/10 lg:block"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 8px)`,
          }}
        />

        {/* Inner solid content area */}
        <div className="w-full max-w-[1200px] border-x border-white/10 bg-[#111113]">
          
          {/* Top Navbar */}
          <header className="relative z-50 flex h-20 items-center justify-between border-b border-white/10 px-6 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3">
              <LogoIcon className="size-8"/>
              <span className="text-xl font-medium tracking-tight">Watermelon</span>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href="#"
                  className="flex items-center gap-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                >
                  {link.name}
                  {link.hasDropdown && (
                    <HugeiconsIcon icon={ArrowDown01Icon} className="size-3.5 text-zinc-500" />
                  )}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button className="hidden h-10 items-center justify-center rounded-lg border border-white/20 px-6 text-sm font-medium text-white transition-all hover:bg-white/5 active:scale-[0.96] md:flex">
                Login
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="flex items-center justify-center text-white md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                )}
              </button>
            </div>
          </header>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-b border-white/10 bg-[#111113] md:hidden"
              >
                <nav className="flex flex-col px-6 py-6 sm:px-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href="#"
                      className="flex items-center justify-between py-4 text-base font-medium text-zinc-300 transition-colors hover:text-white"
                    >
                      {link.name}
                      {link.hasDropdown && (
                        <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 text-zinc-500" />
                      )}
                    </a>
                  ))}
                  <button className="mt-6 flex h-12 w-full items-center justify-center rounded-lg border border-white/20 text-base font-medium text-white transition-all hover:bg-white/5 active:scale-[0.96]">
                    Login
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Split Content */}
          <div className="grid grid-cols-1 gap-12 px-8 py-12 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-16">
            
            {/* Left Column (Text & Contact) */}
            <div className="flex flex-col items-start">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 text-sm font-medium uppercase tracking-widest text-[#D36756]"
              >
                WE&apos;RE HERE TO SUPPORT YOU
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8 text-balance text-5xl font-medium leading-[1.1] tracking-tight sm:text-6xl"
              >
                <span className="text-white">Build</span>{" "}
                <span className="text-zinc-400">Better Solutions Today</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10 max-w-md text-balance text-lg text-zinc-400"
              >
                Have an idea in mind? Let&apos;s build meaningful solutions together.
                Reach out and connect with us.
              </motion.p>

              <div className="flex flex-col gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-5"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-white/5 text-white">
                    <HugeiconsIcon icon={Mail01Icon} className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">E-mail</p>
                    <p className="text-base font-medium text-white">connect@watermelon.com</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-5"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-white/5 text-white">
                    <CallOutlineIcon className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Contact Number</p>
                    <p className="text-base font-medium text-white">+1 (347) 829-5612</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column (Form) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-col"
            >
              <div className="mb-10 text-left md:text-center">
                <h2 className="mb-4 text-2xl font-medium text-white sm:text-3xl">Create your account</h2>
                <p className="mx-auto max-w-sm md:text-balance text-sm text-zinc-400">
                  Join a network of visionaries and unlock premium design resources tailored for you.
                </p>
              </div>

              <form className="flex w-full flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2.5">
                  <label className="text-sm font-medium text-zinc-200">Full name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="h-12 w-full rounded-lg border border-white/10 bg-[#18181B] px-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-white/30 focus:bg-[#1A1A1E]"
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <label className="text-sm font-medium text-zinc-200">Email address</label>
                  <input
                    type="email"
                    placeholder="you@gmail.com"
                    className="h-12 w-full rounded-lg border border-white/10 bg-[#18181B] px-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-white/30 focus:bg-[#1A1A1E]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2.5">
                    <label className="text-sm font-medium text-zinc-200">Password</label>
                    <input
                      type="password"
                      placeholder="Choose a password"
                      className="h-12 w-full rounded-lg border border-white/10 bg-[#18181B] px-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-white/30 focus:bg-[#1A1A1E]"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className="text-sm font-medium text-zinc-200">Confirm password</label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="h-12 w-full rounded-lg border border-white/10 bg-[#18181B] px-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-white/30 focus:bg-[#1A1A1E]"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500">
                  Password must be at least 8 characters including number and a special character.
                </p>

                <button
                  type="submit"
                  className="mt-4 h-12 w-full rounded-lg bg-linear-to-b from-[#E56A54] to-[#C9442C] text-sm font-medium text-white transition-all hover:opacity-90 active:scale-[0.98] shadow-[0_2px_10px_rgba(229,106,84,0.3)]"
                >
                  Submit Message
                </button>

                <p className="mt-6 text-center text-sm text-zinc-400">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="font-medium text-white transition-colors hover:text-[#D36756]">
                    Sign Up
                  </a>
                </p>
              </form>
            </motion.div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="border-t border-white/10 px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-[#18181B] p-8 md:flex-row md:p-12 lg:p-16"
            >
              <div className="flex flex-1 flex-col gap-4">
                <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-5xl">
                  Build your app in minutes
                </h2>
                <p className="text-balance text-base text-zinc-400 sm:text-lg">
                  Start building with our free tools and test models <br className="hidden lg:block"/> directly in your app.
                </p>
              </div>
              <button className="h-12 w-full md:w-auto whitespace-nowrap rounded-lg bg-linear-to-b from-[#E56A54] to-[#C9442C] px-8 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-[0.96] shadow-[0_2px_10px_rgba(229,106,84,0.3)]">
                Get Started
              </button>
            </motion.div>
          </div>

        </div>

        {/* Right Scale */}
        <div
          className="hidden w-8 shrink-0 border-r border-white/10 lg:block"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 8px)`,
          }}
        />

      </div>
    </footer>
  );
}