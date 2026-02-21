import { SaveToggle } from '.';

const SaveToggleDemo: React.FC = () => {
  return (
    <div className="h-full w-full bg-white">
      <SaveToggle
        size="md"
        idleText="Save"
        savedText="Saved"
        loadingDuration={1200}
        successDuration={1000}
        // onStatusChange={(s) => console.log(s)}
      />
    </div>
  );
};

export default SaveToggleDemo;
