import { Button } from '@/components/base-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/base-ui/tooltip';

const Tooltip3 = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="lg">
          w/o arrow
        </Button>
      </TooltipTrigger>
      <TooltipContent className="[&_svg]:invisible">
        <p>This tooltip don&apos;t have arrow</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Tooltip3;
