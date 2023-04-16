import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, ...props }: Props) => {
  return (
    <button
      {...props}
      className="bg-blue-secondary rounded-full w-full text-white px-4 py-2 disabled:bg-zinc-300 disabled:text-zinc-500"
    >
      <i className="far fa-check-circle mr-4" />
      {label}
    </button>
  );
};

export default Button;
