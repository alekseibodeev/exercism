const BOARD_SIZE = 64;

/**
 * @param {number} n
 * @returns {bigint}
 */
export const square = (n) => {
  if (n < 1 || n > BOARD_SIZE) {
    throw new Error('square must be between 1 and 64');
  }
  const power = BigInt(n - 1);
  return 2n ** power;
};

/**
 * @returns {bigint}
 */
export const total = () => {
  const power = BigInt(BOARD_SIZE);
  return 2n ** power - 1n;
};
