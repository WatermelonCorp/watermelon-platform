interface CatalogPageHeaderProps {
  title: string;
}

export function CatalogPageHeader({ title }: CatalogPageHeaderProps) {
  return (
    <div className="px-4 md:px-6 lg:px-8 mt-4 md:mt-8">
      <h1 className="tracking-tight text-sm md:text-base">{title}</h1>
    </div>
  );
}
