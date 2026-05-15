import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/base-ui/avatar';

type Profile = {
  name: string;
  src: string;
};

const avatars: readonly Profile[] = [
  {
    src: 'https://assets.watermelon.sh/wm_ben.png',
    name: 'Mark',
  },
  {
    src: 'https://assets.watermelon.sh/wm_olivia.png',
    name: 'Olivia',
  },
  {
    src: 'https://assets.watermelon.sh/wm_josh.png',
    name: 'Josh',
  },
  {
    src: 'https://assets.watermelon.sh/wm_emma.png',
    name: 'Emma',
  },
] as const;

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('');

const Avatar17 = () => {
  return (
    <div className="flex -space-x-2 hover:space-x-1">
      {avatars.map((avatar) => (
        <Avatar
          key={avatar.name}
          className="ring-background ring-2 transition-all duration-300 ease-in-out"
        >
          <AvatarImage src={avatar.src} alt={avatar.name} />
          <AvatarFallback className="text-xs">
            {getInitials(avatar.name)}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

export default Avatar17;
