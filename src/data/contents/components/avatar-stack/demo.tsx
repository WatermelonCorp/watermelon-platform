import { AvatarStack } from ".";

const avatars = [
  { src: "https://i.pravatar.cc/150?img=1", alt: "User 1" },
  { src: "https://i.pravatar.cc/150?img=2", alt: "User 2" },
  { src: "https://i.pravatar.cc/150?img=3", alt: "User 3" },
  { src: "https://i.pravatar.cc/150?img=4", alt: "User 4" },
  { src: "https://i.pravatar.cc/150?img=5", alt: "User 5" },
  { src: "https://i.pravatar.cc/150?img=6", alt: "User 6" },
];

export default function AvatarStackDemo() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center p-10">
      <AvatarStack avatars={avatars} size="sm" />
      <AvatarStack avatars={avatars} size="md" />
      <AvatarStack avatars={avatars} size="lg" max={5} />
    </div>
  );
}
