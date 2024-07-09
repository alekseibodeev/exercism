const N = 26;

/**
 * @param {string} char
 * @returns {boolean}
 */
const isLetter = function (char) {
  return (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z');
};

/**
 * @param {string} char
 * @returns {boolean}
 */
const isUpper = function (char) {
  return char.toUpperCase() === char;
};

/**
 * @param {string} str
 * @param {number} shift
 * @returns {string}
 */
export const rotate = function (str, shift) {
  /**
   * @type {string[]}
   */
  const res = [];
  for (const char of str) {
    if (!isLetter(char)) {
      res.push(char);
      continue;
    }
    const hash = isUpper(char) ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
    const key = char.charCodeAt(0) - hash;
    const rotatedKey = (key + shift) % N;
    const rotatedLetter = String.fromCharCode(rotatedKey + hash);
    res.push(rotatedLetter);
  }
  return res.join('');
};
