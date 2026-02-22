"use client";

import React from "react";
import { DeploymentCard } from "./index";
import type { DeploymentData } from "./index";

export const mockDeploymentData: DeploymentData = {
  id: "main-8f3c2a1",
  environment: "Preview",
  status: "Ready",
  createdTime: "9h ago",
  createdBy: {
    name: "Hayes",
    avatar: "https://i.pravatar.cc/150?u=lily",
  },
  duration: "12m 27s",
  lastActive: "25m ago",
  domains: [
    "axiom.xyz",
    "main.axiom-zero.pages.dev",
    "8f3c2a1.axiom-zero.pages.dev",
  ],
  branch: "MAIN",
  commitHash: "8f3c2a1",
  commitMessage: "TRACK ERROR EVENTS TO WEB ANALYTICS #1425",
  steps: [
    {
      id: "build",
      label: "Build Logs",
      status: "success",
      progress: 1,
      duration: "8m 57s",
    },
    {
      id: "summary",
      label: "Deployment Summary",
      status: "success",
      progress: 0,
      duration: "2m 41s",
      metrics: {
        files: 12,
        functions: 189,
        assets: 5128,
        size: "792",
      },
    },
    {
      id: "checks",
      label: "Running Checks",
      status: "error",
      progress: 0.85,
      duration: "24s",
      errors: 1,
      warnings: 3,
    },
    {
      id: "assign",
      label: "Assigning Domains",
      status: "success",
      progress: 0.4,
      duration: "4s",
    },
  ],
};

const DeploymentCardDemo: React.FC = () => {
  return (
      <DeploymentCard data={mockDeploymentData} />
  );
};

export default DeploymentCardDemo;