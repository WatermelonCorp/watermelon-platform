import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface PageHeaderProps {
  items: {
    label: string;
    href?: string;
  }[];
  className?: string;
  variant?: "default" | "pill";
  action?: ReactNode;
}

export const PageHeader = ({
  items,
  className,
  variant = "default",
  action
}: PageHeaderProps) => {
  const isPill = variant === "pill";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      whileTap={isPill ? { scale: 0.98 } : undefined}
      className={cn(
        "inline-flex items-center gap-2",
        isPill ? [
          "bg-background/80 backdrop-blur-md border px-3 py-1.5 rounded-full shadow-sm",
          "pointer-events-auto"
        ] : [
          "h-8 md:h-10 rounded-md px-2 bg-background"
        ],
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <span className={cn(
              "text-muted-foreground/30",
              isPill ? "mx-0.5" : "text-base md:text-lg mx-1"
            )}>
              /
            </span>
          )}
          {item.href ? (
            <Link
              to={item.href}
              className={cn(
                "font-medium hover:text-foreground transition-colors duration-200 ease-in-out",
                isPill ? "text-xs text-muted-foreground" : "text-xs md:text-sm text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn(
              "font-medium text-foreground",
              isPill ? "text-xs" : "text-xs md:text-sm"
            )}>
              {item.label}
            </span>
          )}
        </div>
      ))}
      {action && (
        <div className="ml-1 pl-1 border-l border-border/50 flex items-center">
          {action}
        </div>
      )}
    </motion.div>
  );
};
