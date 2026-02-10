import {
  Copy01Icon,
  FavouriteIcon,
  PencilEdit02Icon,
  Share01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { InlineDisclosureMenu } from "./index";

const items = [
  { icon: <HugeiconsIcon icon={PencilEdit02Icon} />, label: "Edit" },
  { icon: <HugeiconsIcon icon={Copy01Icon} />, label: "Duplicate" },
  { icon: <HugeiconsIcon icon={FavouriteIcon} />, label: "Favourite" },
  { icon: <HugeiconsIcon icon={Share01Icon} />, label: "Share" },
];

export default function InlineDisclosureMenuDemo() {
  return (
    <div className="min-h-[50vh] sm:min-h-full px-4 flex items-center justify-center">
      <InlineDisclosureMenu
        menuItems={items}
        showDelete
        onDelete={() => console.log("Deleted")}
      />
    </div>
  );
}
