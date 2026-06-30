import { cn } from "@/lib/utils";

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
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}