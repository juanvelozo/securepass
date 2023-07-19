import { CharTypeEnum, charsLabels } from '@/helpers/chartypes/char.types'
import { PasswordFilters } from '@/helpers/filters/passwordFilters.type'
import { ToggleButton } from './ToggleButton'
import { useState } from 'react'
import {useTranslation} from 'next-i18next'

export const FilterButtons = ({
  items,
  charFilter,
  onClick,
}: IFilterButtons): JSX.Element => {
  // states
  const [toggled, setToggled] = useState<boolean>(false)
// hooks
const {t}= useTranslation('common')
  // functions
  function handleClick(key: keyof PasswordFilters, i: number) {
    onClick(key)
    const newToggled = [toggled]
    newToggled[i] = !newToggled[i]
    setToggled(newToggled[0])
  }

  // render
  return (
    <div className="w-full flex flex-nowrap justify-start">
      {items.map((el, i) => (
        <ToggleButton
          key={i}
          className={`rounded-none text-sm h-16 whitespace-normal`}
          onClick={() => {
            handleClick(el.name as keyof PasswordFilters, i)
          }}
          label={t(charsLabels[el.name as CharTypeEnum])}
          toggled={charFilter[el.name as keyof PasswordFilters]}
          backgroundColor={{ off: 'rgb(10 21 21)', on: 'rgb(70 142 38)' }}
          textColor={
            charFilter[el.name as keyof PasswordFilters]
              ? '#fff'
              : 'rgb(156 163 175)'
          }
          fullWidth
        />
      ))}
    </div>
  )
}
interface IFilterButtons {
  items: {
    name: string
  }[]
  charFilter: PasswordFilters
  onClick: (key: keyof PasswordFilters) => void
}
