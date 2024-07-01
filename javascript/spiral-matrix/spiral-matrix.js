/**
 *
 * @param {number} n
 * @return {number[][]}
 */
export const spiralMatrix = (n) => {
  const matrix = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));
  let prev = 0;
  let start = 0;
  let end = n;

  while (prev < n ** 2) {
    for (let i = start; i < end; i++) {
      matrix[start][i] = ++prev;
    }
    start++;
    for (let i = start; i < end; i++) {
      matrix[i][end - 1] = ++prev;
    }
    end--;
    for (let i = end - 1; i >= start - 1; i--) {
      matrix[end][i] = ++prev;
    }
    for (let i = end - 1; i >= start; i--) {
      matrix[i][start - 1] = ++prev;
    }
  }

  return matrix;
};
