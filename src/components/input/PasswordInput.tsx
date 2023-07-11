import { ChangeEvent, useState } from 'react'
import { Variant, motion } from 'framer-motion'
import { Cutive_Mono } from 'next/font/google'
export const PasswordInput = ({
  password,
  onChange,
  placeholder,
}: PasswordInputProps) => {
  // states
  const [isChanged, setIsChanged] = useState<boolean>(true)
  // constants
  const animate: Variant = {
    color: isChanged ? '#fff' : 'transparent',
    textLength: isChanged ? 1 : 0,
    fontSize: isChanged ? 24 : 0,
  }

  // functions
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setIsChanged(true)
    onChange(event)
    setTimeout(() => {
      setIsChanged(false)
    }, 1000)
  }
  // render
  return (
    <motion.input
      animate={animate}
      initial={{ color: 'transparent' }}
      exit={animate}
      type="text"
      value={password}
      disabled
      onChange={handleChange}
      className={`bg-transparent target:ring-0 border text-4xl text-center tracking-[.1em] w-full ring-0 select-none relative ${font.className} px-10`}
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
