'use client';

import { useState } from 'react';

import type { LucideIcon } from 'lucide-react';
import { SparklesIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/base-ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base-ui/card';

type PromoCard = {
  ctaLabel: string;
  icon: LucideIcon;
  message: string;
  title: string;
};

const promoCard: PromoCard = {
  ctaLabel: 'Book a review',
  icon: SparklesIcon,
  message:
    'Share your early direction, open questions, or rough ideas and we will help shape them into a clearer next step.',
  title: 'Need feedback on a concept?',
};

const Card14 = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const Icon = promoCard.icon;

  if (!isActive) return null;

  return (
    <Card className="relative max-w-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] ring-0">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsActive(false)}
        className="absolute top-2 right-2 rounded-full"
      >
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </Button>
      <CardHeader className="items-center pb-3 text-center">
        <div className="bg-primary text-primary-foreground mb-2 flex size-10 items-center justify-center rounded-full outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10">
          <Icon className="size-5" />
        </div>
        <CardTitle>{promoCard.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-center">
        <p className="text-muted-foreground text-sm leading-6">
          {promoCard.message}
        </p>
        <Button className="self-center shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_4px_rgba(0,0,0,0.08)]">
          {promoCard.ctaLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Card14;
