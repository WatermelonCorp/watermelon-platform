import { useId } from 'react';

import { Label } from '@/components/base-ui/label';
import { Textarea } from '@/components/base-ui/textarea';

const Textarea20 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Project details</Label>
      <Textarea
        id={id}
        placeholder="Describe your project requirements..."
        className="focus-visible:ring-primary/20 focus-visible:border-primary/50"
      />
      <p className="text-muted-foreground text-xs">
        Include key goals, constraints, or expectations.
      </p>
    </div>
  );
};

export default Textarea20;
