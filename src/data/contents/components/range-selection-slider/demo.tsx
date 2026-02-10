import { PriceRangeCard } from "./index";

export default function RangeSelectionSliderDemo() {
  return (
    <PriceRangeCard
      defaultRange={[500, 3000]}
      min={0}
      max={10000}
      onApply={(range) => console.log("Applied:", range)}
      onCancel={(range) => console.log("Cancelled:", range)}
    />
  );
}
