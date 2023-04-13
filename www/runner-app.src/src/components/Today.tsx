import { useState, useEffect } from "react";
import { NextRun, Runner, Team } from "../types";
import axios from "axios";
import BeforeStart from "./BeforeStart";

type Props = {
  team: Team;
  runner: Runner;
  currentDate: Date;
};

const Today = ({ runner, currentDate }: Props) => {
  const [nextRun, setNextRun] = useState<NextRun>();
  const startingTime = new Date(nextRun?.plannedStartTime ?? "");

  // time difference between the fakeDate and the plannedStartTime in minutes
  const minuteDifference =
    startingTime.getHours() * 60 +
    startingTime.getMinutes() -
    (currentDate.getHours() * 60 + currentDate.getMinutes());

  useEffect(() => {
    axios
      .get<NextRun>("http://backend-2.localhost/api/v1/nextRun", {
        headers: { Authorization: `Bearer ${runner.token}` },
      })
      .then((res) => setNextRun(res.data));
  }, [runner.token]);

  // if the nextRun is not loaded yet
  if (nextRun === undefined) return null;

  return (
    <div className="h-full flex flex-col gap-2">
      {minuteDifference > 0 && (
        <BeforeStart
          nextRun={nextRun}
          startingTime={startingTime}
          runner={runner}
          currentDate={currentDate}
        />
      )}
    </div>
  );
};

export default Today;
