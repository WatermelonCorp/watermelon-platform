import { ContinuousTabs } from "."

function ContinuousTabsDemo() {
    return (
        <div className="flex items-center justify-center">
            <ContinuousTabs
                tabs={[
                    { id: "home", label: "Home" },
                    { id: "design", label: "Design" },
                    { id: "code", label: "Code" },
                    { id: "deploy", label: "Deploy" },
                ]}
            />
        </div>
    )
}

export default ContinuousTabsDemo