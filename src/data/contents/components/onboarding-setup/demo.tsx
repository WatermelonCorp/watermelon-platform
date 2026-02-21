import  { useState } from "react";
import { OnboardingSetup } from "./index";

export default function OnboardingSetupDemo() {
  const [focus, setFocus] = useState("deals");
  const [revenue, setRevenue] = useState("$100k – $200k");
  const [role, setRole] = useState("");

  return (
    <OnboardingSetup
      title="How do you plan to use the CRM?"
      subtitle="We'll personalize dashboards, views, and recommendations for you."
      focusOptions={[
        { id: "deals", label: "Managing deals" },
        { id: "operations", label: "Operations" },
        { id: "automation", label: "Automation" },
        { id: "support", label: "Customer support" },
        { id: "accounts", label: "Account management" },
      ]}
      selectedFocus={focus}
      onFocusChange={setFocus}
      revenue={revenue}
      onRevenueChange={setRevenue}
      role={role}
      onRoleChange={setRole}
      step={5}
      totalSteps={14}
      onContinue={() => console.log("Next step")}
      imageUrl="https://i.pinimg.com/1200x/9f/36/44/9f36443e8b969ebc7dec9d9ed032cb1f.jpg"
    />
  );
}
