import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/base-ui/card';

type MediaCard = {
  description: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
};

const mediaCard: MediaCard = {
  description:
    'A still-life composition with geometric forms and warm neutral tones for a quieter editorial feel.',
  imageAlt: 'Wooden hand and geometric shapes on beige background',
  imageSrc:
    'https://unsplash.com/photos/-De5IOMxxPM/download?force=true&w=1200',
  title: 'Still Life Study',
};

const Card4 = () => {
  return (
    <Card className="border-border/60 bg-muted/10 max-w-md p-2 shadow-sm">
      <CardHeader className="space-y-1 px-4 pt-3 pb-2">
        <CardTitle className="text-lg">{mediaCard.title}</CardTitle>
        <CardDescription className="max-w-sm text-sm leading-6">
          {mediaCard.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <img
          src={mediaCard.imageSrc}
          alt={mediaCard.imageAlt}
          className="aspect-4/3 w-full rounded-xl object-cover"
        />
      </CardContent>
    </Card>
  );
};

export default Card4;
