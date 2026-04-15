import { useState } from 'react';
import { AiInput004 } from '.';

type AppState = 'IDLE' | 'GENERATING' | 'RESULT';

const AiInput004Demo = () => {
    const [state, setState] = useState<AppState>('IDLE');

    const handleSend = async (text: string) => {
        console.log(text);
        setState('GENERATING');

        await new Promise((r) => setTimeout(r, 4500));

        setState('RESULT');
    };

    return (
        <AiInput004
            onSend={handleSend}
            appState={state}
            disabled={state === 'GENERATING'}
        />
    );
};

export default AiInput004Demo;