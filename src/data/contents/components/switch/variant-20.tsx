'use client';

import { useId, useState } from 'react';
import { HiBell, HiBellSlash } from 'react-icons/hi2';

import { Switch } from '@/components/base-ui/switch';

const Switch20 = () => {
  const id = useId();
  const [enabled, setEnabled] = useState(false);
  const Icon = enabled ? HiBell : HiBellSlash;

  return (
    <label
      htmlFor={id}
      className="flex min-h-10 cursor-pointer items-center gap-3 rounded-full bg-muted/60 py-2 pr-3 pl-2 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
    >
      <span className="grid size-8 place-items-center rounded-full bg-background text-foreground shadow-sm">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-24 text-sm font-medium text-foreground">
        {enabled ? 'Alerts on' : 'Alerts paused'}
      </span>
      <Switch
        id={id}
        checked={enabled}
        onCheckedChange={setEnabled}
        aria-label="Toggle alerts"
      />
    </label>
  );
};

export default Switch20;
