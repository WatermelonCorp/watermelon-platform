'use client';

import { useState } from 'react';

import type { LucideIcon } from 'lucide-react';
import {
  ChevronRightIcon,
  PanelsTopLeftIcon,
  PlusIcon,
  UserIcon,
} from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/base-ui/avatar';
import { Button } from '@/components/base-ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/base-ui/collapsible';

type UserProfile = {
  avatarAlt: string;
  avatarSrc: string;
  bio: string;
  fallback: string;
  followers: number;
  followed?: boolean;
  name: string;
  projects: number;
};

const users: readonly UserProfile[] = [
  {
    avatarAlt: 'Mia Chen',
    avatarSrc: 'https://assets.watermelon.sh/wm_mia.png',
    bio: 'Product designer focused on onboarding flows, product storytelling, and clean interface systems.',
    fallback: 'MC',
    followers: 142,
    name: 'Mia Chen',
    projects: 6,
  },
  {
    avatarAlt: 'Alex Scott',
    avatarSrc: 'https://assets.watermelon.sh/wm_alex.png',
    bio: 'Frontend engineer building flexible React systems with a focus on performance and implementation detail.',
    fallback: 'AS',
    followers: 108,
    followed: true,
    name: 'Alex Scott',
    projects: 4,
  },
  {
    avatarAlt: 'Emma Lewis',
    avatarSrc: 'https://assets.watermelon.sh/wm_emma.png',
    bio: 'Research lead translating user patterns into practical design decisions for product and brand teams.',
    fallback: 'EL',
    followers: 91,
    name: 'Emma Lewis',
    projects: 5,
  },
] as const;

type Metric = {
  icon: LucideIcon;
  value: number;
};

type UserRowProps = {
  user: UserProfile;
};

const UserRow = ({ user }: UserRowProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const metrics: readonly Metric[] = [
    { icon: UserIcon, value: user.followers },
    { icon: PanelsTopLeftIcon, value: user.projects },
  ] as const;

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="p-3"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.avatarSrc} alt={user.avatarAlt} />
            <AvatarFallback>{user.fallback}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </div>
        <ChevronRightIcon
          className={`size-4 transition-transform ${open ? 'rotate-90' : ''}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground text-sm">{user.bio}</p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                const metricKey = `${user.name}-${metric.value}-${Icon.name}`;

                return (
                  <span key={metricKey} className="flex items-center gap-2">
                    <Icon className="text-muted-foreground size-4" />
                    <span className="text-sm">{metric.value}</span>
                  </span>
                );
              })}
            </div>
            {user.followed ? (
              <Button
                variant="outline"
                className="h-7 rounded-md px-3 py-1 text-xs"
              >
                Following
              </Button>
            ) : (
              <Button className="h-7 rounded-md bg-primary px-3 py-1 text-xs text-white hover:bg-sky-700 dark:bg-primary dark:hover:bg-primary">
                Follow
                <PlusIcon className="size-3.5" />
              </Button>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const Collapsible4 = () => {
  return (
    <ul className="flex w-full max-w-[350px] flex-col ">
      {users.map((user) => (
        <li key={user.name}>
          <UserRow user={user} />
        </li>
      ))}
    </ul>
  );
};

export default Collapsible4;
