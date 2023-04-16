import { useState } from "react";
import { Runner, Team } from "../types";
import BeforeStart from "./BeforeStart";
import RaceStarted from "./RaceStarted";

type Props = {
  team: Team;
  runner: Runner;
  currentDate: Date;
};

const Today = ({ runner, currentDate, team }: Props) => {
  const startingTime = new Date(team.startingTime ?? team.plannedStartingTime);

  // if the startingTime is null, the race has already started
  const [raceStarted, setRaceStarted] = useState<boolean>(
    team.startingTime !== null
  );

  return (
    <div className="h-full flex flex-col gap-2">
      {raceStarted ? (
        <RaceStarted runner={runner} currentDate={currentDate} />
      ) : (
        <BeforeStart
          startingTime={startingTime}
          runner={runner}
          currentDate={currentDate}
          startRace={() => setRaceStarted(true)}
        />
      )}
    </div>
  );
};

export default Today;
