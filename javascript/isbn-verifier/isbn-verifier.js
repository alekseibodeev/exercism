const ISBN_LEN = 10;

/**
 * @param {RegExpMatchArray} digits
 * @returns {boolean}
 */
const check = (digits) => {
  let res = 0;
  for (let i = 0; i < ISBN_LEN; i++) {
    const num = digits[i] === 'X' ? 10 : parseInt(digits[i]);
    res += (ISBN_LEN - i) * num;
  }
  return res % 11 === 0;
};

/**
 * @param {string} str
 * @returns {RegExpMatchArray}
 */
const extractDigits = (str) => str.match(/\d|X/g);

/**
 * @param {string} str
 * @returns {boolean}
 */
export const isValid = (str) => {
  const pattern = /^\d-?\d{3}-?\d{5}-?(?:\d|X)$/g;
  if (!pattern.test(str)) return false;
  return check(extractDigits(str));
};
