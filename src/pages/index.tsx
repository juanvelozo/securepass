import PasswordInput from '@/components/input/PasswordInput'
import {
  CharTypeEnum,
  charArray,
  charsLabels,
} from '@/helpers/chartypes/char.types'
import { PasswordFilters, initialCharFilterState } from '@/helpers/filters/passwordFilters.type'
import { randomizePassword } from '@/util/randomizeString'
import { Inter } from 'next/font/google'
import { useCallback, useEffect, useState } from 'react'
import { RangeSlider } from '@/components/input/RangeSlider'
import { copyToClipboard } from '@/util/copyToClipboard'
import { Window } from '@/components/ui/Window'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  //states
  const [password, setPassword] = useState<string | undefined>('')
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [advanceSetup, setAdvanceSetup] = useState<boolean>(false)
  const [charFilter, setCharFilter] = useState<PasswordFilters>(initialCharFilterState)

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
      setCharFilter(initialCharFilterState);
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
      let isChanged = false;

      for (let i = 0; i < advancedItems.length; i++) {
        if (advancedItems[i] !== charArray[halfIndex + i]) {
          isChanged = true;
          break;
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
        <div className="w-full p-10 space-y-2">
          <div className="w-full ">
            <PasswordInput
              password={password!}
              onChange={({ currentTarget: { value } }) => {
                setPassword(value)
              }}
            />
          </div>
                <div className="w-full flex justify-between">
          <button className="border-2 text-white border-white rounded-lg px-2 py-1  bg-gray-400 w-full"
               onClick={() => copyToClipboard(password!)}>Copy to clipboard</button>
          <button className="border-2 text-white border-white rounded-lg px-2 py-1  bg-gray-400 w-full" onClick={() => generatePassword()}>Create another password</button>
               </div>

               </div>
        <div className="w-full p-10 ">
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password length: {passwordLength} characters.
            </label>
            <RangeSlider
              defaultValue={passwordLength}
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
        <div className="w-full px-10">
          <button className={`border-2 text-white border-white rounded-lg px-2 py-1  ${
                advanceSetup
                  ? 'bg-green-400 border'
                  : 'bg-gray-400'
              }`} onClick={() => setAdvanceSetup(!advanceSetup)}>
            Show advanced filters
          </button>

        </div>
        <div className="w-full p-10 gap-2 flex flex-wrap">
          {visibleItems.map((el, i) => (
            <button
              key={i}
              className={`border-2 text-white border-white rounded-lg px-2 py-1 ${
                charFilter[el.name as keyof PasswordFilters]
                  ? 'bg-gray-400 border'
                  : 'bg-gray-200'
              } whitespace-nowrap`}
              onClick={() => {
                handleUpdateCharFilter(el.name as keyof PasswordFilters)
              }}
            >
              {charsLabels[el.name as CharTypeEnum]}
            </button>
          ))}
        </div>
      </Window>
    </main>
  )
}
