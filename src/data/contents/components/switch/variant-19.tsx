'use client';

import { useId, useState } from 'react';

import { Switch } from '@/components/base-ui/switch';

const Switch19 = () => {
  const id = useId();
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex min-w-64 items-center justify-between gap-6 rounded-xl bg-muted/55 px-4 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_2px_5px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
      <label htmlFor={id} className="cursor-pointer text-left">
        <span className="block text-sm font-medium text-foreground">Auto sync</span>
        <span className="block text-xs text-muted-foreground">
          {enabled ? 'Changes sync instantly' : 'Manual updates only'}
        </span>
      </label>
      <Switch
        id={id}
        checked={enabled}
        onCheckedChange={setEnabled}
        aria-describedby={`${id}-status`}
      />
      <span id={`${id}-status`} className="sr-only" aria-live="polite">
        Auto sync is {enabled ? 'enabled' : 'disabled'}
      </span>
    </div>
  );
};

export default Switch19;
