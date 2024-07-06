const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR;

export class Clock {
  constructor(hours = 0, minutes = 0) {
    const total = hours * MINUTES_IN_HOUR + minutes;
    /**
     * @type {number}
     */
    this.time = this.#getTime(total);
  }

  /**
   * @param {number} total
   * @returns {number}
   */
  #getTime(total) {
    const remainder = total % MINUTES_IN_DAY;
    return (MINUTES_IN_DAY + remainder) % MINUTES_IN_DAY;
  }

  /**
   * @param {number} num
   * @returns {string}
   */
  #format(num) {
    if (num < 10) return '0' + num;
    return num.toString();
  }

  toString() {
    const hours = Math.floor(this.time / MINUTES_IN_HOUR);
    const hh = this.#format(hours);
    const minutes = this.time % MINUTES_IN_HOUR;
    const mm = this.#format(minutes);
    return `${hh}:${mm}`;
  }

  /**
   * @param {number} minutes
   * @returns {Clock}
   */
  plus(minutes = 0) {
    this.time = this.#getTime(this.time + minutes);
    return this;
  }

  /**
   * @param {number} minutes
   * @returns {Clock}
   */
  minus(minutes = 0) {
    this.time = this.#getTime(this.time - minutes);
    return this;
  }

  /**
   * @param {Clock} that
   * @returns {boolean}
   */
  equals(that) {
    return this.time === that.time;
  }
}
