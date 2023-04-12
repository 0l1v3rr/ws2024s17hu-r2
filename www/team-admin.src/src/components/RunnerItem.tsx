import { useState } from "react";
import { Runner } from "../types";
import axios from "axios";

type Props = {
  runner: Runner;
  token: string;
  teamId: number;
  deleteRunner: (id: number) => void;
};

const RunnerItem = ({ runner, token, teamId, deleteRunner }: Props) => {
  const [firstName, setFirstName] = useState(runner.firstName);
  const [lastName, setLastName] = useState(runner.lastName);
  const [speed, setSpeed] = useState(runner.speed);

  const save = () => {
    axios.put(
      `http://backend-2.localhost/api/v1/teams/${teamId}/runners/${runner.id}`,
      { firstName, lastName, speed },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <tr>
      <td className="border-r-2 border-black text-left px-4 py-1">
        <input
          aria-label="First name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-0 bg-transparent outline-none border-none w-full"
        />
      </td>

      <td className="border-r-2 border-black text-left px-4 py-1">
        <input
          aria-label="Last name"
          value={lastName}
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          className="p-0 bg-transparent outline-none border-none w-full"
        />
      </td>

      <td className="border-r-2 border-black text-left px-4 py-1">
        <input
          aria-label="Time"
          value={speed}
          type="time"
          onChange={(e) => setSpeed(e.target.value)}
          className="p-0 bg-transparent outline-none border-none w-full"
        />
      </td>

      <td className="border-r-2 border-black text-left px-4 py-1">
        {runner.token}
      </td>

      <td className="py-1 flex items-center justify-center gap-2 w-full">
        <button
          aria-label="Copy token"
          type="button"
          onClick={() => navigator.clipboard.writeText(runner.token)}
          className="bg-zinc-300 px-2 py-1 leading-none rounded-full 
            font-semibold hover:bg-zinc-400 transition-all"
        >
          <i className="fa fa-copy text-sm"></i>
        </button>

        <button
          aria-label="Save runner"
          type="button"
          onClick={save}
          className="bg-zinc-200 px-2 py-1 leading-none rounded-full 
            font-semibold hover:bg-zinc-300 transition-all"
        >
          <i className="fa fa-save text-sm"></i>
        </button>

        <button
          aria-label="Delete runner"
          type="button"
          onClick={() => deleteRunner(runner.id)}
          className="bg-red-200 px-2 py-1 leading-none rounded-full 
            font-semibold hover:bg-red-300 transition-all text-red-800"
        >
          <i className="fa fa-trash-alt text-sm"></i>
        </button>
      </td>
    </tr>
  );
};

export default RunnerItem;
