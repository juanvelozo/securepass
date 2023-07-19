import {useTranslation} from 'next-i18next'
import { AnimatedCounter } from '../components/common/AnimatedCounter'

export const PasswordLength = ({
  passwordLength,
  onlyNumbers,
}: IpasswordLength): JSX.Element => {
  //constants

  //states
  //hooks
const {t}= useTranslation('common')
  //functions

  //effects

  //render

  return (
    <div className="text-slate-200 flex flex-col items-center justify-center text-center border-t border-l border-r select-none w-[15rem] overflow-clip p-3">
      <span className="text-sm font-extralight" >
        {t('passwordOrTokenLength').replace('@', onlyNumbers ? t('token') : t('password'))}
      </span>

      <AnimatedCounter value={passwordLength} />
      <span className="font-light text-2xl">{t('characters')}</span>
    </div>
  )
}
interface IpasswordLength {
  passwordLength: number
  onlyNumbers?: boolean
}
