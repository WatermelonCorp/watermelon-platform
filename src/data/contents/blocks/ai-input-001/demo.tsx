"use client";

import { useState } from 'react';
import { AiInput, type Message } from '.'; 

export default function AiInputDemo() {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSend = (text: string, modelId: string) => {

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user'
    };
    
    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        text: ` I am your AI assistant!`,
        sender: 'ai'
      };
      setChatMessages(prev => [...prev, aiReply]);
    }, 1000);
  };

  return (
    <main>
      <AiInput 
        messages={chatMessages} 
        onSendMessage={handleSend}
        backgroundText="AI Input 001" 
        placeholder="How can I help you today?" 
      />
    </main>
  );
}