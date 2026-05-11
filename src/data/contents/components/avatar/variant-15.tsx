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

const Avatar15 = () => {
  return (
    <div className="flex -space-x-2.5">
      {avatars.map((avatar) => (
        <Avatar
          key={avatar.name}
          className="ring-background size-12 shadow-sm ring-2"
        >
          <AvatarImage src={avatar.src} alt={avatar.name} />
          <AvatarFallback>{getInitials(avatar.name)}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

export default Avatar15;
