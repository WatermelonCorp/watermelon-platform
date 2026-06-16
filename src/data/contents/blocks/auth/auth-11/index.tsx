'use client';

import { motion, type Variants } from 'motion/react';

// Custom Google SVG Icon
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

// Custom Apple SVG Icon
const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z" />
  </svg>
);

export default function Auth11() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#050505] font-sans text-neutral-200 antialiased selection:bg-white/20 selection:text-white lg:flex-row">
      {/* Left Image Panel */}
      <div className="relative hidden w-full flex-col justify-end p-4 lg:flex lg:min-h-screen lg:w-1/2">
        {/* Background Image Wrapper */}
        <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 shadow-2xl">
          <img
            src="https://assets.watermelon.sh/auth-11.avif"
            alt="Serene landscape with a lone tree"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/20 to-transparent" />

          {/* Bottom Content within the image */}
          <div className="absolute right-0 bottom-0 left-0 z-10 flex w-full flex-col items-center justify-center pb-12 text-center">
            <h1 className="text-3xl font-medium tracking-tight text-balance text-white md:text-4xl lg:text-5xl">
              Move fast. Feel Free
            </h1>
            {/* Pagination Indicators */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="h-1 w-6 rounded-full bg-white"></div>
              <div className="h-1 w-1.5 rounded-full bg-white/40"></div>
              <div className="h-1 w-1.5 rounded-full bg-white/40"></div>
              <div className="h-1 w-1.5 rounded-full bg-white/40"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex w-full flex-col items-center justify-center p-6 sm:p-12 lg:w-1/2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[400px]"
        >
          {/* Titles */}
          <motion.div variants={itemVariants} className="mb-10 text-center">
            <h2 className="text-3xl leading-tight font-medium tracking-tight text-balance text-white md:text-[40px]">
              Create your own AI
              <br />
              workforce{' '}
              <span className="font-serif font-light italic">faster.</span>
            </h2>
          </motion.div>

          {/* Social Buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-8 grid grid-cols-2 gap-4"
          >
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#141414] py-3 text-[13px] font-medium text-white transition-transform hover:bg-[#1f1f1f] active:scale-[0.96]"
            >
              <GoogleIcon className="text-[16px]" />
              Continue with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#141414] py-3 text-[13px] font-medium text-white transition-transform hover:bg-[#1f1f1f] active:scale-[0.96]"
            >
              <AppleIcon className="text-[16px]" />
              Continue with Apple
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8 flex items-center"
          >
            <div className="grow border-t border-white/10"></div>
            <span className="px-4 text-[11px] font-medium tracking-wider text-neutral-500 uppercase">
              Or
            </span>
            <div className="grow border-t border-white/10"></div>
          </motion.div>

          {/* Form */}
          <form className="flex flex-col gap-5">
            {/* Email */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-200"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-[14px] border border-white/10 bg-[#0A0A0A] px-4 py-3.5 text-sm text-white transition-colors placeholder:text-neutral-500 focus:border-neutral-500 focus:bg-[#111] focus:ring-1 focus:ring-neutral-500 focus:outline-none"
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-neutral-200"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-[14px] border border-white/10 bg-[#0A0A0A] px-4 py-3.5 text-sm text-white transition-colors placeholder:text-neutral-500 focus:border-neutral-500 focus:bg-[#111] focus:ring-1 focus:ring-neutral-500 focus:outline-none"
              />
            </motion.div>

            {/* Sign Up Button */}
            <motion.div variants={itemVariants} className="mt-4">
              <button
                type="submit"
                className="w-full rounded-full bg-[#EAEAEA] py-3.5 text-sm font-medium text-black shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-transform hover:bg-white active:scale-[0.96]"
              >
                Create account
              </button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-6 text-[13px] text-neutral-400"
          >
            Already have an account?{' '}
            <a href="#" className="font-bold text-white hover:underline">
              Log in
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
