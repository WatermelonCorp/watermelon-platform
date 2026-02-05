import { GradientCard } from ".";

export default function GradientCardDemo() {
  return (
    <div className="flex items-center justify-center p-10">
      <GradientCard className="max-w-sm">
        <h3 className="text-xl font-bold mb-2">Gradient Card</h3>
        <p className="text-muted-foreground">
          Hover over this card to see the gradient animation.
        </p>
      </GradientCard>
    </div>
  );
}
