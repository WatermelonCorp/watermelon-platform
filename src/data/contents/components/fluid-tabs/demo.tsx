import { FluidTabs } from ".";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FaInbox, FaLandmark } from "react-icons/fa";

const tabs = [
    { id: "accounts", label: "Accounts", icon: <FaLandmark size={22} /> },
    { id: "deposits", label: "Deposits", icon: <FaInbox size={22} /> },
    { id: "funds", label: "Funds", icon: <BiSolidPieChartAlt2 size={22} /> },
];

export default function FluidTabsDemo() {
    return (
        <div className="flex justify-center items-center">
            <FluidTabs
                defaultActive="home"
                tabs={tabs}
            />
        </div>
    );
}