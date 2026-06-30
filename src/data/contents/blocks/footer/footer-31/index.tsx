import { motion, type Variants } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface Footer31Props {
  heading?: string;
  subtitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  columns?: FooterColumn[];
  brandDescription?: string;
  bigText?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    title: 'SOLUTIONS',
    links: [
      { label: 'Transactional Emails', href: '#' },
      { label: 'Marketing Emails', href: '#' },
      { label: 'Email Automation', href: '#' },
      { label: 'SMTP', href: '#' },
      { label: 'Email Builder', href: '#' },
    ],
  },
  {
    title: 'DOCS',
    links: [
      { label: 'Getting Started', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Transactional Emails', href: '#' },
      { label: 'Phishing Emails', href: '#' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'FAQ', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Glossary', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Fair Use', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Subprocessors', href: '#' },
    ],
  },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.8, bounce: 0 },
  },
};

const columnStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const linkVariant: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', duration: 0.5, bounce: 0 },
  },
};

const shapeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: 'easeOut' },
  },
};

// SVG Shape Components
function LeftShape({
  className,
  color1 = '#8016AB',
  color2 = '#BB63DE',
  color3 = '#FFEAE6',
}: {
  className?: string;
  color1?: string;
  color2?: string;
  color3?: string;
}) {
  return (
    <svg
      className={className}
      width="477"
      height="382"
      viewBox="0 0 477 382"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.4">
        <g filter="url(#filter0_f_left)">
          <path
            d="M128.348 -190.828L21.4092 -104.358L353.062 163.814L460 77.3442L128.348 -190.828Z"
            fill="url(#paint0_linear_left)"
          />
        </g>
        <g filter="url(#filter1_f_left)">
          <path
            d="M21.538 -190.828L-85.4003 -104.359L246.252 163.814L353.191 77.3442L21.538 -190.828Z"
            fill="url(#paint1_linear_left)"
          />
        </g>
        <g filter="url(#filter2_f_left)">
          <path
            d="M-25.8253 -94.915L-132.764 -8.44537L198.889 259.727L305.827 173.257L-25.8253 -94.915Z"
            fill="url(#paint2_linear_left)"
          />
        </g>
        <g filter="url(#filter3_f_left)">
          <path
            d="M-53.0616 9.4917L-160 95.9614L171.653 364.134L278.591 277.664L-53.0616 9.4917Z"
            fill="url(#paint3_linear_left)"
          />
        </g>
        <g filter="url(#filter4_f_left)">
          <path
            d="M-14.5236 -152.031L-121.462 -65.5616L210.191 202.611L317.129 116.141L-14.5236 -152.031Z"
            fill="url(#paint4_linear_left)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_left"
          x="4.5243"
          y="-207.713"
          width="472.361"
          height="388.412"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.44244"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id="filter1_f_left"
          x="-102.285"
          y="-207.713"
          width="472.361"
          height="388.412"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.44244"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id="filter2_f_left"
          x="-149.649"
          y="-111.8"
          width="472.361"
          height="388.412"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.44244"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id="filter3_f_left"
          x="-176.885"
          y="-7.39318"
          width="472.361"
          height="388.412"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.44244"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id="filter4_f_left"
          x="-138.347"
          y="-168.916"
          width="472.361"
          height="388.412"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.44244"
            result="effect1_foregroundBlur"
          />
        </filter>
        <linearGradient
          id="paint0_linear_left"
          x1="74.8832"
          y1="-147.597"
          x2="337.115"
          y2="176.709"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="0.65" stopColor={color2} stopOpacity="0.57" />
          <stop offset="1" stopColor={color3} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_left"
          x1="-31.9263"
          y1="-147.597"
          x2="230.305"
          y2="176.708"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="0.65" stopColor={color2} stopOpacity="0.57" />
          <stop offset="1" stopColor={color3} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_left"
          x1="-79.2896"
          y1="-51.6842"
          x2="182.942"
          y2="272.622"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="0.65" stopColor={color2} stopOpacity="0.57" />
          <stop offset="1" stopColor={color3} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_left"
          x1="-106.526"
          y1="52.7226"
          x2="155.706"
          y2="377.028"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="0.65" stopColor={color2} stopOpacity="0.57" />
          <stop offset="1" stopColor={color3} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_left"
          x1="-67.9878"
          y1="-108.8"
          x2="194.244"
          y2="215.505"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="0.65" stopColor={color2} stopOpacity="0.57" />
          <stop offset="1" stopColor={color3} stopOpacity="0.28" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function RightShape({
  className,
  color1 = '#8016AB',
  color2 = '#BB63DE',
  color3 = '#FFEAE6',
}: {
  className?: string;
  color1?: string;
  color2?: string;
  color3?: string;
}) {
  return (
    <svg
      className={className}
      width="477"
      height="382"
      viewBox="0 0 477 382"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.4">
        <g filter="url(#filter0_f_right)">
          <path
            d="M348.649 -190.828L455.587 -104.358L123.934 163.814L16.9957 77.3444L348.649 -190.828Z"
            fill="url(#paint0_linear_right)"
          />
        </g>
        <g filter="url(#filter1_f_right)">
          <path
            d="M455.456 -190.828L562.395 -104.358L230.742 163.814L123.803 77.3444L455.456 -190.828Z"
            fill="url(#paint1_linear_right)"
          />
        </g>
        <g filter="url(#filter2_f_right)">
          <path
            d="M502.821 -94.915L609.759 -8.44531L278.106 259.727L171.168 173.257L502.821 -94.915Z"
            fill="url(#paint2_linear_right)"
          />
        </g>
        <g filter="url(#filter3_f_right)">
          <path
            d="M530.057 9.4917L636.995 95.9614L305.342 364.134L198.404 277.664L530.057 9.4917Z"
            fill="url(#paint3_linear_right)"
          />
        </g>
        <g filter="url(#filter4_f_right)">
          <path
            d="M491.52 -152.033L598.458 -65.5635L266.805 202.609L159.867 116.139L491.52 -152.033Z"
            fill="url(#paint4_linear_right)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_right"
          x="7.62939e-05"
          y="-207.824"
          width="472.583"
          height="388.634"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.49789"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id="filter1_f_right"
          x="106.808"
          y="-207.824"
          width="472.583"
          height="388.634"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.49789"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id="filter2_f_right"
          x="154.172"
          y="-111.911"
          width="472.583"
          height="388.634"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.49789"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id="filter3_f_right"
          x="181.408"
          y="-7.50407"
          width="472.583"
          height="388.634"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.49789"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id="filter4_f_right"
          x="142.871"
          y="-169.029"
          width="472.583"
          height="388.634"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.49789"
            result="effect1_foregroundBlur"
          />
        </filter>
        <linearGradient
          id="paint0_linear_right"
          x1="402.113"
          y1="-147.597"
          x2="139.881"
          y2="176.709"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="0.65" stopColor={color2} stopOpacity="0.57" />
          <stop offset="1" stopColor={color3} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_right"
          x1="508.921"
          y1="-147.597"
          x2="246.689"
          y2="176.709"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="0.65" stopColor={color2} stopOpacity="0.57" />
          <stop offset="1" stopColor={color3} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_right"
          x1="556.285"
          y1="-51.6841"
          x2="294.053"
          y2="272.622"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="0.65" stopColor={color2} stopOpacity="0.57" />
          <stop offset="1" stopColor={color3} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_right"
          x1="583.521"
          y1="52.7226"
          x2="321.289"
          y2="377.029"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="0.65" stopColor={color2} stopOpacity="0.57" />
          <stop offset="1" stopColor={color3} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_right"
          x1="544.984"
          y1="-108.802"
          x2="282.752"
          y2="215.504"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="0.65" stopColor={color2} stopOpacity="0.57" />
          <stop offset="1" stopColor={color3} stopOpacity="0.28" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');`;

export function Footer31({
  heading = 'Boost your real-time performance.',
  subtitle = 'Help your team achieve next-level precision in tracking metrics and growth performance.',
  newsletterPlaceholder = 'Enter Your Email',
  newsletterButtonText = 'Subscribe',
  columns = defaultColumns,
  brandDescription = 'Support your team with advanced clarity in analyzing pipeline activity and revenue trends.',
  bigText = 'Watermelon',
}: Footer31Props) {
  return (
    <footer className="relative w-full overflow-hidden bg-[#FAFAFA] pt-20 pb-10 font-sans text-stone-900 antialiased">
      <style>{fontStyle}</style>

      {/* Abstract Background Shapes */}
      <motion.div
        variants={shapeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="pointer-events-none absolute top-[-100px] left-[-150px] z-0 sm:left-[-100px]"
      >
        <LeftShape className="h-auto w-[500px] opacity-70 sm:w-[600px] md:w-[700px]" />
      </motion.div>
      <motion.div
        variants={shapeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="pointer-events-none absolute top-[-100px] right-[-150px] z-0 sm:right-[-100px]"
      >
        <RightShape className="h-auto w-[500px] opacity-70 sm:w-[600px] md:w-[700px]" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 sm:px-10 lg:px-12"
      >
        {/* Top Section: Heading, Subtitle, Newsletter */}
        <motion.div
          variants={fadeUpVariant}
          className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center"
        >
          <h2
            className="text-xl leading-[1.15] tracking-tight text-balance text-stone-900 md:text-2xl lg:text-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {heading}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed font-medium text-pretty text-stone-500 md:text-base">
            {subtitle}
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex w-full max-w-sm items-center rounded-full border border-stone-200 bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-[box-shadow,border-color] focus-within:border-purple-300 focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.08)] focus-within:ring-2 focus-within:ring-purple-400 focus-within:ring-offset-2 focus-within:ring-offset-[#FAFAFA]"
          >
            <input
              type="email"
              placeholder={newsletterPlaceholder}
              className="flex-1 bg-transparent px-4 py-2 text-sm text-stone-700 outline-none placeholder:text-stone-400"
              required
            />
            <button
              type="submit"
              className="h-9 rounded-full border-purple-500 bg-linear-to-b from-purple-400 to-purple-500/70 px-5 font-medium text-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_1px_0_0px_rgba(255,255,255,0.5)] text-shadow-2xs"
            >
              {newsletterButtonText}
            </button>
          </form>
        </motion.div>

        {/* Middle Section: Columns */}
        <div className="mb-16 grid w-full grid-cols-1 gap-10 md:mb-24 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Brand & Socials (Col spanning 4) */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col gap-6 md:col-span-4 lg:col-span-5"
          >
            <p
              className="max-w-sm text-sm leading-relaxed text-stone-800 md:text-base"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {brandDescription}
            </p>
            <div className="flex items-center gap-4 text-stone-600">
              <a
                href="#"
                className="transition-colors hover:text-stone-900"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 fill-current" />
              </a>
              <a
                href="#"
                className="transition-colors hover:text-stone-900"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 fill-current" />
              </a>
              <a
                href="#"
                className="transition-colors hover:text-stone-900"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="transition-colors hover:text-stone-900"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 fill-current" />
              </a>
            </div>
          </motion.div>

          {/* Links Columns (Col spanning 8) */}
          <motion.div
            variants={fadeUpVariant}
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8 lg:col-span-7"
          >
            {columns.map((col, idx) => (
              <motion.div
                key={idx}
                variants={columnStagger}
                className="flex flex-col gap-4"
              >
                <h3 className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link, linkIdx) => (
                    <motion.li key={linkIdx} variants={linkVariant}>
                      <a
                        href={link.href}
                        className="text-xs font-medium text-stone-600 transition-colors hover:text-stone-900 md:text-sm"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Giant Text SVG Approach */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 flex w-full items-end justify-center overflow-hidden px-4 md:px-8"
      >
        <svg
          className="h-auto w-full select-none"
          viewBox={`0 0 ${Math.max(bigText.length * 80, 500)} 110`}
          preserveAspectRatio="xMidYMid meet"
          aria-label={bigText}
        >
          <text
            x="50%"
            y="95%"
            dominantBaseline="alphabetic"
            textAnchor="middle"
            textLength="100%"
            lengthAdjust="spacing"
            className="fill-[#2a2a2a] font-sans font-bold tracking-tighter"
            fontSize="150"
          >
            {bigText}
          </text>
        </svg>
      </motion.div>
    </footer>
  );
}
