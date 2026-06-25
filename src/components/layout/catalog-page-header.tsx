import React from 'react';

interface CatalogPageHeaderProps {
  title: string;
  description?: React.ReactNode;
  /** Optional content rendered on the right side of the header (e.g. view toggle) */
  actions?: React.ReactNode;
}

export function CatalogPageHeader({ title, description, actions }: CatalogPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 md:px-6 lg:px-8 mt-4 md:mt-8">
      <div className="space-y-1.5 min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground max-w-xl">{description}</p>
        )}
      </div>
      {actions && (
        <div className="shrink-0 pt-1">{actions}</div>
      )}
    </div>
  );
}
