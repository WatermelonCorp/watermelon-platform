'use client';

import { useState } from 'react';

import { Badge } from '@/components/base-ui/badge';
import { GoCheckCircleFill } from 'react-icons/go';

const Badge22 = () => {
  const [selected, setSelected] = useState(false);

  return (
    <Badge
      variant={selected ? 'secondary' : 'outline'}
      onClick={() => setSelected((prev) => !prev)}
      className=" focus-visible:ring-ring/50 relative inline-flex cursor-pointer items-center justify-center gap-1 rounded-lg outline-none select-none focus-visible:ring-2"
    >
      {selected && (
        <GoCheckCircleFill
          className="size-3 translate-y-[0.5px] text-green-600 dark:text-green-400"
          aria-hidden="true"
        />
      )}

      <span>{selected ? 'Selected' : 'Selectable'}</span>
    </Badge>
  );
};

export default Badge22;
