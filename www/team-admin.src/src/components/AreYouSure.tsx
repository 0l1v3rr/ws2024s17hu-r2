import axios from "axios";

type Props = {
  token: string;
  logout: () => void;
  teamId: number;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

const AreYouSure = ({ logout, setIsOpen, ...props }: Props) => {
  const deleteTeam = async () => {
    await axios.delete(
      `http://backend-2.localhost/api/v1/teams/${props.teamId}`,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    logout();
    setIsOpen(false);
  };

  return props.isOpen ? (
    <div
      className="z-20 bg-white border-2 border-black 
        rounded-md absolute left-1/2 top-1/2 -translate-x-1/2 
        -translate-y-1/2 px-4 py-2 shadow-md flex flex-col gap-3"
    >
      <h1 className="text-3xl font-semibold text-center">Are you sure?</h1>

      <p>
        If you click on the delete button, your team and all runners belonging
        to your team will be deleted.
      </p>

      <div className="flex justify-between">
        <button
          type="button"
          className="outline-none bg-transparent border-0 hover:underline"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={deleteTeam}
          className="border-2 border-black bg-zinc-300 
            px-4 py-2 leading-none rounded-sm font-semibold 
            hover:bg-zinc-400 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  ) : null;
};

export default AreYouSure;
