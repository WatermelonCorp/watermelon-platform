import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/base-ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/base-ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/base-ui/tooltip';

type Collaborator = {
  fallback: string;
  name: string;
  src: string;
};

type NoteCardContent = {
  description: string;
  items: readonly string[];
  summary: string;
  title: string;
};



const collaborators: readonly Collaborator[] = [
  {
    src: 'https://assets.watermelon.sh/wm_mia.png',
    fallback: 'MC',
    name: 'Mia ',
  },
  {
    src: 'https://assets.watermelon.sh/wm_alex.png',
    fallback: 'AG',
    name: 'Alex Grant',
  },
  {
    src: 'https://assets.watermelon.sh/wm_ben.png',
    fallback: 'BL',
    name: 'Ben Lewis',
  },
  {
    src:  'https://assets.watermelon.sh/wm_olivia.png',
    fallback: 'OP',
    name: 'Olivia ',
  },
] as const;

const noteCard: NoteCardContent = {
  description: 'Key points from the weekly planning review.',
  items: [
    'Finalize onboarding checklist before Friday.',
    'Reduce the number of steps in the setup flow.',
    'Prepare a lighter mobile navigation pattern.',
    'Share updated mockups with the product team.',
    'Review launch risks in the Monday standup.',
  ],
  summary:
    'The team aligned on simplification, mobile polish, and a tighter launch checklist.',
  title: 'Planning Recap',
};

const Card2 = () => {
  return (
    <Card className="border-border/70 max-w-md shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle>{noteCard.title}</CardTitle>
        <CardDescription>{noteCard.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p className="text-muted-foreground leading-6">{noteCard.summary}</p>
        <ol className="text-foreground flex list-decimal flex-col gap-2 pl-5">
          {noteCard.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </CardContent>
      <CardFooter className="border-border/60 flex items-center justify-between gap-4 border-t pt-5">
        <span className="text-muted-foreground text-sm">
          Reviewed by the project team
        </span>
        <TooltipProvider>
          <div className="flex -space-x-2">
            {collaborators.map((collaborator) => (
              <Tooltip key={collaborator.name}>
                <TooltipTrigger>
                  <Avatar className="ring-background ring-2 transition-all duration-300 ease-in-out">
                    <AvatarImage
                      src={collaborator.src}
                      alt={collaborator.name}
                    />
                    <AvatarFallback className="text-xs">
                      {collaborator.fallback}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent className="px-2 py-1 text-xs">
                  {collaborator.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default Card2;
