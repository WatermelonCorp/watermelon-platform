'use client';

import { useState } from 'react';

import type { LucideIcon } from 'lucide-react';
import {
  ChevronRightIcon,
  FolderIcon,
  FolderOpenIcon,
  HomeIcon,
} from 'lucide-react';

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

type RootSegment = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const rootSegment: RootSegment = {
  label: 'Home',
  href: '#',
  icon: HomeIcon,
};

const currentLabel = 'Release Notes';

const menuOptions = ['Updates', 'Changelog', 'Archive'] as const;

const Breadcrumb7 = () => {
  const [open, setOpen] = useState(false);
  const RootIcon = rootSegment.icon;

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-1.5 text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink
            href={rootSegment.href}
            className="hover:text-foreground flex items-center gap-1.5 rounded-sm px-1 py-0.5"
          >
            <RootIcon className="text-muted-foreground size-3.5" />
            <span className="sr-only">{rootSegment.label}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-muted-foreground/60">
          <ChevronRightIcon className="size-3.5" />
        </BreadcrumbSeparator>
        <BreadcrumbItem className="flex items-center">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-1 rounded-sm px-1 py-0.5 outline-none">
              {open ? (
                <FolderOpenIcon className="size-3.5" />
              ) : (
                <FolderIcon className="size-3.5" />
              )}
              <span className="sr-only">
                {open ? 'Open section menu' : 'Open section menu'}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {menuOptions.map((option) => (
                <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-muted-foreground/60">
          <ChevronRightIcon className="size-3.5" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="rounded-sm px-1 py-0.5 font-medium">
            {currentLabel}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumb7;
