'use client';

import { useState } from 'react';

import type { LucideIcon } from 'lucide-react';
import { BookmarkIcon } from 'lucide-react';

import { Button } from '@/components/base-ui/button';

import { cn } from '@/lib/utils';

type ButtonGroupData = {
  activeCount: number;
  inactiveCount: number;
  actionLabel: string;
  icon: LucideIcon;
};

const buttonGroup: ButtonGroupData = {
  activeCount: 19,
  inactiveCount: 18,
  actionLabel: 'Save',
  icon: BookmarkIcon,
};

const ButtonGroup2 = () => {
  const [isSaved, setIsSaved] = useState(true);
  const Icon = buttonGroup.icon;

  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button
        variant="outline"
        className="border-border/70 gap-2 rounded-none rounded-l-md shadow-none focus-visible:z-10"
        onClick={() => setIsSaved((current) => !current)}
      >
        <Icon
          className={cn('size-4', {
            'fill-foreground stroke-foreground': isSaved,
          })}
        />
        {buttonGroup.actionLabel}
      </Button>
      <span className="border-border/70 bg-muted/20 text-muted-foreground flex items-center rounded-r-md border px-3 text-sm font-medium">
        {isSaved ? buttonGroup.activeCount : buttonGroup.inactiveCount}
      </span>
    </div>
  );
};

export default ButtonGroup2;
