import { TaskWidget, type TaskData } from './index';

const MOCK_DATA: TaskData = {
    title: "Design System",
    progress: 75,
    completedCount: 3,
    totalCount: 4,
    priority: "Urgent",
    status: "In Progress",
    subtasks: [
        { id: '1', title: "Design Tokens", completed: true },
        { id: '2', title: "Color System", completed: true },
        { id: '3', title: "Type System", completed: true },
        { id: '4', title: "Documentation", completed: false },
    ],
    assignees: [
        { name: "Chloe", avatar: "https://i.pravatar.cc/150?u=chloe", color: "bg-white dark:bg-gray-900" },
        { name: "Anna", avatar: "https://i.pravatar.cc/150?u=anna", color: "bg-white" },
        { name: "Ramesh", avatar: "https://i.pravatar.cc/150?u=ramesh", color: "bg-white" },
    ]
};

export default function TaskWidgetDemo() {
    return (
        <div className="flex justify-center items-center">
            <TaskWidget data={MOCK_DATA} />
        </div>
    );
}