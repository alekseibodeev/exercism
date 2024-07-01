class Point {
  /**
   * @param {number} row
   * @param {number} column
   */
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}

/**
 * @param {number[]} heights
 * @returns {Point[]}
 */
export const saddlePoints = (heights) => {
  const m = heights.length;
  const n = heights[0].length;
  const bestInRow = Array(m).fill(Number.MIN_SAFE_INTEGER);
  const bestInColumn = Array(n).fill(Number.MAX_SAFE_INTEGER);
  const result = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      bestInRow[i] = Math.max(bestInRow[i], heights[i][j]);
      bestInColumn[j] = Math.min(bestInColumn[j], heights[i][j]);
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (heights[i][j] === bestInRow[i] && heights[i][j] === bestInColumn[j]) {
        result.push(new Point(i + 1, j + 1));
      }
    }
  }

  return result;
};
