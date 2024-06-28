const SECONDS_IN_GIGASECOND = 1_000_000_000;
const MILLISECONDS_IN_SECOND = 1_000;

export const gigasecond = (date) => {
  const milliseconds = date.getTime();
  return new Date(
    milliseconds + SECONDS_IN_GIGASECOND * MILLISECONDS_IN_SECOND
  );
};
