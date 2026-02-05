import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tick02Icon } from '@hugeicons/core-free-icons';
import {
  generateAllPrompts,
  PLATFORM_INFO,
  PLATFORMS,
  type PlatformType,
} from '@/lib/prompt-template';
import type { ComponentFile } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface PromptItemsProps {
  className?: string;
  files?: ComponentFile[];
  dependencies?: string[];
  componentName?: string;
}

export function PromptItems({
  className = '',
  files = [],
  dependencies = [],
  componentName = 'Component',
}: PromptItemsProps) {
  const [copiedPlatform, setCopiedPlatform] = useState<PlatformType | null>(null);

  const handleCopyPrompt = async (platform: PlatformType) => {
    if (files.length === 0 || !files.some((f) => f.content?.trim())) {
      console.error('No component files available to generate prompt');
      return;
    }

    const prompts = generateAllPrompts({
      componentName,
      files,
      dependencies,
    });

    try {
      await navigator.clipboard.writeText(prompts[platform]);
      setCopiedPlatform(platform);
      setTimeout(() => setCopiedPlatform(null), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {PLATFORMS.map((platform) => {
        const info = PLATFORM_INFO[platform];
        const isCopied = copiedPlatform === platform;

        return (
          <Tooltip key={platform}>
            <TooltipTrigger asChild>
              <button
                onClick={() => handleCopyPrompt(platform)}
                className={cn(
                  'flex items-center justify-center bg-neutral-950 w-8 h-8 rounded-md text-sm font-medium transition-all duration-200 border',
                  isCopied && 'ring-2 ring-green-500'
                )}
              >
                {isCopied ? (
                  <HugeiconsIcon icon={Tick02Icon} size={14} className="text-green-500" />
                ) : (
                  <img
                    src={info.icon}
                    alt={info.name}
                    className={cn(
                      "h-4 w-4 object-contain",
                    )}
                  />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-mono">
                {isCopied ? 'Copied!' : `Copy for ${info.name}`}
              </p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
