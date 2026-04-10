import { Badge } from '@/components/base-ui/badge';

const Badge16 = () => {
  return (
    <Badge variant="outline" className="rounded-md py-3.5 pr-2 pl-0.5">
      <img
        src="https://github.com/shadcn.png"
        alt="Shadcn"
        className="size-6 rounded-sm"
      />
      Shadcn
    </Badge>
  );
};

export default Badge16;
