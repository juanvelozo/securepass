import { motion } from 'framer-motion'
import { useState } from 'react'

let languages = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Español' },
]

export default function LanguageSwitcher() {
  let [activeTab, setActiveTab] = useState(languages[0].id)

  return (
    <div className="flex space-x-1 w-full">
      {languages.map(lang => (
        <button
          key={lang.id}
          onClick={() => setActiveTab(lang.id)}
          className={`relative rounded-none p-1.5 lowercase`}
        >
          <span
            className={`relative z-10 text-sm font-bold ${
              activeTab === lang.id ? 'text-black' : ' text-white'
            }`}
          >
            {lang.label}
          </span>
          {activeTab === lang.id && (
            <motion.div
              layoutId="bubble"
              className="absolute inset-0 z-0 bg-white"
              transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
