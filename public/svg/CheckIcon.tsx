import { Variant, motion } from 'framer-motion'
interface Props {
  interaction?: boolean
}
export const CheckIcon = ({ interaction }: Props): JSX.Element => {
  //constants
  const animate: Variant = {
    pathLength: interaction ? 1 : 0,
  }
  //states

  //hooks

  //functions

  //effects

  //render

  return (
    <svg
      id="changeColor"
      fill="#DC7633"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      viewBox="0 0 320 320"
      height="24"
      version="1.0"
    >
      <defs />
      <g />
      <g id="inner-icon" className="svgg" transform="translate(90,70) ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="199.8"
          zoomAndPan="magnify"
          viewBox="0 0 30 30.000001"
          height="199.8"
          preserveAspectRatio="xMidYMid meet"
          version="1.0"
          id="IconChangeColor"
          transform="scale(-1, 1)"
        >
          <defs>
            <clipPath id="id1">
              <motion.path
                animate={animate}
                transition={{ duration: 1 }}
                d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 "
                clipRule="nonzero"
                id="mainIconPathAttribute"
                fill="#ffffff"
              />
            </clipPath>
          </defs>
          <g clipPath="url(#id1)">
            <motion.path
              animate={animate}
              transition={{ duration: 1 }}
              fill="#ffffff"
              d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 "
              fillOpacity="1"
              fillRule="nonzero"
              id="mainIconPathAttribute"
            />
          </g>
        </svg>
      </g>
    </svg>
  )
}
