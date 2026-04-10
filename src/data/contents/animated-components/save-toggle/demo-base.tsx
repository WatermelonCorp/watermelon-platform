import { SaveToggle } from './base';


const SaveToggleDemo: React.FC = () => {
  return (
      <SaveToggle
        size="md"
        idleText="Save"
        savedText="Saved"
        loadingDuration={1200}
        successDuration={1000}
        // onStatusChange={(s) => console.log(s)}
      />
  );
};

export default SaveToggleDemo;
