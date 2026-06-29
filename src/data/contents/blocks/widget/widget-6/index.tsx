import { MoreHorizontal, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProgressTrackerWidget() {
  const totalBars = 32;
  const filledBars = 23;

  return (
    <div className="bg-card border-border w-full max-w-[480px] rounded-3xl border p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-card-foreground text-base font-semibold">
            Weekly Engagement
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Community interaction is growing steadily
          </p>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-6 flex items-end justify-between">
        <div className="text-card-foreground text-5xl font-bold tracking-tighter">
          72%
        </div>
        <div className="mb-1 flex items-center gap-2">
          <div className="text-primary bg-primary/10 flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold">
            <TrendingUp
              className="h-4 w-4"
              strokeWidth={2.5}
            />
            <span>+12%</span>
          </div>
          <span className="text-muted-foreground text-sm font-medium">vs last week</span>
        </div>
      </div>

      <div className="flex h-12 w-full gap-[3px]">
        {Array.from({ length: totalBars }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: i * 0.02,
              ease: 'easeOut',
            }}
            style={{ originY: 1 }}
            className={`flex-1 rounded-[2px] ${
              i < filledBars ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
