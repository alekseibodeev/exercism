/**
 *
 * @param {string[]} text
 * @returns {string[]}
 */
export const transpose = (text) => {
  if (!text.length) return [];
  const m = text.length;
  const n = Math.max(...text.map((str) => str.length));
  const res = Array(n)
    .fill(null)
    .map(() => Array(m).fill(' '));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < text[i].length; j++) {
      res[j][i] = text[i][j];
    }
  }

  for (let i = n - 1, maxSoFar = 0; i >= 0; i--) {
    while (res[i].length > maxSoFar && res[i][res[i].length - 1] === ' ') {
      res[i].pop();
    }
    maxSoFar = res[i].length;
    if (maxSoFar === n) break;
  }

  return res.map((str) => str.join(''));
};
