import { useEffect, useState } from "react";
import { Me, NextRun, Runner } from "../types";
import { formatTime, leadingZero } from "../utils";
import axios from "axios";

type Props = {
  me: Me;
  runner: Runner;
  startingTime: Date;
  currentDate: Date;
};

const BeforeStart = ({ startingTime, runner, currentDate }: Props) => {
  const [nextRun, setNextRun] = useState<NextRun>();
  const iAmTheOneWhoRunsFirst = nextRun?.previousRunner === null;

  const difference = new Date(
    new Date(nextRun?.plannedStartTime ?? "").valueOf() - currentDate.valueOf()
  );

  useEffect(() => {
    axios
      .get<NextRun>("http://backend-2.localhost/api/v1/nextRun", {
        headers: { Authorization: `Bearer ${runner.token}` },
      })
      .then((res) => setNextRun(res.data));
  }, [runner.token]);

  const startHandover = async () => {
    if (nextRun === undefined) return;

    await axios.post(
      "http://backend-2.localhost/api/v1/handover/start",
      {
        stageId: nextRun.stage.id,
        time: currentDate.toISOString(),
      },
      { headers: { Authorization: `Bearer ${runner.token}` } }
    );
  };

  return (
    <>
      <div
        className="bg-gradient-to-r from-pink to-purple px-4 py-3 
          rounded-xl text-white font-semibold text-xl"
      >
        Race begins at {leadingZero(startingTime.getHours())}:
        {leadingZero(startingTime.getMinutes())}!
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-black-secondary">
          Your first {nextRun?.stage.distance}km run 🏃
        </span>

        {!iAmTheOneWhoRunsFirst && (
          <span className="text-sm text-blue-primary">
            {formatTime(difference, true)} UNTIL HANDOVER
          </span>
        )}
      </div>

      <div className="bg-white-primary px-4 py-2 rounded-xl flex flex-col gap-4">
        <div className="text-base text-black-primary font-bold">
          {nextRun?.stage.startingLocation}
        </div>

        <div className="flex justify-between items-center">
          {!iAmTheOneWhoRunsFirst && (
            <div
              className="flex items-center gap-2 border border-blue-secondary 
              rounded-full text-blue-secondary px-3 py-1"
            >
              <i className="far fa-user" />
              <span>
                {nextRun?.previousRunner?.firstName}{" "}
                {nextRun?.previousRunner?.lastName}
              </span>
            </div>
          )}

          <span
            className={`text-3xl text-black font-extrabold ${
              iAmTheOneWhoRunsFirst ? "mx-auto" : ""
            }`}
          >
            {formatTime(new Date(nextRun?.plannedStartTime ?? ""))}
          </span>
        </div>

        <button
          disabled={!iAmTheOneWhoRunsFirst}
          onClick={() => startHandover()}
          className="bg-blue-secondary rounded-full w-full text-white px-4 py-2 
            disabled:bg-zinc-300 disabled:text-zinc-500"
        >
          <i className="far fa-check-circle mr-4" />
          {iAmTheOneWhoRunsFirst ? "Start race" : "Handover now"}
        </button>
      </div>

      <div className="bg-white-primary px-4 py-2 rounded-xl flex flex-col gap-4">
        <div className="text-base text-black-primary font-bold">
          {nextRun?.stage.arrivalLocation}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-3xl text-black font-extrabold">
            {formatTime(new Date(nextRun?.plannedFinishTime ?? ""))}
          </span>

          <div
            className="flex items-center gap-2 border border-blue-secondary 
              rounded-full text-blue-secondary px-3 py-1"
          >
            <i className="far fa-user" />
            <span>
              {nextRun?.nextRunner?.firstName} {nextRun?.nextRunner?.lastName}
            </span>
          </div>
        </div>

        <button
          disabled={true}
          className="bg-blue-secondary rounded-full w-full text-white px-4 py-2 
            disabled:bg-zinc-300 disabled:text-zinc-500"
        >
          <i className="far fa-check-circle mr-4" />
          Handover now
        </button>
      </div>
    </>
  );
};

export default BeforeStart;
