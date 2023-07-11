import { ReactNode, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import useMeasure from 'react-use-measure'
import { SecurityArray } from '@/data/Security'
import WavyText from '../common/AnimatedText'

let duration = 0.5

export const SecurityCarrousel = () => {
  // state
  const [count, setCount] = useState<number>(0)
  // functions
  function updateCount(currentCount: number, increment: number) {
    if (increment === -1 && currentCount === 0) {
      setCount(7)
    } else {
      if (increment < 0) {
        increment = -1
      }
      let newCount = (currentCount + increment + 8) % 8
      if (newCount === 8) {
        setCount(0)
      } else {
        setCount(newCount)
      }
    }
  }

  return (
    <MotionConfig transition={{ duration, type: 'tween' }}>
      <div className="w-full h-full relative text-center border hover:bg-gray-950/10 transition-all duration-200 ease-in overflow-clip">
        <div className="flex items-center justify-center border-b">
          <span className="text-slate-300 px-2 border-r absolute left-0">
            {count}
          </span>
          <span className="text-slate-200 text-sm p-3">
            Why do should secure your password?
          </span>
        </div>
        <div className="flex justify-between  h-full">
          <button
            onClick={() => updateCount(count, -1)}
            className="border-r h-full text-slate-200 text-sm font-light px-2"
          >
            &#x2C2;
          </button>
          <ResizablePanel>
            <WavyText
              key={count}
              replay
              delay={0.4}
              text={SecurityArray[count].title}
              className="text-center text-base font-extralight text-slate-300 mx-auto flex justify-center w-full capitalize py-2 overflow-hidden"
            />

            <p className="text-slate-300 text-center text-sm font-medium h-full p-4">
              {SecurityArray[count].description}
            </p>
          </ResizablePanel>
          <button
            onClick={() => updateCount(count, 1)}
            className="border-l h-full text-slate-200 text-sm font-light px-2"
          >
            &#x2C3;
          </button>
        </div>
      </div>
    </MotionConfig>
  )
}

function ResizablePanel({ children }: { children: ReactNode }) {
  let [ref, { height }] = useMeasure()

  return (
    <motion.div
      animate={{ height: height || 'auto' }}
      className="relative h-full w-full overflow-hidden"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          initial={{
            x: 500,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: -500,
            opacity: 0,
          }}
          className={height ? 'absolute' : 'relative'}
        >
          <div ref={ref} className="lowercase">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.

  https://github.com/facebook/react/issues/8669#issuecomment-531515508
*/
const ignoreCircularReferences = () => {
  const seen = new WeakSet()
  return (key: string, value: any) => {
    if (key.startsWith('_')) return // Don't compare React's internal props.
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return
      seen.add(value)
    }
    return value
  }
}
