import SplitButton from './base';

export default function SplitButtonDemo() {
  return (
    <div className="theme-injected relative flex items-center justify-center p-10">
      <SplitButton
        mainButton="New Project"
        buttons={['iOS', 'macOS', 'tvOS']}
      />
    </div>
  );
}
