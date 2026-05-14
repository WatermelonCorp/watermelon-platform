import React from 'react';

interface CatalogPageHeaderProps {
  title: string;
  description?: React.ReactNode;
}

export function CatalogPageHeader({ title, description }: CatalogPageHeaderProps) {
  return (
    <div className="space-y-1.5 px-4 md:px-6 lg:px-8 mt-4 md:mt-8">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground max-w-xl">{description}</p>
      )}
    </div>
  );
}
