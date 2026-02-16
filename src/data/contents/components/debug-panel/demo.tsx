"use client";

import { DebugPanel } from "./index";

export default function DebugPanelDemo() {
    return (
        <DebugPanel
            title="Live Interaction Debug"
            enableClickCount
            enableMouseTracking
            enableKeyTracking
        />
    );
}