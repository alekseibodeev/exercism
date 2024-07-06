const TESTS = new Map([
  [1, 'eggs'],
  [2, 'peanuts'],
  [4, 'shellfish'],
  [8, 'strawberries'],
  [16, 'tomatoes'],
  [32, 'chocolate'],
  [64, 'pollen'],
  [128, 'cats'],
]);

export class Allergies {
  /**
   * @type {Set<string>}
   */
  #positives;

  /**
   * @param {number} num
   */
  constructor(num) {
    this.#positives = new Set();
    while (num) {
      const power = Math.floor(Math.log2(num));
      const testVal = 2 ** power;
      if (TESTS.has(testVal)) this.#positives.add(TESTS.get(testVal));
      num -= testVal;
    }
  }

  /**
   * @returns {string[]}
   */
  list() {
    return [...this.#positives].reverse();
  }

  /**
   * @param {string} allergy
   * @returns {boolean}
   */
  allergicTo(allergy) {
    return this.#positives.has(allergy);
  }
}
