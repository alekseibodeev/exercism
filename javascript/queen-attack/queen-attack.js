const BOARD_SIZE = 8;
const DEFAULT_POSITION = {
  black: [0, 3],
  white: [7, 3],
};

export class QueenAttack {
  #canAttack;
  constructor({
    black = DEFAULT_POSITION.black,
    white = DEFAULT_POSITION.white,
  } = {}) {
    if (black.concat(white).some((pos) => pos < 0 || pos >= BOARD_SIZE)) {
      throw new Error('Queen must be placed on the board');
    }

    if (black[0] === white[0] && black[1] === white[1]) {
      throw new Error('Queens cannot share the same space');
    }

    if (
      black[0] === white[0] ||
      black[1] === white[1] ||
      black[0] + black[1] === white[0] + white[1] ||
      black[0] - white[0] === black[1] - white[1]
    ) {
      this.#canAttack = true;
    } else {
      this.#canAttack = false;
    }

    this.black = black;
    this.white = white;
  }

  toString() {
    const board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      board.push([]);
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (i === this.black[0] && j === this.black[1]) {
          board[i].push('B');
        } else if (i === this.white[0] && j === this.white[1]) {
          board[i].push('W');
        } else {
          board[i].push('_');
        }
      }
    }

    return board.map((row) => row.join(' ')).join('\n');
  }

  get canAttack() {
    return this.#canAttack;
  }
}
