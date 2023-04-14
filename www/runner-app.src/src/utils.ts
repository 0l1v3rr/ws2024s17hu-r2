export const leadingZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export const formatTime = (date: Date, seconds: boolean = false) => {
  return `${leadingZero(date.getHours())}:${leadingZero(date.getMinutes())}${
    seconds ? `:${leadingZero(date.getSeconds())}` : ""
  }`;
};
