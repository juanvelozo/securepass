import { UrlCard } from '@/components/ui/EducationalLinks'
import { EducateLinks } from '@/data/Education'
import { useTranslation } from 'next-i18next'

export const EducateSection = (): JSX.Element => {
// hooks
const { t } = useTranslation()

  // render
  return (
    <div className="w-full h-full relative text-center border-b hover:bg-gray-950/10 transition-all duration-200 ease-in overflow-clip">
      <div className="text-slate-200 border">
        <h1 className="text-slate-200 text-sm p-5 text-center">
          {t('educateYourselfTitle')} (links)
        </h1>
      </div>
      <div className="h-full flex flex-col justify-evenly">
        {EducateLinks.map((el, i) => {
          return <UrlCard data={el} key={i} reverse={i % 2 === 0} />
        })}
      </div>
    </div>
  )
}
