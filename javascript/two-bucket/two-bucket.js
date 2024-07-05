export class TwoBucket {
  #one;
  #two;
  #goal;
  #starter;
  #solution;
  /**
   * @param {number} one
   * @param {number} two
   * @param {number} goal
   * @param {'one'|'two'} starter
   */
  constructor(one, two, goal, starter) {
    this.#one = one;
    this.#two = two;
    this.#goal = goal;
    this.#starter = starter;
    this.#solution = this.#solve(); // do weird stuff to throw error from constructor
  }

  solve() {
    return this.#solution;
  }

  #solve() {
    const queue = []; // TODO: replace array with real queue
    const init = [
      this.#starter === 'one' ? this.#one : 0,
      this.#starter === 'two' ? this.#two : 0,
    ];
    const visited = new Set();
    visited.add(JSON.stringify(init));
    let moves = 1;
    queue.push(init);
    while (queue.length) {
      const n = queue.length;
      for (let i = 0; i < n; i++) {
        const [one, two] = queue.shift();
        if (one === this.#goal || two === this.#goal) {
          return {
            moves,
            goalBucket: one === this.#goal ? 'one' : 'two',
            otherBucket: one === this.#goal ? two : one,
          };
        }
        const actions = [
          [one, 0],
          [0, two],
          [this.#one, two],
          [one, this.#two],
          [Math.max(0, one + two - this.#two), Math.min(one + two, this.#two)],
          [Math.min(one + two, this.#one), Math.max(0, one + two - this.#one)],
        ];
        for (const action of actions) {
          if (
            (this.#starter === 'one' &&
              action[0] === 0 &&
              action[1] === this.#two) ||
            (this.#starter === 'two' &&
              action[1] === 0 &&
              action[0] === this.#one)
          ) {
            continue;
          }
          if (!visited.has(JSON.stringify(action))) {
            queue.push(action);
            visited.add(JSON.stringify(action));
          }
        }
      }
      moves++;
    }
    throw new Error('Impossible to solve.');
  }
}
