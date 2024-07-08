export class Board {
  #board;
  /**
   * @param {string[]} board
   */
  constructor(board) {
    this.#board = board.map((row) =>
      row.split('').filter((cell) => cell !== ' ')
    );
  }

  winner() {
    for (
      let i = 0, j = this.#board[0].length - 1;
      i < this.#board.length;
      i++
    ) {
      if (this.#board[i][j] === 'X') {
        if (this.#check(i, j, 'X')) return 'X';
      }
    }

    for (let i = 0, j = 0; j < this.#board.length; j++) {
      if (this.#board[i][j] === 'O') {
        if (this.#check(i, j, 'O')) return 'O';
      }
    }

    return '';
  }

  /**
   * @param {'X' | 'O'} player
   */
  #check(startRow, startCol, player) {
    const q = [];
    const visited = new Set();
    q.push([startRow, startCol]);
    while (q.length) {
      const [row, col] = q.shift();
      const key = JSON.stringify([row, col]);
      if (visited.has(key) || this.#board[row][col] !== player) continue;
      if (
        (player === 'X' && col === 0) ||
        (player === 'O' && row === this.#board.length - 1)
      ) {
        return true;
      }
      visited.add(key);
      const moves = [
        [row + 1, col],
        [row - 1, col],
        [row, col + 1],
        [row, col - 1],
        [row - 1, col + 1],
        [row + 1, col - 1],
      ];
      for (const [nextRow, nextCol] of moves) {
        if (
          Math.min(nextRow, nextCol) >= 0 &&
          nextRow < this.#board.length &&
          nextCol < this.#board[0].length
        ) {
          q.push([nextRow, nextCol]);
        }
      }
    }
    return false;
  }
}
