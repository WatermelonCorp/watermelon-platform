import { CalendarWidget } from '.';

const events = {
  '2024-09-01': [
    { title: 'Design Sync', time: '10:00 - 11:00 AM' },
    { title: 'API Integration', time: '11:30 - 1:00 PM' },
    { title: 'Code Review', time: '2:30 - 3:30 PM' },
    { title: 'Client Follow-up', time: '5:00 - 5:30 PM' },
  ],
  '2024-09-03': [
    { title: 'Client Meeting', time: '9:00 - 9:45 AM' },
    { title: 'Team Standup', time: '10:30 - 11:00 AM' },
    { title: 'Project Review', time: '12:00 - 1:00 PM' },
    { title: 'UI Polish Session', time: '3:00 - 4:00 PM' },
    { title: 'Evening Yoga', time: '6:00 - 7:00 PM' },
  ],
  '2024-09-30': [
    { title: 'Month-end Reports', time: '10:00 - 12:00 PM' },
    { title: 'Team Retrospective', time: '3:00 - 4:30 PM' },
  ],
};

function CalendarWidgetDemo() {
  return (
    <CalendarWidget
      events={events}
      initialSelectedDate="2024-09-01"
      currentMonthYear="Dec 2024"
    />
  );
}

export default CalendarWidgetDemo;
