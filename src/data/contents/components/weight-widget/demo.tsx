"use client"

import { useState } from 'react';
import { WeightWidget } from '.';

export default function WeightWidgetDemo() {
    const [weight, setWeight] = useState(24);

    return (
        <div className="flex items-center justify-center">
            <WeightWidget
                initialValue={weight}
                min={0}
                max={200}
                onChange={(val) => setWeight(val)}
            />
        </div>
    );
};
