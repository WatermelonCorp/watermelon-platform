import { FaBell } from 'react-icons/fa';

import { Badge } from '@/components/base-ui/badge';
import { Button } from '@/components/base-ui/button';

const Button23 = () => {
  return (
    <Button variant="outline" className="relative">
      <FaBell />
      Inbox
      <Badge
        variant="destructive"
        className="absolute -top-2.5 -right-2.5 h-5 min-w-5 bg-red-600 px-1 text-white tabular-nums dark:bg-red-400"
      >
        8
      </Badge>
    </Button>
  );
};

export default Button23;
