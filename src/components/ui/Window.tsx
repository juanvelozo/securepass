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
      className={`h-[90vh] m-auto p-auto w-[90vw] ${inter.className} rounded-xl relative bg-gray-100 text-black`}
    >
      <Topbar />
      <div className="px-4 py-14 m-auto h-[100%] w-[100%] space-y-10 flex">
        {children}
      </div>
    </div>
  )
}
interface IProps {
  children?: ReactNode
}

const inter = Inter({ subsets: ['latin'] })
