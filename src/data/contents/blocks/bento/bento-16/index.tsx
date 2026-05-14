'use client';
import { motion, type Variants } from 'motion/react';
import { useMemo, useState } from 'react';
import { FaShield } from 'react-icons/fa6';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/base-ui/card';

// const container:Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function PerformanceCard() {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="col-span-12 lg:col-span-3"
    >
      <Card className="flex h-full min-h-[360px] flex-col justify-end gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-none ring-0 md:min-h-[380px] lg:min-h-[420px]">
        <CardContent className="relative mb-4 flex h-[120px] items-center justify-center p-0 md:h-[140px] lg:h-[200px]">
          <svg viewBox="0 0 200 120" className="h-full w-full">
            <rect x="40" y="70" width="20" height="150" fill="#9DB4E0" />
            <rect x="70" y="55" width="20" height="145" fill="#9DB4E0" />
            <rect x="100" y="40" width="20" height="160" fill="#9DB4E0" />
            <rect x="130" y="25" width="20" height="175" fill="#9DB4E0" />
          </svg>

          <ArrowPathIcon className="absolute -translate-y-9 scale-140 text-[#9DB4E0]" />
        </CardContent>

        <CardFooter className="w-full flex-col items-center gap-3 border-none bg-transparent pb-2 text-center">
          <CardTitle className="text-the xl font-semibold text-neutral-800">
            Build for performance
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-neutral-500">
            Grew 30,000+ strong global design community!!
          </CardDescription>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

const dots = [
  { t: '13%', l: '40%' },
  { t: '38%', l: '30%' },
  { t: '32%', l: '60%' },
  { t: '70%', l: '50%' },
  { t: '80%', l: '73%' },
  { t: '85%', l: '35%' },
];

const createDelays = (seed: number) =>
  dots.map((_, index) => {
    const value = Math.abs(Math.sin((index + 1) * seed) * 10000);
    return (value - Math.floor(value)) * 0.8;
  });

function EarthDots() {
  const [hovered, setHovered] = useState(false);

  const enterDelays = useMemo(() => createDelays(12.9898), []);
  const exitDelays = useMemo(() => createDelays(78.233), []);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="col-span-12 lg:col-span-6"
    >
      <Card className="flex h-[420px] w-full flex-col items-center gap-12 rounded-md border border-[#e5e7eb] bg-[#f3f4f6] p-6 shadow-none ring-0">
        <CardContent className="relative h-[210px] w-full p-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://assets.watermelon.sh/Earth.svg"
              className="absolute inset-0 mx-auto h-full w-[350px] object-contain"
            />

            {dots.map((pos, i) => (
              <motion.div
                key={i}
                animate={
                  hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.3,
                  delay: hovered ? enterDelays[i] : exitDelays[i],
                }}
                className="absolute h-3 w-3 rounded-full bg-slate-800 shadow-[0_0_10px_rgba(0,0,0,0.25)]"
                style={{ top: pos.t, left: pos.l }}
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-2 border-none bg-transparent p-0 text-center">
          <CardTitle className="text-3xl font-semibold text-neutral-800">
            Effortless funding
          </CardTitle>
          <CardDescription className="text-md max-w-[280px] font-normal text-neutral-500">
            Grew 30,000+ strong global design community!!
          </CardDescription>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

const card: Variants = {
  hidden: { y: 80, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
};

const skeletonItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function ProjectQualificationCard() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="col-span-12 lg:col-span-3"
    >
      <Card className="group flex h-[420px] flex-col gap-0 overflow-hidden rounded-xl border border-white/20 bg-gradient-to-b from-[#9fb2d9] to-[#8ea4cf] p-6 shadow-none ring-0">
        <CardHeader className="space-y-2 p-0">
          <CardTitle className="text-2xl leading-tight font-medium text-neutral-900">
            Project qualification and verification
          </CardTitle>

          <CardDescription className="text-md leading-tight font-medium text-black/70">
            Grew 30,000+ strong global design community!!
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-6 flex items-end justify-center p-0 transition-transform duration-300 group-hover:scale-110">
          <motion.div
            className="relative z-0 flex h-[260px] w-[200px] flex-col gap-3 rounded-lg bg-white/60 [mask-image:linear-gradient(to_bottom,#000000,transparent)] p-4"
            variants={card}
          >
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                variants={skeletonItem}
                className="flex items-center gap-3"
              >
                <div className="size-6 rounded-full bg-white/40" />
                <div className="h-4 flex-1 rounded-full bg-white/40" />
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function GraphBar({
  className,
  delay = 0,
  width,
}: {
  className: string;
  delay?: number;
  width: string | number;
}) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className={className}
    />
  );
}

function Card5() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={item}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="col-span-12 lg:col-span-6"
    >
      <Card className="flex min-h-[420px] flex-col gap-10 rounded-xl border-0 bg-neutral-100 p-6 shadow-none ring-0">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-normal text-neutral-800">
            Tax liability optimize
          </CardTitle>
        </CardHeader>

        <CardContent className="flex w-full flex-col gap-10 overflow-hidden p-0">
          <div className="flex w-full flex-row-reverse items-center gap-6">
            <div className="text-md flex min-w-[80px] flex-1 leading-tight font-semibold whitespace-nowrap text-neutral-700">
              <div>
                <div>Tax credit</div>
                <div>$100000</div>
              </div>
            </div>
            <div className="flex flex-[3] justify-end">
              <GraphBar
                className="h-16 origin-right rounded-lg bg-slate-700"
                delay={0}
                width={hovered ? '70%' : '100%'}
              />
            </div>
          </div>

          <div className="flex w-full flex-row-reverse items-center gap-6">
            <div className="text-md flex min-w-[80px] flex-1 leading-tight font-semibold whitespace-nowrap text-neutral-700">
              <div>
                <div>Tax saving</div>
                <div>$1200000</div>
              </div>
            </div>
            <div className="flex flex-[3] justify-end">
              <GraphBar
                className="h-16 origin-right rounded-xl bg-blue-300"
                delay={0.2}
                width={hovered ? '80%' : '30%'}
              />
            </div>
          </div>

          <div className="flex w-full flex-row-reverse items-center gap-6">
            <div className="text-md flex min-w-[80px] flex-1 leading-tight font-semibold whitespace-nowrap text-neutral-700">
              <div>
                <div>Paid</div>
                <div>$500000</div>
              </div>
            </div>
            <div className="flex flex-[3] justify-end">
              <GraphBar
                className="h-16 origin-right rounded-xl bg-blue-200"
                delay={0.4}
                width={hovered ? '50%' : '70%'}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function OngoingSupportCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={item}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="col-span-12 md:col-span-6 lg:col-span-3"
    >
      <Card className="group flex h-[420px] flex-col justify-between gap-0 rounded-2xl border-0 bg-[#2f3d59] p-6 text-white shadow-none ring-0">
        <CardHeader className="space-y-2 p-0">
          <CardTitle className="text-lg font-semibold text-white">
            Ongoing support
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-white/70">
            Grew 30,000+ strong global design community!!
          </CardDescription>
        </CardHeader>

        <CardContent className="flex w-full items-center justify-center p-0 py-6 transition-transform duration-300 group-hover:scale-110">
          <div className="relative flex aspect-square w-full max-w-[240px] items-center justify-center">
            <div className="absolute h-[80%] w-[80%] rounded-full bg-white/5" />
            <div className="absolute h-[65%] w-[65%] rounded-full bg-white/10" />
            <div className="absolute h-[50%] w-[50%] rounded-full bg-white/15" />

            <div
              className="pointer-events-none absolute z-0 h-full w-full rounded-full"
              style={{
                animation: `spin ${hovered ? '2s' : '8s'} linear infinite`,
                background:
                  'conic-gradient(from 0deg, rgba(255,255,255,0.18) 0deg 90deg, transparent 60deg 360deg)',
              }}
            />
            <div className="absolute z-10 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/20 bg-[#2f3e5a] md:h-[80px] md:w-[80px]">
              <img
                src="https://assets.watermelon.sh/Headset.png"
                alt="Support Agent"
                className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 opacity-90 md:h-10 md:w-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Bento16() {
  return (
    <motion.div className="grid min-h-screen grid-cols-12 gap-4 p-6 font-sans md:p-10 lg:p-20">
      <EarthDots />
      <ProjectQualificationCard />
      <OngoingSupportCard />
      <PerformanceCard />

      <motion.div
        variants={item}
        className="col-span-12 md:col-span-6 lg:col-span-3"
      >
        <Card className="flex min-h-[420px] flex-col justify-between gap-0 rounded-xl border-0 bg-[#2f3e5a] p-6 text-white shadow-none ring-0">
          <CardHeader className="p-0">
            <CardTitle className="mb-2 text-2xl font-semibold text-white">
              Secure transactions
            </CardTitle>
            <CardDescription className="text-md text-white/70">
              Grew 30,000+ strong global design community!!
            </CardDescription>
          </CardHeader>

          <CardContent className="flex w-full items-center justify-center p-0 py-6">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute h-full w-full rounded-full bg-white/5"
              />
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute h-[80%] w-[80%] rounded-full bg-white/10"
              />
              <motion.div
                animate={{ scale: [1, 1.16, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute h-[60%] w-[60%] rounded-full bg-white/15"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute flex h-[45%] w-[45%] items-center justify-center rounded-full border border-black/10 bg-[#2f3e5a]"
              >
                <FaShield className="size-8 fill-white/90 text-white/90 md:size-12" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Card5 />
    </motion.div>
  );
}

function ArrowPathIcon({
  className,
  ...props
}: {
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <svg
      width="112"
      height="95"
      viewBox="0 0 112 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <motion.path
        d="M10 85 L10 75 C10 68 16 63 23 63 C30 63 36 57 36 50 C36 43 43 38 50 38 C57 38 64 32 64 26 C64 20 70 15 78 15 L90 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        variants={{ hover: { pathLength: 1, opacity: 1 } }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.path
        d="M82 7 L90 15 L82 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        variants={{ hover: { pathLength: 1, opacity: 1 } }}
        transition={{ duration: 0.2, delay: 0.8 }}
      />
    </svg>
  );
}
