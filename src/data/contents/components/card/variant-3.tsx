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

type TeamMember = {
  fallback: string;
  imageAlt: string;
  name: string;
  role: string;
  src: string;
};

const members: readonly TeamMember[] = [
  {
    fallback: 'MC',
    imageAlt: 'Maya Chen',
    name: 'Maya Chen',
    role: 'Product Designer',
    src: 'https://i.pravatar.cc/160?img=28',
  },
  {
    fallback: 'EL',
    imageAlt: 'Ethan Lewis',
    name: 'Ethan Lewis',
    role: 'Frontend Engineer',
    src: 'https://i.pravatar.cc/160?img=36',
  },
  {
    fallback: 'AP',
    imageAlt: 'Ava Patel',
    name: 'Ava Patel',
    role: 'Brand Strategist',
    src: 'https://i.pravatar.cc/160?img=52',
  },
] as const;

const Card3 = () => {
  return (
    <Card className="border-border/70 w-full max-w-lg shadow-sm">
      <CardHeader>
        <CardTitle>Project Team</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="border-border/50 bg-muted/15 hover:bg-muted/25 flex items-center gap-4 rounded-lg border border-dashed px-4 py-3 text-left transition-colors"
        >
          <CircleFadingPlusIcon className="text-muted-foreground size-5" />
          <span className="text-sm font-semibold">Invite teammate</span>
        </button>
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
              <span className="text-muted-foreground text-sm">
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
