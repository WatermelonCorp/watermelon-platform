import { InlineOverflow } from ".";


const visibleActions = [
  { label: "Save" },
  { label: "Copy" },
];

const hiddenActions = [
  { label: "Share" },
  { label: "Delete" },
];

function InlineOverflowDemo() {
  return (
    <div className="flex items-center justify-center">
    <InlineOverflow
      visibleActions={visibleActions}
      hiddenActions={hiddenActions}
    />
    </div>
  );
}

export default InlineOverflowDemo;