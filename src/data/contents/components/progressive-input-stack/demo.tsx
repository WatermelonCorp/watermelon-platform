import { ProgressiveInputStack } from '.';

const ProgressiveInputStackDemo = () => {
  return (
    <ProgressiveInputStack
      steps={[
        {
          id: 'name',
          label: 'Name',
          type: 'text',
          placeholder: "Friend's Name",
        },
        {
          id: 'email',
          label: 'Email',
          type: 'text',
          placeholder: "Friend's Email",
        },
        { id: 'reminder', label: 'Send a reminder in 5 days', type: 'toggle' },
      ]}
      initialData={{ name: '', email: '', reminder: false }}
      onSubmit={(data) => console.log('Submitted', data)}
    />
  );
};

export default ProgressiveInputStackDemo;
