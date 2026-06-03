"use client";

import { useState } from "react";
import {
  generateAllPrompts,
  PLATFORM_INFO,
  PLATFORMS,
  type PlatformType,
} from "@/lib/prompt-template";
import type { ComponentFile } from "@/lib/types";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/animate-ui/components/animate/tooltip";
import { AnimatePresence, motion } from "motion/react";
import { AnimatedCheck } from "./animated-check";
import { trackEvent } from "@/lib/analytics";

interface PromptItemsProps {
  className?: string;
  files?: ComponentFile[];
  dependencies?: string[];
  componentName?: string;
  componentSlug?: string;
  category?: string;
  source?: string;

  /** optional – same as demo */
  openDelay?: number;
  closeDelay?: number;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
}

export function PromptItems({
  className = "",
  files = [],
  dependencies = [],
  componentName = "Component",
  componentSlug,
  category,
  source,
  openDelay = 200,
  closeDelay = 100,
  side = "top",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
}: PromptItemsProps) {
  const [copiedPlatform, setCopiedPlatform] =
    useState<PlatformType | null>(null);
  const [copyCount, setCopyCount] = useState(0);

  const handleCopyPrompt = async (platform: PlatformType) => {
    if (!files.some((f) => f.content?.trim())) {
      console.error("No component files available to generate prompt");
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
      setCopyCount((c) => c + 1);
      setTimeout(() => setCopiedPlatform(null), 2000);
      trackEvent("ai_prompt_copy", {
        platform,
        component_slug: componentSlug,
        component_name: componentName,
        category,
        source,
        file_count: files.length,
        dependency_count: dependencies.length,
      });
    } catch (error) {
      console.error("Failed to copy prompt:", error);
    }
  };

  return (
    <TooltipProvider
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      <div className={cn("flex items-center gap-2", className)}>
        {PLATFORMS.map((platform) => {
          const info = PLATFORM_INFO[platform];
          const isCopied = copiedPlatform === platform;

          return (
            <Tooltip
              key={platform}
              side={side}
              sideOffset={sideOffset}
              align={align}
              alignOffset={alignOffset}
            >
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCopyPrompt(platform)}
                  aria-label={`Copy AI prompt for ${info.name}`}
                  className={cn(
                    "flex items-center justify-center cursor-pointer transition-all bg-gray-100 dark:bg-neutral-800 rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] size-7 md:size-9"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isCopied ? (
                      <AnimatedCheck
                        key={`check-${platform}-${copyCount}`}
                        className="h-4 w-4 text-primary"
                      />
                    ) : (
                      <motion.img
                        key="icon"
                        src={info.icon}
                        alt={info.name}
                        className={cn(
                          "h-4 w-4 object-contain",
                          platform === "V0"
                            ? "invert dark:invert-0"           // greyscale in light, colour in dark
                            : platform !== "LOVABLE"
                              ? "dark:invert"                  // colour in light, white in dark
                              : ""                             // Lovable: no invert ever
                        )}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </AnimatePresence>

                </button>
              </TooltipTrigger>

              <TooltipContent>
                <p className="text-xs font-mono">
                  {isCopied ? "Copied!" : `Copy for ${info.name}`}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
