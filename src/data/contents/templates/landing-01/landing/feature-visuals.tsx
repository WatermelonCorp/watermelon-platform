import { motion } from 'motion/react';
import { cn } from "@/lib/utils";

function VisualWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-0 right-0 bottom-0 hidden w-full items-center justify-end overflow-hidden opacity-100 md:flex md:w-1/2",
        className
      )}
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%)',
        maskImage: 'linear-gradient(to right, transparent, black 20%)',
      }}
    >
      {children}
    </div>
  );
}

export function PremiumComponent() {
  return (
    <VisualWrapper>
      <div className="relative flex h-[360px] w-[360px] items-center justify-end">
        <svg
          className="absolute right-0 h-[360px] w-[360px]"
          viewBox="0 0 360 360"
        >
          {/* Subtle grid background */}
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          </pattern>
          <rect width="360" height="360" fill="url(#grid)" />

          {/* Vertical axis line on the left side of the visual (offset) */}
          <line
            x1="60"
            y1="0"
            x2="60"
            y2="360"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          {/* Horizontal axis line */}
          <line
            x1="0"
            y1="180"
            x2="360"
            y2="180"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />

          {/* Coordinate labels */}
          <text
            x="65"
            y="15"
            fill="rgba(255,255,255,0.3)"
            fontSize="10"
            fontFamily="monospace"
          >
            SYS.01
          </text>
          <text
            x="320"
            y="175"
            fill="rgba(255,255,255,0.3)"
            fontSize="10"
            fontFamily="monospace"
          >
            X-AXIS
          </text>

          {/* Glowing origin / crosshair */}
          <motion.line
            x1="50"
            y1="180"
            x2="70"
            y2="180"
            className="stroke-primary"
            strokeWidth="2"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.line
            x1="60"
            y1="170"
            x2="60"
            y2="190"
            className="stroke-primary"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Radiating Half-Circles */}
          {[1, 2, 3, 4].map((i) => (
            <motion.path
              key={`circle-${i}`}
              d={`M 60,${180 - i * 60} A ${i * 60},${i * 60} 0 0,1 60,${180 + i * 60}`}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeDasharray={i % 2 === 0 ? '2 6' : '1 4'}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.15, ease: 'easeOut' }}
            />
          ))}

          {/* Dots on paths */}
          {Array.from({ length: 15 }).map((_, i) => {
            const circleIndex = Math.floor(i / 4) + 1; // 1 to 4
            const radius = circleIndex * 60;
            // Deterministic pseudo-random based on index 'i' to avoid hydration mismatch
            const pseudoRandomAngle = (i * 137.508) % 160;
            const angle = (pseudoRandomAngle - 80) * (Math.PI / 180);
            const x = 60 + Math.cos(angle) * radius;
            const y = 180 + Math.sin(angle) * radius;

            const pseudoRandomDelay = (i * 93.17) % 1;

            return (
              <motion.circle
                key={`dot-${i}`}
                cx={x}
                cy={y}
                r="1.5"
                fill="rgba(255,255,255,0.6)"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.8 + pseudoRandomDelay * 0.5,
                  duration: 0.5,
                }}
              />
            );
          })}
        </svg>
      </div>
    </VisualWrapper>
  );
}

export function ThemingComponent() {
  return (
    <VisualWrapper className="p-8">
      <div className="relative flex w-[280px] flex-col justify-center gap-8">
        {/* Top Info block */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <motion.div
              className="bg-primary text-primary h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            />
            <span className="text-primary font-mono text-[10px] tracking-widest uppercase">
              Decentralized Protocol
            </span>
          </div>

          <div className="relative mt-2 h-px w-full bg-white/5">
            <motion.div
              className="bg-primary text-primary absolute top-0 left-0 h-full shadow-[0_0_8px_currentColor]"
              initial={{ width: 0 }}
              whileInView={{ width: '45%' }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            />
            <div className="absolute top-[-3px] left-[45%] h-[7px] w-px bg-white/20" />
          </div>
        </div>

        {/* Dash array progress block */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[4px]">
            {Array.from({ length: 26 }).map((_, i) => (
              <motion.div
                key={i}
                className={`h-[22px] w-1.5 rounded-[2px] ${i < 12 ? 'bg-primary text-primary shadow-[0_0_8px_currentColor]' : 'bg-white/10'}`}
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: i < 12 ? 1 : 0.6 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.015,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Faint grid below */}
          <motion.div
            className="h-10 w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)]"
            style={{
              backgroundSize: '12px 12px',
              WebkitMaskImage: 'linear-gradient(to right, black, transparent)',
              maskImage: 'linear-gradient(to right, black, transparent)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </div>
      </div>
    </VisualWrapper>
  );
}

export function OpenSourceComponent() {
  return (
    <VisualWrapper>
      <div className="relative mr-8 flex h-[360px] w-[180px] items-center justify-end">
        <svg
          width="120"
          height="200"
          viewBox="0 0 120 200"
          className="opacity-80"
        >
          <path
            d="M 80,20 L 80,180"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <path
            d="M 80,60 L 40,90 L 40,130 L 80,160"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            fill="none"
          />

          <circle cx="80" cy="40" r="2" fill="rgba(255,255,255,0.3)" />
          <circle cx="80" cy="180" r="2" fill="rgba(255,255,255,0.3)" />

          <motion.circle
            cx="40"
            cy="90"
            r="3"
            className="fill-primary text-primary drop-shadow-[0_0_6px_currentColor]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          />
          <motion.circle
            cx="40"
            cy="130"
            r="3"
            className="fill-primary text-primary drop-shadow-[0_0_6px_currentColor]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          />

          <motion.path
            d="M 80,60 L 40,90 L 40,130 L 80,160"
            className="stroke-primary text-primary drop-shadow-[0_0_6px_currentColor]"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </VisualWrapper>
  );
}

export function ProductionReadyComponent() {
  return (
    <VisualWrapper>
      <div className="relative mr-8 flex h-[360px] w-[180px] items-center justify-end">
        <div className="flex flex-col gap-3">
          {/* Status Header */}
          <div className="mb-2 flex items-center gap-2">
            <motion.div
              className="bg-primary text-primary h-1.5 w-1.5 rounded-full drop-shadow-[0_0_6px_currentColor]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
              Sys.Ready
            </span>
          </div>

          {/* Grid of mini status blocks */}
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 16 }).map((_, i) => {
              // Deterministic on/off pattern
              const isActive = [0, 1, 4, 5, 6, 8, 9, 13, 14].includes(i);
              return (
                <motion.div
                  key={i}
                  className={`h-3 w-3 rounded-[1px] ${isActive ? 'bg-primary/80 text-primary drop-shadow-[0_0_4px_currentColor]' : 'bg-white/5'}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                />
              );
            })}
          </div>

          <div className="mt-2 h-px w-full bg-white/10" />
          <motion.div
            className="bg-primary text-primary h-px drop-shadow-[0_0_4px_currentColor]"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'circOut' }}
          />
        </div>
      </div>
    </VisualWrapper>
  );
}
