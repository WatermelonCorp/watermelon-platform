"use client";
import { IntegrationsCard } from './index';
import { SiSlack, SiDiscord, SiGithub } from 'react-icons/si';

const MOCK_INTEGRATIONS = [
    {
        id: '1',
        name: 'Slack',
        entities: 'CHANNELS, MESSAGES, USERS',
        description: 'Send notifications to Slack channels or users when specific events occur in your workflow.',
        tags: ['Communication', 'Notifications'],
        triggers: 12,
        actions: 8,
        available: true,
        icon: <SiSlack className="text-[#E01E5A]" size={20} />
    },
    {
        id: '2',
        name: 'Discord',
        entities: 'SERVERS, CHANNELS, WEBHOOKS',
        description: 'Automate your Discord server by sending rich media messages and managing member roles.',
        tags: ['Community', 'Webhooks'],
        triggers: 5,
        actions: 14,
        available: true,
        icon: <SiDiscord className="text-[#5865F2]" size={20} />
    },
    {
        id: '3',
        name: 'GitHub',
        entities: 'REPOS, ISSUES, PULL REQUESTS',
        description: 'Connect your development workflow to trigger actions on new commits or pull requests.',
        tags: ['Development', 'Version Control'],
        triggers: 24,
        actions: 10,
        available: false,
        icon: <SiGithub className="text-[#181717] dark:text-white" size={20} />
    }
];

export default function IntegrationsDemo() {
    return (
        <IntegrationsCard 
            title="Connected Apps"
            items={MOCK_INTEGRATIONS} 
        />
    );
}