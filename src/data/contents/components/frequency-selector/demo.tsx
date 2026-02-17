"use client";

import { useState } from 'react';
import { FrequencySelector, type FrequencyData } from './index';

export default function FrequencySelectorDemo() {
    const [frequency, setFrequency] = useState<FrequencyData>({
        type: 'Weekly',
        subValue: 'Tue'
    });

    return (
        // Wrapper for centering and theme testing
        <div className="w-full min-h-100 flex items-center justify-center bg-transparent transition-colors duration-500">
            <FrequencySelector
                value={frequency}
                onChange={setFrequency}
            />
        </div>
    );
}