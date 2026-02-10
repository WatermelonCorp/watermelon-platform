"use client";

import { useState } from "react";
import { Stepper } from "./index";

export default function StepperDemo() {
  const [value, setValue] = useState(50);

  return (
      <Stepper min={0} max={200} value={value} onChange={setValue} />
  );
}
