/**
 * @typedef {{start: number[], end: number[]}} WordLocation
 * @typedef {(row: number, col: number) => number[][]} NeighborsFactory
 * @typedef {{[key: string]: WordLocation | undefined}} SearchResult
 */
/**
 * @param {string[]} grid
 * @param {NeighborsFactory} neighbors
 */
function createDfs(grid, neighbors) {
  /**
   * @param {string[]} grid
   * @param {string} word
   * @param {number} startRow
   * @param {number} startCol
   * @returns
   */
  return function dfs(word, startRow, startCol) {
    /**
     * @type {Set<number[]>}
     */
    const visited = new Set();
    /**
     * @param {number} index
     * @param {number} row
     * @param {number} col
     * @returns {WordLocation | undefined}
     */
    const helper = function (index, row, col) {
      const key = JSON.stringify([row, col]);
      if (
        visited.has(key) ||
        Math.min(row, col) < 0 ||
        row === grid.length ||
        col === grid[row].length ||
        grid[row][col] !== word[index]
      ) {
        return;
      }
      visited.add(key);
      if (index === word.length - 1) {
        return { start: [startRow + 1, startCol + 1], end: [row + 1, col + 1] };
      }
      let res;
      for (const [nextRow, nextCol] of neighbors(row, col)) {
        res = res || helper(index + 1, nextRow, nextCol);
        if (res) break;
      }
      visited.delete(key);
      return res;
    };
    return helper(0, startRow, startCol);
  };
}

class WordSearch {
  #grid;
  /**
   * @type {Map<string, number[][]>}
   */
  #points;
  /**
   * @param {string[]} grid
   */
  constructor(grid) {
    this.#grid = grid;
    this.#points = new Map();
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (!this.#points.has(grid[i][j])) this.#points.set(grid[i][j], []);
        this.#points.get(grid[i][j]).push([i, j]);
      }
    }
  }

  /**
   * @param {string[]} words
   * @returns {SearchResult}
   */
  find(words) {
    const checkers = [
      this.#rowChecker(),
      this.#colChecker(),
      this.#diagChecker(),
    ];
    /**
     * @type {SearchResult}
     */
    const res = {};
    outer: for (const word of words) {
      for (const [row, col] of this.#points.get(word[0]) || []) {
        for (const checker of checkers) {
          const temp = checker(word, row, col);
          if (temp) {
            res[word] = temp;
            continue outer;
          }
        }
      }
      res[word] = undefined;
    }
    return res;
  }

  #rowChecker() {
    const neighbors = function (row, col) {
      return [
        [row, col + 1],
        [row, col - 1],
      ];
    };

    return createDfs(this.#grid, neighbors);
  }

  #colChecker() {
    const neighbors = function (row, col) {
      return [
        [row + 1, col],
        [row - 1, col],
      ];
    };
    return createDfs(this.#grid, neighbors);
  }

  #diagChecker() {
    const neighbors = function (row, col) {
      return [
        [row + 1, col + 1],
        [row - 1, col + 1],
        [row + 1, col - 1],
        [row - 1, col - 1],
      ];
    };
    return createDfs(this.#grid, neighbors);
  }
}

export default WordSearch;
