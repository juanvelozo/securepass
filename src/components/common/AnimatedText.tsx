import { motion } from 'framer-motion'

interface IProps {
  delay?: number
  duration?: number
  replay?: boolean
  text: string
}

const WavyText = ({
  delay = 0.5,
  duration = 0.025,
  replay = false,
  text,
}: IProps) => {
  const wordsArray = text.split(' ')

  const container = {
    hidden: {
      opacity: 0,
    },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: i * delay },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 16,
        stiffness: 400,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: 'spring',
        damping: 16,
        stiffness: 400,
      },
    },
  }

  return (
    <motion.p
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        fontSize: '32px',
        color: '#fff',
        gap: '4px',
      }}
      variants={container}
      initial="hidden"
      className="select-none"
      animate={replay ? 'visible' : 'hidden'}
    >
      {wordsArray.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          // SELECTS THE WORDS THAT YOU WANT TO HIGHLIGHT
          className={
            index > 9 && index < 13
              ? 'text-[#4610F9] medium-font font-extrabold'
              : ' regular-font'
          }
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

export default WavyText
