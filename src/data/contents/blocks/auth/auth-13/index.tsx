"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";

// Google SVG Icon
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

export default function Auth13() {
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="flex min-h-screen w-full flex-col bg-white font-sans text-slate-900 antialiased selection:bg-[#FDBA5E]/20 selection:text-[#EFA541] lg:flex-row">
      {/* Left Image Panel */}
      <div className="relative hidden w-full flex-col p-4 lg:flex lg:min-h-screen lg:w-1/2">
        <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-neutral-100 shadow-xl">
          <img
            src="https://assets.watermelon.sh/auth-13.avif"
            alt="Abstract orange and green blurred streaks"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Logo overlay */}
          <div className="absolute top-8 left-8">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 24.5L25 12.5C26 11.5 28 11.5 29 12.5C30 13.5 30 15 29 16L16 28L12 24.5Z" fill="white"/>
              <path d="M10 18.5L23 6.5C24 5.5 26 5.5 27 6.5C28 7.5 28 9 27 10L14 22L10 18.5Z" fill="white"/>
            </svg>
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
          {/* Title */}
          <motion.div variants={itemVariants} className="mb-10">
            <h1 className="mb-4 text-[48px] font-semibold leading-[1.05] tracking-tight text-[#1C222B]">
              Welcome
              <br />
              back
            </h1>
            <p className="text-[15px] text-slate-500 text-balance">
              You need to be signed in to access the project dashboard.
            </p>
          </motion.div>

          <form className="flex flex-col gap-5">
            {/* Email */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[14px] font-medium text-slate-800">
                Email or username
              </label>
              <input
                id="email"
                type="text"
                defaultValue="alex.costa@example.com"
                className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-[#FDBA5E] focus:outline-none focus:ring-1 focus:ring-[#FDBA5E] transition-colors"
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[14px] font-medium text-slate-800">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue="password123"
                  className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 pr-10 text-[14px] font-mono text-slate-900 placeholder:text-slate-400 focus:border-[#FDBA5E] focus:outline-none focus:ring-1 focus:ring-[#FDBA5E] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <HugeiconsIcon icon={showPassword ? ViewIcon : ViewOffIcon} className="size-5" />
                </button>
              </div>
            </motion.div>

            {/* Checkbox & Forgot Password */}
            <motion.div variants={itemVariants} className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2.5">
                <input
                  id="remember"
                  type="checkbox"
                  className="size-[18px] rounded border-slate-300 text-[#FDBA5E] focus:ring-[#FDBA5E] transition-colors"
                />
                <label htmlFor="remember" className="text-[14px] text-slate-600">
                  Keep me signed in
                </label>
              </div>
              <a href="#" className="text-[14px] font-medium text-slate-800 underline decoration-slate-800 underline-offset-4 transition-colors hover:text-black hover:decoration-black">
                Forgot password?
              </a>
            </motion.div>

            {/* Sign in Button */}
            <motion.div variants={itemVariants} className="mt-2">
              <button
                type="submit"
                className="w-full rounded-md bg-[#FDBA5E] py-3 text-[14px] font-medium text-slate-900 transition-transform active:scale-[0.98] hover:bg-[#EFA541]"
              >
                Sign in
              </button>
            </motion.div>
          </form>

          {/* Google Button */}
          <motion.div variants={itemVariants} className="mt-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-md border border-slate-200 bg-white py-3 text-[14px] font-medium text-slate-700 transition-transform active:scale-[0.98] hover:bg-slate-50"
            >
              <GoogleIcon className="size-[18px]" />
              Sign in with Google
            </button>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-10 text-center text-[14px] text-slate-500">
            Haven&apos;t joined yet?{" "}
            <a href="#" className="font-semibold text-slate-800 underline decoration-slate-800 underline-offset-4 transition-colors hover:text-black hover:decoration-black">
              Sign up
            </a>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
