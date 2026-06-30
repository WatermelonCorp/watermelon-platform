import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/base-ui/input';
import { Button } from '@/components/base-ui/button';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface Footer29Props {
  logo: React.ReactNode;
  brandName: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  linkGroups: FooterLinkGroup[];
  backgroundImage?: string;
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
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export function Footer29({
  logo,
  brandName,
  newsletterPlaceholder = 'Enter Your Email',
  newsletterButtonText = 'Subscribe',
  linkGroups,
  backgroundImage,
  className,
}: Footer29Props) {
  return (
    <footer
      className={cn(
        'relative w-full overflow-hidden bg-[#faede1] text-stone-800',
        className,
      )}
    >
    
      {backgroundImage && (
        <div
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-[300px] w-full bg-cover bg-bottom bg-no-repeat opacity-100 sm:h-[400px] lg:h-[400px] 2xl:h-[800px]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

     
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-[300px] sm:px-6 sm:pb-[400px] lg:px-8 lg:pt-24 lg:pb-[400px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-24"
        >
          {/* Left Column */}
          <motion.div
            variants={itemVariants}
            className="shrink-0 space-y-8 lg:w-[320px]"
          >
            <div className="flex items-center gap-2">
              <div className="text-stone-800">{logo}</div>
              <span className="text-lg font-semibold tracking-wider uppercase">
                {brandName}
              </span>
            </div>

            <form
              className="flex w-full items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder={newsletterPlaceholder}
                className="h-11 rounded-none border-stone-300 bg-transparent text-sm placeholder:text-stone-400 focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                className="h-11 rounded-none bg-[#9E9E7A] px-6 text-sm font-medium text-white transition-transform duration-150 ease-out hover:bg-[#8A8A68] active:not-disabled:scale-[0.96]"
              >
                {newsletterButtonText}
              </Button>
            </form>

            <div className="flex items-center gap-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-stone-700 transition-all duration-150 ease-out hover:text-stone-900 active:scale-[0.96]"
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Columns */}
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            {linkGroups.map((group, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="space-y-6"
              >
                <h4 className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
