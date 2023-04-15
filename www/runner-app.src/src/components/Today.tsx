import { useState, useEffect } from "react";
import { Me, Runner, Team } from "../types";
import axios from "axios";
import BeforeStart from "./BeforeStart";
import RaceStarted from "./RaceStarted";

type Props = {
  team: Team;
  runner: Runner;
  currentDate: Date;
};

const Today = ({ runner, currentDate }: Props) => {
  const [me, setMe] = useState<Me>();
  const startingTime = new Date(me?.team?.plannedStartingTime ?? "");

  useEffect(() => {
    axios
      .get<Me>("http://backend-2.localhost/api/v1/me", {
        headers: { Authorization: `Bearer ${runner.token}` },
      })
      .then((res) => setMe(res.data));
  }, [runner.token]);

  // if the me is not loaded yet
  if (me === undefined) return null;

  return (
    <div className="h-full flex flex-col gap-2">
      {me?.team.startingTime !== null ? (
        <RaceStarted runner={runner} currentDate={currentDate} />
      ) : (
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
