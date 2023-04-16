import { formatTime } from "../../utils";

type Props =
  | {
      displayTimeUntilHandover: true;
      time: Date;
      distance: number;
    }
  | {
      displayTimeUntilHandover: false;
      distance: number;
    };

const RunInfo = (props: Props) => {
  return (
    <div className="flex flex-col">
      <span className="font-bold text-black-secondary">
        Your first {props.distance} km run 🏃
      </span>

      {/* this value won't change continuously if the date is provided via the fakeDate query param */}
      {props.displayTimeUntilHandover && (
        <span className="text-sm text-blue-primary">
          {formatTime(props.time, true)} UNTIL HANDOVER
        </span>
      )}
    </div>
  );
};

export default RunInfo;
