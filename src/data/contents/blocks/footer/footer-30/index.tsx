import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface Footer30Props {
  heading: React.ReactNode;
  columns: FooterColumn[];
  bigText: string;
  copyright: string;
  location: string;
  time: string;
  bottomLinks: FooterLink[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export function Footer30({
  heading,
  columns,
  bigText,
  copyright,
  location,
  time,
  bottomLinks,
  className,
}: Footer30Props) {
  return (
    <footer
      className={cn(
        'w-full bg-[#854523] px-6 py-12 text-[#F2ECC7] sm:px-8 lg:px-12 lg:py-16',
        className
      )}
    >
      <div className="mx-auto max-w-screen-2xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="flex flex-col"
        >
          {/* Top Section */}
          <motion.div variants={itemVariants} className="flex items-start justify-between">
            <h2 className="text-xl font-normal uppercase tracking-wider md:text-2xl lg:text-3xl">
              {heading}
            </h2>
            <button
              className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2ECC7] text-[#854523] transition-transform duration-150 ease-out hover:scale-105 active:scale-[0.96] md:h-16 md:w-16 md:rounded-3xl"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-6 w-6 stroke-[1.5] transition-transform duration-300 group-hover:-translate-y-1 md:h-8 md:w-8" />
            </button>
          </motion.div>

          {/* Middle Columns */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-2 gap-12 sm:grid-cols-3 md:mt-32 lg:grid-cols-5"
          >
            {columns.map((col, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="text-sm font-semibold tracking-wider">{col.title}</h3>
                <ul className="space-y-4">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-sm font-medium opacity-80 transition-opacity duration-150 hover:opacity-100"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Giant Text */}
          <motion.div variants={itemVariants} className="mt-12 flex items-end justify-center overflow-hidden md:mt-20">
            <svg
              className="h-auto w-full  select-none "
              viewBox={`0 0 ${Math.max(bigText.length * 90, 500)} 150`}
              preserveAspectRatio="xMidYMid meet"
              aria-label={bigText}
            >
              <text
                x="50%"
                y="90%"
                dominantBaseline="alphabetic"
                textAnchor="middle"
                textLength="100%"
                lengthAdjust="spacing"
                className="fill-[#F2ECC7] font-['Aclonica'] font-extrabold"
                fontSize="180"
              >
                {bigText}
              </text>
            </svg>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="mt-2 flex flex-col items-center justify-between gap-6 rounded-md border border-[#F2ECC7]/30 px-6 py-4 text-sm font-medium sm:flex-row md:px-8"
          >
            <span>{copyright}</span>

            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{location}</span>
            </div>

            <span className="hidden lg:block">{time}</span>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {bottomLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="transition-opacity hover:opacity-80"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
