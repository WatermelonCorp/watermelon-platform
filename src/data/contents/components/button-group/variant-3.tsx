import type { LucideIcon } from 'lucide-react';
import {
  Layers3Icon,
  MessageSquareIcon,
  PaletteIcon,
  ScissorsIcon,
  WandSparklesIcon,
} from 'lucide-react';

import { Button } from '@/components/base-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/base-ui/tooltip';

type ToolAction = {
  icon: LucideIcon;
  label: string;
};

const actions: readonly ToolAction[] = [
  { icon: Layers3Icon, label: 'Layers' },
  { icon: MessageSquareIcon, label: 'Comment' },
  { icon: PaletteIcon, label: 'Style' },
  { icon: ScissorsIcon, label: 'Trim' },
  { icon: WandSparklesIcon, label: 'Enhance' },
] as const;

const ButtonGroup3 = () => {
  return (
    <TooltipProvider>
      <div className="bg-muted/20 inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const isFirst = index === 0;
          const isLast = index === actions.length - 1;

          return (
            <Tooltip key={action.label}>
              <TooltipTrigger>
                <Button
                  className={[
                    'border-border/70 bg-background hover:bg-muted/30 rounded-none px-3 shadow-none focus-visible:z-10',
                    isFirst ? 'rounded-l-md' : '',
                    isLast ? 'rounded-r-md' : '',
                  ].join(' ')}
                  variant="outline"
                >
                  <Icon className="size-4" />
                  <span className="sr-only">{action.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                {action.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default ButtonGroup3;
