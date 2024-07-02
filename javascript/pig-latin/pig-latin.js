const ending = 'ay';

/**
 * @param {string} str
 * @return {string}
 */
export const translate = (str) => {
  const words = str.split(' ');
  /**
   * @type {string[]}
   */
  const res = [];
  for (const word of words) {
    if (
      'aeiou'.includes(word[0]) ||
      word.startsWith('xr') ||
      word.startsWith('yt')
    ) {
      res.push(word + ending);
      continue;
    }

    let i = 1;
    while (i < word.length && !'aeiouy'.includes(word[i])) {
      i++;
    }
    if (word.startsWith('qu', i - 1)) i++;
    res.push(word.slice(i) + word.slice(0, i) + ending);
  }
  return res.join(' ');
};
