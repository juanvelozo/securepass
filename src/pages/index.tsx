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
import WavyText from '@/components/common/AnimatedText'
import { copyToClipboard } from '@/util/copyToClipboard'

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
      className={`flex min-h-screen flex-col w-full items-center  ${inter.className}`}
    >
      <Window>
        <div className="w-[50%] space-y-4">
          <div className="w-full space-y-2">
            <div className="w-full ">
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
            <div className="w-full flex gap-2 justify-between">
              <ToggleButton
                label="Copy to clipboard"
                onClick={() => copyToClipboard(password!)}
                isInteractive
                onInteractedLabel="Copied"
                fullWidth
              />
              <ToggleButton
                label="Create another password"
                onClick={generatePassword}
                isInteractive
                onInteractedLabel="Secure password created!"
                fullWidth
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col">
              <label className="block mb-2 text-2xl text-center font-light text-gray-900">
                Password length: {passwordLength} characters
              </label>
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
          </div>
          <div className="w-full space-y-2">
            <div className="flex">
              <ToggleButton
                label={
                  advanceSetup ? 'Hide advanced filter' : 'Show advanced filter'
                }
                toggled={advanceSetup}
                onClick={() => setAdvanceSetup(!advanceSetup)}
                backgroundColor={{
                  off: 'rgb(75 85 99)',
                  on: 'rgb(74 222 128)',
                }}
              />
              <WavyText
                className="text-xs p-2 text-gray-600"
                text="(Hide the advanced filters will regenerate the password with the standards filters values.)"
                replay={advanceSetup}
              />
            </div>
            <FilterButtons
              charFilter={charFilter}
              items={visibleItems}
              onClick={handleUpdateCharFilter}
            />
          </div>
        </div>
        <div className="w-[50%] space-y-4">
          <h1 className='text-center text-3xl'>Why you should have a secure password?</h1>
          <ul className="list-none p-0 m-2">
            <li className="flex items-center p-4 border-b border-gray-300">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">🔐</div>
              <div className="ml-4">
                <h4 className="font-bold mb-0">Avoid hackers</h4>
                <p className="text-sm text-gray-600 m-0">
                  Description of item 1
                </p>
              </div>
            </li>
            <li className="flex items-center p-4 border-b border-gray-300">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="ml-4">
                <h4 className="font-bold mb-0">Item 2</h4>
                <p className="text-sm text-gray-600 m-0">
                  Description of item 2
                </p>
              </div>
            </li>
            <li className="flex items-center p-4 border-b border-gray-300">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="ml-4">
                <h4 className="font-bold mb-0">Item 3</h4>
                <p className="text-sm text-gray-600 m-0">
                  Description of item 3
                </p>
              </div>
            </li>
          </ul>
        </div>
      </Window>
    </main>
  )
}
