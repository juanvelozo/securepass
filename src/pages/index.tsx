import WavyText from '@/components/common/AnimatedText'
import ProgressBar from '@/components/common/ProgressBar'
import { charArray } from '@/helpers/chartypes/char.types'
import { PasswordQualityColor, PasswordQualityEnum, PasswordQualityLabel, PasswordQualityProgress } from '@/helpers/password/password.type'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  //states
  const [password, setPassword] = useState<string>('')
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [passworkQuality, setPasswordQuality] = useState<PasswordQualityEnum>(
    PasswordQualityEnum.WEAK
  )
  const [advanceSetup, setAdvanceSetup] = useState<boolean>(false)
  // const [charFilter, setCharFilter] = useState<any[]>([])

// functions
function randomizePassword(length:number) {
  let result = '';
  const characters = /^[A-Z]$^[a-z]$/+'0123456789';
  const charactersLength = characters.length;
  if(passwordLength < 20){
    setPasswordQuality(PasswordQualityEnum.WEAK)
  }
  if(passwordLength >=20){
    setPasswordQuality(PasswordQualityEnum.POOR)
  }
  if(passwordLength >=40){
    setPasswordQuality(PasswordQualityEnum.GOOD)
  }
  if(passwordLength >=60){
    setPasswordQuality(PasswordQualityEnum.STRONG)
  }
  if(passwordLength >=80){
    setPasswordQuality(PasswordQualityEnum.GODLIKE)
  }
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  setPassword(result)
}

// effects
useEffect(() => {
  randomizePassword(passwordLength)  
}, [])

  //render
  return (
    <main
      className={`flex min-h-screen flex-col w-full items-center  ${inter.className}`}
    >
      <WavyText text="Secure password generator" />
      <div className="w-full p-10 border-2 border-white flex gap-5">
        <div className='w-full'>

        <input
          type="text"
          value={password}
          onChange={({currentTarget:{value}})=> {
            setPassword(value)
          }}
          className="bg-gray-50 text-black p-2 rounded-t-xl w-full" 
          placeholder="name@flowbite.com"
          />
            <ProgressBar bgcolor={PasswordQualityColor[passworkQuality]} completed={PasswordQualityProgress[passworkQuality]}/>
            <p>Seguridad: {PasswordQualityLabel[passworkQuality]}</p>
          </div>
        <button onClick={()=>randomizePassword(passwordLength)}>reload</button>
      </div>
   
      <div className="w-full p-10 border-2 border-white">
        <div className="flex flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tamaño contraseña {passwordLength}
          </label>
          <input
            type="range"
            defaultValue={10}
            min={10}
            max={100}
            className='w-full'
            step={1}
            onChange={({ currentTarget: { value } }) =>
             { 
              setPasswordLength(Number(value))
              randomizePassword(passwordLength)  
            }}
          />
        </div>
        <button onClick={()=>setAdvanceSetup(!advanceSetup)}>
          advanced filters
        </button>
      </div>
      <div>
        <div className="w-full p-10 border-2 border-white">
          <div className="flex gap-3 w-2/3 flex-wrap">
            {charArray.map((el, i) => (
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
