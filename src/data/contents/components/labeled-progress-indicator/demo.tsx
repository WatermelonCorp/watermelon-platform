
import { LabeledProgressIndicator } from ".";

const labels = [
  'almost there',
  'working now',
  'one moment',
  'finishing up',
  'hang tight',
];

function LabeledProgressIndicatorDemo() {
  return (
    <LabeledProgressIndicator
      labels={labels}
      progress="55%"
      intervalMs={2000}
    />
  );
}

export default LabeledProgressIndicatorDemo;
