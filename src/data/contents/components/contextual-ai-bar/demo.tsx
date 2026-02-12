import { ContextualAIBar } from ".";
import { AudioLines } from "lucide-react";
import { BsMusicNote } from "react-icons/bs";
import { RiScissorsFill } from "react-icons/ri";
import { IoIosTimer } from "react-icons/io";
import { LuMicVocal } from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";

const ContextualAIBarDemo = () => {
    return (
        <ContextualAIBar
            defaultExpanded={false}
            placeholder="Refine with AI"
            musicIcon={<BsMusicNote size={26} className="text-[#040404]/80 dark:text-zinc-100/80" />}
            sparkleIcon={<HiSparkles size={26} className="text-[#040404]/80 dark:text-zinc-100/80" />}
            tools={[
                <RiScissorsFill size={24} />,
                <IoIosTimer size={26} />,
                <LuMicVocal size={24} />,
                <AudioLines size={24} />,
            ]}
        />
    );
};

export default ContextualAIBarDemo;