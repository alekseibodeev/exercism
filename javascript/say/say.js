const MIN = 0;
const MAX = 999_999_999_999;
const DIGITS = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
};

const SPECIALS = {
  1: 'thousand',
  2: 'million',
  3: 'billion',
};

const parseTwoDigits = (num1, num2) => {
  if (num1 === 0) {
    return num2 !== 0 ? DIGITS[num2] : '';
  } else if (num1 === 1) {
    switch (num2) {
      case 0:
        return 'ten';
      case 1:
        return 'eleven';
      case 2:
        return 'twelve';
      case 3:
        return 'thirteen';
      case 5:
        return 'fifteen';
      default:
        return DIGITS[num2] + 'teen';
    }
  } else {
    const res = [];
    switch (num1) {
      case 2:
        res.push('twenty');
        break;
      case 3:
        res.push('thirty');
        break;
      case 4:
        res.push('forty');
        break;
      case 5:
        res.push('fifty');
        break;
      case 8:
        res.push('eighty');
        break;
      default:
        res.push(DIGITS[num1] + 'ty');
        break;
    }
    if (num2 !== 0) res.push(DIGITS[num2]);
    return res.join('-');
  }
};

/**
 * @param {number} num
 * @returns {string}
 */
export const say = (num) => {
  if (num < MIN || num > MAX) {
    throw new Error('Number must be between 0 and 999,999,999,999.');
  }

  /**
   * @type {number[][]}
   */
  const chunks = [];

  for (let i = 0; num > 0; i++) {
    if (i % 3 === 0) chunks.push([]);
    chunks[chunks.length - 1].push(num % 10);
    num = Math.floor(num / 10);
  }

  /**
   * @type {string[]}
   */
  const res = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const special = SPECIALS[i];
    const temp = [];
    if (chunk.length === 1) {
      temp.push(DIGITS[chunk[0]]);
    } else if (chunk.length === 2) {
      temp.push(parseTwoDigits(chunk[1], chunk[0]));
    } else {
      if (chunk[2] !== 0) temp.push(`${DIGITS[chunk[2]]} hundred`);
      const t = parseTwoDigits(chunk[1], chunk[0]);
      if (t) temp.push(t);
    }
    if (!temp.filter((item) => item).length) continue;
    if (special) temp.push(special);
    res.push(temp.join(' '));
  }

  return res.reverse().join(' ') || 'zero';
};
