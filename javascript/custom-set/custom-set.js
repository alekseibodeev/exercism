export class CustomSet {
  /**
   * @param {number[]} arr
   */
  constructor(arr = []) {
    this.data = {};
    this.size = arr.length;
    arr.forEach((n) => (this.data[n] = n));
  }

  /**
   * @returns {boolean}
   */
  empty() {
    return this.size === 0;
  }

  /**
   * @param {number} val
   * @returns {boolean}
   */
  contains(val) {
    return this.data.hasOwnProperty(val);
  }

  /**
   * @param {number} val
   * @returns {CustomSet}
   */
  add(val) {
    if (!this.data.hasOwnProperty(val)) {
      this.data[val] = val;
      this.size++;
    }
    return this;
  }

  /**
   * @param {CustomSet} that
   * @returns {boolean}
   */
  subset(that) {
    for (const key of Object.keys(this.data)) {
      if (!that.data.hasOwnProperty(key)) return false;
    }
    return true;
  }

  /**
   * @param {CustomSet} that
   * @returns {boolean}
   */
  disjoint(that) {
    for (const key of Object.keys(this.data)) {
      if (that.data.hasOwnProperty(key)) return false;
    }
    return true;
  }

  /**
   * @param {CustomSet} that
   * @returns {boolean}
   */
  eql(that) {
    if (this.size !== that.size) return false;
    return this.subset(that);
  }

  /**
   * @param {CustomSet} that
   * @returns {CustomSet}
   */
  union(that) {
    const uni = new CustomSet();
    for (const key of Object.keys(this.data)) {
      uni.add(key);
    }
    for (const key of Object.keys(that.data)) {
      uni.add(key);
    }
    return uni;
  }

  /**
   * @param {CustomSet} that
   * @returns {CustomSet}
   */
  intersection(that) {
    const inter = new CustomSet();
    for (const key of Object.keys(this.data)) {
      if (that.data.hasOwnProperty(key)) inter.add(key);
    }
    return inter;
  }

  /**
   * @param {CustomSet} that
   * @returns {CustomSet}
   */
  difference(that) {
    const diff = new CustomSet();
    for (const key of Object.keys(this.data)) {
      if (!that.data.hasOwnProperty(key)) diff.add(key);
    }
    return diff;
  }
}
