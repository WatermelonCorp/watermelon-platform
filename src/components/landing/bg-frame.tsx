import { cn } from "@/lib/utils";
import { ResilientImage } from "@/components/ui/resilient-image";

interface Props {
  imageUrl: string;
  className?: string;
  alt?: string;
}

export default function BgFrame({ imageUrl, className, alt = "Image frame" }: Props) {
  return (
    <div
      className={cn(
        "relative dark:bg-accent overflow-hidden p-1.5",
        className
      )}
    >
      <ResilientImage
        src={imageUrl}
        alt={alt}
        className="w-full h-auto object-cover"
        fallback={
          <div className="flex min-h-40 w-full items-center justify-center bg-muted text-sm font-medium text-muted-foreground">
            Preview unavailable
          </div>
        }
      />
    </div>
  );
}
