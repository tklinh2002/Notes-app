import { PasswordInputProps } from "../typeComponent";

const PasswordInput = ({
  onChange,
  placeholder,
  value,
}: PasswordInputProps) => {
  return (
    <input
      className="input-box"
      id="password"
      type="password"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
export default PasswordInput;
