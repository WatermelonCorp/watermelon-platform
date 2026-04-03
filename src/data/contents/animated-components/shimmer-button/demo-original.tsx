import { ShimmerButton } from "./original";

export default function ShimmerButtonDemo() {
  return (
    <div className="flex gap-4 items-center justify-center">
      <ShimmerButton>Hover Me</ShimmerButton>
      <ShimmerButton className="bg-emerald-600">Subscribe</ShimmerButton>
    </div>
  );
}
