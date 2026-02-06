import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import * as motion from "motion/react-client";

interface CodeCollapsibleWrapperProps extends React.ComponentProps<typeof Collapsible> {
  className?: string;
  children: React.ReactNode;
}

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: CodeCollapsibleWrapperProps) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn("group/collapsible relative", className)}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <div className="absolute top-1.5 right-14 flex items-center z-40">
          <motion.button
            layout
            className="text-muted-foreground h-7 rounded-md px-2 cursor-pointer hover:bg-accent"
          >
            {isOpened ? "Collapse" : "Expand"}
          </motion.button>
          <Separator orientation="vertical" className="mx-1.5 h-8!" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        forceMount
        className="relative mt-6 mb-0 overflow-hidden data-[state=closed]:max-h-64"
      >
        {children}
      </CollapsibleContent>
      <CollapsibleTrigger
        className={cn(
          "absolute inset-x-0 bottom-0 flex items-center justify-center text-sm text-muted-foreground transition-all",
          "from-background/80 to-muted/50 bg-linear-to-b",
          isOpened ? "h-12" : "h-40"
        )}
      >
        {isOpened ? "Collapse" : "Expand"}
      </CollapsibleTrigger>
    </Collapsible>
  );
}
