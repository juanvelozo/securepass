import WavyText from '@/components/common/AnimatedText'
import { charArray } from '@/helpers/chartypes/char.types'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

declare enum PasswordQualityEnum {
  POOR = 'poor',
  WEAK = 'weak',
  GOOD = 'good',
  STRONG = 'strong',
  GODLIKE = 'godlike',
}
type PasswordQualityType = {
  [x in PasswordQualityEnum]: {
    color: string
    label: string
    progress: number
  }
}
export const PasswordQualityLabel: PasswordQualityType = {
  poor: {
    color: 'yellow',
    label: 'Pobre',
    progress: 0,
  },
  weak: {
    color: 'yellow',
    label: 'Débil',
    progress: 25,
  },
  good: {
    color: 'yellow',
    label: 'Buena',
    progress: 50,
  },
  strong: {
    color: 'yellow',
    label: 'Fuerte',
    progress: 75,
  },
  godlike: {
    color: 'yellow',
    label: 'Nivel dios',
    progress: 100,
  },
}

export default function Home() {
  //states
  const [password, setPassword] = useState<string>('')
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [passworkQuality, setPasswordQuality] = useState<PasswordQualityEnum>(
    PasswordQualityEnum.WEAK
  )
  const [advanceSetup, setAdvanceSetup] = useState<boolean>(false)
  const [charFilter, setCharFilter] = useState<any[]>([])

// functions
function randomizePassword(length:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  setPassword(result)
}


  //render
  return (
    <main
      className={`flex min-h-screen flex-col w-full items-center  ${inter.className}`}
    >
      <WavyText text="Secure password generator" />
      <div className="w-full p-10 border-2 border-white flex gap-5">
        <input
          type="text"
          id="input-group-1"
          value={password}
          onChange={({currentTarget:{value}})=>{
setPassword(value)
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
        />
        <button onClick={()=>randomizePassword(passwordLength)}>reload</button>
      </div>
      <div className="w-full p-10 border-2 border-white">
        <div className="flex">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tamaño contraseña {passwordLength}
          </label>
          <input
            type="range"
            value={50}
            min={10}
            onChange={({ currentTarget: { value } }) =>
              setPasswordLength(Number(value))
            }
          />
        </div>
      </div>
      <div>
        <div className="w-full p-10 border-2 border-white">
          <div className="flex gap-3 w-2/3 flex-wrap">
            {charArray.splice(advanceSetup ? 10 : 5).map((el, i) => (
              <button
                key={i}
                className="border-2 border-white rounded-lg px-2 py-1"
              >
                {el.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
