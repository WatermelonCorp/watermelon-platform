'use client'

import { useId, useState } from 'react'

import { Checkbox } from '@/components/base-ui/checkbox'
import { Label } from '@/components/base-ui/label'

type CheckboxCopy = {
  label: string
}

const checkboxCopy: CheckboxCopy = {
  label: 'Subscribe to product updates',
}

const Checkbox3 = () => {
  const id = useId()
  const [isChecked, setIsChecked] = useState<boolean>(false)

  return (
    <div className='flex max-w-sm items-start gap-3'>
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked === true)}
        className='mt-0.5 border-dashed border-input data-checked:border-primary data-checked:bg-primary dark:border-input dark:data-checked:border-primary dark:data-checked:bg-primary'
      />
      <div className='space-y-1'>
        <Label htmlFor={id} className='text-sm font-medium'>
          {checkboxCopy.label}
        </Label>
      </div>
    </div>
  )
}

export default Checkbox3
