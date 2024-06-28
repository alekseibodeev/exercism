const SECONDS_IN_EARTH_YEAR = 31_557_600;
const PERIODS = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
};
const toFixedTwo = (num) => Math.round(num * 100) / 100;

export const age = (planet, seconds) => {
  return toFixedTwo(seconds / SECONDS_IN_EARTH_YEAR / PERIODS[planet]);
};
