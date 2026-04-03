import type { LucideIcon } from 'lucide-react';
import { ChevronDownIcon, ChevronRightIcon, HomeIcon } from 'lucide-react';

import { Badge } from '@/components/base-ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/base-ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/base-ui/dropdown-menu';

type LinkSegment = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

const rootSegment: LinkSegment = {
  label: 'Home',
  href: '#',
  icon: HomeIcon,
};

const sectionSegment: LinkSegment = {
  label: 'Projects',
  href: '#',
};

const currentSegment = {
  label: 'Design System',
  options: ['Tokens', 'Components', 'Patterns'],
} as const;

const Breadcrumb6 = () => {
  const RootIcon = rootSegment.icon;

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-1.5">
        <BreadcrumbItem>
          <BreadcrumbLink href={rootSegment.href}>
            <Badge
              variant="outline"
              className="border-border/70 text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 px-2.5"
            >
              {RootIcon ? <RootIcon className="size-3" /> : null}
              {rootSegment.label}
            </Badge>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-muted-foreground/60">
          <ChevronRightIcon className="size-3.5" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href={sectionSegment.href}>
            <Badge
              variant="outline"
              className="border-border/70 text-muted-foreground hover:text-foreground px-2.5"
            >
              {sectionSegment.label}
            </Badge>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-muted-foreground/60">
          <ChevronRightIcon className="size-3.5" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-foreground inline-flex items-center gap-1 rounded-sm px-1 py-0.5 font-medium outline-none">
                {currentSegment.label}
                <ChevronDownIcon className="text-muted-foreground size-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {currentSegment.options.map((option) => (
                  <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumb6;
