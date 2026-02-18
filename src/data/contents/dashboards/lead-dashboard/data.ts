export interface WorkItem {
    id: string;
    title: string;
    issueId: string;
    origin: string;
    priority: 'High Impact' | 'Moderate' | 'Critical' | 'Low';
    date: string;
    type: 'Time-Sensitive' | 'Long-term' | 'Sprint';
    tags: string[];
    iconType: 'alert' | 'settings' | 'database' | 'user';
    isLive?: boolean;
}

export interface Tab { 
    id: string; 
    title: string; 
    active: boolean; 
    color: string; 
}

export const INITIAL_TABS: Tab[] = [
    { id: 'mf-214', title: 'Repair Context Graph Routing', active: true, color: 'text-[#E27D51]' },
    { id: 'mf-215', title: 'Rebuild Left-Rail Grouping', active: false, color: 'text-[#3AAFA9]' },
    { id: 'mf-216', title: 'Improve Similarity Scoring', active: false, color: 'text-[#E4FF40]' },
];

export const WORK_ITEMS: WorkItem[] = [
    { id: '1', title: 'Service Flow Interruption', issueId: '#OPS-129', origin: 'Customer Mobile App', priority: 'High Impact', date: 'Jan 24, 2026', type: 'Time-Sensitive', tags: ['Platform'], iconType: 'alert', isLive: true },
    { id: '2', title: 'API Rate Limiting', issueId: '#OPS-131', origin: 'Customer Portal', priority: 'Moderate', date: 'Jan 26, 2026', type: 'Time-Sensitive', tags: ['Platform'], iconType: 'settings', isLive: true },
    { id: '3', title: 'Database Downtime', issueId: '#OPS-130', origin: 'E-commerce Platform', priority: 'Critical', date: 'Jan 27, 2026', type: 'Time-Sensitive', tags: ['Platform'], iconType: 'database', isLive: true },
    { id: '4', title: 'User Authentication Failure', issueId: '#OPS-133', origin: 'User Mangement System', priority: 'Moderate', date: 'Jan 27, 2026', type: 'Time-Sensitive', tags: ['Platform'], iconType: 'database', isLive: true },
];