import { motion } from 'framer-motion'
import { useState } from 'react'

let tabs = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Español' },
]

export default function AnimatedTabs() {
  let [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div className="flex space-x-1 w-full">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative rounded-none p-1.5 lowercase`}
        >
          <span
            className={`relative z-10 text-sm font-bold ${
              activeTab === tab.id ? 'text-black' : ' text-white'
            }`}
          >
            {tab.label}
          </span>
          {activeTab === tab.id && (
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
