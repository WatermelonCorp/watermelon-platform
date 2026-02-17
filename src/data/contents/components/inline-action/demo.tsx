import {InlineAction} from "./index";
import { HiMiniCalendarDays } from "react-icons/hi2";

export default function InlineActionDemo() {
  const handleSync = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
  };

  return (
   <div className="w-full max-w-xs sm:max-w-md">
  <InlineAction
    label="Calendar"
    icon={<HiMiniCalendarDays size={24} />}
    actionText="Sync Events"
    onAction={handleSync}
  />
</div>
  );
}