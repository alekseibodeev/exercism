/**
 * @param {{minFactor: number, maxFactor: number, sum: number}} param0
 * @returns {Triplet[]}
 */
export function triplets({ minFactor, maxFactor, sum }) {
  /**
   * @param {number} start
   * @param {number} end
   * @param {number} a
   * @returns {number[] | null}
   */
  const search = (start, end, a) => {
    while (start <= end) {
      const b = Math.floor((start + end) / 2);
      const c = Math.sqrt(a ** 2 + b ** 2);
      if (c > maxFactor) {
        end = b - 1;
        continue;
      }
      const tripletSum = a + b + c;
      if (tripletSum === sum) return [b, c];
      if (tripletSum > sum) {
        end = b - 1;
      } else {
        start = b + 1;
      }
    }
    return null;
  };
  const res = [];
  const start = minFactor || 1;
  const end = sum / (2 + Math.sqrt(2));
  for (let i = start; i <= end; i++) {
    const pair = search(i, maxFactor || sum, i);
    if (pair) res.push(new Triplet(i, ...pair));
  }
  return res;
}

class Triplet {
  /**
   * @param {number} a
   * @param {number} b
   * @param {number} c
   */
  constructor(a, b, c) {
    /**
     * @type {number}
     */
    this.a = a;
    /**
     * @type {number}
     */
    this.b = b;
    /**
     * @type {number}
     */
    this.c = c;
  }

  /**
   * @returns {number[]}
   */
  toArray() {
    return Object.values(this);
  }
}
