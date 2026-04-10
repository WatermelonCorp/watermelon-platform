import SplitButton from './original';

export default function SplitButtonDemo() {
  return (
      <SplitButton
        mainButton="New Project"
        buttons={['iOS', 'macOS', 'tvOS']}
      />
  );
}
