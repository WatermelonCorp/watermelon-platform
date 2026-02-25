import React from 'react';
import { ScheduleDate } from './index';

const ScheduleDateDemo: React.FC = () => {
    return (
        <div className="min-h-full my-2 w-full bg-trasparent flex items-center justify-center transition-colors">
            <ScheduleDate 
                onApply={(range) => console.log("Applied:", range)} 
                onCancel={() => console.log("Cancelled")} 
            />
        </div>
    );
};

export default ScheduleDateDemo;