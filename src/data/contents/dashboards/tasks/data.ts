export type Priority = 'High' | 'Normal' | 'Low' | 'Not set';

export interface Task {
    id: string;
    code: string;
    name: string;
    priority: Priority;
    list: string;
    tag: string;
    week: string;
    dueDate: string;
    assignees: string[];
}

export interface TaskGroup {
    id: string;
    title: string;
    count: number;
    color: string;
    dotColor: string;
    tasks: Task[];
}

export const GRADIENTS = [
    'from-pink-400 via-orange-300 to-yellow-300',
    'from-purple-400 via-pink-400 to-orange-300',
    'from-indigo-400 via-purple-400 to-pink-400',
    'from-blue-400 via-indigo-400 to-purple-400',
    'from-fuchsia-400 via-purple-400 to-indigo-400',
    'from-rose-400 via-pink-400 to-purple-400',
    'from-orange-400 via-pink-400 to-purple-400'
];

export const pickGradient = (index: number) => GRADIENTS[index % GRADIENTS.length];

export const SAMPLE_DATA: TaskGroup[] = [
    {
        id: 'backlog',
        title: 'Backlog',
        count: 3,
        color: '#F1F3F5',
        dotColor: '#868E96',
        tasks: [
            {
                id: '1',
                code: 'PRO-1024',
                name: 'Implement OAuth2 flows for enterprise clients',
                priority: 'High',
                list: 'Engineering',
                tag: 'Cycle 14',
                week: 'W42',
                dueDate: 'Oct 24, 2024',
                assignees: [
                    'https://avatar.iran.liara.run/public/2',
                    'https://avatar.iran.liara.run/public/3'
                ]
            },
            {
                id: '2',
                code: 'PRO-1025',
                name: 'Rewrite notification engine to support batching',
                priority: 'Normal',
                list: 'Backend',
                tag: 'Cycle 14',
                week: 'W42',
                dueDate: 'Add date',
                assignees: ['https://avatar.iran.liara.run/public/6']
            },
            {
                id: '3',
                code: 'PRO-1026',
                name: 'Fix visual regression on Safari mobile header',
                priority: 'Low',
                list: 'Design',
                tag: 'Sprint 8',
                week: 'W41',
                dueDate: 'Oct 12, 2024',
                assignees: [
                    'https://avatar.iran.liara.run/public/7',
                    'https://avatar.iran.liara.run/public/8',
                    'https://avatar.iran.liara.run/public/6'
                ]
            }
        ]
    },
    {
        id: 'in-progress',
        title: 'In Progress',
        count: 4,
        color: '#EBFBEE',
        dotColor: '#40C057',
        tasks: [
            {
                id: '6',
                code: 'PRO-988',
                name: 'Core engine refactor for concurrent requests',
                priority: 'High',
                list: 'Engineering',
                tag: 'Sprint 22',
                week: 'W40',
                dueDate: 'Oct 05, 2024',
                assignees: ['https://avatar.iran.liara.run/public/7', 'https://avatar.iran.liara.run/public/8']
            },
            {
                id: '7',
                code: 'PRO-989',
                name: 'Update design tokens for high-contrast mode',
                priority: 'Normal',
                list: 'Design',
                tag: 'Cycle 12',
                week: 'W40',
                dueDate: 'Add date',
                assignees: ['https://avatar.iran.liara.run/public/9']
            }
        ]
    },
    {
        id: 'completed',
        title: 'Completed',
        count: 1,
        color: '#F3F0FF',
        dotColor: '#7950F2',
        tasks: [
            {
                id: '12',
                code: 'PRO-840',
                name: 'Deploy v2.4.0 to production environment',
                priority: 'High',
                list: 'DevOps',
                tag: 'Release',
                week: 'W38',
                dueDate: 'Sep 28, 2024',
                assignees: ['https://avatar.iran.liara.run/public/10']
            }
        ]
    }
];