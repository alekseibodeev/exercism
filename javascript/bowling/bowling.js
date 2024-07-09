const MAX_FRAMES = 10;

export class Bowling {
  /**
   * @type {number[]}
   */
  #rolls;
  /**
   * @type {number[]}
   */
  #currenFrameScore;
  constructor() {
    this.#rolls = [];
    this.#currenFrameScore = [];
  }

  /**
   * @param {number} pins
   */
  roll(pins) {
    if (this.#isGameOver()) {
      throw new Error('Cannot roll after game is over');
    }
    if (pins < 0) {
      throw new Error('Negative roll is invalid');
    }
    if (pins > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }
    this.#currenFrameScore.push(pins);
    if (this.#currenFrameScore.length === 2) {
      if (this.#currenFrameScore[0] + this.#currenFrameScore[1] > 10) {
        throw new Error('Pin count exceeds pins on the lane');
      }
      this.#currenFrameScore = [];
    }
    if (pins === 10) {
      this.#currenFrameScore = [];
    }
    this.#rolls.push(pins);
  }

  score() {
    if (!this.#isGameOver()) {
      throw new Error('Score cannot be taken until the end of the game');
    }

    let totalScore = 0;
    let frameIndex = 0;

    for (let frame = 0; frame < MAX_FRAMES; frame++) {
      if (this.#isStrike(frameIndex)) {
        totalScore += this.#strikeScore(frameIndex);
        frameIndex += 1;
      } else if (this.#isSpare(frameIndex)) {
        totalScore += this.#spareScore(frameIndex);
        frameIndex += 2;
      } else {
        totalScore += this.#frameScore(frameIndex);
        frameIndex += 2;
      }
    }

    return totalScore;
  }

  /**
   * @param {number} frameIndex
   * @returns {boolean}
   */
  #isStrike(frameIndex) {
    return this.#rolls[frameIndex] === 10;
  }

  /**
   * @param {number} frameIndex
   * @returns {boolean}
   */
  #isSpare(frameIndex) {
    return this.#rolls[frameIndex] + this.#rolls[frameIndex + 1] === 10;
  }

  /**
   * @param {number} frameIndex
   * @returns {number}
   */
  #strikeScore(frameIndex) {
    return 10 + this.#rolls[frameIndex + 1] + this.#rolls[frameIndex + 2];
  }

  /**
   * @param {number} frameIndex
   * @returns {number}
   */
  #spareScore(frameIndex) {
    return 10 + this.#rolls[frameIndex + 2];
  }

  /**
   * @param {number} frameIndex
   * @returns {number}
   */
  #frameScore(frameIndex) {
    return this.#rolls[frameIndex] + this.#rolls[frameIndex + 1];
  }

  #isGameOver() {
    let frameIndex = 0;

    for (let frame = 0; frame < MAX_FRAMES; frame++) {
      if (this.#rolls[frameIndex] === undefined) {
        return false;
      }
      if (this.#isStrike(frameIndex)) {
        if (this.#rolls[frameIndex + 2] === undefined) {
          return false;
        }
        frameIndex += 1;
      } else if (this.#isSpare(frameIndex)) {
        if (this.#rolls[frameIndex + 2] === undefined) {
          return false;
        }
        frameIndex += 2;
      } else {
        if (this.#rolls[frameIndex + 1] === undefined) {
          return false;
        }
        frameIndex += 2;
      }
    }

    return true;
  }
}
