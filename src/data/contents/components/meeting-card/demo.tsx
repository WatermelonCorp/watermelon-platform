import { MeetingCard } from './index';

export default function MeetingCardDemo() {
  return (
      <MeetingCard
        title="Product demo with FinPay"
        date="Monday, 15 Dec 2025"
        time="1:30 PM"
        duration="2:00 PM"
        meetingLink="Google Meet"
        notification="30 minutes before"
        participants={[
          { name: 'Ethan Carter', avatar: 'https://i.pravatar.cc/40?img=1' },
          { name: 'Lily Hayes', avatar: 'https://i.pravatar.cc/40?img=2' },
          { name: 'Max Reed', avatar: 'https://i.pravatar.cc/40?img=3' }
        ]}
        description="A live walkthrough of FinPay’s product, covering core workflows, key features, and real-world use cases, with time for questions and next steps."
      />
  );
}
