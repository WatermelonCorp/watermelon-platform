import React from 'react';
import { ScheduleDate } from './base';

const ScheduleDateDemo: React.FC = () => {
    return (
        <div className="min-h-full my-2 w-full bg-transparent flex items-center justify-center transition-colors">
            <ScheduleDate 
                onApply={(range) => console.log("Applied:", range)} 
                onCancel={() => console.log("Cancelled")} 
            />
        </div>
    );
};

export default ScheduleDateDemo;