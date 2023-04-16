import { CurrentRunner } from "../../types";
import { formatTime } from "../../utils";

type Props = {
  currentRunner?: CurrentRunner;
  plannedFinishTime: Date;
  finished: boolean;
};

const CurrentRunnerInfo = ({
  currentRunner,
  plannedFinishTime,
  finished,
}: Props) => {
  return (
    <div
      className="bg-gradient-to-r from-pink to-purple px-5 py-3 
        rounded-xl text-white font-semibold text-xl flex flex-col gap-3"
    >
      {finished ? (
        "Race finished!"
      ) : (
        <>
          <div className="flex gap-4 items-center">
            <i className="far fa-user" />
            {currentRunner?.runner.firstName} {currentRunner?.runner.lastName}
          </div>

          <div className="flex gap-4 items-center">
            <i className="fas fa-map-marker-alt" />
            <div className="flex flex-col text-[.8rem] gap-2">
              <div className="leading-none">
                {currentRunner?.stage.startingLocation}
              </div>
              <div className="leading-none">
                {currentRunner?.stage.arrivalLocation}
              </div>
            </div>

            <div className="border-l border-white text-sm px-2">
              {currentRunner?.stage.distance} km
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <i className="far fa-clock" />
            <div className="flex flex-col gap-2">
              <div className="leading-none">
                {formatTime(plannedFinishTime, true)}
              </div>
              <div className="leading-none text-[.8rem]">
                {(currentRunner?.scheduleDifference ?? 0) >= 0
                  ? "Behind schedule"
                  : "Ahead of schedule"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentRunnerInfo;
