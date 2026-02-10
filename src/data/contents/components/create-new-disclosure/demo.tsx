import { CreateNewDisclosure } from ".";
import { HugeiconsIcon } from "@hugeicons/react";
import { Award01Icon, Calendar04Icon, Flag02Icon, Folder01Icon, NoteIcon, TaskEdit01Icon } from "@hugeicons/core-free-icons";

const customItems = [
    { icon: <HugeiconsIcon icon={Folder01Icon} size={28} strokeWidth={1.5} />, label: "Project" },
    { icon: <HugeiconsIcon icon={TaskEdit01Icon} size={28} strokeWidth={1.5} />, label: "Task" },
    { icon: <HugeiconsIcon icon={NoteIcon} size={28} strokeWidth={1.5} />, label: "Note" },
    { icon: <HugeiconsIcon icon={Award01Icon} size={28} strokeWidth={1.5} />, label: "Goal" },
    { icon: <HugeiconsIcon icon={Flag02Icon} size={28} strokeWidth={1.5} />, label: "Milestone" },
    { icon: <HugeiconsIcon icon={Calendar04Icon} size={28} strokeWidth={1.5} />, label: "Reminder" },
];

export default function CreateNewDisclosureDemo() {
    return (
        <div className="flex items-center justify-center w-full px-4">
            <CreateNewDisclosure items={customItems} initialOpen={false} />
        </div>
    );
}