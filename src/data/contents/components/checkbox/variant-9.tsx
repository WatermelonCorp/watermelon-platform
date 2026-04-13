'use client'

import { useState, type ComponentType, type SVGProps } from 'react'

import { BriefcaseIcon, FolderKanbanIcon, PenToolIcon } from 'lucide-react'

import { Checkbox } from '@/components/base-ui/checkbox'
import { Label } from '@/components/base-ui/label'

type FocusOption = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
}

const focusAreas: readonly FocusOption[] = [
  { label: 'Planning', icon: FolderKanbanIcon },
  { label: 'Design', icon: PenToolIcon },
  { label: 'Operations', icon: BriefcaseIcon }
]

const Checkbox9 = () => {
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([])

  const handleCheckedChange = (focusAreaLabel: string, checked: boolean) => {
    setSelectedFocusAreas((previousSelectedFocusAreas) =>
      checked
        ? previousSelectedFocusAreas.includes(focusAreaLabel)
          ? previousSelectedFocusAreas
          : [...previousSelectedFocusAreas, focusAreaLabel]
        : previousSelectedFocusAreas.filter(
            (selectedFocusArea) => selectedFocusArea !== focusAreaLabel
          )
    )
  }

  return (
    <div className='space-y-4'>
      <Label className='font-semibold'>Focus areas</Label>
      <div className='flex flex-col gap-3.5'>
        {focusAreas.map(({ label, icon: Icon }) => (
          <div key={label} className='flex items-center gap-2.5'>
            <Checkbox
              id={label}
              checked={selectedFocusAreas.includes(label)}
              onCheckedChange={(checked) =>
                handleCheckedChange(label, checked === true)
              }
              className='data-checked:border-sky-600 data-checked:bg-sky-600 dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500'
            />
            <Label htmlFor={label} className='flex items-center gap-2 text-sm'>
              <Icon className='size-4 text-muted-foreground' aria-hidden='true' />
              {label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Checkbox9
