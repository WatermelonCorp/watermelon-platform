import { SaveToggle } from "@/data/contents/components/save-toggle";


const SaveToggleDemo: React.FC = () => {
  return (
    <SaveToggle
      size="md"
      idleText="Save"
      savedText="Saved"
      loadingDuration={1200}
      successDuration={600}
      onStatusChange={(s) => console.log(s)}
    />
  );
};

export default SaveToggleDemo;
