export class HighScores {
  #scores;
  #top;
  constructor(scores) {
    this.#scores = scores;
    this.#top = Array(Math.min(3, scores.length)).fill(0);
    for (let score of scores) {
      for (let i = 0; i < this.#top.length; i++) {
        if (score > this.#top[i]) {
          [this.#top[i], score] = [score, this.#top[i]];
        }
      }
    }
  }

  get scores() {
    return this.#scores;
  }

  get latest() {
    return this.#scores[this.#scores.length - 1];
  }

  get personalBest() {
    return this.#top[0];
  }

  get personalTopThree() {
    return this.#top;
  }
}
