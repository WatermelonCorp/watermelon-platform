import { BadgeCheckIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/base-ui/avatar';

type Profile = {
  name: string;
  avatar: string;
  status: string;
};

const profile: Profile = {
  name: 'Clara Hughes',
  avatar: 'https://i.pravatar.cc/160?img=56',
  status: 'Verified',
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('');

const Avatar12 = () => {
  return (
    <div className="relative w-fit">
      <Avatar className="ring-border/70 size-10 ring-1">
        <AvatarImage src={profile.avatar} alt={profile.name} />
        <AvatarFallback className="text-xs">
          {getInitials(profile.name)}
        </AvatarFallback>
      </Avatar>
      <span className="absolute -top-1 -right-1">
        <span className="sr-only">{profile.status}</span>
        <BadgeCheckIcon className="text-background size-4.5 fill-sky-500" />
      </span>
    </div>
  );
};

export default Avatar12;
