import axios from "axios";
import { NextRun, MayBeFinished } from "../types";
import { useState, useEffect, useCallback } from "react";

type ReturnType = {
  nextRun: NextRun | undefined;
  finished: boolean;
  pollNextRun: () => void;
};

export const useNextRun = (token: string): ReturnType => {
  const [nextRun, setNextRun] = useState<NextRun>();
  const [finished, setFinished] = useState<boolean>(false);

  const pollNextRun = useCallback(() => {
    axios
      .get<MayBeFinished<NextRun>>(
        "http://backend-2.localhost/api/v1/nextRun",
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

        setNextRun(data as NextRun);
      });
  }, [token]);

  // update the nextRun every 5 seconds
  useEffect(() => {
    pollNextRun();

    const interval = setInterval(pollNextRun, 5000);
    return () => clearInterval(interval);
  }, [pollNextRun]);

  return { pollNextRun, nextRun, finished };
};
