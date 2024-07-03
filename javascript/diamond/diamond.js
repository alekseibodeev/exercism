/**
 * @param {string} letter
 * @returns {string[]}
 */
export const rows = (letter) => {
  const middle = letter.charCodeAt(0) - 'A'.charCodeAt(0);
  const grid = Array(middle + 1)
    .fill(null)
    .map(() => Array(2 * middle + 1).fill(' '));
  for (let i = 0; i <= middle; i++) {
    const vertex = String.fromCharCode(i + 'A'.charCodeAt(0));
    grid[i][middle + i] = vertex;
    grid[i][middle - i] = vertex;
  }
  return grid
    .concat(grid.slice(0, middle).reverse())
    .map((row) => row.join(''));
};
