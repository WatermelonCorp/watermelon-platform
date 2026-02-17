"use client";

import { useState } from "react";
import { AiInput005 } from ".";
import { ThinkingMode, type MessageInput } from ".";

export default function AiInput005Demo() {
  const [messages, setMessages] = useState<MessageInput[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleSend = (text: string, mode: ThinkingMode) => {
    const userMsg: MessageInput = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    const thinkingMsg: MessageInput = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      isThinking: true,
    };

    setMessages((p) => [...p, userMsg, thinkingMsg]);
    setProcessing(true);

    setTimeout(() => {
      setMessages((p) =>
        p.map((m) =>
          m.isThinking
            ? {
                ...m,
                isThinking: false,
                content:
                  mode === ThinkingMode.DEEP
                    ? "Deep answer incoming 🤯"
                    : "I dunnoo 😭",
              }
            : m
        )
      );
      setProcessing(false);
    }, 2000);
  };

  return (
    <AiInput005
      messages={messages}
      onSend={handleSend}
      isProcessing={processing}
    />
  );
}