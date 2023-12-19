import { Major_Mono_Display } from 'next/font/google'
import { ReactNode } from 'react'
import LanguageSwitcher from '../lang/LanguageSwitcher'

export const Window = ({ children }: IProps): JSX.Element => {
  //States
  //hooks
  //functions
  //DOM

  return (
    <div
      className={`h-[90vh] m-auto p-auto w-[95vw] ${mayorMono.className}  relative bg-[#151500] text-black overflow-clip shadow-[-10px_-10px_0px_0px_#000]`}
    >
      <div className="w-full flex items-center gap-10 absolute top-0 bg-[#151500]">
        <h1 className=" text-center text-white font- select-none whitespace-nowrap border-b mx-3">
          secure password generator
        </h1>
        <LanguageSwitcher />
      </div>
      <div className="w-full h-full overflow-auto">{children}</div>
    </div>
  )
}
interface IProps {
  children?: ReactNode
}

const mayorMono = Major_Mono_Display({ weight: '400', subsets: ['latin'] })
