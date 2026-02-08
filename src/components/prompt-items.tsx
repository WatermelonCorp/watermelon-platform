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

interface PromptItemsProps {
  className?: string;
  files?: ComponentFile[];
  dependencies?: string[];
  componentName?: string;

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
  openDelay = 200,
  closeDelay = 100,
  side = "top",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
}: PromptItemsProps) {
  const [copiedPlatform, setCopiedPlatform] =
    useState<PlatformType | null>(null);

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
      setTimeout(() => setCopiedPlatform(null), 2000);
    } catch (error) {
      console.error("Failed to copy prompt:", error);
    }
  };

  return (
    <TooltipProvider
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      <div className={cn("flex items-center gap-1", className)}>
        {PLATFORMS.map((platform) => {
          const info = PLATFORM_INFO[platform];
          const isCopied = copiedPlatform === platform;

          return (
            <Tooltip
              side={side}
              sideOffset={sideOffset}
              align={align}
              alignOffset={alignOffset}
            >
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCopyPrompt(platform)}
                  className={cn(
                    "flex items-center justify-center cursor-pointer w-8 h-8 rounded-md bg-neutral-950 dark:bg-neutral-50 transition-all",
                    isCopied && "ring-1 ring-primary"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isCopied ? (
                      <AnimatedCheck
                        key="check"
                        className="h-4 w-4 text-primary"
                      />
                    ) : (
                      <motion.img
                        key="icon"
                        src={info.icon}
                        alt={info.name}
                        className={cn("h-4 w-4 object-contain", info.name !== "Lovable" ? "dark:invert" : "")}
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