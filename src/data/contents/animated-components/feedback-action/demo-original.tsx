import { FeedbackAction } from './original';

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
