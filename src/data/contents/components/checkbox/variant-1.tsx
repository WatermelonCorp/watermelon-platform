'use client';

import { useId, useState } from 'react';

import { Checkbox } from '@/components/base-ui/checkbox';
import { Label } from '@/components/base-ui/label';

type CheckboxCopy = {
  label: string;
};

const checkboxCopy: CheckboxCopy = {
  label: 'Subscribe to product updates',
};

const Checkbox1 = () => {
  const id = useId();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div className="flex max-w-sm items-center gap-2.5">
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked === true)}
      />
      <Label htmlFor={id} className="text-sm leading-none font-medium">
        {checkboxCopy.label}
      </Label>
    </div>
  );
};

export default Checkbox1;
