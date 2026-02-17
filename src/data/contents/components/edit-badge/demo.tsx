import {EditBadge} from ".";

export default function EditBadgeDemo() {
  return (
    <div className="flex items-center justify-center">
    <EditBadge
      initialBadge={{
        text: "completed",
        icon: "check",
        color: "blue",
      }}
      onChange={(badge) => console.log("Updated:", badge)}
    />
    </div>
  );
}
