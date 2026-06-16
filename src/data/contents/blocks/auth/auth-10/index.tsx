"use client";

import { motion, type Variants } from "motion/react";

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

export default function Auth10() {
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
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#050505] font-sans text-neutral-200 antialiased selection:bg-blue-500/30 selection:text-white lg:flex-row">
      {/* Left Image Panel */}
      <div className="relative flex w-full flex-col justify-between overflow-hidden p-8 md:p-12 lg:w-1/2 min-h-[50vh] lg:min-h-screen">
        {/* Background Image */}
        <img
          src="https://assets.watermelon.sh/auth-10.avif"
          alt="Abstract gradient background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Top Header */}
        <div className="relative z-10 flex w-full items-center justify-center pt-4">
          <span className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-tight text-black">Watermelon</span>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10 mb-8 flex w-full flex-col items-center justify-center text-center">
          <p className="mb-4 text-base md:text-lg lg:text-xl font-medium text-white/90">
            You can easily
          </p>
          <h1 className="text-2xl font-medium leading-[1.2] tracking-tight text-white md:text-4xl lg:text-5xl">
            Get access your personal
            <br />
            hub for clarity and
            <br />
            productivity
          </h1>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex w-full flex-col items-center justify-center p-6 sm:p-12 lg:w-1/2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md md:max-w-lg xl:max-w-xl"
        >
          {/* Titles */}
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-3xl font-medium tracking-tight text-white">
              Get Started Now
            </h2>
          </motion.div>

          {/* Form */}
          <form className="flex flex-col gap-5">
            {/* Name */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-neutral-200"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-xl border border-neutral-800 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-neutral-600 focus:bg-[#111] focus:outline-none focus:ring-1 focus:ring-neutral-600"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-200"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-neutral-800 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-neutral-600 focus:bg-[#111] focus:outline-none focus:ring-1 focus:ring-neutral-600"
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
                placeholder="***********"
                className="w-full rounded-xl border border-neutral-800 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-neutral-600 focus:bg-[#111] focus:outline-none focus:ring-1 focus:ring-neutral-600"
              />
            </motion.div>

            {/* Checkbox */}
            <motion.div
              variants={itemVariants}
              className="mt-2 flex items-center gap-3"
            >
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-700 bg-transparent text-[#0275d8] focus:ring-[#0275d8] focus:ring-offset-0"
              />
              <label htmlFor="terms" className="text-[13px] text-neutral-300">
                I agree to the{" "}
                <a href="#" className="underline hover:text-white">
                  terms & policy
                </a>
              </label>
            </motion.div>

            {/* Sign Up Button */}
            <motion.div variants={itemVariants} className="mt-4">
              <button
                type="submit"
                className="w-full rounded-[14px] bg-[#0c74b4] py-3.5 text-sm font-medium text-white transition-all hover:bg-[#0a6299] active:scale-[0.98]"
              >
                Signup
              </button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="relative my-8 flex items-center"
          >
            <div className="grow border-t border-neutral-800"></div>
            <span className="px-4 text-[13px] text-neutral-500">Or</span>
            <div className="grow border-t border-neutral-800"></div>
          </motion.div>

          {/* Social Buttons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4"
          >
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-xl border border-neutral-700 bg-transparent py-3 text-[13px] font-medium text-white transition-colors hover:bg-neutral-900"
            >
              <GoogleIcon className="text-lg" />
              Sign in with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-xl border border-neutral-700 bg-transparent py-3 text-[13px] font-medium text-white transition-colors hover:bg-neutral-900"
            >
              <AppleIcon className="text-lg" />
              Sign in with Apple
            </button>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center text-[13px] text-neutral-400"
          >
            Have an account?{" "}
            <a
              href="#"
              className="font-semibold text-[#0c74b4] hover:underline"
            >
              Sign In
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
