import { charArray } from '@/helpers/chartypes/char.types'
import {
  PasswordFilters,
  initialCharFilterState,
} from '@/helpers/filters/passwordFilters.type'
import { randomizePassword } from '@/util/randomizeString'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { RangeSlider } from '@/components/input/RangeSlider'
import { Window } from '@/components/ui/Window'
import { FilterButtons } from '@/components/buttons/FilterButtons'
import { PasswordInput } from '@/components/input/PasswordInput'
import { ToggleButton } from '@/components/buttons/ToggleButton'
import { copyToClipboard } from '@/util/copyToClipboard'
import { SecurityCarrousel } from '@/features/SecurityCarousel'
import { PasswordLength } from '@/features/PasswordLength'
import { EducateSection } from '@/features/Educate'
import { About } from '@/features/AboutMe'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { InferGetStaticPropsType } from 'next'

export default function Home(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  //states
  const [password, setPassword] = useState<string | undefined>('')
  const [passwordLength, setPasswordLength] = useState<number>(0)
  const [advanceSetup, setAdvanceSetup] = useState<boolean>(false)
  const [charFilter, setCharFilter] = useState<PasswordFilters>(
    initialCharFilterState
  )
  // hooks
  const { t } = useTranslation('common')

  // consts
  const halfIndex = Math.floor(charArray.length / 2)
  const visibleItems = advanceSetup ? charArray : charArray.slice(0, halfIndex)
  const advancedItems = charArray.slice(halfIndex)
  const isToken = Object.entries(charFilter).every(([key, value]) => {
    return key === 'NUMBER' ? value === true : value === false
  })
  // functions
  const handleUpdateCharFilter = useCallback(
    (key: keyof PasswordFilters) => {
      setCharFilter(prevState => ({
        ...prevState,
        [key]: !prevState[key],
      }))
    },
    [setCharFilter, charFilter]
  )

  function generatePassword() {
    const securePassword = randomizePassword({
      filters: charFilter,
      length: passwordLength,
    })
    setPassword(securePassword)
  }

  // effects
  useEffect(() => {
    generatePassword()
  }, [passwordLength, charFilter])

  useEffect(() => {
    const allFiltersFalse = Object.values(charFilter).every(
      value => value === false
    )

    if (allFiltersFalse) {
      alert(
        'There must be at least one filter for a strong password to be displayed.'
      )
      setCharFilter(initialCharFilterState)
    }
  }, [charFilter])

  useEffect(() => {
    if (!advanceSetup) {
      advancedItems.forEach(el => {
        if (charFilter[el.name as keyof PasswordFilters]) {
          setCharFilter(prev => ({
            ...prev,
            [el.name]: false,
          }))
        }
      })
      let isChanged = false

      for (let i = 0; i < advancedItems.length; i++) {
        if (advancedItems[i] !== charArray[halfIndex + i]) {
          isChanged = true
          break
        }
      }

      if (isChanged) {
        generatePassword()
      }
    }
  }, [advanceSetup])
  useEffect(() => {
    let count = 10
    setPasswordLength(count)
    const interval = setInterval(() => {
      if (count >= 20) {
        clearInterval(interval)
      } else {
        count++
        setPasswordLength(prevCount => prevCount + 1)
      }
    }, 200)

    return () => {
      clearInterval(interval)
    }
  }, [])

  //render
  return (
    <main
      className={`flex min-h-screen flex-col w-full items-center bg-[#151515]`}
    >
      <Window>
        <div className="w-full">
          <div className="w-full my-10">
            <ToggleButton
              className="rounded-none lowercase"
              label={
                advanceSetup
                  ? t('hideFilters')
                  : t('showFilters')
              }
              toggled={advanceSetup}
              onClick={() => setAdvanceSetup(!advanceSetup)}
              backgroundColor={{
                off: 'rgb(75 85 99)',
                on: 'rgb(74 122 128)',
              }}
              fullWidth
            />
            <FilterButtons
              charFilter={charFilter}
              items={visibleItems}
              onClick={handleUpdateCharFilter}
            />
          </div>
          <div className="w-full flex">
            <div>
              <PasswordLength
                onlyNumbers={isToken}
                passwordLength={passwordLength}
              />
              <RangeSlider
                value={passwordLength}
                onChange={({ currentTarget: { value } }) => {
                  setPasswordLength(Number(value))
                  generatePassword()
                }}
                onInput={({ currentTarget: { value } }) => {
                  setPasswordLength(Number(value))
                  generatePassword()
                }}
              />
            </div>
            <PasswordInput
              password={password!}
              onChange={({
                currentTarget: { value },
              }: ChangeEvent<HTMLInputElement>) => {
                if (value.length !== passwordLength) {
                  setPassword(prev => {
                    if (prev !== value) return value
                  })
                  setPasswordLength(value.length)
                }
                setPassword(value)
              }}
            />
          </div>
          <div className="w-full flex justify-between">
            <ToggleButton
              label={t('copyToClipboard')}
              onClick={() => copyToClipboard(password!)}
              isInteractive
              onInteractedLabel={t('copied')}
              fullWidth
              backgroundColor={{
                off: 'transparent',
                on: 'rgb(70 142 38)',
              }}
              className={`rounded-none text-base lowercase  whitespace-normal border`}
            />
            <ToggleButton
              label={t("createNewPassword")}
              onClick={generatePassword}
              isInteractive
              onInteractedLabel={t("securePasswordCreated")}
              fullWidth
              backgroundColor={{
                off: 'transparent',
                on: 'rgb(70 142 38)',
              }}
              className={`rounded-none text-base lowercase  whitespace-normal border`}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-2/5">
            <SecurityCarrousel />
          </div>
          <div className="w-2/5  ">
            <EducateSection />
          </div>
          <div className="w-1/5">
            <About />
          </div>
        </div>
      </Window>
    </main>
  )
}
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
