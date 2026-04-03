import { QuickFeedback } from './original';

export default function QuickFeedbackDemo() {
  return (
    <QuickFeedback
      feedbackText="Thanks for your response!"
      showThemeToggle={false}
      onFeedback={(v) => console.log('Feedback:', v)}
      onUndo={() => console.log('Undo')}
    />
  );
}
