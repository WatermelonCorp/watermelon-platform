export function DocHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="md:pt-4 pb-2 border-b border-border">
      <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
