"use client";

import { LoopHook } from ".";

export default function LoopHookDemo() {
  return (
    <LoopHook
      title="Product Ideas"
      delay={1200}
      items={[
        "AI Resume Builder",
        "Notion Clone",
        "Design System Kit",
        "Landing Page Generator",
        "SaaS Boilerplate",
      ]}
    />
  );
}
