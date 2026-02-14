"use client";

import React, { useState } from 'react';
import { KnobSlider } from '.';

const KnobSliderDemo: React.FC = () => {
    const [value, setValue] = useState(24);

    return (
        <div className="flex items-center justify-center">
            <KnobSlider
                value={value}
                onChange={setValue}
                min={0}
                max={99}
                size={340}
            />
        </div>
    );
};

export default KnobSliderDemo;