import { ReactElement } from "react";
import { Runner } from "../../types";
import { formatTime } from "../../utils";

type Props = {
  runner?: Runner | null;
  children: ReactElement;
  location?: string;
  time: Date;
  userAlign: "left" | "right";
};

const RunnerCard = ({ children, userAlign, runner, location, time }: Props) => {
  return (
    <div className="bg-white-primary px-4 py-2 rounded-xl flex flex-col gap-4">
      <div className="text-base text-black-primary font-bold">{location}</div>

      <div
        className={`flex justify-between items-center ${
          userAlign === "right" ? "flex-row-reverse" : ""
        }`}
      >
        {runner !== null && (
          <div className="flex items-center gap-2 border border-blue-secondary rounded-full text-blue-secondary px-3 py-1">
            <i className="far fa-user" />
            <span>
              {runner?.firstName} {runner?.lastName}
            </span>
          </div>
        )}

        <span
          className={`text-3xl text-black font-extrabold ${
            runner === null ? "mx-auto" : ""
          }`}
        >
          {formatTime(time)}
        </span>
      </div>

      {children}
    </div>
  );
};

export default RunnerCard;
