import { motion, type Variants } from 'motion/react';
import Heading from './heading';
import Container from './container';

type Platform = 'dm' | 'tweet' | 'linkedin';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  handle: string;
  avatar: string;
  platform: Platform;
  profileUrl: string;
}

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DMIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

const TweetIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
    />
  </svg>
);

const platformConfig: Record<
  Platform,
  { label: string; icon: typeof DMIcon; color: string; bgColor: string }
> = {
  dm: {
    label: 'DM',
    icon: DMIcon,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
  },
  tweet: {
    label: 'TWEET',
    icon: TweetIcon,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10 border-sky-500/20',
  },
  linkedin: {
    label: 'LINKEDIN',
    icon: DMIcon,
    color: 'text-blue-500',
    bgColor: 'bg-blue-600/10 border-blue-600/20',
  },
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      'Yo that\'s cool man, specially the footer one you killed it man.',
    author: 'Guri',
    handle: '@Gur__vi',
    avatar: 'https://unavatar.io/x/Gur__vi',
    platform: 'dm',
    profileUrl: 'https://x.com/Gur__vi',
  },
  {
    id: 2,
    content:
      'Overall components looks better and much more stable',
    author: 'OrcDev',
    handle: '@orcdev',
    avatar: 'https://unavatar.io/x/orcdev',
    platform: 'dm',
    profileUrl: 'https://x.com/orcdev',
  },
  {
    id: 3,
    content:
      'Looks good, especially Hero and Footer sections also But seem used AI pipeline here, so make them more natural. Rest seems good progress.',
    author: 'Ajay Patel',
    handle: '@ajaypatel_aj',
    avatar: 'https://unavatar.io/x/ajaypatel_aj',
    platform: 'dm',
    profileUrl: 'https://x.com/ajaypatel_aj',
  },
  {
    id: 4,
    content:
      'Good stuff. Looks clean only feedback I have is have more consistency across all the components / blocks.',
    author: 'Dillion',
    handle: '@dillionverma',
    avatar: 'https://unavatar.io/x/dillionverma',
    platform: 'dm',
    profileUrl: 'https://x.com/dillionverma',
  },
  {
    id: 5,
    content:
      'Just had a look and it looks awesome bro 🔥. Big congrats on the new update 🍉.',
    author: 'Anand Patel',
    handle: '@imananddesigner',
    avatar: 'https://unavatar.io/x/imananddesigner',
    platform: 'dm',
    profileUrl: 'https://x.com/imananddesigner',
  },
  {
    id: 6,
    content: 'Impressive one bhai 🔥🔥',
    author: 'Sahil',
    handle: '@sahildotxzz',
    avatar: 'https://unavatar.io/x/sahildotxzz',
    platform: 'dm',
    profileUrl: 'https://x.com/sahildotxzz',
  },
  {
    id: 7,
    content:
      "Man, it's awesome!!!, I've just been obsessed with footers and hero sections",
    author: 'KapishDima',
    handle: '@kapish_dima',
    avatar: 'https://unavatar.io/x/kapish_dima',
    platform: 'dm',
    profileUrl: 'https://x.com/kapish_dima',
  },
  {
    id: 8,
    content:
      'this one of the best way to show pricing plans on mobile built by @watermelonui',
    author: 'Ali bey',
    handle: '@alibey_10',
    avatar: 'https://unavatar.io/x/alibey_10',
    platform: 'tweet',
    profileUrl: 'https://x.com/alibey_10',
  },
];

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const platform = platformConfig[t.platform];
  const PlatformIcon = platform.icon;

  return (
    <div className="group relative w-[350px] shrink-0 cursor-crosshair border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-300 md:w-[450px]">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/40" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/40" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40" />
      <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/40" />

      <div className="flex h-full w-full flex-col p-8 whitespace-normal">
        {/* Platform Badge + X Icon */}
        <div className="mb-5 flex items-center justify-between">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${platform.bgColor}`}
          >
            <PlatformIcon
              className={`h-3 w-3 ${platform.color}`}
            />
            <span
              className={`text-[10px] font-bold tracking-widest ${platform.color}`}
            >
              {platform.label}
            </span>
          </div>
          <a
            href={t.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/20 transition-colors duration-200 hover:text-white/60"
            aria-label={`Visit ${t.author}'s X profile`}
          >
            <XIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Testimonial Content */}
        <p className="group-hover:text-primary mb-8 grow font-mono text-sm leading-relaxed tracking-wide text-white/80 transition-colors duration-300">
          &quot;{t.content}&quot;
        </p>

        {/* Author Info */}
        <div className="mt-auto flex items-center gap-3 border-t border-white/5 pt-6">
          <div className="group-hover:border-primary relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 transition-colors duration-300">
            <img
              src={t.avatar}
              alt={t.author}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div
              className="text-primary absolute inset-0 hidden items-center justify-center bg-white/5 text-xs font-bold"
              style={{ display: 'none' }}
            >
              {t.author.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-white/90 uppercase">
              {t.author}
            </span>
            <span className="mt-0.5 text-[10px] tracking-widest text-white/40">
              {t.handle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonial() {
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
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0, 0, 1] },
    },
  };

  // Duplicate the array to create a seamless infinite loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="bg-[#101010] relative overflow-hidden py-24 md:py-32 font-mono">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 hidden w-full border-t border-white/5 lg:block" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-16 flex flex-col items-start text-left md:items-center md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            variants={itemVariants}
            className="text-primary mb-8 inline-flex items-center text-xs font-bold tracking-widest uppercase"
          >
            <span className="mr-3 opacity-70">{'//'}</span>
            COMMUNITY FEEDBACK
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              Loved by <span className="text-primary">builders</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl font-mono text-sm leading-relaxed tracking-widest text-pretty text-white/50 uppercase"
          >
            Don&apos;t just take our word for it.
            <br className="mt-2 block md:hidden" /> Real feedback from the
            community.
          </motion.p>
        </motion.div>
      </Container>

      {/* Marquee Scroller */}
      <div className="relative mt-8 flex w-full max-w-full overflow-hidden">
        {/* Left/Right Fade Gradients for smooth entering/exiting */}
        <div className="from-background pointer-events-none absolute top-0 left-0 z-20 h-full w-32 bg-linear-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute top-0 right-0 z-20 h-full w-32 bg-linear-to-l to-transparent" />

        <motion.div
          className="flex gap-6 px-3 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 40,
          }}
        >
          {marqueeItems.map((t, index) => (
            <TestimonialCard key={`${t.id}-${index}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
