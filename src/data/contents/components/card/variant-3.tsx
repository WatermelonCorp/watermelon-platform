import { CircleFadingPlusIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/base-ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base-ui/card';
import { Button } from '@/components/base-ui/button';

type TeamMember = {
  fallback: string;
  imageAlt: string;
  name: string;
  role: string;
  src: string;
};

const members: readonly TeamMember[] = [
  {
    fallback: 'MP',
    imageAlt: 'Mia Polina',
    name: 'Mia Polina',
    role: 'Product Designer',
    src: 'https://assets.watermelon.sh/wm_mia.png',
  },
  {
    fallback: 'AG',
    imageAlt: 'Alex Grant',
    name: 'Alex Grant',
    role: 'Frontend Engineer',
    src: 'https://assets.watermelon.sh/wm_alex.png',
  },
  {
    fallback: 'BL',
    imageAlt: 'Ben Lewis',
    name: 'Ben Lewis',
    role: 'Brand Strategist',
    src: 'https://assets.watermelon.sh/wm_ben.png',
  },
] as const;

const Card3 = () => {
  return (
    <Card className="w-full max-w-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] ring-0">
      <CardHeader>
        <CardTitle>Project Team</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          className="border-border bg-muted hover:bg-muted/75 flex h-full items-center gap-4 rounded-lg border border-dashed px-4 py-3 text-left transition-colors duration-200"
        >
          <CircleFadingPlusIcon className="text-muted-foreground size-5" />
          <span className="text-sm font-semibold">Invite teammate</span>
        </Button>
        {members.map((member) => (
          <div
            key={member.name}
            className="border-border/45 bg-background/70 flex items-center gap-4 rounded-lg border px-4 py-3"
          >
            <Avatar>
              <AvatarImage src={member.src} alt={member.imageAlt} />
              <AvatarFallback className="text-xs">
                {member.fallback}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{member.name}</span>
              <span className="text-muted-foreground text-xs">
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Card3;
