'use client'

import { useId, useState } from 'react'

import { Checkbox } from '@/components/base-ui/checkbox'
import { Label } from '@/components/base-ui/label'

type CheckboxCopy = {
  label: string
}

const checkboxCopy: CheckboxCopy = {
  label: 'Review weekly tasks'
}

const Checkbox4 = () => {
  const id = useId()
  const [isChecked, setIsChecked] = useState<boolean>(true)

  return (
    <div className='flex max-w-sm items-start gap-3'>
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked === true)}
        className='mt-0.5 data-checked:border-primary data-checked:bg-primary dark:data-checked:border-primary dark:data-checked:bg-primary'
      />
      <Label
        htmlFor={id}
        className={`text-sm font-medium transition-colors ${
          isChecked ? 'text-muted-foreground line-through ' : ''
        }`}
      >
        {checkboxCopy.label}
      </Label>
    </div>
  )
}

export default Checkbox4
