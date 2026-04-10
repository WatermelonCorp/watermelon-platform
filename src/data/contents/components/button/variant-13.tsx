import { IoCopy } from 'react-icons/io5';

import { Button } from '@/components/base-ui/button';

const Button13 = () => {
  return (
    <Button className="border-blue-600 bg-blue-600/10 text-blue-600! hover:bg-blue-600/20 focus-visible:border-blue-600 focus-visible:ring-blue-600/20 dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-400! dark:hover:bg-blue-400/20 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40">
      <IoCopy />
      Copy
    </Button>
  );
};

export default Button13;
