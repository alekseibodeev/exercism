export class Series {
  /**
   *
   * @param {string} series
   */
  constructor(series) {
    if (!series) throw new Error('series cannot be empty');
    this.series = series.split('').map((digit) => parseInt(digit));
  }

  /**
   *
   * @param {number} sliceLength
   * @returns {number[][]}
   */
  slices(sliceLength) {
    if (sliceLength === 0) throw new Error('slice length cannot be zero');
    if (sliceLength < 0) throw new Error('slice length cannot be negative');
    if (sliceLength > this.series.length) {
      throw new Error('slice length cannot be greater than series length');
    }
    const res = [];
    const n = this.series.length - sliceLength;
    for (let i = 0; i <= n; i++) {
      res.push(this.series.slice(i, i + sliceLength));
    }
    return res;
  }
}
