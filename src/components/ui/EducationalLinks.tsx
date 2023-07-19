import { LinksArray } from '@/data/Education'
import { motion } from 'framer-motion'

export const UrlCard = ({ data, reverse }: IUrlCard): JSX.Element => {
// states
// constants
  const marqueeVariants = {
    animate: {
      x: reverse ? [-1035, 0] : [0, -1035],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 60,
          ease: 'linear',
        },
      },
    },
  }




// render
  return (
    <a
      href={data.url}
      target="_blank"
      className="border group hover:bg-slate-100 h-11"
    >
      <div className="relative w-screen max-w-full h-full overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute whitespace-nowrap "
          variants={marqueeVariants}
          animate="animate"
        >
          <span className="text-gray-200 group-hover:text-gray-900 lowercase text-center font-light group-hover:font-semibold text-lg group-hover:text-4xl transition-all ease-in-out">
            {Array(10).fill(data.title + ' ')}
          </span>
        </motion.div>
      </div>
    </a>
  )
  }
interface IUrlCard {
  data: LinksArray
  reverse?: boolean
}
