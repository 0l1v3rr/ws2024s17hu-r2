import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { Runner } from "./types";
import Admin from "./pages/Admin";
import axios from "axios";
import { LoginResponse } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";

const App = () => {
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [admin, setAdmin] = useState<Runner | null>(null);

  useEffect(() => {
    if (token === null) return;
    if (admin !== null) return;

    axios
      .post<LoginResponse>("http://backend-2.localhost/api/v1/login", {
        token,
      })
      .then((res) => {
        const { data } = res;
        if (data.status === "success") {
          if (!data.user.isAdmin) {
            setAdmin(null);
            setToken(null);
            return;
          }

          setAdmin(data.user);
          setToken(data.user.token);
        }
      })
      .catch(() => {
        setAdmin(null);
        setToken(null);
      });
  }, [token, admin, setToken]);

  const logout = () => {
    setAdmin(null);
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            admin === null || token === null ? (
              <Navigate to="/login" />
            ) : (
              <Admin token={token} logout={logout} teamId={admin.teamId} />
            )
          }
        />
        <Route
          path="/login"
          element={
            admin === null || token === null ? (
              <Login setToken={(t) => setToken(t)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
