import WavyText from '@/components/common/AnimatedText'
import ProgressBar from '@/components/common/ProgressBar'
import { CharTypeEnum, charArray, charsLabels } from '@/helpers/chartypes/char.types'
import { PasswordFilters } from '@/helpers/filters/passwordFilters.type'
import {
  PasswordQualityColor,
  PasswordQualityEnum,
  PasswordQualityLabel,
  PasswordQualityProgress,
} from '@/helpers/password/password.type'
import { randomizePassword } from '@/util/randomizeString'
import { Inter } from 'next/font/google'
import { useCallback, useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  //states
  const [password, setPassword] = useState<string |undefined>('')
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [passworkQuality, setPasswordQuality] = useState<PasswordQualityEnum>(
    PasswordQualityEnum.WEAK
  )
  const [advanceSetup, setAdvanceSetup] = useState<boolean>(false)
  const [charFilter, setCharFilter] = useState<PasswordFilters>({
    ASCII: true,
    DASHSLASH:false,
    KEYS:false,
    LOGOGRAM:true,
    MATH:false,
    MAYUS:true,
    MINUS:true,
    NUMBER:true,
    PUNCTUATION: false,
    QUOTATION:false
  })
// consts
const halfIndex = Math.floor(charArray.length / 2);
const visibleItems = advanceSetup ?charArray : charArray.slice(0, halfIndex)  ;
// functions
const handleUpdateCharFilter = useCallback((key: keyof PasswordFilters) => {
  setCharFilter(prevState => ({
    ...prevState,
    [key]: !prevState[key],
  }));
}, [setCharFilter]);

function generatePassword (){
  const securePassword = randomizePassword({ filters: charFilter, length: passwordLength })
  setPassword(securePassword)
}
  // effects
  useEffect(() => {
    generatePassword()
  }, [])

  useEffect(() => {
    const allFiltersFalse = Object.values(charFilter).every(value => value === false)
  
    if (allFiltersFalse) {
      alert('Debe haber al menos un filtro para que se muestre una contraseña segura')
      setCharFilter({
        ...charFilter,
        MAYUS: true // el valor que quieras setear en true automáticamente
      })
    }
  }, [charFilter])

  //render
  return (
    <main
      className={`flex min-h-screen flex-col w-full items-center  ${inter.className}`}
    >
      <WavyText text="Secure password generator" />
      <div className="w-full p-10 flex gap-5">
        <div className="w-full">
          <input
            type="text"
            value={password}
            onChange={({ currentTarget: { value } }) => {
              setPassword(value)
            }}
            className="bg-gray-50 text-black p-2 rounded-t-xl w-full"
            placeholder="name@flowbite.com"
          />
          <ProgressBar
            bgcolor={PasswordQualityColor[passworkQuality]}
            completed={PasswordQualityProgress[passworkQuality]}
          />
          <p>Seguridad: {PasswordQualityLabel[passworkQuality]}</p>
        </div>
        <button
          onClick={() =>
            generatePassword()
          }
        >
          reload
        </button>
      </div>

      <div className="w-full p-10 ">
        <div className="flex flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tamaño contraseña {passwordLength}
          </label>
          <input
            type="range"
            defaultValue={10}
            min={10}
            max={100}
            className="w-full"
            step={1}
            onChange={({ currentTarget: { value } }) => {
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
                className={`border-2 border-white rounded-lg px-2 py-1 ${charFilter[el.name as keyof PasswordFilters] ? 'bg-white text-black':'text-white'}`}
                onClick={() => {handleUpdateCharFilter(el.name as keyof PasswordFilters)
                  generatePassword()
}}             
              >
                {charsLabels[el.name as CharTypeEnum]}
              </button>
            ))}
          </div>
    </main>
  )
}
