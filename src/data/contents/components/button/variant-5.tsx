import { Button } from '@/components/base-ui/button';
import { FaBan } from 'react-icons/fa';

const Button5 = () => {
  return (
    <Button disabled>
      <FaBan className="size-4" />
      Disabled
    </Button>
  );
};

export default Button5;
