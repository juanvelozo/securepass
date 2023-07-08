import { ChangeEvent, useState } from 'react'
import { Variant, motion } from 'framer-motion'
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
      onChange={handleChange}
      className="bg-gray-900 p-5 text-2xl tracking-[.1em] rounded-xl w-full ring-0 select-none relative"
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
