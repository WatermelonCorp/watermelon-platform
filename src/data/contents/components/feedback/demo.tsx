import {FeedbackComponent} from '.';

export default function FeedbackComponentDemo() {
  const handleSubmit = (data: { rating: 'up' | 'down'; feedback: string }) => {
    console.log('Feedback submitted:', data);
  };

  return (
    <div className="flex items-center justify-center">
    <FeedbackComponent onSubmit={handleSubmit} />
    </div>
  );
};
