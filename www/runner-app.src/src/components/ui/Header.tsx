type Props = {
  teamName: string;
  runnerName: string;
};

const Header = (props: Props) => {
  return (
    <header className="flex flex-col gap-4">
      <div className="text-center px-4 py-2 text-xl font-semibold bg-blue-primary text-white">
        UB 2023 - {props.teamName}
      </div>

      <div className="px-4 py-2 flex flex-col gap-1">
        <h1 className="text-3xl font-bold">👋 Hi {props.runnerName}!</h1>
        <p>Have a good running!</p>
      </div>
    </header>
  );
};

export default Header;
