import { cn } from "@/lib/utils";
import React from "react";

interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GradientCard({ className, children, ...props }: GradientCardProps) {
  return (
    <div
      className={cn(
        "relative p-[2px] rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500",
        "hover:from-blue-500 hover:via-purple-500 hover:to-pink-500",
        "transition-all duration-500",
        className
      )}
      {...props}
    >
      <div className="bg-background rounded-[10px] p-6">
        {children}
      </div>
    </div>
  );
}
