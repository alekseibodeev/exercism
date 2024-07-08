/**
 * @param {string} s
 * @returns {boolean}
 */
const isLetter = (s) => /[a-z]/i.test(s);
/**
 * @param {string} s
 * @returns {boolean}
 */
const isValidSeparator = (s) => /\s|\.|-|\+|\(|\)/.test(s);
/**
 * @param {string} s
 * @returns {boolean}
 */
const isDigit = (s) => /\d/.test(s);

/**
 * @param {string} tel
 * @returns {string}
 */
export const clean = (tel) => {
  /**
   * @type {string[]}
   */
  const digits = [];
  for (const s of tel) {
    if (isValidSeparator(s)) continue;
    if (isLetter(s)) throw new Error('Letters not permitted');
    if (!isDigit(s)) throw new Error('Punctuations not permitted');
    digits.push(s);
    if (digits.length > 11) throw new Error('More than 11 digits');
  }
  if (digits.length < 10) throw new Error('Incorrect number of digits');
  if (digits.length === 11 && digits[0] !== '1') {
    throw new Error('11 digits must start with 1');
  }
  if (digits[digits.length - 10] === '0') {
    throw new Error('Area code cannot start with zero');
  }
  if (digits[digits.length - 10] === '1') {
    throw new Error('Area code cannot start with one');
  }
  if (digits[digits.length - 7] === '0') {
    throw new Error('Exchange code cannot start with zero');
  }
  if (digits[digits.length - 7] === '1') {
    throw new Error('Exchange code cannot start with one');
  }
  return digits.slice(-10).join('');
};
