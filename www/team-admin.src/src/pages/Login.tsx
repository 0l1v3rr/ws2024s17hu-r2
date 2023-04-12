import { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { LoginResponse } from "../types";
import { useNavigate } from "react-router-dom";

type Props = {
  setToken: (token: string) => void;
};

const Login = ({ setToken }: Props) => {
  const [loginError, setLoginError] = useState<string | undefined>();
  const [tokenInput, setTokenInput] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (tokenInput.length !== 9) {
      setLoginError("Please provide a valid token!");
      return;
    }

    axios
      .post<LoginResponse>("http://backend-2.localhost/api/v1/login", {
        token: tokenInput,
      })
      .then((res) => {
        const { data } = res;
        if (data.status === "success") {
          if (!data.user.isAdmin) {
            setLoginError("You are not an admin!");
            return;
          }

          navigate("/");
          setToken(data.user.token);
          return;
        }

        setLoginError(data.message);
      })
      .catch(() => setLoginError("Login failed."));
  };

  return (
    <main className="h-screen w-full flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-2 w-80">
        <h1 className="text-3xl font-semibold">Login</h1>
        <span>Login using your token.</span>

        {loginError && (
          <div
            className="px-4 py-1 rounded-md bg-red-500/20 
              text-red-700 border-2 border-black w-full text-center"
          >
            {loginError}
          </div>
        )}

        <Input
          placeholder="Token"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
        />

        <button
          type="button"
          onClick={handleLogin}
          className="border-2 border-black mx-auto bg-zinc-300 
            px-4 py-2 leading-none rounded-sm font-semibold 
            hover:bg-zinc-400 transition-all"
        >
          Login
        </button>
      </div>
    </main>
  );
};

export default Login;
