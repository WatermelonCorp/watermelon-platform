import { HugeiconsIcon } from "@hugeicons/react";
import { ComputerIcon } from "@/lib/hugeicons";

export function MobileRestriction() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[50vh] bg-muted/5 border-y md:border-none">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <HugeiconsIcon icon={ComputerIcon} size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Desktop View Recommended</h3>
      <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
        This component is designed for larger screens. For the best experience, please view it on a desktop or laptop device.
      </p>
      <div className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
        Preview disabled on mobile
      </div>
    </div>
  );
}
