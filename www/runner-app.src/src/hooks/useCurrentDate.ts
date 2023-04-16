import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useCurrentDate = (): Date => {
  const [params] = useSearchParams();

  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const fakeDate = params.get("fakeDate");
    if (fakeDate !== null) {
      setDate(new Date(fakeDate));
      return;
    }

    // if the fakeDate is not given via the URL, continuously update the real date
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [params]);

  return date;
};
