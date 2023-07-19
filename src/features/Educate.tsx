import { UrlCard } from '@/components/ui/EducationalLinks'
import { EducateLinks } from '@/data/Education'

export const EducateSection = (): JSX.Element => {
  return (
    <div className="w-full h-full relative text-center border-b hover:bg-gray-950/10 transition-all duration-200 ease-in overflow-clip">
      <div className="text-slate-200 border">
        <h1 className="text-slate-200 text-sm p-5 text-center">
          educate yourself (links)
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
