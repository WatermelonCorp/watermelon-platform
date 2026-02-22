import {AiInput002} from ".";

export default function AiInput002Demo() {
  return (
    <AiInput002
      placeholderText="Ask me anything..."
      initialMessages={[
        {
          id: "1",
          role: "assistant",
          content: "Hey man 🫡",
          timestamp: new Date(),
        },
      ]}
    />
  );
}
