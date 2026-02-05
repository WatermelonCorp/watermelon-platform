import { PulseBadge } from ".";

export default function PulseBadgeDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center p-10">
      <PulseBadge variant="success">Online</PulseBadge>
      <PulseBadge variant="warning">Processing</PulseBadge>
      <PulseBadge variant="error">Error</PulseBadge>
      <PulseBadge variant="info">New</PulseBadge>
    </div>
  );
}
