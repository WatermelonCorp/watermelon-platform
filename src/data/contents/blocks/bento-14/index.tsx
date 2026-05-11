'use client';
import type { RefObject } from 'react';
import React, { useEffect, useId, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion';
import {
  Play,
  Pause,
  Heart,
  Volume2,
  Repeat,
  Shuffle,
  Monitor,
  Speaker,
  SkipForward,
  SkipBack,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/base-ui/card';

function Row({
  direction,
  isHovered,
}: {
  direction: number;
  isHovered: boolean;
}) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;

    const halfWidth = containerRef.current.scrollWidth / 2;
    const speed = isHovered ? 5 : 30;

    let next = x.get() + (direction * -speed * delta) / 1000;

    if (next <= -halfWidth) next += halfWidth;
    if (next >= 0) next -= halfWidth;

    x.set(next);
  });

  const items = [...Array(12)];

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div ref={containerRef} style={{ x }} className="flex gap-4 px-2">
        {[...items, ...items].map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-2 rounded-sm border border-white/20 bg-neutral-800 px-4 py-2 text-xs text-neutral-100"
          >
            Sale on entire stock
            <span className="text-lg text-orange-400">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
function MarqueeCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="relative flex h-[340px] flex-col justify-end gap-0 overflow-hidden rounded-md border border-white/5 bg-neutral-900 p-6 shadow-none ring-0 md:col-span-7"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] p-0 opacity-20"
        style={{ perspective: '1000px' }}
      >
        <div className="flex -translate-y-4 scale-125 -rotate-12 skew-x-12 flex-col gap-4">
          <Row direction={1} isHovered={isHovered} />
          <Row direction={-1} isHovered={isHovered} />
          <Row direction={1} isHovered={isHovered} />
        </div>
      </CardContent>
      <CardFooter className="relative z-10 flex-col border-none bg-transparent p-6">
        <CardTitle className="mb-2 text-sm font-semibold text-neutral-100">
          Tailored Precision
        </CardTitle>
        <CardDescription className="text-md max-w-[90%] leading-relaxed text-neutral-400">
          Chime offers tailored precision and intelligent insights, adeptly
          managing diverse sophisticated contextual understanding.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

function UploadCard() {
  const dragVariants = {
    rest: {
      x: 130,
      y: -80,
    },
    hover: {
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="md:col-span-5"
    >
      <Card className="relative flex h-[340px] flex-col justify-between gap-0 overflow-hidden rounded-md border border-white/5 bg-neutral-900 p-0 shadow-none ring-0">
        <CardContent className="relative flex h-full w-full flex-1 items-center justify-center p-0">
          <div className="relative z-0 flex h-full w-full items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black,transparent)] pt-8">
            <div className="absolute top-0 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />

            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to bottom, black, transparent)',
              }}
            />

            <div className="shadow-3xl z-10 flex h-full w-[250px] items-center justify-center rounded-t-[40px] bg-neutral-600 px-3 pt-3">
              <div className="shadow-3xl h-full flex-1 rounded-t-[28px] bg-neutral-500 px-3 pt-3">
                <div className="h-full flex-1 rounded-t-[16px] bg-neutral-900" />
              </div>
            </div>
          </div>

          <img
            src="https://assets.watermelon.sh/Download%20From%20Cloud.svg"
            alt="Upload Icon"
            className="pointer-events-none absolute top-38 left-1/2 z-10 mb-2 h-12 w-12 -translate-x-1/2 opacity-80"
          />
          <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center justify-center">
            <span className="text-md tracking-wide text-neutral-500">
              Add your file
            </span>

            <motion.div
              variants={dragVariants}
              transition={{
                duration: 0.45,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="absolute flex items-center"
            >
              <div className="text-md relative flex cursor-grabbing items-center rounded-full bg-blue-600 px-3 py-1 text-white shadow-lg shadow-blue-600/20">
                my_file.mp3
              </div>
            </motion.div>
          </div>
        </CardContent>
        <CardFooter className="text-md w-full flex-col items-start border-none bg-transparent p-6 leading-relaxed text-neutral-400">
          <CardTitle className="mb-2 text-sm font-semibold text-neutral-100">
            Add Your File
          </CardTitle>
          <CardDescription className="w-full text-left text-xs">
            Powerful capabilities, simplified. Our advanced features are
            integrated with remarkably easy and seamless to master.
          </CardDescription>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>; // Container ref
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = 'gray',
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = '#ffaa40',
  gradientStopColor = '#9c40ff',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState('');
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ['90%', '-10%'],
        x2: ['100%', '0%'],
        y1: ['0%', '0%'],
        y2: ['0%', '0%'],
      }
    : {
        x1: ['10%', '110%'],
        x2: ['0%', '100%'],
        y1: ['0%', '0%'],
        y2: ['0%', '0%'],
      };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${
          (startX + endX) / 2
        },${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    updatePath();

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'pointer-events-none absolute top-0 left-0 transform-gpu stroke-2',
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={'userSpaceOnUse'}
          initial={{
            x1: '0%',
            x2: '0%',
            y1: '0%',
            y2: '0%',
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

function Card2() {
  const moniterRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const speakerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <Card className="relative flex min-h-[340px] flex-col justify-between gap-0 overflow-hidden rounded-md border border-white/5 bg-neutral-900 p-0 shadow-none ring-0 md:col-span-5">
      <CardContent className="relative flex h-full w-full flex-1 items-center justify-center p-0">
        <div
          ref={containerRef}
          className="relative z-10 flex items-center gap-12"
        >
          <div
            ref={speakerRef}
            className="z-20 rounded-full bg-neutral-800 p-4"
          >
            <Speaker className="size-10 text-neutral-400 opacity-60" />
          </div>

          <div
            ref={rippleRef}
            className="relative z-20 flex h-16 w-16 items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute h-16 w-16 rounded-full border border-white/50"
            />

            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#333]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#444]">
                <img
                  src="https://assets.watermelon.sh/Music.png"
                  alt="Audio Waveform"
                  className="h-6 w-6 opacity-80"
                />
              </div>
            </div>
          </div>

          <div
            ref={moniterRef}
            className="z-20 rounded-full bg-neutral-800 p-4"
          >
            <Monitor className="size-10 text-neutral-400 opacity-60" />
          </div>
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={speakerRef}
            toRef={rippleRef}
            pathColor="white"
            pathWidth={2}
            pathOpacity={0.2}
            gradientStartColor="rgba(255,255,255,0.2)"
            gradientStopColor="rgba(255,255,255,0.2)"
            delay={0}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={rippleRef}
            toRef={moniterRef}
            pathColor="white"
            pathWidth={2}
            pathOpacity={0.2}
            gradientStartColor="rgba(255,255,255,0.2)"
            gradientStopColor="rgba(255,255,255,0.2)"
            delay={0.4}
          />
        </div>
      </CardContent>

      <CardFooter className="text-md flex-col items-start border-none bg-transparent p-6 leading-relaxed text-neutral-400">
        <CardTitle className="mb-2 text-sm font-semibold text-neutral-100">
          Connected Hub
        </CardTitle>
        <CardDescription className="w-full text-left text-xs">
          A dedicated platform engineered to empower your creative vision, and
          global distribution.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

const tracks = [
  {
    id: 1,
    title: 'Midnight Dreams',
    artist: 'Luna Waves',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300',
    duration: 101,
  },
  {
    id: 2,
    title: 'Ocean Lights',
    artist: 'Aurora Sky',
    cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300',
    duration: 124,
  },
  {
    id: 3,
    title: 'Neon Streets',
    artist: 'Pulse City',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
    duration: 95,
  },
];

function formatTime(t: number) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const barVariants = {
  initial: { y: -60, opacity: 0, scale: 0, filter: 'blur(4px)' },
  animate: { y: 16, opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { y: -60, opacity: 0, scale: 0, filter: 'blur(4px)' },
};

const songVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 180 : -180,
    opacity: 0,
    scale: 0.75,
    filter: 'blur(4px)',
  }),
  center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: (dir: number) => ({
    x: dir > 0 ? -180 : 180,
    opacity: 0,
    scale: 0.75,
    filter: 'blur(4px)',
  }),
};

function PlayerCard() {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [hover, setHover] = useState(false);
  const [direction, setDirection] = useState(0);

  const duration = tracks[index].duration;
  const track = tracks[index];

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing || !hover) return;

    const interval = setInterval(() => {
      setTime((t) => {
        if (t >= duration) {
          if (loop) return 0;
          setDirection(1);
          if (shuffle) {
            setIndex(Math.floor(Math.random() * tracks.length));
          } else {
            setIndex((i) => (i + 1) % tracks.length);
          }
          return 0;
        }
        return t + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [playing, duration, hover, loop, shuffle]);

  function next() {
    setDirection(1);
    if (shuffle) {
      setIndex(Math.floor(Math.random() * tracks.length));
    } else {
      setIndex((i) => (i + 1) % tracks.length);
    }
    setTime(0);
  }

  function prev() {
    setDirection(-1);
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setTime(0);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;

    setTime(percent * duration);
  }

  const progress = (time / duration) * 100;

  return (
    <Card
      onMouseEnter={() => {
        setHover(true);
        setPlaying(true);
      }}
      onMouseLeave={() => {
        setHover(false);
        setPlaying(false);
      }}
      className="relative flex h-[340px] flex-col justify-between gap-0 overflow-hidden rounded-md border border-white/5 bg-neutral-900 p-0 shadow-none ring-0 md:col-span-7"
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            key="info-bar"
            variants={barVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="absolute top-0 left-1/2 z-20 -translate-x-1/2"
          >
            <div className="w-[220px] overflow-hidden rounded-xl border border-white/10 bg-neutral-800/90 px-4 py-3 shadow-xl backdrop-blur-xl">
              <AnimatePresence
                custom={direction}
                initial={false}
                mode="popLayout"
              >
                <motion.div
                  key={track.id}
                  custom={direction}
                  variants={songVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex items-center gap-3"
                >
                  <img
                    src={track.cover}
                    className="h-10 w-10 rounded-md object-cover"
                  />

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      {track.title}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {track.artist}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CardContent className="relative h-full w-full flex-1 overflow-hidden p-0">
        <div className="absolute top-0 left-1/2 size-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-45%,transparent_0px,transparent_118px,rgba(255,255,255,0.6)_120px,transparent_122px,transparent_178px,rgba(255,255,255,0.6)_180px,transparent_182px,transparent_248px,rgba(255,255,255,0.6)_250px,transparent_252px)] opacity-[0.06]" />

        <div className="absolute bottom-0 w-full px-6 pb-6">
          <div className="relative w-full">
            <div
              ref={ref}
              onClick={seek}
              className="h-[3px] w-full cursor-pointer overflow-hidden rounded-full bg-white/20"
            >
              <div
                style={{ width: `${progress}%` }}
                className={`h-full rounded-full transition-all ${
                  playing
                    ? 'bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.9)]'
                    : 'bg-blue-600/50 shadow-[0_0_6px_rgba(59,130,246,0.25)]'
                }`}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs text-neutral-500">
              <span>{formatTime(time)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Heart
              onClick={() => setLiked(!liked)}
              className={`h-5 w-5 cursor-pointer ${
                liked ? 'fill-blue-500 text-blue-500' : 'text-neutral-400'
              }`}
            />

            <Volume2 className="h-5 w-5 text-neutral-400" />

            <SkipBack
              onClick={prev}
              className="h-5 w-5 cursor-pointer text-neutral-400"
            />

            <div
              onClick={() => setPlaying(!playing)}
              className="cursor-pointer rounded-full bg-white p-2.5 shadow-[0_0_18px_rgba(255,255,255,0.15)]"
            >
              {playing ? (
                <Pause className="h-5 w-5 fill-black text-black" />
              ) : (
                <Play className="h-5 w-5 fill-black text-black" />
              )}
            </div>

            <SkipForward
              onClick={next}
              className="h-5 w-5 cursor-pointer text-neutral-400"
            />

            <Repeat
              onClick={() => setLoop(!loop)}
              className={`h-5 w-5 cursor-pointer ${
                loop ? 'text-blue-500' : 'text-neutral-400'
              }`}
            />

            <Shuffle
              onClick={() => setShuffle(!shuffle)}
              className={`h-5 w-5 cursor-pointer ${
                shuffle ? 'text-blue-500' : 'text-neutral-400'
              }`}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-md relative max-w-xl flex-col border-none bg-transparent p-6 leading-relaxed text-neutral-400">
        <CardTitle className="mb-2 text-sm font-semibold text-neutral-100">
          Break Free
        </CardTitle>
        <CardDescription className="text-xs">
          Seize full command over your music's journey
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
const Bento14 = () => {
  return (
    <div className="min-h-screen bg-black p-8 font-sans text-gray-400 antialiased">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-2 md:grid-cols-12">
        <Card2 />

        <PlayerCard />

        <MarqueeCard />

        <UploadCard />
      </div>
    </div>
  );
};

export default Bento14;
