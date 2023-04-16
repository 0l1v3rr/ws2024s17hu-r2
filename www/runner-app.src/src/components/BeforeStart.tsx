import { Runner } from "../types";
import { dateDifference, formatTime } from "../utils";
import axios from "axios";
import Button from "./ui/Button";
import RunnerCard from "./ui/RunnerCard";
import RunInfo from "./ui/RunInfo";
import { useNextRun } from "../hooks/useNextRun";

type Props = {
  runner: Runner;
  startingTime: Date;
  currentDate: Date;
  startRace: () => void;
};

const BeforeStart = ({
  startingTime,
  runner,
  currentDate,
  startRace,
}: Props) => {
  const { nextRun } = useNextRun(runner.token);
  const iAmTheOneWhoRunsFirst = nextRun?.previousRunner === null;

  const difference = dateDifference(
    currentDate,
    new Date(nextRun?.plannedStartTime ?? "")
  );

  const startHandover = async () => {
    // if it's not the first stage, he/she cannot start the run
    if (nextRun === undefined) return;
    if (nextRun.stage.id !== 1) return;

    await axios.post(
      "http://backend-2.localhost/api/v1/handover/start",
      {
        stageId: nextRun.stage.id,
        time: currentDate.toISOString(),
      },
      { headers: { Authorization: `Bearer ${runner.token}` } }
    );

    startRace();
  };

  return (
    <>
      <div className="bg-gradient-to-r from-pink to-purple px-4 py-3 rounded-xl text-white font-semibold text-xl">
        Race begins at {formatTime(startingTime)}!
      </div>

      <RunInfo
        displayTimeUntilHandover={!iAmTheOneWhoRunsFirst}
        time={difference}
        distance={nextRun?.stage.distance ?? 0}
      />

      {/* previous runner */}
      <RunnerCard
        runner={nextRun?.previousRunner}
        location={nextRun?.stage.startingLocation}
        time={new Date(nextRun?.plannedStartTime ?? "")}
        userAlign="left"
      >
        <Button
          disabled={!iAmTheOneWhoRunsFirst}
          onClick={startHandover}
          label={iAmTheOneWhoRunsFirst ? "Start race" : "Handover now"}
        />
      </RunnerCard>

      {/* next runner */}
      <RunnerCard
        runner={nextRun?.nextRunner}
        location={nextRun?.stage.arrivalLocation}
        time={new Date(nextRun?.plannedFinishTime ?? "")}
        userAlign="right"
      >
        <Button disabled label="Handover now" />
      </RunnerCard>
    </>
  );
};

export default BeforeStart;
