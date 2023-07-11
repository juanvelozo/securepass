import { useState } from 'react'
import { AnimatedCounter } from '../common/AnimatedCounter'

export const PasswordLength = ({
  passwordLength,
}: IpasswordLength): JSX.Element => {
  //constants

  //states
  let [count, setCount] = useState<number>(0)

  //hooks

  //functions

  //effects

  //render

  return (
    <div className="text-slate-200 flex flex-col items-center justify-center text-center border-t border-l border-r select-none w-[15rem] p-3">
      <span className="text-base font-extralight">password length</span>

      <AnimatedCounter value={passwordLength} />
      <span className="font-light text-2xl">characters</span>
    </div>
  )
}
interface IpasswordLength {
  passwordLength: number
}
