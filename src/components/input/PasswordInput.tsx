import { ChangeEvent } from 'react'
import { Cutive_Mono } from 'next/font/google'

export const PasswordInput = ({
  password,
  onChange,
  placeholder,
}: PasswordInputProps) => {
  // states
  // constants

  // functions

  // render
  return (
    <input
      type="text"
      value={password}
      disabled
      onChange={onChange}
      className={`bg-transparent target:ring-0 border text-4xl text-center tracking-[.1em] text-slate-200 w-full ring-0 select-none relative ${font.className} px-10 bg-[#151700] hover:bg-opacity-0`}
      placeholder={placeholder}
      maxLength={100}
    />
  )
}

interface PasswordInputProps {
  password: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}
const font = Cutive_Mono({ weight: '400', subsets: ['latin'] })
