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

const Avatar21 = () => {
  return (
    <div className="bg-background border-border/70 flex flex-wrap items-center w-fit justify-center rounded-full border px-1.5 py-1 shadow-sm">
      <div className="flex -space-x-1.5">
        {avatars.map((avatar) => (
          <Avatar key={avatar.name} className="ring-background size-6 ring-2">
            <AvatarImage src={avatar.src} alt={avatar.name} />
            <AvatarFallback className="text-xs">
              {getInitials(avatar.name)}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <p className="text-muted-foreground px-2.5 text-xs">
        Used by <strong className="text-foreground font-medium">12K+</strong>{' '}
        product teams.
      </p>
    </div>
  );
};

export default Avatar21;
