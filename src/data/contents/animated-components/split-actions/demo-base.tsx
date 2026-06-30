import SplitActions from "./base"
import {  PenTool, Share2 } from "lucide-react"

export default function DemoBase() {
    const actions = [
        { icon: PenTool, label: "Edit" },
        { icon: Share2, label: "Share" },
    ]
    return (
        <SplitActions actions={actions} />
    )
}