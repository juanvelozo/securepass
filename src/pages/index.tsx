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
        'Debe haber al menos un filtro para que se muestre una contraseña segura'
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
      generatePassword()
    }
  }, [advanceSetup])

  //render
  return (
    <main
      className={`flex min-h-screen flex-col w-full items-center  ${inter.className}`}
    >
      <Window>
        <div className="w-full p-10 flex gap-5">
          <div className="w-full">
            <PasswordInput
              password={password!}
              onChange={({ currentTarget: { value } }) => {
                setPassword(value)
              }}
            />
            <div className='flex items-center my-2 gap-3'>


          </div>
          </div>
          <button onClick={() => copyToClipboard(password!)}>copy</button>
          <button onClick={() => generatePassword()}>reload</button>
        </div>

        <div className="w-full p-10 ">
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tamaño contraseña {passwordLength}
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
          <button onClick={() => setAdvanceSetup(!advanceSetup)}>
            advanced filters
          </button>
        </div>
        <div className="w-full p-10 space-x-2 space-y-2">
          {visibleItems.map((el, i) => (
            <button
              key={i}
              className={`border-2 text-white border-white rounded-lg px-2 py-1 ${
                charFilter[el.name as keyof PasswordFilters]
                  ? 'bg-gray-400 border'
                  : 'bg-gray-200'
              }`}
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
