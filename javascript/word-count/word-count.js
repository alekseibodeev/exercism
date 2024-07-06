/**
 * @param {string} str
 * @returns {{[key: string]: number}}
 */
export const countWords = (str) => {
  const dict = {};
  const regex = /\w+'\w+|\w+/gm;
  const words = str.match(regex);
  for (const word of words) {
    const key = word.toLowerCase();
    dict[key] = (dict[key] || 0) + 1;
  }
  return dict;
};
