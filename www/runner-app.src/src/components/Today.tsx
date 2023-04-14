import { useState, useEffect } from "react";
import { Me, Runner, Team } from "../types";
import axios from "axios";
import BeforeStart from "./BeforeStart";

type Props = {
  team: Team;
  runner: Runner;
  currentDate: Date;
};

const Today = ({ runner, currentDate }: Props) => {
  const [me, setMe] = useState<Me>();
  const startingTime = new Date(me?.team?.plannedStartingTime ?? "");

  // time difference between the fakeDate and the plannedStartTime in minutes
  const minuteDifference =
    startingTime.getHours() * 60 +
    startingTime.getMinutes() -
    (currentDate.getHours() * 60 + currentDate.getMinutes());

  useEffect(() => {
    axios
      .get<Me>("http://backend-2.localhost/api/v1/me", {
        headers: { Authorization: `Bearer ${runner.token}` },
      })
      .then((res) => setMe(res.data));
  }, [runner.token]);

  // if the nextRun is not loaded yet
  if (me === undefined) return null;

  return (
    <div className="h-full flex flex-col gap-2">
      {minuteDifference > 0 && (
        <BeforeStart
          me={me}
          startingTime={startingTime}
          runner={runner}
          currentDate={currentDate}
        />
      )}
    </div>
  );
};

export default Today;
