export class Squares {
  #squareOfSum;
  #sumOfSquares;
  /**
   * @param {number} n
   */
  constructor(n) {
    this.#squareOfSum = ((n * (n + 1)) / 2) ** 2;
    this.#sumOfSquares = (n * (n + 1) * (2 * n + 1)) / 6;
  }

  get sumOfSquares() {
    return this.#sumOfSquares;
  }

  get squareOfSum() {
    return this.#squareOfSum;
  }

  get difference() {
    return this.#squareOfSum - this.#sumOfSquares;
  }
}
