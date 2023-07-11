import { Variants, motion } from 'framer-motion'

const WavyText = ({
  delay = 0.2,
  duration = 0.0224,
  replay = false,
  text,
  className,
  key,
}: IProps) => {
  const wordsArray = text.split(' ')

  const container: Variants | undefined = {
    hidden: {
      opacity: 0,
    },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: i * delay },
    }),
  }

  const child: Variants | undefined = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 16,
        stiffness: 400,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      y: 20,
      transition: {
        type: 'spring',
        damping: 16,
        stiffness: 400,
      },
    },
  }

  return (
    <motion.p
      key={key}
      variants={container}
      initial="hidden"
      className={`select-none flex text-2xl overflow-hidden gap-1 ${className}`}
      animate={replay ? 'visible' : 'hidden'}
    >
      {wordsArray.map((word, index) => (
        <motion.span key={index} variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}
interface IProps {
  delay?: number
  duration?: number
  replay?: boolean
  text: string
  className?: string
  key?: string | number
}

export default WavyText
