'use client';

import { TranscribeVoiceMessage } from './original';

export default function VoiceMessageDemo() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-transparent transition-colors duration-500">
      <TranscribeVoiceMessage
        duration={5}
        transcription="Hey! Just brewed a fresh cup of coffee. Would you like to have some? I'm sure you'll love this."
      />
    </div>
  );
}
