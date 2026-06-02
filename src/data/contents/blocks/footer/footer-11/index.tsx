import * as React from 'react';
import {
  FaCircle,
  FaArrowUp,
  FaArrowRight,
} from 'react-icons/fa6';

export interface Footer11NavLink {
  label: string;
  href: string;
}

export interface Footer11Props {
  /** Small tagline badge text displayed at top-left */
  badgeText?: string;
  /** Large heading text in the upper section */
  heading?: string;
  /** Label above the contact email */
  contactLabel?: string;
  /** Contact email address displayed */
  contactEmail?: string;
  /** Href for the contact email link */
  contactEmailHref?: string;
  /** Navigation links displayed at bottom-right of upper section */
  navLinks?: Footer11NavLink[];
  /** Brand name displayed in the bottom section */
  brandName?: string;
  /** Custom brand logo element (SVG or ReactNode) */
  brandLogo?: React.ReactNode;
  /** Callback when scroll to top is clicked */
  onScrollToTop?: () => void;
}

export function Footer11({
  badgeText = 'Loved by Creators',
  heading = 'Want to collaborate with us, explore our tools or just curious to know more?',
  contactLabel = 'Reach out at:',
  contactEmail = 'hello@novacrest.io',
  contactEmailHref = 'mailto:hello@novacrest.io',
  navLinks = [
    { label: 'Products', href: '#' },
    { label: 'Company', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  brandName = 'novacrest.io',
  brandLogo,
  onScrollToTop,
}: Footer11Props) {
  const handleScrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full">
      <div className="relative bg-zinc-950 px-6 pt-8 pb-10 sm:px-10 md:px-16 lg:px-20">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <FaCircle className="h-2 w-2 fill-red-500" />
            <span className="text-md font-light text-zinc-50">{badgeText}</span>
          </div>

          <button
            onClick={handleScrollToTop}
            className="group text-md inline-flex items-center gap-1.5 font-light tracking-wide text-zinc-200 transition-colors duration-200 hover:text-zinc-200"
          >
            <span className="">Scroll to Top</span>
            <FaArrowUp className="size-4 fill-zinc-200 transition-all duration-200 group-hover:fill-zinc-200" />
          </button>
        </div>

        <div className="mt-8 max-w-lg sm:mt-10 md:mt-12">
          <h2 className="text-2xl leading-snug font-light tracking-tight text-zinc-100 sm:text-3xl md:text-4xl">
            {heading}
          </h2>
        </div>

        <div className="mt-20 flex flex-col gap-8 sm:mt-24 md:mt-28 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-lg font-light tracking-wide text-zinc-400">
              {contactLabel}
            </span>
            <a
              href={contactEmailHref}
              className="group inline-flex items-center gap-2 text-2xl font-medium text-zinc-200 transition-colors duration-200 hover:text-white"
            >
              <span>{contactEmail}</span>
              <FaArrowRight className="size-6 fill-zinc-200 transition-all duration-200 group-hover:fill-zinc-200" />
            </a>
          </div>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-md font-medium text-zinc-200 transition-colors duration-200 hover:text-zinc-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative bg-zinc-950 px-6 pt-10 pb-12 sm:px-10 md:px-16 lg:px-20 lg:pt-14 lg:pb-16">
        <div className="pointer-events-none absolute right-0 bottom-0 h-full w-3/4 blur-lg sm:w-2/3">
          <div className="absolute right-0 bottom-0 h-full w-full bg-gradient-to-tl from-red-500/80 via-red-800/30 to-transparent" />
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-red-600/40 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-red-800/20 blur-3xl" />
        </div>

        {/* Brand logo + name */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
          {/* Logo */}
          <div className="shrink-0">
            {brandLogo || (
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32"
              >
                <rect
                  x="0"
                  y="0"
                  width="22"
                  height="22"
                  rx="2"
                  fill="#52525b"
                />
                <rect
                  x="26"
                  y="0"
                  width="22"
                  height="22"
                  rx="2"
                  fill="#52525b"
                />

                {/* Second row */}
                <rect
                  x="0"
                  y="26"
                  width="22"
                  height="22"
                  rx="2"
                  fill="#52525b"
                />
                <rect
                  x="26"
                  y="26"
                  width="22"
                  height="22"
                  rx="2"
                  fill="#52525b"
                />

          
                <rect
                  x="26"
                  y="52"
                  width="22"
                  height="22"
                  rx="2"
                  fill="#52525b"
                />
                <rect
                  x="52"
                  y="52"
                  width="22"
                  height="22"
                  rx="2"
                  fill="#52525b"
                />

              
                <rect
                  x="52"
                  y="78"
                  width="22"
                  height="22"
                  rx="2"
                  fill="#52525b"
                />
                <rect
                  x="78"
                  y="78"
                  width="22"
                  height="22"
                  rx="2"
                  fill="#52525b"
                />

                {/* Connector pieces */}
                <rect
                  x="26"
                  y="78"
                  width="22"
                  height="22"
                  rx="2"
                  fill="#52525b"
                />
                <rect
                  x="0"
                  y="52"
                  width="22"
                  height="22"
                  rx="2"
                  fill="#52525b"
                />
              </svg>
            )}
          </div>

          <span className="text-5xl font-bold tracking-tight text-white/20 sm:text-6xl md:text-7xl lg:text-[10rem] xl:text-9xl">
            {brandName}
          </span>
        </div>
      </div>
    </footer>
  );
}
