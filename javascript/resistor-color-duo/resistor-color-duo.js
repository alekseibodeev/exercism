export const decodedValue = ([color1, color2]) => {
  return 10 * COLORS[color1] + COLORS[color2];
};

const COLORS = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};
