import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/base-ui/avatar';

type Profile = {
  name: string;
  avatar: string;
};

const profile: Profile = {
  name: 'Emma Thompson',
  avatar: 'https://assets.watermelon.sh/wm_emma.png',
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('');

const Avatar4 = () => {
  return (
    <Avatar className="size-12">
      <AvatarImage src={profile.avatar} alt={profile.name} />
      <AvatarFallback className="text-xs">
        {getInitials(profile.name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default Avatar4;
