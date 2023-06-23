import React, { CSSProperties } from 'react'

interface Props {
  bgcolor?: string
  completed: number
}

const ProgressBar = ({ bgcolor, completed }: Props) => {
  const fillerStyles: CSSProperties = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  }

  return (
    <div className="w-[100%] h-4 bg-white rounded-b-full m-0">
      <div
        style={fillerStyles}
        className={completed > 80 ? 'rounded-b-full' : 'rounded-bl-full'}
      />
    </div>
  )
}

export default ProgressBar
