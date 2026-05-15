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
  name: 'Alex Rivera',
  avatar: 'https://assets.watermelon.sh/wm_alex.png',
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('');

const Avatar2 = () => {
  return (
    <Avatar className="ring-ring ring-2">
      <AvatarImage src={profile.avatar} alt={profile.name} />
      <AvatarFallback className="text-xs">
        {getInitials(profile.name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default Avatar2;
