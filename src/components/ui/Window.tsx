import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { Topbar } from './TopBar'

export const Window = ({ children }: IProps): JSX.Element => {
  //States
  //hooks
  //functions
  //DOM

  return (
    <div
      className={`h-[90vh] m-auto p-auto w-[60vw] ${inter.className} rounded-xl relative bg-white text-black`}
    >
      <Topbar />
      <div className="p-4 m-auto h-[95%] w-[95%]">{children}</div>
    </div>
  )
}
interface IProps {
  children?: ReactNode
}

const inter = Inter({ subsets: ['latin'] })
