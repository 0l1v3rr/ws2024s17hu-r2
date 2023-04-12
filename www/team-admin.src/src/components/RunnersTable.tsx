import { useEffect, useState } from "react";
import { Runner } from "../types";
import axios from "axios";
import RunnerItem from "./RunnerItem";
import NewRunner from "./NewRunner";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Props = {
  token: string;
  teamId: number;
};

const RunnersTable = ({ teamId, token }: Props) => {
  const [runners, setRunners] = useState<Runner[]>([]);

  // make sure to increment/decrement it when needed
  const [addedRunnerCount, setAddedRunnerCount] = useLocalStorage(
    "runnerCount",
    runners.length
  );

  useEffect(() => {
    axios
      .get<Runner[]>(
        `http://backend-2.localhost/api/v1/teams/${teamId}/runners`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setRunners(res.data);
        setAddedRunnerCount(res.data.length);
      });
  }, [teamId, token, setAddedRunnerCount]);

  const deleteRunner = (id: number) => {
    axios
      .delete(
        `http://backend-2.localhost/api/v1/teams/${teamId}/runners/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setRunners((prev) => prev.filter((x) => x.id !== id));
        setAddedRunnerCount((prev) => prev - 1);
      });
  };

  const createRunner = (firstName: string, lastName: string, speed: string) => {
    if (addedRunnerCount >= 10) return;

    axios
      .post<Runner>(
        `http://backend-2.localhost/api/v1/teams/${teamId}/runners`,
        { firstName, lastName, speed },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setRunners((prev) => [...prev, res.data]);
        setAddedRunnerCount((prev) => prev + 1);
      });
  };

  return (
    <section className="flex flex-col gap-2 w-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Runners</h1>
        <a
          href="http://stage-planner.localhost"
          target="_blank"
          rel="noreferrer"
          className="border-2 border-black bg-zinc-300 
            px-4 py-2 leading-none rounded-sm font-semibold 
            hover:bg-zinc-400 transition-all"
        >
          <i className="fa fa-tasks mr-2 text-sm"></i>
          Stage Planner
        </a>
      </div>

      <table className="border-2 border-black">
        <thead>
          <tr className="border-b-2 border-black">
            {["First Name", "Last Name", "Speed", "Token", "Actions"].map(
              (title) => (
                <th
                  key={title}
                  className="border-r-2 border-black text-left px-4 py-1"
                >
                  {title}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {runners.map((runner) => (
            <RunnerItem
              runner={runner}
              teamId={teamId}
              token={token}
              key={runner.id}
              deleteRunner={deleteRunner}
            />
          ))}
          {addedRunnerCount < 10 && <NewRunner createRunner={createRunner} />}
        </tbody>
      </table>
    </section>
  );
};

export default RunnersTable;
