import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  items: {
    label: string;
    href?: string;
  }[];
  className?: string;
}

export const PageHeader = ({ items, className }: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "inline-flex items-center gap-3 px-2 md:px-4 py-px md:py-2 rounded-sm md:rounded-lg bg-background/80 backdrop-blur-sm border shadow-sm",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          {index > 0 && (
            <span className="text-muted-foreground/50 text-base md:text-lg">/</span>
          )}
          {item.href ? (
            <Link
              to={item.href}
              className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-xs md:text-sm font-medium text-foreground">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </motion.div>
  );
};
