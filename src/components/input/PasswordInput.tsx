interface PasswordInputProps {
  password: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}
const PasswordInput = ({
  password,
  onChange,
  placeholder,
}: PasswordInputProps) => {
  return (
    <input
      type="text"
      value={password}
      onChange={onChange}
      className="bg-gray-900 p-5 text-2xl tracking-[.1em] rounded-xl w-full text-white ring-0 select-none"
      placeholder={placeholder}
    />
  )
}

export default PasswordInput
