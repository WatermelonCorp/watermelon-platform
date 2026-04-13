import { Button } from '@/components/base-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/base-ui/tooltip';

const Tooltip1 = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="lg">
          Default - with arrow
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click to continue</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Tooltip1;
