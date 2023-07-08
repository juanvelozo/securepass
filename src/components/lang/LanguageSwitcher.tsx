/**
 *React component for a language switcher.
 *@description A label with two options for switching languages.
 */

export const LanguageSwitch = (): JSX.Element => {
  //States
  //hooks
  //functions
  //DOM

  return (
    <label className="inline-flex items-center cursor-pointer dark:text-gray-800">
      <input
        id="Toggle3"
        type="checkbox"
        className="hidden peer"
        control-id="ControlID-38"
      />
      <span className="p-2 dark:bg-gray-400 peer-checked:dark:bg-gray-300">
        Español
      </span>
      <span className="p-2  dark:bg-gray-300 peer-checked:dark:bg-gray-400">
        English
      </span>
    </label>
  )
}
