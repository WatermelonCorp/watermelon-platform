import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserCircleIcon,
  Mail01Icon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffIcon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";

// Social SVGs
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="currentColor"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"
      fill="currentColor"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"
      fill="currentColor"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="currentColor"
    />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const GitlabIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.918 1.263c-.137-.423-.73-.423-.866 0L1.388 9.452.045 13.587c-.12.37.014.787.318 1.005l11.637 8.448 11.637-8.448c.304-.218.438-.635.318-1.005z" />
  </svg>
);

export default function Auth8() {
  const [showPassword, setShowPassword] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-[#050505] font-sans text-white antialiased selection:bg-red-500/30 selection:text-white">
      {/* Left Image Panel */}
      <div className="relative flex w-full flex-col justify-between overflow-hidden min-h-[40vh] lg:min-h-screen lg:w-1/2">
        {/* Background Image */}
        <img
          src="https://assets.watermelon.sh/auth-8.avif"
          alt="Vibrant abstract background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between p-10">
          {/* Asterisk Logo */}
          <div className="flex h-8 w-8 items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-full w-full text-white"
            >
              <path d="M12 2v20" />
              <path d="M4.93 4.93l14.14 14.14" />
              <path d="M2 12h20" />
              <path d="M4.93 19.07L19.07 4.93" />
            </svg>
          </div>

          <a
            href="#"
            className="flex items-center gap-2 text-sm md:text-base lg:text-lg font-medium text-white/80 transition-colors hover:text-white"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
            Back
          </a>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10 p-10 pb-20">
          <h1 className="mb-6 text-5xl font-semibold leading-[1.1] tracking-tight text-white xl:text-6xl">
            Speed up your work<br />
            with our Web App
          </h1>
          <p className="max-w-lg text-lg text-white/90">
            Watermelon empowers teams to build, scale, and transform with technology that drives real results.
          </p>
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
          {/* Social Register */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="mb-4 text-center text-sm font-medium text-neutral-300">
              Register with:
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#141414] py-3 text-sm font-medium text-white transition-colors hover:bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-neutral-700"
              >
                <GoogleIcon className="size-4" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#141414] py-3 text-sm font-medium text-white transition-colors hover:bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-neutral-700"
              >
                <GithubIcon className="size-4" />
                Github
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#141414] py-3 text-sm font-medium text-white transition-colors hover:bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-neutral-700"
              >
                <GitlabIcon className="size-4" />
                Gitlab
              </button>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8 flex items-center"
          >
            <div className="grow border-t border-neutral-800"></div>
            <span className="px-4 text-sm text-neutral-400">Or</span>
            <div className="grow border-t border-neutral-800"></div>
          </motion.div>

          {/* Form */}
          <form className="flex flex-col gap-5">
            {/* Username */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-neutral-200"
              >
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-500">
                  <HugeiconsIcon icon={UserCircleIcon} className="size-5" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  className="w-full rounded-lg border border-transparent bg-[#111111] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-700 focus:bg-[#161616] focus:outline-none focus:ring-1 focus:ring-neutral-700"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-200"
              >
                Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-500">
                  <HugeiconsIcon icon={Mail01Icon} className="size-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-transparent bg-[#111111] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-700 focus:bg-[#161616] focus:outline-none focus:ring-1 focus:ring-neutral-700"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-neutral-200"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-500">
                  <HugeiconsIcon icon={LockPasswordIcon} className="size-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-lg border border-transparent bg-[#111111] py-3.5 pl-11 pr-11 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-700 focus:bg-[#161616] focus:outline-none focus:ring-1 focus:ring-neutral-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-500 hover:text-neutral-300"
                  aria-label="Toggle password visibility"
                >
                  <HugeiconsIcon icon={showPassword ? ViewIcon : ViewOffIcon} className="size-5" />
                </button>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Minimum length is 8 characters.
              </p>
            </motion.div>

            {/* Sign Up Button */}
            <motion.div variants={itemVariants} className="mt-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-[#DC2626] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#b91c1c] active:scale-[0.98]"
              >
                Sign Up
              </button>
            </motion.div>
          </form>

          {/* Footer Terms */}
          <motion.div
            variants={itemVariants}
            className="mt-6 text-[13px] leading-relaxed text-neutral-400"
          >
            By creating an account, you agree to the{" "}
            <a href="#" className="underline hover:text-white">
              Terms of Service
            </a>
            . We&apos;ll occasionally send you account-related emails.
          </motion.div>

          {/* Bottom Login Link */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center text-sm text-neutral-300"
          >
            Already have an account?{" "}
            <a href="#" className="font-semibold text-[#DC2626] hover:underline">
              Login
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
