import { Button } from '@/components/base-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/base-ui/tooltip';

const Tooltip9 = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm">
          Rounded
        </Button>
      </TooltipTrigger>
      <TooltipContent className="rounded-full">
        <p>This tooltip is rounded</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Tooltip9;
