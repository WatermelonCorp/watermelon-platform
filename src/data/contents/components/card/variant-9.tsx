import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base-ui/card';

type TextCard = {
  body: string;
  title: string;
};

const textCard: TextCard = {
  body: 'Map early concepts, align the team around one clear direction, and turn rough ideas into a sharper narrative.',
  title: 'Concept Review',
};

const Card9 = () => {
  return (
    <Card className="max-w-md gap-0 ring-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]  ">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary">
          {textCard.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm leading-6">
        {textCard.body}
      </CardContent>
    </Card>
  );
};

export default Card9;
