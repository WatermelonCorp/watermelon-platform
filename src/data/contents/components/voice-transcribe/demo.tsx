"use client";

import { TranscribeVoiceMessage } from './index';

export default function VoiceMessageDemo() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center bg-transparent transition-colors duration-500">
        <TranscribeVoiceMessage 
          duration={7}
          transcription="Hey! Just brewed a fresh cup of coffee. Would you like to have some? I'm sure you'll love this."
        />
    </div>
  );
}