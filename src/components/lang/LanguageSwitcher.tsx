import { motion } from 'framer-motion'
import { useState, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18nextConfig from '../../../next-i18next.config'
import { useRouter } from 'next/router'
let languages = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Español' },
]

export default function LanguageSwitcher() {
  const defaultLocale = i18nextConfig.i18n.defaultLocale
  let [activeTab, setActiveTab] = useState(defaultLocale)
  const { i18n } = useTranslation('common')
  const router = useRouter()

  const onToggleLanguageClick = (language: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: language })
    setActiveTab(language)
    i18n.changeLanguage(language)
  }
  useLayoutEffect(() => {
    setActiveTab(i18nextConfig.i18n.defaultLocale)
    onToggleLanguageClick(i18nextConfig.i18n.defaultLocale)
  }, [])
  return (
    <div className="flex space-x-1 w-full">
      {languages.map(lang => (
        <button
          key={lang.id}
          onClick={() => onToggleLanguageClick(lang.id)}
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
