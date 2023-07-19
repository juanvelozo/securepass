import { ContactLinks } from '@/data/ContactLinks'
import { useState } from 'react'
import { motion } from 'framer-motion'

export const About = (): JSX.Element => {
  //constants

  //states
  let [activeTab, setActiveTab] = useState<number | null>()

  //hooks

  //functions

  //effects

  //render

  return (
    <div className="w-full h-full border hover:bg-gray-950/10 transition-all duration-200 ease-in">
      <div className="text-slate-200 border">
        <h1 className="text-slate-200 text-sm p-3 text-center">about me</h1>
      </div>
      <div
        className="h-3/4 w-full flex flex-col justify-center items-center space-y-5"
        style={{ alignItems: 'flex-end' }}
      >
        {ContactLinks.map((el, i) => {
          return (
            <a
              href={el.url}
              target="_blank"
              key={i}
              className="relative"
              onMouseEnter={() => setActiveTab(i)}
              onMouseLeave={() => setActiveTab(null)}
            >
              <span
                className={`relative text-end text-4xl z-10 ${
                  activeTab === i ? 'text-gray-900 capitalize font-light' : 'text-white lowercase font-semibold'
                }`}
              >
                {el.title}
              </span>
              {activeTab === i && (
                <motion.div
                  layoutId="linkHover"
                  className="absolute inset-0 z-0 bg-white"
                  whileHover={{scale: 1.2}}
                  transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
                />
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}
