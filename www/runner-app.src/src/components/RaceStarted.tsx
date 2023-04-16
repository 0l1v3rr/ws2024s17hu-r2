import { Runner } from "../types";
import axios from "axios";
import Button from "./ui/Button";
import CurrentRunnerInfo from "./ui/CurrentRunnerInfo";
import RunnerCard from "./ui/RunnerCard";
import RunInfo from "./ui/RunInfo";
import { useCurrentRunner } from "../hooks/useCurrentRunner";
import { useNextRun } from "../hooks/useNextRun";
import { dateDifference } from "../utils";
import Done from "./ui/Done";

type Props = {
  runner: Runner;
  currentDate: Date;
};

const RaceStarted = ({ runner, currentDate }: Props) => {
  const {
    nextRun,
    pollNextRun,
    finished: nextRunFinished,
  } = useNextRun(runner.token);

  const {
    currentRunner,
    pollCurrentRunner,
    finished: currentRunnerFinished,
  } = useCurrentRunner(runner.token);

  const scheduleDifference = new Date(
    currentDate.getTime() -
      (currentDate.getTime() + (currentRunner?.scheduleDifference ?? 0) * 1000)
  );

  const difference = dateDifference(
    currentDate,
    new Date(nextRun?.plannedStartTime ?? "")
  );

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

    pollCurrentRunner();
    pollNextRun();
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

    pollCurrentRunner();
    pollNextRun();
  };

  return (
    <>
      <CurrentRunnerInfo
        plannedFinishTime={scheduleDifference}
        currentRunner={currentRunner}
        finished={currentRunnerFinished}
      />

      {nextRunFinished || currentRunnerFinished ? (
        <Done
          text={
            nextRunFinished ? "You are done!" : "All done! Congratulations!"
          }
        />
      ) : (
        <>
          <RunInfo
            displayTimeUntilHandover={true}
            time={difference}
            distance={nextRun?.stage.distance ?? 0}
          />

          {/* if there's no previousRunner, this card is not displayed */}
          {nextRun?.previousRunner !== null && (
            <RunnerCard
              runner={nextRun?.previousRunner}
              location={nextRun?.stage.startingLocation}
              time={new Date(nextRun?.plannedStartTime ?? "")}
              userAlign="left"
            >
              <Button
                label="Handover now"
                disabled={!nextRun?.canStart}
                onClick={handoverStart}
              />
            </RunnerCard>
          )}

          {/* next runner */}
          <RunnerCard
            runner={nextRun?.nextRunner}
            location={nextRun?.stage.arrivalLocation}
            time={new Date(nextRun?.plannedFinishTime ?? "")}
            userAlign="right"
          >
            <Button
              label="Handover now"
              onClick={handoverFinish}
              disabled={currentRunner?.runner.id !== runner.id}
            />
          </RunnerCard>
        </>
      )}
    </>
  );
};

export default RaceStarted;
