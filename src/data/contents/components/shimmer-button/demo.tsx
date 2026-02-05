import { ShimmerButton } from ".";

export default function ShimmerButtonDemo() {
  return (
    <div className="flex gap-4 items-center justify-center p-10">
      <ShimmerButton>Hover Me</ShimmerButton>
      <ShimmerButton className="bg-emerald-600">Subscribe</ShimmerButton>
    </div>
  );
}
