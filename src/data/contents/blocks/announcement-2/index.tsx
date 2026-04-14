'use client';


import { X } from 'lucide-react';

import { Button } from '@/components/base-ui/button';

import { HiSparkles, HiArrowRight } from 'react-icons/hi2';

export default function Announcement2() {


  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="border-primary relative flex w-full items-center justify-center border-b sm:px-4 px-8 py-1.5">
        <div className="flex items-center gap-2 w-full justify-center">
          <div className="text-muted-foreground flex items-center gap-1 min-w-0">
            <HiSparkles className="text-primary h-4 w-4 shrink-0" />
            <p className='truncate'>
              Hackathon registrations are now open — build fast, ship faster,
              and win big.
            </p>
          </div>
          <div className="group flex items-center gap-1">
            <Button className="rounded-full shrink-0">
              Join now
              <HiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 " />
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
      
          className="text-primary shrink-0 hover:text-primary/70 absolute right-1 rounded-lg hover:bg-transparent dark:hover:bg-transparent"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
