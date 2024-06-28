const N = 26;
const TOTAL_NUMBER_OF_NAMES =
  26 * // A-Z
  26 * // A-Z
  10 * // 0-9
  10 * // 0-9
  10; // 0-

const generate = () => {
  const names = [];
  for (let i = 0; i < N; i++) {
    const ltr1 = String.fromCharCode(i + 'A'.charCodeAt(0));
    for (let j = 0; j < N; j++) {
      const ltr2 = String.fromCharCode(j + 'A'.charCodeAt(0));
      for (let d1 = 0; d1 < 10; d1++) {
        for (let d2 = 0; d2 < 10; d2++) {
          for (let d3 = 0; d3 < 10; d3++) {
            names.push(ltr1 + ltr2 + d1 + d2 + d3);
          }
        }
      }
    }
  }
  return names;
};

const shuffle = (names) => {
  for (let i = TOTAL_NUMBER_OF_NAMES; i >= 0; i--) {
    const j = Math.floor(Math.random() * i);
    [names[i], names[j]] = [names[j], names[i]];
  }
  return names;
};

const names = shuffle(generate());
let index = 0;

export class Robot {
  #name;

  constructor() {
    this.#name = names[index++];
  }

  get name() {
    return this.#name;
  }

  reset() {
    this.#name = names[index++];
    index %= TOTAL_NUMBER_OF_NAMES;
  }

  static releaseNames() {
    index = 0;
  }
}
