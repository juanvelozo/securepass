// import Image from 'next/image'

import { LanguageSwitch } from "../lang/LanguageSwitcher"

export const Topbar = (): JSX.Element => {
  return (
    <div className="bg-gray-200 h-10 flex justify-between items-center absolute w-full select-none rounded-t-xl">
      <span className="text-gray-700 mx-2 font-light">
        Secure Password Generator
      </span>
      <div className="h-full min-w-[28px] flex justify-center items-center rounded-tr-lg overflow-clip">
<LanguageSwitch/>
        <a
          href="https://github.com/juanvelozo/securepass"
          target="_blank"
          className="bg-gray-300 hover:bg-gray-400 h-full flex items-center justify-center text-gray-700 w-[100px] duration-150 ease-in "
        >
          <span className="8px">&#60;&#47;&#62; Github</span>
        </a>
      </div>
    </div>
  )
}
