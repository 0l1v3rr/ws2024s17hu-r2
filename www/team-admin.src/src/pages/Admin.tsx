import RunnersTable from "../components/RunnersTable";
import TeamDetails from "../components/TeamDetails";

type Props = {
  token: string;
  logout: () => void;
  teamId: number;
};

const Admin = (props: Props) => {
  return (
    <main className="flex flex-col gap-4 px-4 py-2">
      <TeamDetails
        token={props.token}
        logout={props.logout}
        teamId={props.teamId}
      />

      <div className="w-full h-[2px] bg-black" />

      <RunnersTable token={props.token} teamId={props.teamId} />
    </main>
  );
};

export default Admin;
