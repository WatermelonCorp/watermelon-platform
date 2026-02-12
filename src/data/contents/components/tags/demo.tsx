
import { Tags } from '.'

const tags = [
    { id: "javascript", label: "Javascript" },
    { id: "express", label: "Express" },
    { id: "vue", label: "Vue" },
    { id: "jest", label: "Jest" },
    { id: "next", label: "Next" },
    { id: "typescript", label: "Typescript" },
    { id: "redis", label: "Redis" },
    { id: "git", label: "Git" },
    { id: "knockout", label: "Knockout" },
    { id: "vite", label: "Vite" },
    { id: "cypress", label: "Cypress" },
    { id: "storybook", label: "Storybook" },
    { id: "tailwind", label: "Tailwind" },
    { id: "backbone", label: "Backbone" },
    { id: "node", label: "Node" },
];

function TagsDemo() {
    return (
        <div className="flex items-center justify-center">
            <Tags
                tags={tags}
            />
        </div>
    )
}

export default TagsDemo