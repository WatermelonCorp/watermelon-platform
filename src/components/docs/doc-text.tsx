export function DocText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
      {children}
    </p>
  );
}
