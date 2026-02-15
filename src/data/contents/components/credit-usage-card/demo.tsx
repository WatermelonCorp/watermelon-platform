import { CreditUsageCard } from './index';

const CreditUsageCardDemo = () => {
  const customHistory = [
    { date: 'Dec 21, 09:26 PM', model: 'Claude 4.5 Sonnet Thinking', credits: '641.5K', cost: '$0.54' },
    { date: 'Dec 21, 09:21 PM', model: 'Claude 4.5 Sonnet Thinking', credits: '334.1K', cost: '$0.27' },
    { date: 'Dec 21, 09:18 PM', model: 'GPT 5.1 Codex Max', credits: '194.4K', cost: '$0.11' },
    { date: 'Dec 21, 09:16 PM', model: 'Claude 4.5 Sonnet Thinking', credits: '277.1K', cost: '$0.21' },
  ];

  return (
    <CreditUsageCard 
      usedCreditsPercent={56.4}
      totalCreditsLabel="100M CREDITS"
      creditsUsedLabel="56.4M"
      creditsLeftLabel="43.6M"
      usageHistory={customHistory}
      onAutoSwitchChange={(enabled) => console.log("Auto-switch is now:", enabled)}
      onManagePlan={() => alert("Redirecting to billing...")}
      onViewAll={() => console.log("Showing all history")}
    />
  );
};

export default CreditUsageCardDemo;