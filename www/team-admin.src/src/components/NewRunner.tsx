import { useState } from "react";

type Props = {
  createRunner: (firstName: string, lastName: string, token: string) => void;
};

const NewRunner = ({ createRunner }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [speed, setSpeed] = useState("");

  return (
    <tr>
      <td className="border-r-2 border-black text-left px-4 py-1">
        <input
          aria-label="First name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-0 bg-transparent outline-none border-2 border-black 
            rounded-sm px-1 w-full"
        />
      </td>

      <td className="border-r-2 border-black text-left px-4 py-1">
        <input
          aria-label="Last name"
          value={lastName}
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          className="p-0 bg-transparent outline-none border-2 border-black 
            rounded-sm px-1 w-full"
        />
      </td>

      <td className="border-r-2 border-black text-left px-4 py-1">
        <input
          aria-label="Time"
          value={speed}
          type="time"
          onChange={(e) => setSpeed(e.target.value)}
          className="p-0 bg-transparent outline-none border-2 border-black 
            rounded-sm px-1 w-full"
        />
      </td>

      <td className="border-r-2 border-black"></td>

      <td className="py-1 flex items-center justify-center gap-2 w-full px-6">
        <button
          type="button"
          aria-label="Add new runner"
          onClick={() => {
            createRunner(firstName, lastName, speed);
            setFirstName("");
            setLastName("");
            setSpeed("");
          }}
          className="bg-zinc-300 px-2 py-1 leading-none rounded-full 
            font-semibold hover:bg-zinc-400 transition-all ml-auto"
        >
          <i className="fa fa-plus text-sm"></i>
        </button>
      </td>
    </tr>
  );
};

export default NewRunner;
