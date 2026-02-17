"use client";

import { FamilyReceiveComponent } from "./index"; 
import { Fingerprint } from "lucide-react";

export default function FamilyReceiveComponentDemo() {
  const handleConfirm = () => {
    console.log("Money received");
  };

  return (
    <FamilyReceiveComponent
      triggerLabel="Receive"
      title="Confirm"
      description="Are you sure you want to receive hell load of money?"
      confirmLabel="Receive"
      cancelLabel="Cancel"
      icon={<Fingerprint size={28} />}
      onConfirm={handleConfirm}
    />
  );
}