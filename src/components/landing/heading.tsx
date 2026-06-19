import { cn } from "@/lib/utils";
import React from "react";

export default function Heading({
  className,
  children,
  as = "h2",
  variant = "medium",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "h1" | "h2";
  variant?: "big" | "medium" | "small";
}) {
  const Tag = as;
  const variants = {
    big: "text-4xl md:text-6xl lg:text-[80px]",
    medium: "text-xl md:text-2xl lg:text-3xl",
    small: "text-lg md:text-xl",
    none: "",
  };
  return (
    <Tag
      className={cn(
        "font-heading font-medium tracking-tighter",
        variants[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
