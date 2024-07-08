/**
 * @param {string} word
 * @returns {Map<string, number>}
 */
const countLetters = (word) => {
  /**
   * @type {Map<string, number>}
   */
  const count = new Map();
  for (const letter of word) {
    count.set(letter, (count.get(letter) || 0) + 1);
  }
  return count;
};

/**
 * @param {Map<string, number>} count
 * @param {Map<string, number>} targetCount
 * @returns {boolean}
 */
const isAnagram = (count, targetCount) => {
  if (targetCount.size !== count.size) return false;
  for (const [letter, frequency] of count) {
    if (targetCount.get(letter) !== frequency) return false;
  }
  return true;
};

/**
 * @param {string} target
 * @param {string[]} words
 * @returns {string[]}
 */
export const findAnagrams = (target, words) => {
  target = target.toLowerCase();
  const targetCount = countLetters(target);
  /**
   * @type {string[]}
   */
  const result = [];
  for (const word of words) {
    if (word.toLowerCase() === target || word.length !== target.length) {
      continue;
    }
    const count = countLetters(word.toLowerCase());
    if (isAnagram(count, targetCount)) result.push(word);
  }
  return result;
};
