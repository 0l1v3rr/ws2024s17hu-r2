import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LoginResponse, Runner, Team } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import axios from "axios";
import Header from "./components/Header";
import BeforeTheRace from "./components/BeforeTheRace";

const App = () => {
  const [params] = useSearchParams();

  const date = useMemo(() => {
    const fakeDate = params.get("fakeDate");
    return fakeDate !== null ? new Date(fakeDate) : new Date();
  }, [params]);

  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [runner, setRunner] = useState<Runner | null>(null);
  const [team, setTeam] = useState<Team>();

  const dayDifference: number = useMemo(() => {
    const plannedStartingTime = new Date(team?.plannedStartingTime ?? "");
    const diff = plannedStartingTime.getTime() - date.getTime();

    return Math.round(diff / (1000 * 60 * 60 * 24));
  }, [team, date]);

  useEffect(() => {
    // decide which token should be used to log in
    // the token from the query param overrides the token from the local storage
    const tokenToLogIn = params.get("token") ?? token;
    if (tokenToLogIn === null) return;

    axios
      .post<LoginResponse>("http://backend-2.localhost/api/v1/login", {
        token: tokenToLogIn,
      })
      .then((res) => {
        const { data } = res;
        if (data.status === "success") {
          setRunner(data.user);
          setToken(data.user.token);
        }
      })
      .catch(() => {
        setToken(null);
      });
  }, [params, token, setToken]);

  useEffect(() => {
    if (runner === null || token === null) return;

    axios
      .get<Team>(`http://backend-2.localhost/api/v1/teams/${runner.teamId}}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTeam(res.data));
  }, [runner, token]);

  // if a user is not logged in (so the user hasn't provided token or the token is invalid)
  // or the team hasn't been fetched yet
  if (runner === null || !team) return null;

  return (
    <div className="flex flex-col gap-3 w-full h-screen overflow-hidden">
      <Header runnerName={runner.firstName} teamName={team.name} />

      <div className="px-4 h-full">
        {dayDifference > 0 && <BeforeTheRace dayDifference={dayDifference} />}
      </div>
    </div>
  );
};

export default App;
