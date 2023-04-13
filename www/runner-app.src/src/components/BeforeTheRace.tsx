import runner from "../assets/runner.svg";

type Props = {
  dayDifference: number;
};

const BeforeTheRace = (props: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 justify-center">
        {props.dayDifference
          .toString()
          .split("")
          .map((day) => (
            <div
              key={`${Math.random()}-${day}`}
              className="px-5 py-5 bg-blue-primary text-5xl text-white font-bold rounded-lg"
            >
              {day}
            </div>
          ))}

        <span className="text-4xl text-blue-secondary font-bold ml-2">
          Days to go!
        </span>
      </div>

      <img src={runner} alt="Runner" className="w-full mt-auto" />
    </div>
  );
};

export default BeforeTheRace;
