'use client';

import { useState } from 'react';

import { HeartIcon } from 'lucide-react';

import { Badge } from '@/components/base-ui/badge';
import { Button } from '@/components/base-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/base-ui/card';

import { cn } from '@/lib/utils';

type ProductCard = {
  colorLabel: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
  price: string;
  sizeLabel: string;
  title: string;
};

const product: ProductCard = {
  colorLabel: 'Crimson / White',
  description:
    'A lightweight everyday runner with a bold profile, cushioned sole, and a shape that works on and off the track.',
  imageAlt: 'Red running shoe on red background',
  imageSrc:
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
  price: '$84.00',
  sizeLabel: 'EU 39',
  title: 'Velocity Run One',
};

const Card12 = () => {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className="relative max-w-md overflow-hidden rounded-2xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]">
      <div className="relative h-72">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="size-full object-cover outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
   
      </div>
      <Button
        size="icon"
        onClick={() => setLiked((current) => !current)}
        className="absolute top-4 right-4 rounded-full bg-background/50 backdrop-blur-sm border border-black/10 dark:border-white/10"
      >
        <HeartIcon
          className={cn(
            'size-4',
            liked ? 'fill-destructive stroke-destructive' : 'stroke-current',
          )}
        />
        <span className="sr-only">Like</span>
      </Button>
      <Card className="rounded-t-none border-none shadow-none">
        <CardHeader className="space-y-2">
          <CardTitle>{product.title}</CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="border-border/70 bg-background/70 rounded-sm"
            >
              {product.sizeLabel}
            </Badge>
            <Badge
              variant="outline"
              className="border-border/70 bg-background/70 rounded-sm"
            >
              {product.colorLabel}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-6">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-medium uppercase">
              Price
            </span>
            <span className="text-2xl font-semibold">{product.price}</span>
          </div>
          <Button
            size="lg"
           
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Card12;
