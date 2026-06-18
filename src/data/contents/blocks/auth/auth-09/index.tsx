import { motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

// Simple Google SVG Icon
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

export default function Auth9() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <div className="flex min-h-screen w-full flex-col bg-white font-sans text-neutral-950 antialiased selection:bg-blue-500/30 selection:text-neutral-900 lg:flex-row">
      {/* Left Image Panel */}
      <div className="relative flex w-full flex-col justify-between overflow-hidden p-8 md:p-12 lg:w-1/2 min-h-[40vh] lg:min-h-screen">
        {/* Background Image */}
        <img
          src="https://assets.watermelon.sh/auth-9.avif"
          alt="Abstract blue background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="md:text-lg lg:text-xl font-semibold tracking-tight text-white">Watermelon</span>

          <a
            href="#"
            className="flex items-center gap-2 text-xs md:text-sm lg:text-base font-medium text-white/90 transition-colors hover:text-white"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
            Back to Website
          </a>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10 mt-12 lg:mt-0">
          <h1 className="mb-4 max-w-xl text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Where Innovation
            <br />
            Meets Impact.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
            Watermelon empowers teams to build, scale, and transform with
            technology that drives real results.
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
          {/* Titles */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="mb-2 text-3xl font-medium tracking-tight text-neutral-900">
              Create your Account
            </h2>
            <p className="text-[15px] text-neutral-500">
              Let&apos;s get started with your 30 days free trial
            </p>
          </motion.div>

          {/* Google Login Button */}
          <motion.div variants={itemVariants} className="mb-6">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 active:bg-neutral-100"
            >
              <GoogleIcon className="text-lg" />
              Login with Google
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="relative mb-6 flex items-center"
          >
            <div className="grow border-t border-neutral-200"></div>
            <span className="px-4 text-[13px] text-neutral-400">or</span>
            <div className="grow border-t border-neutral-200"></div>
          </motion.div>

          {/* Form */}
          <form className="flex flex-col gap-4">
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1.5"
            >
              <label
                htmlFor="name"
                className="text-sm font-medium text-neutral-900"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1.5"
            >
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-900"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1.5"
            >
              <label
                htmlFor="password"
                className="text-sm font-medium text-neutral-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </motion.div>

            {/* Checkbox */}
            <motion.div
              variants={itemVariants}
              className="mt-1 flex items-start gap-3"
            >
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-600"
                />
              </div>
              <label htmlFor="terms" className="text-sm text-neutral-600">
                I agree to all Terms, Privacy Policy and Fees
              </label>
            </motion.div>

            {/* Sign Up Button */}
            <motion.div variants={itemVariants} className="mt-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                Sign Up
              </button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-6 text-[13px] text-neutral-600"
          >
            Already have an account?{" "}
            <a
              href="#"
              className="font-semibold text-neutral-900 hover:underline"
            >
              Log in
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
