import { FloatingInput } from ".";

export default function FloatingInputDemo() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-10 max-w-sm mx-auto">
      <FloatingInput label="Email Address" type="email" />
      <FloatingInput label="Password" type="password" />
    </div>
  );
}
