import { copyToClipboard } from '@/util/copyToClipboard'
import { Variant, motion } from 'framer-motion'
import { useState } from 'react'
import { CheckIcon } from '../../../public/svg/CheckIcon'
import { ClipboardIcon } from '../../../public/svg/ClipboardIcon'

export const CopyToClipboardButton = ({
  copiedStringValue,
}: IcopyToClipboardButton): JSX.Element => {
  //states
  const [interaction, setInteraction] = useState<boolean>(false)

  //constants
  const animate: Variant = {
    backgroundColor: interaction ? 'rgb(74 222 128)' : 'rgb(156 163 175)',
  }
  //hooks

  //functions
  function copyAction() {
    setInteraction(true)
    copyToClipboard(copiedStringValue!)
    setTimeout(() => {
      setInteraction(false)
    }, 1000)
  }
  //effects

  //render

  return (
    <motion.button
      animate={animate}
      whileTap={{ scale: interaction ? 1 : 0.9 }}
      disabled={interaction}
      className={`border-2 text-white border-white rounded-lg px-2 py-1  bg-gray-400 w-full flex justify-center gap-2 items-center`}
      onClick={copyAction}
    >
      {interaction ? 'Copied' : 'Copy to clipboard'}
      {interaction ? (
        <CheckIcon interaction={interaction} />
      ) : (
        <ClipboardIcon />
      )}
    </motion.button>
  )
}
interface IcopyToClipboardButton {
  copiedStringValue: string
}
