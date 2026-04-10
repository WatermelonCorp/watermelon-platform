import { FaDownload } from 'react-icons/fa6';

import { Button } from '@/components/base-ui/button';

const Button14 = () => {
  return (
    <Button className="border-primary bg-primary/10 text-foreground border-dashed shadow-none">
      <FaDownload />
      Download
    </Button>
  );
};

export default Button14;
