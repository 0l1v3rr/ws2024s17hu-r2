import { useEffect, useState, useMemo, useCallback } from "react";
import { CurrentRunner, NextRun, Runner } from "../types";
import axios from "axios";
import { formatTime } from "../utils";

type Props = {
  runner: Runner;
  currentDate: Date;
};

const RaceStarted = ({ runner, currentDate }: Props) => {
  const [currentRunner, setCurrentRunner] = useState<CurrentRunner>();
  const [nextRun, setNextRun] = useState<NextRun>();

  const plannedFinishTime = useMemo(() => {
    if (nextRun?.plannedFinishTime === undefined) return new Date();

    const date = new Date(nextRun.plannedFinishTime);
    if (currentRunner === undefined) return date;

    date.setSeconds(date.getSeconds() + currentRunner.scheduleDifference);
    return date;
  }, [currentRunner, nextRun?.plannedFinishTime]);

  const difference = new Date(
    new Date(nextRun?.plannedStartTime ?? "").valueOf() - currentDate.valueOf()
  );

  const apiCalls = useCallback(() => {
    axios
      .get<CurrentRunner>("http://backend-2.localhost/api/v1/currentRunner", {
        headers: { Authorization: `Bearer ${runner.token}` },
      })
      .then((res) => setCurrentRunner(res.data));

    axios
      .get<NextRun>("http://backend-2.localhost/api/v1/nextRun", {
        headers: { Authorization: `Bearer ${runner.token}` },
      })
      .then((res) => setNextRun(res.data));
  }, [runner.token]);

  useEffect(() => {
    apiCalls();

    const interval = setInterval(() => apiCalls(), 5000);
    return () => clearInterval(interval);
  }, [runner.token, apiCalls]);

  const handoverStart = async () => {
    if (nextRun === undefined) return;

    await axios.post(
      "http://backend-2.localhost/api/v1/handover/start",
      {
        stageId: nextRun.stage.id,
        time: currentDate.toISOString(),
      },
      { headers: { Authorization: `Bearer ${runner.token}` } }
    );

    apiCalls();
  };

  const handoverFinish = async () => {
    if (nextRun === undefined) return;

    await axios.post(
      "http://backend-2.localhost/api/v1/handover/finish",
      {
        stageId: nextRun.stage.id,
        time: currentDate.toISOString(),
      },
      { headers: { Authorization: `Bearer ${runner.token}` } }
    );

    apiCalls();
  };

  return (
    <>
      <div
        className="bg-gradient-to-r from-pink to-purple px-5 py-3 
          rounded-xl text-white font-semibold text-xl flex flex-col gap-3"
      >
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
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-black-secondary">
          Your first {nextRun?.stage.distance}km run 🏃
        </span>

        <span className="text-sm text-blue-primary">
          {formatTime(difference, true)} UNTIL HANDOVER
        </span>
      </div>

      <div className="bg-white-primary px-4 py-2 rounded-xl flex flex-col gap-4">
        <div className="text-base text-black-primary font-bold">
          {nextRun?.stage.startingLocation}
        </div>

        <div className="flex justify-between items-center">
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

          <span className="text-3xl text-black font-extrabold">
            {formatTime(new Date(nextRun?.plannedStartTime ?? ""))}
          </span>
        </div>

        <button
          disabled={!nextRun?.canStart}
          onClick={handoverFinish}
          className="bg-blue-secondary rounded-full w-full text-white px-4 py-2 
            disabled:bg-zinc-300 disabled:text-zinc-500"
        >
          <i className="far fa-check-circle mr-4" />
          Handover now
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
          onClick={handoverStart}
          disabled={currentRunner?.runner.id !== runner.id}
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

export default RaceStarted;
