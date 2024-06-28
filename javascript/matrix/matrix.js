export class Matrix {
  #rows;
  #cols;
  constructor(grid) {
    this.#rows = grid
      .split('\n')
      .map((row) => row.split(' ').map((cell) => parseInt(cell)));
    this.#cols = Array(this.#rows[0].length)
      .fill(null)
      .map(() => []);
    this.#rows.forEach((row) => {
      row.forEach((cell, i) => this.#cols[i].push(cell));
    });
  }

  get rows() {
    return this.#rows;
  }

  get columns() {
    return this.#cols;
  }
}
