import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
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

const overflowCount = 6;

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('');

const Avatar14 = () => {
  return (
    <AvatarGroup>
      {avatars.map((avatar) => (
        <Avatar key={avatar.name}>
          <AvatarImage src={avatar.src} alt={avatar.name} />
          <AvatarFallback className="text-xs">
            {getInitials(avatar.name)}
          </AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount className="text-xs">+{overflowCount}</AvatarGroupCount>
    </AvatarGroup>
  );
};

export default Avatar14;
