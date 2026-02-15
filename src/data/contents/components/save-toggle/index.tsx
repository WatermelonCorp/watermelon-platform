"use client";

import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

type ButtonStatus = "idle" | "loading" | "success" | "saved";
type Size = "sm" | "md" | "lg";

const SIZE_CONFIG = {
  sm: {
    height: 52,
    circleWidth: 52,
    idleWidth: 108,
    savedWidth: 128,
    text: "text-[18px]",
    icon: "text-2xl",
    spinner: "w-7 h-7",
    gap: "gap-2",
    padding: "px-4",
  },
  md: {
    height: 56,
    circleWidth: 56,
    idleWidth: 120,
    savedWidth: 140,
    text: "text-[20px]",
    icon: "text-3xl",
    spinner: "w-8 h-8",
    gap: "gap-3",
    padding: "px-5",
  },
  lg: {
    height: 68,
    circleWidth: 68,
    idleWidth: 144,
    savedWidth: 168,
    text: "text-[22px]",
    icon: "text-[28px]",
    spinner: "w-9 h-9",
    gap: "gap-4",
    padding: "px-5",
  },
};

interface SaveToggleProps {
  size?: Size;
  idleText?: string;
  savedText?: string;
  loadingDuration?: number;
  successDuration?: number;
  onStatusChange?: (status: ButtonStatus) => void;
}

export const SaveToggle: React.FC<SaveToggleProps> = ({
  size = "md",
  idleText = "Save",
  savedText = "Saved",
  loadingDuration = 1000,
  successDuration = 800,
  onStatusChange,
}) => {
  const [status, setStatus] = useState<ButtonStatus>("idle");
  const cfg = SIZE_CONFIG[size];

  const stableWidth = Math.max(cfg.idleWidth, cfg.savedWidth);

  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  const handleClick = () => {
    if (status === "idle") {
      setStatus("loading");

      setTimeout(() => {
        setStatus("success");

        setTimeout(() => {
          setStatus("saved");
        }, successDuration);
      }, loadingDuration);
    } else if (status === "saved") {
      setStatus("idle");
    }
  };

  const isCircle = status === "loading" || status === "success";

  return (
    <motion.button
      onClick={handleClick}
      layout
      initial={false}
      animate={{
        width: isCircle ? cfg.circleWidth : stableWidth,
        height: cfg.height,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      className={`
        relative overflow-hidden rounded-full flex items-center justify-center
        shadow-sm select-none active:scale-[0.97] transition-all
        bg-muted text-foreground
        hover:bg-muted/80
        border border-transparent
        ${status === "saved"
          ? "bg-background border-border"
          : ""}
      `}
    >
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`font-semibold tracking-tight ${cfg.text}`}
          >
            {idleText}
          </motion.span>
        )}

        {status === "loading" && (
          <motion.svg
            key="loading"
            viewBox="0 0 26 26"
            className={cfg.spinner}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M12 2 A10 10 0 0 1 22 12"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </motion.svg>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.15 }}
          >
            <BsCheckCircleFill
              className={`${cfg.icon} text-muted-foreground`}
            />
          </motion.div>
        )}

        {status === "saved" && (
          <motion.div
            key="saved"
            className={`flex items-center ${cfg.gap} ${cfg.padding}`}
          >
            <BsCheckCircleFill
              className={`${cfg.icon} text-primary`}
            />
            <span
              className={`font-semibold ${cfg.text} text-muted-foreground`}
            >
              {savedText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
