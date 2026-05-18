import { Card, CardContent } from '@/components/base-ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/base-ui/tabs';

type CardTab = {
  content: string;
  label: string;
  value: 'overview' | 'activity' | 'files';
};

const tabs: readonly CardTab[] = [
  {
    label: 'Overview',
    value: 'overview',
    content:
      'Review the current project summary, key milestones, and the latest notes from the team before moving into detailed updates.',
  },
  {
    label: 'Activity',
    value: 'activity',
    content:
      'See the most recent edits, comments, and status changes so you can quickly understand what moved forward this week.',
  },
  {
    label: 'Files',
    value: 'files',
    content:
      'Browse shared assets, working drafts, and final exports collected for the project in one organized place. Share your files seamlessly with the team.',
  },
] as const;

const Card10 = () => {
  return (
    <Card className="bg-muted w-max py-3 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] ring-0 ">
      <CardContent className="px-2">
        <Tabs defaultValue={tabs[0].value} className="w-full max-w-sm">
          <TabsList className="w-full justify-start gap-1 bg-transparent shadow-none">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-muted-foreground dark:data-[state=active]:border-border dark:data-[state=active]:bg-primary dark:data-[state=active]:text-foreground h-9 rounded-md border border-transparent bg-transparent px-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <p className="text-muted-foreground p-2 text-sm leading-6">
                {tab.content}
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Card10;
