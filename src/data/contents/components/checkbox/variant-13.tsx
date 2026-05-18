'use client'

import { useState } from 'react'

import { Checkbox } from '@/components/base-ui/checkbox'
import { Label } from '@/components/base-ui/label'

const settingOptions = [
  {
    id: 'auto-start',
    label: 'Launch at startup',
    description: 'Starting with your OS.'
  },
  {
    id: 'auto-update',
    label: 'Install updates automatically',
    description: 'Download and install new version'
  }
] as const

type SettingOption = (typeof settingOptions)[number]
type SettingOptionId = SettingOption['id']

const initialCheckedSettings: Record<SettingOptionId, boolean> = {
  'auto-start': true,
  'auto-update': false
}

const Checkbox13 = () => {
  const [checkedSettings, setCheckedSettings] = useState<
    Record<SettingOptionId, boolean>
  >(
    initialCheckedSettings
  )

  const handleCheckedChange = (id: SettingOptionId, checked: boolean) => {
    setCheckedSettings((previousCheckedSettings) => ({
      ...previousCheckedSettings,
      [id]: checked
    }))
  }

  return (
    <div className='space-y-2.5'>
      {settingOptions.map((option) => (
        <Label
          key={option.id}
          htmlFor={option.id}
          className={`hover:bg-accent/40 flex items-start gap-3 rounded-2xl border p-3.5 shadow-xs transition-colors ${
            checkedSettings[option.id]
              ? 'border-primary/50 bg-primary/5 dark:border-primary dark:bg-primary/10'
              : 'border-border/70 bg-card'
          }`}
        >
          <Checkbox
            id={option.id}
            checked={checkedSettings[option.id]}
            onCheckedChange={(checked) =>
              handleCheckedChange(option.id, checked === true)
            }
            className='mt-0.5'
          />
          <div className='grid gap-1 font-normal'>
            <p className='text-sm leading-none font-medium'>{option.label}</p>
            <p className='text-muted-foreground text-[13px] leading-5'>
              {option.description}
            </p>
          </div>
        </Label>
      ))}
    </div>
  )
}

export default Checkbox13
