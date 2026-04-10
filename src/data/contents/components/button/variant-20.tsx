'use client';

import { buttonVariants } from '@/components/base-ui/button';
import { cn } from '@/lib/utils';

const Button20 = () => {
  return (
    <a
      href="#"
      className={cn(
        buttonVariants({ variant: 'link' }),
        'after:bg-primary relative !no-underline after:absolute after:bottom-1.5 after:left-1/2 after:h-px after:w-[80%] after:origin-center after:-translate-x-1/2 after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100',
      )}
    >
      Message Us
    </a>
  );
};

export default Button20;
