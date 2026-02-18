interface CatalogPageHeaderProps {
  title: string;
}

export function CatalogPageHeader({ title }: CatalogPageHeaderProps) {
  return (
    <div className="px-2 md:px-4 mt-2 md:mt-0">
      <h1 className="tracking-tight text-sm md:text-base">{title}</h1>
    </div>
  );
}
