import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/base-ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/base-ui/tooltip';

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

const Avatar13 = () => {
  return (
    <TooltipProvider>
      <div className="flex -space-x-2.5">
        {avatars.map((avatar) => (
          <Tooltip key={avatar.name}>
            <TooltipTrigger>
              <Avatar className="ring-background shadow-sm ring-2">
                <AvatarImage src={avatar.src} alt={avatar.name} />
                <AvatarFallback className="text-xs">
                  {getInitials(avatar.name)}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-[11px]">
              {avatar.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default Avatar13;
