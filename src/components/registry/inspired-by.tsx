import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01FreeIcons } from '@/lib/hugeicons';

import { InformationCircleIcon } from '@/lib/hugeicons';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface InspiredByData {
  name: string;
  url?: string;
}

export interface InspiredByProps {
  inspiredBy?: InspiredByData | null;
  /** Legacy prop for backward compatibility */
  inspiredByName?: string;
  /** Legacy prop for backward compatibility */
  inspiredByLink?: string;
  className?: string;
}

export function InspiredBy({
  inspiredBy,
  inspiredByName,
  inspiredByLink,
  className = "",
}: InspiredByProps) {
  const name = inspiredBy?.name || inspiredByName;
  const url = inspiredBy?.url || inspiredByLink;

  if (!name) {
    return (
      <TooltipProvider>
        <Tooltip>
          <div className={`group/inspired-by flex flex-wrap items-center gap-x-1.5 gap-y-1 ${className}`}>
            <span className="text-sm font-medium text-muted-foreground">Inspired by</span>
            <span className="text-foreground text-sm font-medium">Unknown</span>
            <TooltipTrigger asChild>
              <button 
                type="button" 
                className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors pt-0.5"
                aria-label="Attribution information"
              >
                <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2.5} size={16} className="shrink-0" />
              </button>
            </TooltipTrigger>
          </div>
          <TooltipContent side="top" className="max-w-[250px] text-center text-xs">
            If you are the original creator of this design, please reach out for attribution.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className={`group/inspired-by flex flex-wrap items-center gap-x-1.5 gap-y-1 ${className}`}>
      <span className="text-sm font-medium text-muted-foreground">Inspired by</span>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground inline-flex items-center text-sm underline underline-offset-4 font-medium"
        >
          {name}
          <HugeiconsIcon
            icon={ArrowUpRight01FreeIcons}
            size={14}
            className="transition group-hover/inspired-by:translate-x-1"
          />
        </a>
      ) : (
        <span className="text-foreground text-sm font-medium">{name}</span>
      )}
      <span className="text-sm font-medium text-muted-foreground">, independently developed and not affiliated.</span>
    </div>
  );
}
