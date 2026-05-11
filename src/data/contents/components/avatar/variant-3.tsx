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
  name: 'Sara Patel',
  avatar:     'https://assets.watermelon.sh/wm_mia.png',
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('');

const Avatar3 = () => {
  return (
    <Avatar className="rounded-sm">
      <AvatarImage
        src={profile.avatar}
        alt={profile.name}
        className="rounded-sm"
      />
      <AvatarFallback className="text-xs">
        {getInitials(profile.name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default Avatar3;
