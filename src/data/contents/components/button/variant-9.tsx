'use client';

import { Button } from '@/components/base-ui/button';

const Button9 = () => {
  return (
    <Button disabled className="inline-flex items-center gap-0.5">
      <span>Loading</span>

      <span className="flex translate-y-[4px] gap-[2px]">
        <span className="size-1 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
        <span className="size-1 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
        <span className="size-1 animate-bounce rounded-full bg-current [animation-delay:0s]" />
      </span>
    </Button>
  );
};

export default Button9;
