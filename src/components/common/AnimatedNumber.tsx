import { MotionValue, useTransform, motion } from 'framer-motion'

export const AnimatedNumber = ({
  mv,
  number,
  place,
}: IAnimatedNumber): JSX.Element => {
  // constants
  const height = 80
  //hooks
  let y = useTransform(mv, latest => {
    let placeValue = latest % 10
    let offset = (10 + number - placeValue) % 10

    let memo = offset * height

    if (offset > 5) {
      memo -= 10 * height
    }

    return memo
  })

  //render
  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center text-white"
    >
      {number}
    </motion.span>
  )
}
interface IAnimatedNumber {
  place: number
  mv: MotionValue
  number: number
}
