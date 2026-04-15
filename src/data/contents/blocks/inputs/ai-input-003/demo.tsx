import {AiInput003} from '.';

export default function AiInput003Demo() {
  const handleMessage = (text: string, mention: string | null) => {
    console.log("User sent:", text, "with mention:", mention);
  };

  return (
    <div className="min-h-screen">
      <AiInput003 onSendMessage={handleMessage} />
    </div>
  );
}