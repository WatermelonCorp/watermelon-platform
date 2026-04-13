import { ArrowRightIcon } from 'lucide-react';

import { Badge } from '@/components/base-ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/base-ui/breadcrumb';

type BreadcrumbSegment =
  | {
      label: string;
      href: string;
      current?: false;
    }
  | {
      label: string;
      current: true;
      href?: never;
    };

const segments: readonly BreadcrumbSegment[] = [
  { label: 'Workspace', href: '#' },
  { label: 'Campaigns', href: '#' },
  { label: 'Launch Assets', current: true },
] as const;

const Breadcrumb5 = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-1.5">
        {segments.map((segment, index) => (
          <BreadcrumbItem key={segment.label}>
            {'href' in segment ? (
              <BreadcrumbLink href={segment.href}>
                <Badge
                  variant="outline"
                  className="border-border/70 text-muted-foreground hover:text-foreground px-2.5"
                >
                  {segment.label}
                </Badge>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>
                <Badge
                  variant="outline"
                  className="border-foreground/20 bg-muted/30 text-foreground px-2.5 font-medium"
                >
                  {segment.label}
                </Badge>
              </BreadcrumbPage>
            )}
            {index < segments.length - 1 ? (
              <BreadcrumbSeparator className="text-muted-foreground/60">
                <ArrowRightIcon className="size-3.5" />
              </BreadcrumbSeparator>
            ) : null}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumb5;
