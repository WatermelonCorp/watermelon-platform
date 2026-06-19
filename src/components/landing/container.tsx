import { cn } from '@/lib/utils';

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'container mx-auto px-4 md:px-8 lg:px-12 xl:px-16',
        className,
      )}
    >
      {children}
    </div>
  );
}
