import finish from "../../assets/finish.svg";

type Props = {
  text: string;
};

const Done = ({ text }: Props) => {
  return (
    <div className="flex flex-col">
      <span className="font-bold text-black-secondary">
        {text}
        <img src={finish} alt="" className="w-full" />
      </span>
    </div>
  );
};

export default Done;
