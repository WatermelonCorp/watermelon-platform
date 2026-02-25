import SplitButton from '.';

export default function SplitButtonDemo() {
  return (
    <div className="relative flex items-center justify-center bg-background p-10 dark:bg-neutral-950">
      <SplitButton
        mainButton="New Project"
        buttons={['iOS', 'macOS', 'tvOS']}
      />
    </div>
  );
}
