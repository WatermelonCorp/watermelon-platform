import type { LucideIcon } from 'lucide-react';
import { HomeIcon } from 'lucide-react';

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

const rootSegment: { href: string; icon: LucideIcon; label: string } = {
  href: '#',
  icon: HomeIcon,
  label: 'Home',
};

const segments: readonly BreadcrumbSegment[] = [
  { label: 'Workspace', href: '#' },
  { label: 'Team Library', current: true },
] as const;

const Breadcrumb8 = () => {
  const RootIcon = rootSegment.icon;

  return (
    <Breadcrumb>
      <BreadcrumbList className="border-border/70 h-9 gap-2.5 rounded-full border px-4 text-sm shadow-xs w-fit">
        <BreadcrumbItem>
          <BreadcrumbLink
            href={rootSegment.href}
            className="hover:text-foreground rounded-sm p-0.5"
          >
            <RootIcon className="size-3.5" />
            <span className="sr-only">{rootSegment.label}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment) => (
          <BreadcrumbItem key={segment.label}>
            <BreadcrumbSeparator className="text-muted-foreground/60">
              /
            </BreadcrumbSeparator>
            {'href' in segment ? (
              <BreadcrumbLink
                href={segment.href}
                className="hover:text-foreground"
              >
                {segment.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="font-medium">
                {segment.label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumb8;
