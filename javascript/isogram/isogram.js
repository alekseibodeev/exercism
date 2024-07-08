const N = 26;

/**
 * @param {string} str
 * @returns {boolean}
 */
export const isIsogram = (str) => {
  const letterCount = Array(N).fill(0);
  for (const char of str) {
    const i = char.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
    if (i < 0 || i > 25) continue;
    if (letterCount[i] !== 0) return false;
    letterCount[i]++;
  }
  return true;
};
