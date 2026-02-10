import { FilterDisclosure } from ".";
import { FaBell, FaTasks } from 'react-icons/fa';
import { IoCalendar } from 'react-icons/io5';
import { BsFillPeopleFill, BsPinFill } from 'react-icons/bs';
import { RiBubbleChartFill } from 'react-icons/ri';

export default function FilterDisclosureDemo() {
    const items = [
        { id: "tasks", label: "Tasks", icon: FaTasks },
        { id: "events", label: "Events", icon: IoCalendar },
        { id: "reminders", label: "Reminders", icon: FaBell },
        { id: "appointments", label: "Appointment", icon: BsPinFill },
        { id: "meetings", label: "Mettings", icon: BsFillPeopleFill },
        { id: "celebrations", label: "Celebrations", icon: RiBubbleChartFill },
    ];

    return (
        <div className="flex items-center justify-center">
            <FilterDisclosure
                items={items}
            />
        </div>
    );
}