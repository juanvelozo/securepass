import { CharTypeEnum, charsLabels } from '@/helpers/chartypes/char.types'
import { PasswordFilters } from '@/helpers/filters/passwordFilters.type'
import { ToggleButton } from './ToggleButton'
import { useState } from 'react'

export const FilterButtons = ({
  items,
  charFilter,
  onClick,
}: IFilterButtons): JSX.Element => {
  const [toggled, setToggled] = useState<boolean>(false)

  // functions
  function handleClick(key: keyof PasswordFilters, i: number) {
    onClick(key)
    const newToggled = [toggled]
    newToggled[i] = !newToggled[i]
    setToggled(newToggled[0])
  }

  // render
  return (
    <div className="w-full gap-2 flex flex-wrap">
      {items.map((el, i) => (
        <ToggleButton
          key={i}
          onClick={() => {
            handleClick(el.name as keyof PasswordFilters, i)
          }}
          label={charsLabels[el.name as CharTypeEnum]}
          toggled={charFilter[el.name as keyof PasswordFilters]}
          backgroundColor={{ off: 'rgb(156 163 175)', on: 'rgb(74 222 128)' }}
          textColor={
            charFilter[el.name as keyof PasswordFilters]
              ? '#fff'
              : 'rgb(75 85 99)'
          }
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
