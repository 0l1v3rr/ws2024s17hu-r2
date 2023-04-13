import React from "react";
import { NextRun, Runner } from "../types";
import { leadingZero } from "../utils";

type Props = {
  nextRun: NextRun;
  runner: Runner;
  startingTime: Date;
  currentDate: Date;
};

const BeforeStart = ({ nextRun, startingTime, runner, currentDate }: Props) => {
  const iAmTheOneWhoRunsFirst = nextRun.nextRunner?.id === runner.id;

  const difference = new Date(startingTime.valueOf() - currentDate.valueOf());

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
          Your first {nextRun.stage.distance}km run 🏃
        </span>

        {!iAmTheOneWhoRunsFirst && (
          <span className="text-sm text-blue-primary">
            {leadingZero(difference.getHours())}:
            {leadingZero(difference.getMinutes())}:
            {leadingZero(difference.getSeconds())} UNTIL HANDOVER
          </span>
        )}
      </div>

      <div className="bg-white-primary px-4 py-2 rounded-xl flex flex-col gap-4">
        <div className="text-base text-black-primary font-bold">
          {nextRun.stage.startingLocation}
        </div>

        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2 border border-blue-secondary 
              rounded-full text-blue-secondary px-3 py-1"
          >
            <i className="far fa-user" />
            <span>
              {nextRun.nextRunner?.firstName} {nextRun.nextRunner?.lastName}
            </span>
          </div>

          <span
            className={`text-3xl text-black font-extrabold ${
              iAmTheOneWhoRunsFirst ? "mx-auto" : ""
            }`}
          >
            {leadingZero(startingTime.getHours())}:
            {leadingZero(startingTime.getMinutes())}
          </span>
        </div>

        <button
          disabled={!iAmTheOneWhoRunsFirst}
          className="bg-blue-secondary rounded-full w-full text-white px-4 py-2 
            disabled:bg-zinc-300 disabled:text-zinc-500"
        >
          <i className="far fa-check-circle mr-4" />
          {iAmTheOneWhoRunsFirst ? "Start race" : "Handover now"}
        </button>
      </div>
    </>
  );
};

export default BeforeStart;
