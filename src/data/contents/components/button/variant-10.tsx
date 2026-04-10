import { BiSolidZap } from 'react-icons/bi';

import { Button } from '@/components/base-ui/button';

const Button10 = () => {
  return (
    <Button className="bg-transparent bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 [background-size:200%_auto] [background-position:0%_center] text-white transition-[background-position] duration-500 ease-out hover:bg-transparent hover:[background-position:100%_center] focus-visible:ring-sky-600/20 dark:from-sky-400 dark:via-sky-300 dark:to-sky-400 dark:focus-visible:ring-sky-400/40">
      Upgrade <BiSolidZap />
    </Button>
  );
};

export default Button10;
