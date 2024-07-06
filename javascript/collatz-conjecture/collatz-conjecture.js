/**
 * @param {number} n
 * @returns {number}
 */
export const steps = (n) => {
  if (n < 1) throw new Error('Only positive numbers are allowed');
  let count = 0;
  while (n !== 1) {
    if (n % 2) {
      n = 3 * n + 1;
    } else {
      n /= 2;
    }
    count++;
  }
  return count;
};
