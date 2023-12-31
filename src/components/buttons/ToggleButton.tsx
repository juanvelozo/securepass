import { AnimatePresence, Variant, Variants, motion } from 'framer-motion'
import { MouseEventHandler, ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const ToggleButton = ({
  label,
  toggled,
  onClick,
  backgroundColor = { off: 'rgb(156 163 175)', on: 'rgb(74 222 128)' },
  textColor = '#fff',
  isInteractive = false,
  onInteractedLabel,
  fullWidth = false,
  className,
}: IToggleButton): JSX.Element => {
  //states
  const [interacted, setInteracted] = useState<boolean>(false)

  //constants
  const container: Variants | undefined = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: (i = 1) => ({
      scale: 1,
      opacity: 1,
      transition: { staggerChildren: 0.0224, delayChildren: i * 0.2 },
    }),
  }
  const animate: Variant = {
    backgroundColor: toggled ? backgroundColor.on : backgroundColor.off,
    color: textColor,
    scale: 1,
    opacity: 1,
  }
  const animateInteractive: Variant = {
    backgroundColor: interacted ? backgroundColor.on : backgroundColor.off,
    color: textColor,
    scale: 1,
    opacity: 1,
  }

  //functions
  function handleAction(e: any) {
    onClick(e)
    if (isInteractive) {
      setInteracted(true)
      setTimeout(() => {
        setInteracted(false)
      }, 1000)
    }
  }
  //render
  return (
    <AnimatePresence initial={false}>
      <motion.button
        variants={container}
        disabled={interacted}
        whileTap={{ scale: 0.9 }}
        whileHover={{ opacity: 0.9 }}
        animate={isInteractive ? animateInteractive : animate}
        className={twMerge(
          `${textColor} rounded-lg px-2 py-1 ${
            fullWidth ? 'w-full' : 'w-min'
          } truncate flex justify-center gap-2 items-center`,
          className
        )}
        onClick={handleAction}
        transition={{ duration: 0.165 }}
        initial={{ scale: 0, opacity: 0 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        {interacted ? onInteractedLabel : label}
      </motion.button>
    </AnimatePresence>
  )
}
interface IToggleButton {
  toggled?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  label: ReactNode
  onInteractedLabel?: ReactNode
  isInteractive?: boolean
  fullWidth?: boolean
  backgroundColor?: {
    on?: string
    off?: string
  }
  className?: string
  textColor?: string
}
