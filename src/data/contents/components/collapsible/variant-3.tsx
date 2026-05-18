'use client';

import { useState } from 'react';

import { ChevronUpIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/base-ui/avatar';
import { Button } from '@/components/base-ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/base-ui/collapsible';

type Task = {
  fallback: string;
  image: string;
  name: string;
  progress: number;
  role: string;
};

const tasks: readonly Task[] = [
  {
    image: 'https://assets.watermelon.sh/wm_mia.png',
    fallback: 'MC',
    name: 'Mia Chen',
    role: 'Product Designer',
    progress: 88,
  },
  {
    image: 'https://assets.watermelon.sh/wm_alex.png',
    fallback: 'AS',
    name: 'Alex Scott',
    role: 'Frontend Engineer',
    progress: 64,
  },
  {
    image: 'https://assets.watermelon.sh/wm_emma.png',
    fallback: 'EL',
    name: 'Emma Lewis',
    role: 'Research Lead',
    progress: 76,
  },
  {
    image: 'https://assets.watermelon.sh/wm_josh.png',
    fallback: 'JP',
    name: 'Josh Price',
    role: 'Operations Analyst',
    progress: 29,
  },
] as const;

const Collapsible3 = () => {
  const [open, setOpen] = useState<boolean>(false);
  const visibleTasks = tasks.slice(0, 2);
  const hiddenTasks = tasks.slice(2);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="flex w-full max-w-[350px] flex-col items-start gap-4 p-4"
    >
      <div className="font-medium">Today&apos;s team progress</div>
      <ul className="flex w-full flex-col gap-3">
        {visibleTasks.map((task) => (
          <li
            key={task.name}
            className="bg-card flex items-start gap-4 rounded-md px-3 py-2 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]"
          >
            <Avatar>
              <AvatarImage src={task.image} alt={task.name} />
              <AvatarFallback>{task.fallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <div className="text-sm font-medium">{task.name}</div>
              <p className="text-muted-foreground text-xs">{task.role}</p>
            </div>
            <span className="text-muted-foreground text-sm self-center">{`${task.progress}%`}</span>
          </li>
        ))}
        <CollapsibleContent className="flex flex-col gap-3">
          {hiddenTasks.map((task) => (
            <li
              key={task.name}
              className="bg-card flex items-start gap-4 rounded-md px-3 py-2 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]"
            >
              <Avatar>
                <AvatarImage src={task.image} alt={task.name} />
                <AvatarFallback>{task.fallback}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <div className="text-sm font-medium">{task.name}</div>
                <p className="text-muted-foreground text-xs">{task.role}</p>
              </div>
              <span className="text-muted-foreground text-sm self-center">{`${task.progress}%`}</span>
            </li>
          ))}
        </CollapsibleContent>
      </ul>
      <CollapsibleTrigger>
        <Button variant="outline" size="sm" className="border-border/70">
          <span>{open ? 'Show less' : 'Show more'}</span>
          <ChevronUpIcon
            className={`size-4 transition-transform ${open ? '' : 'rotate-180'}`}
          />
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  );
};

export default Collapsible3;
