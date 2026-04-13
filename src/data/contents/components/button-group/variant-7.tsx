'use client';

import { useState } from 'react';

import type { LucideIcon } from 'lucide-react';
import { MinusIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/base-ui/button';

type ButtonGroupConfig = {
  decrementIcon: LucideIcon;
  decrementLabel: string;
  incrementIcon: LucideIcon;
  incrementLabel: string;
  initialValue: number;
  maxValue: number;
  minValue: number;
  step: number;
  unit: string;
};

const config: ButtonGroupConfig = {
  decrementIcon: MinusIcon,
  decrementLabel: 'Decrease width',
  incrementIcon: PlusIcon,
  incrementLabel: 'Increase width',
  initialValue: 240,
  maxValue: 320,
  minValue: 120,
  step: 8,
  unit: 'px',
};

const ButtonGroup7 = () => {
  const [value, setValue] = useState<number>(config.initialValue);
  const DecrementIcon = config.decrementIcon;
  const IncrementIcon = config.incrementIcon;

  const handleDecrease = () => {
    setValue((current) => Math.max(config.minValue, current - config.step));
  };

  const handleIncrease = () => {
    setValue((current) => Math.min(config.maxValue, current + config.step));
  };

  return (
    <div className="divide-primary-foreground/20 inline-flex w-fit divide-x overflow-hidden rounded-xl shadow-xs">
      <Button
        size="default"
        className="h-10 rounded-none rounded-l-xl px-3.5 shadow-none focus-visible:z-10"
        onClick={handleDecrease}
        disabled={value === config.minValue}
      >
        <DecrementIcon className="size-4" />
        <span className="sr-only">{config.decrementLabel}</span>
      </Button>
      <span className="bg-primary text-primary-foreground inline-flex h-10 min-w-20 items-center justify-center px-4 text-sm font-medium">
        {`${value}${config.unit}`}
      </span>
      <Button
        size="default"
        className="h-10 rounded-none rounded-r-xl px-3.5 shadow-none focus-visible:z-10"
        onClick={handleIncrease}
        disabled={value === config.maxValue}
      >
        <IncrementIcon className="size-4" />
        <span className="sr-only">{config.incrementLabel}</span>
      </Button>
    </div>
  );
};

export default ButtonGroup7;
