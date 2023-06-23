interface PasswordInputProps {
  password: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
const PasswordInput = ({ password, onChange, placeholder }: PasswordInputProps) => {
  return (
    <input
      type="text"
      value={password}
      onChange={onChange}
      className="bg-gray-50 text-black p-2 rounded-t-xl w-full"
      placeholder={placeholder}
    />
  )
}

export default PasswordInput;
