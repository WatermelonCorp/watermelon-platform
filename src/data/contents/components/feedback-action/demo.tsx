import { FeedbackAction } from './index';

export default function FeedbackActionDemo() {
  const handleSyncRetry = () => {
    console.log('Retrying sync...');
  };

  return (
    <FeedbackAction
      errorMessage="Sync Failed"
      loadingMessage="Syncing"
      onRetry={handleSyncRetry}
    />
  );
}
