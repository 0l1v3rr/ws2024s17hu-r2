export const leadingZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export const formatTime = (date: Date, seconds: boolean = false) => {
  return `${leadingZero(date.getHours())}:${leadingZero(date.getMinutes())}${
    seconds ? `:${leadingZero(date.getSeconds())}` : ""
  }`;
};

export const differenceInDays = (startingDate: Date, finishDate: Date) => {
  const diff = finishDate.getTime() - startingDate.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
};

export const differenceInMinutes = (startingDate: Date, finishDate: Date) => {
  return (
    finishDate.getHours() * 60 +
    finishDate.getMinutes() -
    (startingDate.getHours() * 60 + startingDate.getMinutes())
  );
};
