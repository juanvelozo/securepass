import { charArray } from '@/helpers/chartypes/char.types'
import {
  PasswordFilters,
  initialCharFilterState,
} from '@/helpers/filters/passwordFilters.type'
import { randomizePassword } from '@/util/randomizeString'
import { Inter } from 'next/font/google'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { RangeSlider } from '@/components/input/RangeSlider'
import { Window } from '@/components/ui/Window'
import { FilterButtons } from '@/components/buttons/FilterButtons'
import { PasswordInput } from '@/components/input/PasswordInput'
import { ToggleButton } from '@/components/buttons/ToggleButton'
import { copyToClipboard } from '@/util/copyToClipboard'
import { SecurityCarrousel } from '@/components/ui/SecurityCarousel'
import { PasswordLength } from '@/components/ui/PasswordLength'
import AnimatedTabs from '@/components/lang/LanguageSwitcher'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  //states
  const [password, setPassword] = useState<string | undefined>('')
  const [passwordLength, setPasswordLength] = useState<number>(20)
  const [advanceSetup, setAdvanceSetup] = useState<boolean>(false)
  const [charFilter, setCharFilter] = useState<PasswordFilters>(
    initialCharFilterState
  )

  // consts
  const halfIndex = Math.floor(charArray.length / 2)
  const visibleItems = advanceSetup ? charArray : charArray.slice(0, halfIndex)
  const advancedItems = charArray.slice(halfIndex)

  // functions
  const handleUpdateCharFilter = useCallback(
    (key: keyof PasswordFilters) => {
      setCharFilter(prevState => ({
        ...prevState,
        [key]: !prevState[key],
      }))
    },
    [setCharFilter, charFilter]
  )

  function generatePassword() {
    const securePassword = randomizePassword({
      filters: charFilter,
      length: passwordLength,
    })
    setPassword(securePassword)
  }

  // effects
  useEffect(() => {
    generatePassword()
  }, [passwordLength, charFilter])

  useEffect(() => {
    const allFiltersFalse = Object.values(charFilter).every(
      value => value === false
    )

    if (allFiltersFalse) {
      alert(
        'There must be at least one filter for a strong password to be displayed.'
      )
      setCharFilter(initialCharFilterState)
    }
  }, [charFilter])

  useEffect(() => {
    if (!advanceSetup) {
      advancedItems.forEach(el => {
        if (charFilter[el.name as keyof PasswordFilters]) {
          setCharFilter(prev => ({
            ...prev,
            [el.name]: false,
          }))
        }
      })
      let isChanged = false

      for (let i = 0; i < advancedItems.length; i++) {
        if (advancedItems[i] !== charArray[halfIndex + i]) {
          isChanged = true
          break
        }
      }

      if (isChanged) {
        generatePassword()
      }
    }
  }, [advanceSetup])

  //render
  return (
    <main
      className={`flex min-h-screen flex-col w-full items-center bg-[#151515]`}
    >
      <Window>
        <div className="w-full h-[50%] ">
          <div className="w-full my-10">
            <ToggleButton
              className="rounded-none"
              label={
                advanceSetup
                  ? 'hide advanced filter (reset the password if you applied an advanced filter)'
                  : 'show advanced filter'
              }
              toggled={advanceSetup}
              onClick={() => setAdvanceSetup(!advanceSetup)}
              backgroundColor={{
                off: 'rgb(75 85 99)',
                on: 'rgb(74 122 128)',
              }}
              fullWidth
            />
            <FilterButtons
              charFilter={charFilter}
              items={visibleItems}
              onClick={handleUpdateCharFilter}
            />
          </div>
          <div className="w-full flex">
            <div>
              <PasswordLength passwordLength={passwordLength} />
              <RangeSlider
                value={passwordLength}
                onChange={({ currentTarget: { value } }) => {
                  setPasswordLength(Number(value))
                  generatePassword()
                }}
                onInput={({ currentTarget: { value } }) => {
                  setPasswordLength(Number(value))
                  generatePassword()
                }}
              />
            </div>
            <PasswordInput
              password={password!}
              onChange={({
                currentTarget: { value },
              }: ChangeEvent<HTMLInputElement>) => {
                if (value.length !== passwordLength) {
                  setPassword(prev => {
                    if (prev !== value) return value
                  })
                  setPasswordLength(value.length)
                }
                setPassword(value)
              }}
            />
          </div>
          <div className="w-full flex justify-between">
            <ToggleButton
              label="Copy to clipboard"
              onClick={() => copyToClipboard(password!)}
              isInteractive
              onInteractedLabel="Copied"
              fullWidth
              backgroundColor={{
                off: 'transparent',
                on: 'rgb(70 142 38)',
              }}
              className={`rounded-none text-base lowercase  whitespace-normal border`}
            />
            <ToggleButton
              label="Create another password"
              onClick={generatePassword}
              isInteractive
              onInteractedLabel="Secure password created!"
              fullWidth
              backgroundColor={{
                off: 'transparent',
                on: 'rgb(70 142 38)',
              }}
              className={`rounded-none text-base lowercase  whitespace-normal border`}
            />
          </div>
        </div>
        <div className="flex justify-between h-[43%]">
          <div className="w-1/3">
            <SecurityCarrousel />
          </div>
          <div className="w-1/3  text-slate-200 border">
            <h1 className="text-center  text-lg">Educate yourself</h1>
          </div>
          <div className="w-1/3 text-slate-200 border">
            <h1 className="text-center  text-lg">About me</h1>
          </div>
        </div>
      </Window>
    </main>
  )
}
