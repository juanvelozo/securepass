import { useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { AnimatedNumber } from './AnimatedNumber'

export const AnimatedCounter = ({ value }: IAnimatedCounter): JSX.Element => {
  // render
  return (
    <div
      className="flex space-x-1 overflow-hidden px-2 leading-none "
      style={{ fontSize: 80 }}
    >
      <Digit place={100} value={value} />
      <Digit place={10} value={value} />
      <Digit place={1} value={value} />
    </div>
  )
}
interface IAnimatedCounter {
  value: number
}

const Digit = ({ place, value }: IDigit) => {
  let valueRoundedToPlace = Math.floor(value / place)
  let animatedValue = useSpring(valueRoundedToPlace)

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace)
  }, [animatedValue, valueRoundedToPlace])

  return (
    <div style={{ height: 80 }} className="relative w-[1ch] tabular-nums">
      {[...Array(10).keys()].map((_, i) => (
        <AnimatedNumber key={i} mv={animatedValue} place={place} number={i} />
      ))}
    </div>
  )
}
interface IDigit {
  place: number
  value: number
}
/**
 * @description Type 'IterableIterator' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
 */
