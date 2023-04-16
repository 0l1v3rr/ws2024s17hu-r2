import axios from "axios";
import { CurrentRunner, MayBeFinished } from "../types";
import { useState, useEffect, useCallback } from "react";

type ReturnType = {
  currentRunner: CurrentRunner | undefined;
  finished: boolean;
  pollCurrentRunner: () => void;
};

export const useCurrentRunner = (token: string): ReturnType => {
  const [currentRunner, setCurrentRunner] = useState<CurrentRunner>();
  const [finished, setFinished] = useState<boolean>(false);

  const pollCurrentRunner = useCallback(() => {
    axios
      .get<MayBeFinished<CurrentRunner>>(
        "http://backend-2.localhost/api/v1/currentRunner",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        const { data } = res;
        if ("finished" in data) {
          setFinished(true);
          return;
        }

        setCurrentRunner(res.data as CurrentRunner);
      });
  }, [token]);

  // update the currentRunner every 5 seconds
  useEffect(() => {
    pollCurrentRunner();

    const interval = setInterval(pollCurrentRunner, 5000);
    return () => clearInterval(interval);
  }, [pollCurrentRunner]);

  return { pollCurrentRunner, currentRunner, finished };
};
