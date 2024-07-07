/**
 * @param {string} str
 * @returns {boolean}
 */
export const valid = (str) => {
  /**
   * @type {number[]}
   */
  const digits = [];
  for (const chr of str) {
    if (chr === ' ') continue;
    if (chr < '0' && chr > '9') return false;
    digits.push(parseInt(chr));
  }
  const n = digits.length;
  if (n <= 1) return false;
  let checksum = 0;
  for (let i = n - 1, second = false; i >= 0; i--, second = !second) {
    if (second) {
      const product = digits[i] * 2;
      checksum += product > 9 ? product - 9 : product;
    } else {
      checksum += digits[i];
    }
  }
  return checksum % 10 === 0;
};
