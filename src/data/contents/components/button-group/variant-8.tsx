import type { LucideIcon } from 'lucide-react';
import { ArrowUpRightIcon } from 'lucide-react';

import { buttonVariants } from '@/components/base-ui/button';
import { cn } from '@/lib/utils';

type ButtonGroupLink = {
  href: string;
  icon: LucideIcon;
  iconLabel: string;
  primaryLabel: string;
};

const buttonGroup: ButtonGroupLink = {
  href: '#',
  icon: ArrowUpRightIcon,
  iconLabel: 'Open external preview',
  primaryLabel: 'Open preview',
};

const ButtonGroup8 = () => {
  const Icon = buttonGroup.icon;

  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <a
        href={buttonGroup.href}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'border-border/70 rounded-none rounded-l-md shadow-none focus-visible:z-10',
        )}
      >
        {buttonGroup.primaryLabel}
      </a>
      <a
        href={buttonGroup.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'border-border/70 rounded-none rounded-r-md shadow-none focus-visible:z-10',
        )}
      >
        <Icon className="size-4" />
        <span className="sr-only">{buttonGroup.iconLabel}</span>
      </a>
    </div>
  );
};

export default ButtonGroup8;
