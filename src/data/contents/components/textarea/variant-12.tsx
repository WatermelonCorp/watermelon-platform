import { useId } from 'react';

import { Label } from '@/components/base-ui/label';
import { Textarea } from '@/components/base-ui/textarea';

const Textarea12 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Auto-generated summary</Label>
      <Textarea
        id={id}
        placeholder="This content is generated automatically"
        disabled
        className="cursor-not-allowed opacity-70"
      />
    </div>
  );
};

export default Textarea12;
