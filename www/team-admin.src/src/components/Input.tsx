import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...props }: Props) => {
  return (
    <input
      className="w-full border-2 border-black rounded-md outline-none py-1 px-3"
      {...props}
    />
  );
};

export default Input;
