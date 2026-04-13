'use client';

import { useState } from 'react';

import { Label } from '@/components/base-ui/label';
import { Switch } from '@/components/base-ui/switch';

const Switch15 = () => {
  const [checked, setChecked] = useState<boolean>(true);

  return (
    <div className="inline-flex items-center gap-2">
      <Switch
        id="notifications-toggle"
        checked={checked}
        onCheckedChange={setChecked}
        aria-label="Toggle notifications"
      />
      <Label htmlFor="notifications-toggle" className="text-sm font-medium">
        {checked ? 'Notifications On' : 'Notifications Off'}
      </Label>
    </div>
  );
};

export default Switch15;
