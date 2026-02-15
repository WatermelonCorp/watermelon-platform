"use client";

import { QuickSwitcher } from ".";
import { LuSparkle } from "react-icons/lu";
import { TbPhoto } from "react-icons/tb";

const QuickSwitcherDemo = () => {
    return (
        <div className="flex items-center justify-center">
            <QuickSwitcher
                defaultMode="ask"
                askIcon={<LuSparkle size={26} />}
                generateIcon={<TbPhoto size={26} />}
                askLabel="Ask Anything"
                generateLabel="Generate Image"
                onActionClick={(mode) => {
                    console.log("Current mode:", mode);
                }}
            />
        </div>
    );
};

export default QuickSwitcherDemo;